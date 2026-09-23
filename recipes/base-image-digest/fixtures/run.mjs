// The recipe's fixtures. Seven planted cases, each seen RED before green
// during authoring: these assertions were written and run before
// scripts/find-bases.mjs existed, and all seven failed.
import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, dirname } from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const finder = join(here, '..', 'scripts', 'find-bases.mjs');
// A missing or crashing finder is a RED result, not a crash of the fixture:
// every assertion below must be able to fail visibly.
const run = (dir) => {
  try {
    return execFileSync('node', [finder, dir], { encoding: 'utf8', stdio: 'pipe' });
  } catch {
    return '';
  }
};
const results = [];
const record = (id, pass, detail) => results.push({ id, pass, detail });

const DIGEST = 'sha256:9b2b7a5f0c3d4e6f8a1b2c3d4e5f60718293a4b5c6d7e8f90a1b2c3d4e5f6071';
const EVIDENCE = /bases-pinned — evidence/;

// A — a floating tag, and a second stage that is NOT a base image.
//     `FROM builder` names the stage declared above it. A finder that reads
//     every FROM as a base reports a phantom image that no registry holds —
//     the multi-stage trap, and the one this recipe is most likely to fail.
const A = mkdtempSync(join(tmpdir(), 'bid-a-'));
writeFileSync(
  join(A, 'Dockerfile'),
  'FROM node:20-alpine AS builder\n'
    + 'RUN npm ci\n'
    + '\n'
    + 'FROM builder AS test\n'
    + 'RUN npm test\n',
);
const outA = run(A);
record(
  'floating-tag-located',
  /Dockerfile:1/.test(outA) && /FLOATING/.test(outA) && /node:20-alpine/.test(outA),
  `located=${/Dockerfile:1/.test(outA)}, marked FLOATING=${/FLOATING/.test(outA)}, named=${/node:20-alpine/.test(outA)}`,
);
record(
  'stage-name-is-not-a-base',
  outA.length > 0 && !/Dockerfile:4/.test(outA) && /base images found: 1/.test(outA),
  `output present=${outA.length > 0}, stage line absent=${!/Dockerfile:4/.test(outA)}, counts one=${/base images found: 1/.test(outA)}`,
);
record(
  'evidence-withheld-while-anything-floats',
  outA.length > 0 && !EVIDENCE.test(outA),
  `output present=${outA.length > 0}, evidence line withheld=${!EVIDENCE.test(outA)}`,
);

// B — pinned by digest. A digest is the only immutable reference: a tag is a
//     pointer its publisher can move. This must NOT read as a finding, and
//     with nothing else floating the evidence line is finally offered.
const B = mkdtempSync(join(tmpdir(), 'bid-b-'));
writeFileSync(join(B, 'Dockerfile'), `FROM node@${DIGEST} AS runner\nUSER node\n`);
const outB = run(B);
record(
  'digest-pin-is-not-a-finding',
  /PINNED BY DIGEST/.test(outB) && !/FLOATING/.test(outB) && EVIDENCE.test(outB),
  `pinned=${/PINNED BY DIGEST/.test(outB)}, nothing floating=${!/FLOATING/.test(outB)}, evidence offered=${EVIDENCE.test(outB)}`,
);

// C — the finder cannot reach a registry, so it may never produce a digest
//     that was not already in the file. It hands back the act, not a value.
const C = mkdtempSync(join(tmpdir(), 'bid-c-'));
writeFileSync(join(C, 'Dockerfile'), 'FROM python:3.12-slim\n');
const outC = run(C);
const digestsInC = outC.match(/sha256:[0-9a-f]{8,}/g) ?? [];
record(
  'never-invents-a-digest',
  outC.length > 0 && digestsInC.length === 0,
  `output present=${outC.length > 0}, digests printed=${digestsInC.length} (must be 0)`,
);

// D — a base built from a build argument. The finder cannot know what the
//     builder passes, so it says UNRESOLVED rather than guessing, and the
//     evidence line stays withheld. An unknown is not a pass.
const D = mkdtempSync(join(tmpdir(), 'bid-d-'));
writeFileSync(join(D, 'Dockerfile'), 'ARG BASE=node:20\nFROM ${BASE} AS app\n');
const outD = run(D);
record(
  'arg-base-is-unresolvable-not-pinned',
  /UNRESOLVED/.test(outD) && !EVIDENCE.test(outD),
  `marked UNRESOLVED=${/UNRESOLVED/.test(outD)}, evidence withheld=${!EVIDENCE.test(outD)}`,
);

// E — no Dockerfile at all. Nothing found is not nothing wrong: an image can
//     be built by a platform with no Dockerfile in the repository, and the
//     finder cannot see that. It says so and claims nothing.
const E = mkdtempSync(join(tmpdir(), 'bid-e-'));
writeFileSync(join(E, 'package.json'), JSON.stringify({ name: 'x' }));
const outE = run(E);
record(
  'no-dockerfile-no-claim',
  /no Dockerfile/.test(outE) && !EVIDENCE.test(outE),
  `says none=${/no Dockerfile/.test(outE)}, hands back no evidence line=${!EVIDENCE.test(outE)}`,
);

for (const d of [A, B, C, D, E]) rmSync(d, { recursive: true, force: true });
for (const r of results) console.log(`${r.pass ? 'GREEN' : 'RED  '} ${r.id}: ${r.detail}`);
process.exit(results.every((r) => r.pass) ? 0 : 1);
