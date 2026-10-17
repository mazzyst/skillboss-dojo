# Packs

Apache-2.0 · from the SkillBoss Dojo · see [../LICENSE](../LICENSE) and [../NOTICE](../NOTICE)

One file per stack. Each holds bosses to play and one line per trap on
where to look in that stack. A **trap** is a kind of mistake that hurts
apps, one of ten ([../boss/references/villains.md](../boss/references/villains.md)).

## What a pack promises

A rhythm, not a result. Each pack says in its header when it was last
issued and when the next issue is due. A missed month is written as
missed in the pack's log, never back-dated.

## Where the bosses come from

For now, from the maker of SkillBoss only, written with the boss skill,
the way anyone would write one: the agent drafts, the person judges and
says "forge it". A boss forged by someone else enters a pack only once
its author has been asked, and has said yes.

## A trace, when the trap has a timeline

A **trace** is up to four lines a boss can carry: the assumption the agent
made without saying it, then the smallest case that broke it. Five traps
usually have a timeline. Each shape below is two lines to rewrite with the
real paths and names of the project, never copied as is, never a value.

- `secrets` — THE LEAK: `T+00ms the code assumes the variable stays on the server` then `T+05ms the build inlines it into a file the browser loads`.
- `health` — THE SILENT CRASH: `T+00ms the health route returns OK without asking the database` then `T+40ms the database is gone, and the route still returns OK`.
- `error-monitoring` — THE 3AM PAGE: `T+00ms the catch block assumes a logged error is a seen error` then `T+20ms one request fails, the log line is written, and no alert fires`.
- `rate-limiting` — THE FLOOD: `T+00ms the route assumes each caller sends a few requests a minute` then `T+08ms one script sends requests in a loop, and every one reaches the handler`.
- `cost-guardrails` — THE BILL SHOCK: `T+00ms the job assumes one model call per request` then `T+30ms a retry loop calls the model again on every timeout`.

The agent states the assumption; the person judges if it is true.

## What a pack never does

It never says an app is safe, correct or finished. A rule line says where
to look. What you find there, and what it is worth, is your judgement.
