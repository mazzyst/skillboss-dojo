#!/usr/bin/env node
// base-image-digest — the finder. READ ONLY. Locations, never values.
// It reads the Dockerfiles in a repository and says, for each BASE image,
// whether it is pinned by a digest or named by a tag that can move.
//
// WHY A TAG IS NOT A PIN. A tag is a pointer its publisher can repoint at
// different bytes; a digest cannot be repointed. `node:20-alpine` is a
// different image this month than last, and nothing in the repository
// records which one built the thing now running. That is the whole finding.
//
// WHAT IT CANNOT DO, said first because it decides what the recipe may claim.
// Resolving a tag to a digest needs a registry, and this recipe never reaches
// the network. So it NEVER prints a digest that was not already in the file,
// and it never writes one in. It names the location and hands the act to a
// person, who runs their own registry's inspect command — this recipe does
// not name a command it has not run (see references/pinning.md).
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative, basename } from 'node:path';

const root = process.argv[2] ?? '.';

const SKIP = new Set([
  'node_modules', '.git', '.next', 'dist', 'build', 'coverage', 'vendor', '.venv', 'venv',
]);

/** `Dockerfile`, `Dockerfile.prod`, `prod.Dockerfile`, `Containerfile`. */
function isDockerfile(name) {
  return /^(Dockerfile|Containerfile)(\..+)?$/.test(name) || /\.Dockerfile$/.test(name);
}

const files = [];
function walk(dir) {
  let entries = [];
  try {
    entries = readdirSync(dir);
  } catch {
    return;
  }
  for (const e of entries) {
    if (SKIP.has(e) || e.startsWith('.env')) continue;
    const p = join(dir, e);
    let st;
    try {
      st = statSync(p);
    } catch {
      continue;
    }
    if (st.isDirectory()) walk(p);
    else if (isDockerfile(basename(p))) files.push(p);
  }
}
walk(root);

/**
 * What a FROM reference is. The order matters: a stage name declared earlier
 * in the same file wins over everything, because `FROM builder` names that
 * stage and NOT an image any registry holds. A finder that reads every FROM
 * as a base reports a phantom image, and the fixture
 * `stage-name-is-not-a-base` plants exactly that.
 */
function classify(reference, stages) {
  const bare = reference.toLowerCase();
  if (stages.has(bare)) return null; // an internal stage, not a base image
  if (bare === 'scratch') return null; // no base to pin
  if (/\$\{?\w/.test(reference)) {
    return {
      state: 'UNRESOLVED',
      why: 'built from a build argument — the builder chooses it, and this file does not say what',
    };
  }
  if (/@sha256:[0-9a-f]{64}$/.test(reference)) {
    return { state: 'PINNED BY DIGEST', why: 'immutable — a digest cannot be repointed' };
  }
  const tag = reference.includes(':') ? reference.slice(reference.lastIndexOf(':') + 1) : '';
  if (/\d+\.\d+\.\d+/.test(tag)) {
    return {
      state: 'FLOATING',
      why: 'a version tag is still a pointer its publisher can move; only a digest is fixed',
    };
  }
  return {
    state: 'FLOATING',
    why: tag
      ? `the tag "${tag}" moves as its publisher rebuilds it`
      : 'no tag at all, which means :latest',
  };
}

const bases = [];
for (const file of files) {
  let text;
  try {
    text = readFileSync(file, 'utf8');
  } catch {
    continue;
  }
  const rel = relative(root, file) || basename(file);
  const stages = new Set();
  text.split('\n').forEach((line, i) => {
    // `FROM [--platform=...] <ref> [AS <stage>]`, case-insensitive as Docker allows.
    const m = line.match(/^\s*FROM\s+((?:--\S+\s+)*)(\S+)(?:\s+AS\s+(\S+))?\s*$/i);
    if (!m) return;
    const reference = m[2];
    const stage = m[3];
    const verdict = classify(reference, stages);
    if (stage) stages.add(stage.toLowerCase());
    if (verdict) bases.push({ at: `${rel}:${i + 1}`, reference, ...verdict });
  });
}

const today = new Date().toISOString().slice(0, 10);
console.log(`base-image-digest — read ${today} — repository: ${root}`);

if (files.length === 0) {
  console.log('no Dockerfile found in this repository.');
  console.log(
    'that is NOT the same as no base image. A platform that builds your image for you (a buildpack, a managed builder) leaves no Dockerfile here to read, and this finder cannot see what it chose. If that is your case, record it in your exposure sheet rather than leaving the box empty.',
  );
  process.exit(0);
}

if (bases.length === 0) {
  console.log(`Dockerfiles read: ${files.length}; base images found: 0`);
  console.log(
    'every FROM in them names an earlier stage or scratch, so there is no base image to pin here.',
  );
  process.exit(0);
}

console.log(`Dockerfiles read: ${files.length}; base images found: ${bases.length}`);
for (const b of bases) {
  console.log(`\n- ${b.reference}`);
  console.log(`    at ${b.at}`);
  console.log(`    ${b.state} — ${b.why}`);
}

const unpinned = bases.filter((b) => b.state !== 'PINNED BY DIGEST');
if (unpinned.length === 0) {
  console.log(
    `\nbases-pinned — evidence: the FROM lines at ${bases.map((b) => b.at).join(', ')}, each pinned by digest, read ${today}`,
  );
  console.log(
    'gate 60 also asks for the journal entry recording your UPDATE ROUTINE. A digest that nobody refreshes is a security hole with a date on it, and this finder cannot see whether you refresh it.',
  );
} else {
  console.log(
    `\n${unpinned.length} of ${bases.length} base image${bases.length === 1 ? '' : 's'} ${unpinned.length === 1 ? 'is' : 'are'} not pinned by a digest, so the gate box line is withheld: it would say "each pinned by digest", and that is not true here.`,
  );
  console.log(
    'to pin one, ask your own registry for the digest behind the tag and write it in. This recipe does not name the command, because it has not run it — see references/pinning.md.',
  );
}
console.log(
  '\nnot seen by this finder: an image built without a Dockerfile in this repository, a base chosen by a build argument the builder supplies, what the digest actually contains, and whether anyone refreshes it. A pin makes a build repeatable; it does not make the image safe.',
);
