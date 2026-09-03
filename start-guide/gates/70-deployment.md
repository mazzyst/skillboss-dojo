# Gate 70 — DEPLOYMENT

> **Gate rule: no box checked without evidence, no advance without the
> human's explicit GO. CONTRACT-CARD.md overrides everything below.**

Stakes: the first deploy is the moment a project meets reality, and the
projects that survive it are the ones that rehearsed the way back before
they went forward. Boring deploys are the goal; excitement here is a
symptom.

## Guardrails

- **The rollback plan is written before the first deploy.** One command
  or one click back to the previous version, tested, written in the
  runbook. A deploy you cannot undo is a bet you cannot size.
- **Rehearse on a staging-shaped target first.** The same artifact, the
  same deploy script, a production-shaped environment — before production
  ever sees it.
- **Migrations follow expand-migrate-contract.** New columns and code
  that writes both come first; the destructive contraction ships only in
  a later deploy, after the old code is gone. Never a destructive
  migration in the same deploy as the code that stops needing the data.
- **Deploys are scripted and boring.** One script, run the same way every
  time, by anyone. No SSH-and-edit, no "just this once by hand" — a
  manual fix in production is an incident entry, not a workflow.
- **Backups exist AND one restore has been rehearsed.** An untested
  backup is a hope. The restore rehearsal — on a scratch target, from a
  real backup — is the box that counts. Train the reflex:
  https://skillboss.dev/demo/backups
- **A billing alert exists before going live.** Cost is an outage class:
  a runaway bill kills a small project as surely as downtime. Train it:
  https://skillboss.dev/demo/cost-guardrails

Profile note: with no deploy target chosen yet, this gate runs
active-lite — the rollback plan and backup decisions are still made (they
are decisions, not infrastructure); the rehearsal boxes are recorded
n/a-with-reason and the gate reopens when a target is chosen.

## Villains at this gate

The house names the failures these boxes hold back — ten in all, one per
Ship Check system, each with a drill that is free and needs no signup.
Faced here one at a time; faced together at Gate 90.

- **THE LOST WEEKEND** — a backup nobody ever restored. Drill: https://skillboss.dev/demo/backups
- **THE BILL SHOCK** — a runaway bill with no alert. Drill: https://skillboss.dev/demo/cost-guardrails

## Coach Play

Ask:

1. If the deploy that just went out is bad, what exactly happens in the
   next five minutes — command by command?
2. When was the last restore actually performed, and onto what?
3. What is the monthly cost ceiling, and who is told when it is near?

Then: write the rollback into the runbook, script the deploy, rehearse
both on the staging-shaped target, set the migration convention in the
memory file, run one restore, and set the billing alert.

Refuse: a first production deploy with no tested way back; a destructive
migration bundled with its code change; "the platform probably backs it
up" as a backup story.

Definition of done: deploy and rollback both rehearsed with the same
artifact; restore proven once; the alert set.

## Evidence Checklist

- [ ] rollback-written-first — evidence: the runbook section with the
      rollback command, dated before the first deploy's journal entry
- [ ] rehearsed-on-staging — evidence: the rehearsal's journal entry —
      target, artifact, result; n/a-with-reason per the profile
- [ ] migrations-expand-contract — evidence: the memory-file convention
      line, and the latest migration pair if one exists
- [ ] deploys-scripted — evidence: the deploy script's path; the journal
      shows no manual-step deploys
- [ ] restore-rehearsed — evidence: the restore rehearsal's journal entry
      — backup used, target, outcome; n/a-with-reason per the profile
- [ ] billing-alert-set — evidence: where the alert is configured and its
      threshold (location, never account values)
