# MANIFEST.md — SkillBoss Start Guide v2

> The gate map and the file map. The coach consults this file when it
> needs the full map — it is NOT part of the wake-up load (that is
> CONTRACT-CARD.md plus gate 00). The build tool treats the fenced list
> below as the single source of truth for what ships: a listed file that
> is missing, or a kit file that exists but is not listed, fails the
> build.

## What this kit is

The SkillBoss Start Guide turns your coding agent into a delivery coach.
One folder of markdown plus three guard hooks, one screen hook and a CI
workflow: your agent reads it,
adopts the coach posture defined in CONTRACT-CARD.md, and walks your
project through ten locked gates — from kickoff to ship — refusing to
advance without evidence and without your explicit GO.

Internally, a delivery is called **the run**: ten gates, one final boss
(SHIP), and a run belt earned at every stage. The run starts when the
human says "Hello World" (see HELLO-WORLD.md). The method has a name —
Evidence-Gated Delivery — and one page, THE-RUN.md.

## The gate map

| Gate | File | Covers | Run belt on pass |
|---|---|---|---|
| 00 | gates/00-kickoff.md | Repository, mission, milestones, intake interview, walking skeleton | YELLOW (with 05, 10) |
| 05 | gates/05-agent-workbench.md | Working with your AI agent: memory files, rules, the guard hooks, the run screen, session discipline | YELLOW (with 00, 10) |
| 10 | gates/10-architecture.md | Boring tech, boundaries, 12-factor config, explicit errors, testable seams, decision records | YELLOW (with 00, 05) |
| 20 | gates/20-security.md | Security by design: secrets, authz, input validation, least privilege | ORANGE |
| 40 | gates/40-tests.md | Tests as part of done, pragmatic pyramid, critical flows | GREEN (with 50) |
| 50 | gates/50-cicd.md | One command to green, CI on every push, artifact promotion | GREEN (with 40) |
| 60 | gates/60-docker.md | Containers: multi-stage, non-root, pinned bases, healthchecks | BLUE (with 70) |
| 70 | gates/70-deployment.md | Rollback first, rehearsed deploys, safe migrations, backups | BLUE (with 60) |
| 80 | gates/80-observability.md | Health contract, structured logs, error monitoring, alerts | BROWN |
| 90 | gates/90-ship.md | The final boss: Ship Check, evidence review, launch runbook | BLACK |

Gates are numbered by tens so future gates can slot in without
renumbering, and so a retired one leaves no hole (gate 30's design
guardrails now live inside gate 10, where the decisions they constrain
are made). A gate is `PASSED` (evidence plus a human GO), `WAIVED` (the
human or the profile overruled, on the record), or `OPEN`. There is no
"failed": the gate holds; you are not behind, you are before.

Run belts are monotonic — once earned, never lost:
WHITE (run started) -> YELLOW (00, 05, 10) -> ORANGE (20) ->
GREEN (40, 50) -> BLUE (60, 70) -> BROWN (80) -> BLACK (90 cleared).
A gate WAIVED by profile or by the human still counts toward its run
belt: the run belt tracks that the question was faced, not that every
answer was yes. A run belt is never the dojo's belt: they share colour
names and nothing else.

## Load order (for the coach)

At wake-up, TWO files and no more:

1. CONTRACT-CARD.md — the twelve rules. Overrides everything.
2. gates/00-kickoff.md — the first gate. Nothing gets built before it.

Consulted when needed, never preloaded: PROFILES.md at intake time,
MANIFEST.md for the full map, each gate file when its gate opens,
COACH-CONTRACT.md when a situation is not covered by the card,
SCREENS.md whenever you are about to post a fixed block, THE-RUN.md when
the human asks what the method is, hooks/README.md at gate 05,
EXAMPLE-RUN.md before you write your first Gate Report or whenever the
human asks what a filled record looks like.

Then copy each `state/*.template.md` to `state/<name>.md` (drop
`.template`) and fill them as the run advances. The templates stay
untouched; the copies are the run's living record. `state/` lives at the
repository root, beside `start-guide/` — never inside it: the hooks read
`state/scoreboard.md` from the root.

## Shipped files

```manifest
HELLO-WORLD.md
CONTRACT-CARD.md
COACH-CONTRACT.md
MANIFEST.md
PROFILES.md
ADAPTERS.md
README.md
SCREENS.md
THE-RUN.md
CHANGELOG.md
LICENSE
NOTICE
USER-GUIDE.en.md
USER-GUIDE.fr.md
GLOSSARY.en.md
GLOSSARY.fr.md
EXAMPLE-RUN.md
gates/00-kickoff.md
gates/05-agent-workbench.md
gates/10-architecture.md
gates/20-security.md
gates/40-tests.md
gates/50-cicd.md
gates/60-docker.md
gates/70-deployment.md
gates/80-observability.md
gates/90-ship.md
state/README.md
state/mission.template.md
state/journal.template.md
state/scoreboard.template.md
hooks/README.md
hooks/install.sh
hooks/pre-commit
hooks/pre-push
hooks/post-commit
hooks/ci-checks.yml
```

The `tools/` folder (build script) and `dist/` (build output) are not
part of the shipped kit and are excluded from the ZIP.
