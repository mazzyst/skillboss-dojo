// The recipe's fixtures. Five planted cases, each seen RED before green
// during authoring: these assertions were written and run before
// scripts/find-budget.mjs existed, and all five failed.
import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, dirname } from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const finder = join(here, '..', 'scripts', 'find-budget.mjs');
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

// A — a budget DECLARED in infrastructure, with somebody to notify, and an
//     amount sitting right beside it that must never be printed.
const A = mkdtempSync(join(tmpdir(), 'ba-a-'));
mkdirSync(join(A, 'infra'));
writeFileSync(
  join(A, 'infra', 'budget.tf'),
  'resource "google_billing_budget" "monthly" {\n'
    + '  display_name = "monthly"\n'
    + '  amount {\n'
    + '    specified_amount {\n'
    + '      currency_code = "EUR"\n'
    + '      units         = "500"\n'
    + '    }\n'
    + '  }\n'
    + '  all_updates_rule {\n'
    + '    monitoring_notification_channels = [google_monitoring_notification_channel.ops.id]\n'
    + '  }\n'
    + '}\n',
);
const outA = run(A);
record(
  'budget-declared-located',
  /infra\/budget\.tf:1/.test(outA) && /google_billing_budget/.test(outA) && /budgets declared: 1/.test(outA),
  `located=${/infra\/budget\.tf:1/.test(outA)}, named=${/google_billing_budget/.test(outA)}, count line=${/budgets declared: 1/.test(outA)}`,
);
// Locations, never values — the house rule, made mechanical. An empty output
// would pass this vacuously, so the assertion also demands the finder spoke.
record(
  'no-amount-printed',
  outA.length > 0 && !/\b500\b/.test(outA) && !/EUR|\$|€/.test(outA),
  `output present=${outA.length > 0}, amount absent=${!/\b500\b/.test(outA)}, currency absent=${!/EUR|\$|€/.test(outA)}`,
);

// B — a budget declared with NOBODY to notify. The evidence line says
//     "notifies <role>"; there is no role here, so the line must be refused.
//     A budget nobody hears is the failure this recipe exists to name.
const B = mkdtempSync(join(tmpdir(), 'ba-b-'));
mkdirSync(join(B, 'infra'));
writeFileSync(
  join(B, 'infra', 'budget.tf'),
  'resource "aws_budgets_budget" "monthly" {\n'
    + '  name         = "monthly"\n'
    + '  budget_type  = "COST"\n'
    + '  limit_amount = "500"\n'
    + '  limit_unit   = "USD"\n'
    + '}\n',
);
const outB = run(B);
record(
  'budget-without-a-listener',
  /NO NOTIFICATION DECLARED/.test(outB) && !/billing-alert-set — evidence/.test(outB),
  `names the gap=${/NO NOTIFICATION DECLARED/.test(outB)}, refuses the evidence line=${!/billing-alert-set — evidence/.test(outB)}`,
);

// C — a file that only MENTIONS a budget resource, in prose and in a string.
//     provider-hard-limit shipped this bug and fixed it in 0.1.1; the lesson
//     is applied here before publishing rather than after.
const C = mkdtempSync(join(tmpdir(), 'ba-c-'));
mkdirSync(join(C, 'docs'));
writeFileSync(
  join(C, 'docs', 'plan.md'),
  'We should add a `google_billing_budget` resource one day.\n'
    + 'See also aws_budgets_budget, which we do not use.\n',
);
writeFileSync(
  join(C, 'setup.js'),
  'const todo = "resource \\"aws_budgets_budget\\" \\"monthly\\" {";\nexport { todo };\n',
);
const outC = run(C);
record(
  'mention-is-not-a-declaration',
  /no budget declared/.test(outC) && !/budgets declared: [1-9]/.test(outC),
  `says none=${/no budget declared/.test(outC)}, declares no count=${!/budgets declared: [1-9]/.test(outC)}`,
);

// D — no infrastructure at all. The console is the only place left, and the
//     finder cannot see a console: it must hand back no evidence line.
const D = mkdtempSync(join(tmpdir(), 'ba-d-'));
writeFileSync(join(D, 'package.json'), JSON.stringify({ dependencies: { next: '16' } }));
const outD = run(D);
record(
  'no-budget-no-claim',
  /no budget declared/.test(outD) && !/billing-alert-set — evidence/.test(outD) && /console/.test(outD),
  `says none=${/no budget declared/.test(outD)}, hands back no evidence line=${!/billing-alert-set — evidence/.test(outD)}, names the console=${/console/.test(outD)}`,
);

// F — the other two formats it claims to read. The HCL branch above is the
//     only one cases A-D exercise; a branch proved by one manual run is a
//     branch that regresses in silence. Both were run by hand first, and both
//     behaved — which is exactly why they belong here instead.
const F = mkdtempSync(join(tmpdir(), 'ba-f-'));
mkdirSync(join(F, 'cf'));
mkdirSync(join(F, 'pulumi'));
writeFileSync(
  join(F, 'cf', 'stack.yaml'),
  'Resources:\n'
    + '  MonthlyBudget:\n'
    + '    Type: AWS::Budgets::Budget\n'
    + '    Properties:\n'
    + '      NotificationsWithSubscribers:\n'
    + '        - Subscribers:\n'
    + '            - Address: ops@example.test\n',
);
writeFileSync(
  join(F, 'pulumi', 'index.ts'),
  "import * as gcp from '@pulumi/gcp';\n"
    + "export const b = new gcp.billing.Budget('monthly', {\n"
    + "  amount: { specifiedAmount: { units: '500' } },\n"
    + '});\n',
);
const outF = run(F);
record(
  'every-format-is-read',
  /budgets declared: 2/.test(outF)
    && /cf\/stack\.yaml:3/.test(outF)
    && /pulumi\/index\.ts:2/.test(outF)
    && /NO NOTIFICATION DECLARED/.test(outF)
    && !/\b500\b/.test(outF),
  `count=${/budgets declared: 2/.test(outF)}, yaml located=${/cf\/stack\.yaml:3/.test(outF)}, pulumi located=${/pulumi\/index\.ts:2/.test(outF)}, pulumi listener gap named=${/NO NOTIFICATION DECLARED/.test(outF)}, amount absent=${!/\b500\b/.test(outF)}`,
);

// E — whatever it finds, it never says the bill is bounded. A budget alert
//     tells a person; it stops nothing. The one claim this recipe may never
//     make is the one a reader most wants to hear.
const outputs = [outA, outB, outC, outD, outF];
const everyOutput = outputs.join('\n');
// EVERY case must have spoken, not their join: the first draft of this
// assertion tested `[...].join('\n').length > 0`, which is 3 newlines and
// passes when the finder produced nothing at all. It was GREEN on a run where
// the other five were RED, which is how it was caught.
const allSpoke = outputs.every((o) => o.trim().length > 0);
const CAPPING_CLAIM = /\b(capped|protected|safe|guaranteed|cannot exceed|will not exceed)\b/i;
record(
  'never-claims-the-bill-is-capped',
  allSpoke && !CAPPING_CLAIM.test(everyOutput),
  `every case spoke=${allSpoke}, no capping claim=${!CAPPING_CLAIM.test(everyOutput)}`,
);

for (const d of [A, B, C, D, F]) rmSync(d, { recursive: true, force: true });
for (const r of results) console.log(`${r.pass ? 'GREEN' : 'RED  '} ${r.id}: ${r.detail}`);
process.exit(results.every((r) => r.pass) ? 0 : 1);
