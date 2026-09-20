// The recipe's fixtures. Three planted cases, each seen red before green
// during authoring (the finder did not exist; every assertion failed).
import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, dirname } from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const finder = join(here, '..', 'scripts', 'find-providers.mjs');
// A missing or crashing finder is a RED result, not a crash of the fixture:
// every assertion below must be able to fail visibly.
const run = (dir) => { try { return execFileSync('node', [finder, dir], { encoding: 'utf8', stdio: 'pipe' }); } catch { return ''; } };
const results = [];
const record = (id, pass, detail) => results.push({ id, pass, detail });

// A — two providers: one in the manifest, one only in an import; and an env
//     file holding a placeholder next to them, which must never be printed.
const A = mkdtempSync(join(tmpdir(), 'phl-a-'));
mkdirSync(join(A, 'src'));
writeFileSync(join(A, 'package.json'), JSON.stringify({ dependencies: { openai: '^4', next: '16' } }));
writeFileSync(join(A, 'src', 'chat.ts'), "import Anthropic from '@anthropic-ai/sdk';\nexport const c = new Anthropic();\n");
writeFileSync(join(A, '.env'), 'OPENAI_API_KEY=planted-not-a-credential\n');
const outA = run(A);
record('two-providers-named', /OpenAI/.test(outA) && /Anthropic/.test(outA) && /providers found: 2/.test(outA),
  `names OpenAI=${/OpenAI/.test(outA)}, Anthropic=${/Anthropic/.test(outA)}, count line=${/providers found: 2/.test(outA)}`);
// An empty output would pass this vacuously, so the assertion also demands
// that the finder actually said something.
record('never-a-value', outA.length > 0 && !/planted-not-a-credential/.test(outA) && !/OPENAI_API_KEY=/.test(outA),
  `output present=${outA.length > 0}, env placeholder absent=${!/planted-not-a-credential/.test(outA)}`);
record('locations-not-amounts', /src\/chat\.ts:1/.test(outA) && /NOT RECORDED/.test(outA) && !/\$|€|\d+\s*(usd|eur)/i.test(outA),
  `import located=${/src\/chat\.ts:1/.test(outA)}, limit marked NOT RECORDED=${/NOT RECORDED/.test(outA)}, no amount printed=${!/\$|€/.test(outA)}`);

// B — no provider at all: the recipe must say so and claim nothing.
const B = mkdtempSync(join(tmpdir(), 'phl-b-'));
writeFileSync(join(B, 'package.json'), JSON.stringify({ dependencies: { next: '16' } }));
const outB = run(B);
record('no-provider-no-claim', /no model SDK found/.test(outB) && !/billing-alert-set/.test(outB),
  `says none=${/no model SDK found/.test(outB)}, hands back no evidence line=${!/billing-alert-set/.test(outB)}`);

rmSync(A, { recursive: true, force: true }); rmSync(B, { recursive: true, force: true });
for (const r of results) console.log(`${r.pass ? 'GREEN' : 'RED  '} ${r.id}: ${r.detail}`);
process.exit(results.every((r) => r.pass) ? 0 : 1);
