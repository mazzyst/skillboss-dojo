#!/usr/bin/env node
// provider-hard-limit — the finder. READ ONLY. Locations, never values.
// It reads the package manifest, the Python manifests, and source imports.
// It never opens an environment file, so it can never print a key.
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join, relative } from 'node:path';

const root = process.argv[2] ?? '.';

// Package names that mean "this repository calls a model provider directly".
// A gateway or a proxy the code calls by URL is NOT found here, and the
// output says so.
const KNOWN = [
  ['openai',                          'OpenAI'],
  ['@anthropic-ai/sdk',               'Anthropic'],
  ['@anthropic-ai/bedrock-sdk',       'Anthropic via AWS Bedrock'],
  ['@anthropic-ai/vertex-sdk',        'Anthropic via Google Vertex'],
  ['ai',                              'AI SDK (provider chosen at runtime)'],
  ['@ai-sdk/openai',                  'OpenAI (via AI SDK)'],
  ['@ai-sdk/anthropic',               'Anthropic (via AI SDK)'],
  ['@ai-sdk/google',                  'Google (via AI SDK)'],
  ['@ai-sdk/mistral',                 'Mistral (via AI SDK)'],
  ['@google/generative-ai',           'Google Gemini API'],
  ['@google/genai',                   'Google Gemini API'],
  ['@mistralai/mistralai',            'Mistral'],
  ['cohere-ai',                       'Cohere'],
  ['groq-sdk',                        'Groq'],
  ['together-ai',                     'Together'],
  ['@azure/openai',                   'Azure OpenAI'],
  ['@aws-sdk/client-bedrock-runtime', 'AWS Bedrock'],
  ['ollama',                          'Ollama (local; no provider bill)'],
];
const PY = [
  ['openai', 'OpenAI'], ['anthropic', 'Anthropic'], ['google-generativeai', 'Google Gemini API'],
  ['google-genai', 'Google Gemini API'], ['mistralai', 'Mistral'], ['cohere', 'Cohere'], ['groq', 'Groq'],
];

// A package name is only a CALL when it appears in STATEMENT position. The
// first published version matched the pattern anywhere on a line, so it
// reported a provider for a file that merely MENTIONED an import inside a
// string — found by running this finder on its own repository the day it
// shipped. A check that fires when nothing is wrong teaches its reader to
// ignore it, so these patterns are anchored instead.
//
// Known residual, said rather than hidden: an import written at the start of
// a line INSIDE a multi-line template literal still reads as a statement, and
// a dynamic `await import(...)` is not seen at all. The exposure sheet says
// what this finder does not see.
function importPatterns(q) {
  return [
    // import x from 'pkg' / export { x } from 'pkg' — may span lines, never a statement end
    new RegExp(`(?:^|\\n)\\s*(?:import|export)[^;]{0,200}?from\\s*['"]${q}(?:/|['"])`, 'g'),
    // import 'pkg' — a side-effect import
    new RegExp(`(?:^|\\n)\\s*import\\s*['"]${q}(?:/|['"])`, 'g'),
    // = require('pkg') or a bare require('pkg'); anything else before it is text
    new RegExp(`(?:=\\s*|(?:^|\\n)\\s*)require\\(\\s*['"]${q}(?:/|['"])`, 'g'),
  ];
}

const found = new Map(); // provider -> Set(locations)
const add = (name, where) => { if (!found.has(name)) found.set(name, new Set()); found.get(name).add(where); };

// 1. manifests
const pkgPath = join(root, 'package.json');
if (existsSync(pkgPath)) {
  try {
    const pkg = JSON.parse(readFileSync(pkgPath, 'utf8'));
    const deps = { ...(pkg.dependencies ?? {}), ...(pkg.devDependencies ?? {}) };
    for (const [dep, name] of KNOWN) if (dep in deps) add(name, 'package.json (dependency)');
  } catch { /* an unreadable manifest is reported below as a file, not a value */ }
}
for (const f of ['requirements.txt', 'pyproject.toml']) {
  const p = join(root, f);
  if (!existsSync(p)) continue;
  const text = readFileSync(p, 'utf8');
  text.split('\n').forEach((line, i) => {
    for (const [dep, name] of PY) {
      if (new RegExp(`^\\s*"?${dep.replace(/[-.]/g, '[-_.]')}\\b`, 'i').test(line)) add(name, `${f}:${i + 1}`);
    }
  });
}

// 2. source imports (never env files; never node_modules)
const SKIP = new Set(['node_modules', '.git', '.next', 'dist', 'build', 'coverage', 'vendor', '.venv', 'venv']);
const SRC = /\.(ts|tsx|js|jsx|mjs|cjs|py)$/;
function walk(dir) {
  let entries = [];
  try { entries = readdirSync(dir); } catch { return; }
  for (const e of entries) {
    if (SKIP.has(e) || e.startsWith('.env')) continue;
    const p = join(dir, e);
    let st; try { st = statSync(p); } catch { continue; }
    if (st.isDirectory()) { walk(p); continue; }
    if (!SRC.test(e)) continue;
    let text; try { text = readFileSync(p, 'utf8'); } catch { continue; }
    const rel = relative(root, p);
    const lineOf = (index) => text.slice(0, index).split('\n').length;
    if (p.endsWith('.py')) {
      text.split('\n').forEach((line, i) => {
        for (const [dep, name] of PY) {
          const mod = dep.replace(/-/g, '_').replace('google_generativeai', 'google.generativeai').replace('google_genai', 'google.genai');
          if (new RegExp(`^\\s*(import|from)\\s+${mod.replace(/\./g, '\\.')}\\b`).test(line)) add(name, `${rel}:${i + 1}`);
        }
      });
      continue;
    }
    for (const [dep, name] of KNOWN) {
      const q = dep.replace(/[/.@-]/g, '\\$&');
      for (const re of importPatterns(q)) {
        re.lastIndex = 0;
        let m;
        while ((m = re.exec(text)) !== null) add(name, `${rel}:${lineOf(m.index + (m[0].startsWith('\n') ? 1 : 0))}`);
      }
    }
  }
}
walk(root);

// 3. the output: locations only, and one line per provider to hand back
const today = new Date().toISOString().slice(0, 10);
console.log(`provider-hard-limit — read ${today} — repository: ${root}`);
if (!found.size) {
  console.log('no model SDK found in this repository\'s manifests or imports.');
  console.log('this recipe has nothing to record. A provider called through a gateway or by URL is not seen here; say so in your exposure sheet if that is your case.');
  process.exit(0);
}
console.log(`providers found: ${found.size}`);
for (const [name, locs] of found) {
  console.log(`\n- ${name}`);
  for (const l of locs) console.log(`    at ${l}`);
  console.log('    hard limit: NOT RECORDED — set it in the provider console (see references/providers.md), then record WHERE:');
  console.log(`    billing-alert-set — evidence: provider hard limit configured at <location>, read ${today}`);
}
console.log('\nnot seen by this finder: providers called through a gateway or a proxy, other API keys, other applications on the same provider account.');
