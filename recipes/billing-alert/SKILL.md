---
name: skillboss-billing-alert
description: Use when the user asks whether anyone would notice an AI or cloud bill running away, mentions a budget alert, or a Pre-flight report shows cost.no-budget-alert. Finds every budget DECLARED in this repository's infrastructure files, says whether anybody is declared to hear it, and refuses to hand back evidence when nobody is. Changes no code. Free, offline, no telemetry.
---

# billing-alert — the alarm, and what it does not do

Version 0.1.0 · from the [SkillBoss Dojo](https://github.com/mazzyst/skillboss-dojo) · Apache-2.0 · see [../NOTICE](../NOTICE)

A budget alert tells a person. It stops nothing. Say that in the same breath
as you set one, because the gap between "we have an alert" and "we are
protected" is where a month of spending fits.

This recipe is the SECOND cost control, never the first. The one that stops
spending is the provider's own hard limit — [../provider-hard-limit](../provider-hard-limit/SKILL.md).
Set that one first; this one tells you while the meter is still running.

## What the agent does

1. Run the finder, read-only. It names every budget declared in this
   repository's infrastructure files, as locations. It reads no environment
   file and prints no amount.

       node scripts/find-budget.mjs <path-to-the-repository>

2. For each budget found, read what it says about a recipient. A budget with
   no recipient declared gets NO evidence line: the gate box's sentence names
   a role, and there is no role to name.
3. If nothing was found, say so plainly and stop. Nothing found is NOT the
   same as no budget — a budget set in a console leaves nothing here to read,
   and the agent cannot open a console.

## What the human does

4. Open the platform where this project's spend is billed (see
   [references/platforms.md](references/platforms.md)) and set a budget whose
   threshold notifies a PERSON, not a channel nobody reads.
5. Record WHERE it is configured and WHICH ROLE receives it. Never the amount,
   never a name, never an address.
6. If the platform offers a spend CAP as well as an alert, record which one is
   set and what the cap excludes. Caps usually exclude something.

## What this finder does not see, and says so

- A budget set in a console. Nothing in the repository shows it, and no
  amount of reading files will change that.
- A budget declared in a format it does not read. It reads Terraform HCL,
  CloudFormation YAML and JSON, and Pulumi constructor calls.
- A recipient wired up outside the declaration block — a notification channel
  defined elsewhere and attached by a variable is not followed.
- Whether an alert has ever actually reached a person. That is the thing that
  matters most, and it is not a thing a file can show.

The recipient check is a HEURISTIC: it looks for the keys the four supported
formats use to name one. It can miss a real recipient, and it errs towards
refusing evidence rather than towards granting it, which is the safe
direction for a claim.

## What never happens here

- No file is written by this recipe.
- No value is printed: a location, never an amount, never a currency, never
  an address.
- No claim that spending is now bounded, capped, safe or protected. What is
  recorded is that a budget exists at a location on a date, and who is
  declared to hear it.

## The line to hand back

    billing-alert-set — evidence: budget configured at <location>, notifies <role>, read <date>

It fits gate 70's box and the Pre-flight rule `cost.no-budget-alert`. It is
withheld for any budget with no declared recipient, and withheld entirely
when nothing was found.

## What this recipe is not

Not a spending cap, not a guarantee, not a statement about your application.
An alert that fires into an unread inbox is indistinguishable from no alert
at all, and nothing here can tell the difference. A recipe makes a check
green; it does not make an application correct. If you are stuck, ask your
coach: say Hello World.
