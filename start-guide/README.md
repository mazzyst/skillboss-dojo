# SkillBoss Start Guide

One folder of markdown that turns your coding agent into a delivery
coach. Unzip it into your repository, say "Hello World" to your agent,
and your project gets walked through ten locked gates — kickoff, working
with AI agents, architecture and design, security by design, tests,
CI/CD, Docker, deployment, observability, and the final boss: SHIP.

> The Start Guide is a coach, not a certification: its guardrails are
> heuristic defaults applied by your own agent. It hardens the builder;
> it never certifies the app.

It works offline, forever: no network call, no telemetry, no account.

## How it works

- **Your agent does the work; these files carry the judgment.** There is
  no runtime, no service, no scanner here. The kit is instructions your
  own agent reads and adopts: twelve rules (CONTRACT-CARD.md), a gate map
  (MANIFEST.md), ten gate files, the screens (SCREENS.md), and the state
  files that make the run survive sessions. The method has a name —
  Evidence-Gated Delivery — and one page: THE-RUN.md.
- **Three rules do not rely on judgment at all.** No secret committed, no
  environment file in git, no red suite pushed: those ship as working git
  hooks (`hooks/`), installed at Gate 05 with one command. Prose can be
  forgotten; a hook cannot.
- **You can SEE the run.** A fourth hook renders `state/run-screen.md`
  after every commit: milestones and gates on one picture, in an editor
  tab beside your code that reloads itself (`state/run-screen.html` is
  the same data for a browser, if you prefer one). Local files — offline,
  no server, no account, no network request — with one line that appears
  only when the product moves ahead of its safety.
- **Gates lock until evidenced.** The coach refuses to advance a gate
  without evidence (a file path, a command output) and without your
  explicit GO. You can always overrule it — on the record, through a
  waiver. The agent plans; the human arbitrates.
- **The run adapts to your project.** The Gate 00 intake computes a
  profile (PROFILES.md): a stack with no containers waives the Docker
  gate up front, on the record; a weekend project runs the SMALL RUN
  shape — the five-gate path — instead of all ten gates. Obligations are only ever removed,
  never silently added.
- **Run belts mark the road.** WHITE at wake-up, BLACK when Gate 90
  clears — monotonic, earned by facing the questions, kept even when you
  waive one. A run belt names its track: it is the run's rank, never the
  dojo's.

Start here: USER-GUIDE.en.md (English) or USER-GUIDE.fr.md (French).
Give your agent: HELLO-WORLD.md. Every word, junior-proof:
GLOSSARY.en.md / GLOSSARY.fr.md. What a filled record actually looks
like, on an invented project: EXAMPLE-RUN.md.

## Where this fits in the SkillBoss family

Three artifacts, one continuous story, in delivery order:

1. **Start Guide** (this kit) — the coach across the whole journey, from
   the first "Hello World" to the launch retro.
2. **Ship-Ready Starter** (https://skillboss.dev/launch) — the launch
   floor: ten systems that decide whether a launch survives its first
   week. Gate 90 of this run hands you there on purpose.
3. **Ship Check drills** (https://skillboss.dev/demo/secrets and its nine
   siblings) — the training rooms the gates deep-link to, one reflex at a
   time, no signup.

## Honesty lines

- Free, forever. The Start Guide is core safety content; there is no paid
  tier of it and no feature held back.
- Heuristic, and says so. The guardrails are strong defaults, not an
  audit; nothing in this kit inspects or certifies your application.
- The builder, never the app. Run belts and the run's record speak about the
  person and the process. No claim like "built ship-ready" or "secured by
  SkillBoss" about an app may ever be derived from this kit.
- No vendors. Where the gates cite external material, it is open
  standards only (OWASP, 12factor.net, agents.md, Spec Kit as method
  inspiration) — never a commercial tool recommendation.

## The kit

Every shipped file is listed in MANIFEST.md, which is also the map the
coach loads at wake-up. ADAPTERS.md wires the kit into Claude Code,
Cursor, Copilot, or a plain chat agent. The kit is licensed Apache-2.0
(LICENSE): use it, adapt it, redistribute it, commercially included. The
NOTICE file carries the honesty lines above and the one reservation that
matters — the SkillBoss name is not licensed and never badges an app —
and Apache-2.0 requires it to travel with every copy.

SkillBoss backs builders, never apps. When the run is over, run the Ship
Check the week you ship — the room is at https://skillboss.dev/launch,
and the arcade is at https://skillboss.dev.
