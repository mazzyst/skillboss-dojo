#!/usr/bin/env node
// billing-alert — the finder. READ ONLY. Locations, never values.
// It reads infrastructure files for a DECLARED budget and says whether
// anybody is declared to hear it. It never opens an environment file, and it
// never reports an amount: what it hands back is a place and a date.
//
// WHAT IT CANNOT DO, said first because it decides what the recipe may claim.
// A budget set in a platform console leaves NOTHING in this repository. This
// finder cannot open a console, so "nothing found" never means "no budget" —
// it means nobody wrote one down here. And a budget is an alert, not a
// ceiling: it tells a person, it stops no spending. The thing that stops
// spending is the provider's own hard limit (see ../provider-hard-limit).
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const root = process.argv[2] ?? '.';

// A budget DECLARATION, anchored to statement position in the file type that
// can actually declare one. A name inside prose or a string literal is not a
// declaration: provider-hard-limit shipped that bug and corrected it in
// 0.1.1, and the lesson is applied here before publishing rather than after.
const DECLARATIONS = [
  {
    // Terraform / OpenTofu, HCL.
    files: /\.tf$/,
    pattern: /^\s*resource\s+"(google_billing_budget|aws_budgets_budget|azurerm_consumption_budget_[a-z_]+)"/gm,
    name: (m) => m[1],
  },
  {
    // CloudFormation / SAM, YAML.
    files: /\.(ya?ml)$/,
    pattern: /^\s*Type:\s*['"]?(AWS::Budgets::Budget)['"]?\s*$/gm,
    name: (m) => m[1],
  },
  {
    // CloudFormation / Terraform, JSON.
    files: /\.json$/,
    pattern: /"(?:Type|type)"\s*:\s*"(AWS::Budgets::Budget|google_billing_budget|aws_budgets_budget)"/g,
    name: (m) => m[1],
  },
  {
    // Pulumi, in a constructor call rather than anywhere on the line.
    files: /\.(ts|js|mjs|cjs|py)$/,
    pattern: /(?:new\s+|=\s*)((?:aws\.budgets\.Budget|gcp\.billing\.Budget|azure_native\.consumption\.Budget))\s*\(/g,
    name: (m) => m[1],
  },
];

// Somebody is declared to hear it. Heuristic, and the output says so: these
// are the keys the four supported formats use to name a recipient.
const LISTENERS =
  /(monitoring_notification_channels|subscriber_email_addresses|subscriber_sns_topic_arns|contact_emails|contact_groups|contact_roles|pubsub_topic|notification\s*\{|NotificationsWithSubscribers|Subscribers|notifications\s*[:=])/;

const SKIP = new Set([
  'node_modules', '.git', '.next', 'dist', 'build', 'coverage', 'vendor', '.venv', 'venv', '.terraform',
]);

/** The declaration's block: to the next line that closes it, or 60 lines. */
function blockAfter(text, index) {
  const rest = text.slice(index);
  const closed = rest.search(/\n[}\]]\s*$/m);
  const window = rest.split('\n').slice(0, 60).join('\n');
  return closed > 0 ? rest.slice(0, closed) : window;
}

const budgets = [];

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
    if (st.isDirectory()) {
      walk(p);
      continue;
    }
    for (const kind of DECLARATIONS) {
      if (!kind.files.test(e)) continue;
      let text;
      try {
        text = readFileSync(p, 'utf8');
      } catch {
        continue;
      }
      const rel = relative(root, p);
      kind.pattern.lastIndex = 0;
      let m;
      while ((m = kind.pattern.exec(text)) !== null) {
        const before = text.slice(0, m.index);
        const line = before.split('\n').length + (m[0].startsWith('\n') ? 1 : 0);
        const block = blockAfter(text, m.index);
        const listener = LISTENERS.exec(block);
        budgets.push({
          kind: kind.name(m),
          at: `${rel}:${line}`,
          notifiesAt: listener
            ? `${rel}:${block.slice(0, listener.index).split('\n').length + line - 1}`
            : null,
        });
      }
    }
  }
}
walk(root);

const today = new Date().toISOString().slice(0, 10);
console.log(`billing-alert — read ${today} — repository: ${root}`);

if (budgets.length === 0) {
  console.log('no budget declared in this repository\'s infrastructure files.');
  console.log(
    'that is NOT the same as no budget. A budget set in a platform console leaves nothing here to read, and this finder cannot open a console. Open yours (see references/platforms.md), set one, and record WHERE it lives and WHO it notifies.',
  );
  console.log(
    '\nand read this before you record anything: a budget alert tells a person. It stops no spending. The setting that stops spending is the provider\'s own hard limit — see ../provider-hard-limit.',
  );
  process.exit(0);
}

console.log(`budgets declared: ${budgets.length}`);
for (const b of budgets) {
  console.log(`\n- ${b.kind}`);
  console.log(`    at ${b.at}`);
  if (b.notifiesAt) {
    console.log(`    notifies: a recipient is declared at ${b.notifiesAt} — read it and name the ROLE, never a person or an address`);
    console.log(`    billing-alert-set — evidence: budget configured at ${b.at}, notifies <role>, read ${today}`);
  } else {
    console.log('    NO NOTIFICATION DECLARED in this block — a budget nobody hears is a budget that does nothing');
    console.log('    the gate box line is withheld for this budget until a recipient exists: there is no role to name');
  }
}
console.log(
  '\nnot seen by this finder: a budget set in a console, a budget declared in a format it does not read, a recipient wired up outside the declaration block, and whether any alert has ever actually reached a person. Whether the recipient is read by anyone is not a thing a file can show.',
);
console.log(
  'and what no budget ever does: it does not bound money. It tells a person while the spending continues. The ceiling that stops it is the provider\'s own hard limit — see ../provider-hard-limit.',
);
