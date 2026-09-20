---
name: skillboss-provider-hard-limit
description: Use when the user asks how to stop an AI bill from running away, mentions THE BILL SHOCK, or a Pre-flight report shows cost.no-budget-alert or cost.ai-calls-unbounded. Finds every model provider this repository calls and walks the human to the provider's own hard limit, the one setting that stops spending rather than slowing it. Changes no code. Hands back the evidence line for gate 70. Free, offline, no telemetry.
---

# provider-hard-limit — the setting that stops spending

Version 0.1 · from the [SkillBoss Dojo](https://github.com/mazzyst/skillboss-dojo) · Apache-2.0 · see [../NOTICE](../NOTICE)

A ceiling in your application bounds requests and tokens. It does not bound
money. The provider's own hard limit is the thing that does, and it belongs
behind every other cost control you will ever add. That is why this is the
first recipe, and why it changes no code: the change happens in a console
only a person can open.

## What the agent does

1. Run the finder, read-only. It names every model provider this repository
   calls and where, as locations. It reads no environment file and prints
   no value.

       node scripts/find-providers.mjs <path-to-the-repository>

2. For each provider found, open [references/providers.md](references/providers.md)
   and read the row. A row marked NOT READ means nobody has read that
   provider's page for this recipe yet: say so, and do not guess what the
   console offers.
3. Hand the human the console path from the row, and stop. The agent never
   holds billing credentials and never sets the limit itself.

## What the human does

4. Set an ENFORCED limit at the level the provider offers. An alert is not a
   limit: an alert tells someone, a limit refuses the next request.
5. Record WHERE it is configured. Never the amount.
6. If the provider offers no enforced limit, write that down in your
   exposure sheet. An absence recorded is honest; an absence unsaid is not.

## What never happens here

- No file is written by this recipe.
- No value is printed: a location, never an amount, never an env content.
- No claim that spending is now bounded. What is recorded is that a limit
  exists at a location on a date; what it excludes is the provider's own
  business and is noted in the row.

## The line to hand back

    billing-alert-set — evidence: provider hard limit configured at <location>, read <date>

It fits gate 70's box and the Pre-flight rule `cost.no-budget-alert`.

## What this recipe is not

Not a spending cap of ours, not a guarantee, not a statement about your
application. A recipe makes a check green; it does not make an application
correct. If you are stuck, ask your coach: say Hello World.
