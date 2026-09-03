# state/scoreboard.md — the run at a glance

> Regenerated whole by the coach after every change, from the journal.
> Never hand-patched: on any disagreement, the journal wins and the
> scoreboard is rebuilt.

## Run

- Project: <name>
- Run started: <date> (the Hello World)
- Profile: <FULL RUN | SMALL RUN> (PROFILES.md)
- **Current run belt: WHITE**

## Now

The three lines of the last YOU ARE HERE, rewritten by the coach every
time it posts one — the run screen prints them at the top.

- next: <the next concrete action, in the human's words>
- now: <gate id> — <n> of <n> boxes still open
- after: <what opens when this gate gets its GO>

## Milestones

What the project must DO, in the human's words — derived from
`mission.md` at Gate 00 and confirmed by them. Three to five, ordered,
the first one always the walking skeleton. States: `DONE` or `OPEN`.

**Milestones inform; they never block.** Gates lock the run, milestones
tell you where the product stands. A milestone is never a reason to skip
a gate, and a gate is never a reason to deny a milestone that is really done.

| # | Milestone | State | Since |
|---|---|---|---|
| M1 | <the walking skeleton runs end to end> | OPEN | — |
| M2 | <the first thing a user actually came for> | OPEN | — |
| M3 | <someone other than you can use it> | OPEN | — |

## Gates

| Gate | State | Since | Evidence |
|---|---|---|---|
| 00-kickoff | OPEN | — | — |
| 05-agent-workbench | OPEN | — | — |
| 10-architecture | OPEN | — | — |
| 20-security | OPEN | — | — |
| 40-tests | OPEN | — | — |
| 50-cicd | OPEN | — | — |
| 60-docker | OPEN | — | — |
| 70-deployment | OPEN | — | — |
| 80-observability | OPEN | — | — |
| 90-ship | OPEN | — | — |

States: `PASSED` (journal Gate Report + human GO, Since = GO date,
Evidence = the report's journal date) · `WAIVED` (human or profile,
Evidence = the waiver's journal line) · `OPEN`. No other state exists.

## Caught

WHAT THIS CAUGHT, one row per closed gate, quoted from the evidence. The
RUN CLEARED block reads its `what held` lines from here.

| Day | What | Where |
|---|---|---|
| <n> | <what was caught, or: nothing broke through> | <where it was stopped> |

## Parked

Asks outside the open gate, recorded with the gate where they come back.

| Since | Ask | Revisit |
|---|---|---|
| <date> | <the ask, in the human's words> | <gate NN> |

## Cost

What the run costs, in two natures that are never mixed.

**Measured** is computed by the `post-commit` hook from git itself — days,
commits, commits per gate. Nothing is sent anywhere to obtain it.

**Declared** is written here by the coach from what its own tool reports,
one row per gate. **These are declared numbers, not measured ones**: this
kit has no telemetry and cannot see your agent's usage or your bill. When
the coach does not know, it writes `unknown` — it never estimates.

Rows use the gate's NAME (not its number) in the first column, so this
table can never be mistaken for the gate table above.

| Step | Sessions | Tokens (declared) | Note |
|---|---|---|---|
| <kickoff> | <n> | <unknown> | <what drove the cost> |

## Ladder of run belts

WHITE (run started) -> YELLOW (00, 05, 10) -> ORANGE (20) ->
GREEN (40, 50) -> BLUE (60, 70) -> BROWN (80) -> BLACK (90 cleared).
Run belts are monotonic: once earned, never lost. A WAIVED gate counts
toward its run belt — the run belt tracks that the question was faced.
A run belt is the run's rank, never the dojo's: same colour names,
nothing else in common.

## The run screen

`state/run-screen.md` is a rendering of this file, rewritten by the
`post-commit` hook (Gate 05). Open it as a tab beside your code: your
editor reloads it on every commit and its markdown preview renders it,
with no configuration. `state/run-screen.html` carries the same data for
a browser tab, if you prefer one. Both are local, offline, and make no
network request.

It shows both axes at once on purpose. The line worth watching is the
one that appears when the product moves ahead of its safety: two or more
milestones done while 20-SECURITY is still open. That crossing is the failure this
run exists to prevent.

Both screens are generated, never edited, and never committed — the
installer adds them to `.gitignore`. This file is the record; the screens
are just the view.
