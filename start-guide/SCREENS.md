# SCREENS.md — every fixed block, defined once

> The single source of every block the coach posts and every fixed string
> the run screen prints. The guides QUOTE these blocks; the hook RENDERS
> them; the build refuses a kit where a copy drifts from this file. Not
> part of the wake-up load: consult it when you are about to post a block,
> and never improvise one that is defined here.

Placeholders are in angle brackets. Everything outside them is locked.

## COACH READY — the kit is installed, the words have not been said

```
COACH READY — SkillBoss Start Guide v2
KIT .............. installed (start-guide/, checksum verified)
CONTRACT ......... loaded (CONTRACT-CARD.md, 12 rules)
GATE MAP ......... 10 gates, 00-KICKOFF -> 90-SHIP
STATE ............ nothing created yet — nothing has been built
AWAITING ......... the magic word

INSERT COIN — say the two words every program says first.
```

## COACH ONLINE — the human said "Hello World", no state/ exists

```
COACH ONLINE — SkillBoss Start Guide v2
CONTRACT ......... loaded (CONTRACT-CARD.md, 12 rules)
GATE MAP ......... 10 gates, 00-KICKOFF -> 90-SHIP
STATE ............ creating state/ from templates
RUN BELT ......... WHITE
NEXT ............. Gate 00 intake — I ask, you answer, nothing gets built yet.
```

## COACH RESUMED — state/ already holds filled files

```
COACH RESUMED — SkillBoss Start Guide v2
QUIET ............ <n> days since the last commit — the record kept your place
LAST ENTRY ....... <date> — <title of the last journal entry>
```

Then the YOU ARE HERE block, then back to work. The gap is stated, never
judged: this kit has no streaks.

## YOU ARE HERE — a gate opens, a gate closes, a session resumes, WHERE AM I

```
YOU ARE HERE — <project> · day <n> · <run belt colour>
run     <bar>  <faced>/<total> gates · <done>/<total> milestones
map     00[x] 05[x] 10[x] 20[>] 40[ ] 50[ ] 60[~] 70[ ] 80[ ] 90[ ]
now     <gate id> — <n> of <n> boxes still open
next    <the next concrete action, in the human's words>
after   <what opens when this gate gets its GO>
left    <n> gates. You can stop any time; the record holds your place.
```

Legend: `[x]` passed, `[~]` waived, `[>]` the gate you are on, `[ ]` still
ahead. The `run` count is gates FACED — passed or waived — so it always
equals the `[x]` and `[~]` marks on the map. The three lines `next`,
`now` and `after` are also written to `state/scoreboard.md` under
`## Now`, so the run screen carries the same three lines.

## GATE REPORT — appended to state/journal.md when a gate is reviewed

```
GATE REPORT — <gate id>              date: YYYY-MM-DD
boxes: [x] <box-id>   evidence: <path, command output, or URL — location, never value>
       [ ] <box-id>   status: OPEN — <what is missing>
waivers: <none, or SKIP lines quoted verbatim>
risks accepted by human: <none, or the list>
cost: <n sessions, ~n tokens — DECLARED by the coach, not measured; or unknown>
verdict: <GO-READY | HOLD (<n> box open)>
```

## RUN BELT EARNED — a GO changes the run belt

```
RUN BELT EARNED — <colour>
what it took   <the gates that earned it>
what it means  <one or two lines, in plain words>
next           <the next colour> at <the gate that earns it>
```

## WHAT THIS CAUGHT — a gate closes

One line, quoted from the evidence, written both in the chat and in the
scoreboard's `## Caught` table:

```
day <n>  <what was caught> — <where it was stopped>
```

When a gate caught nothing: `day <n>  nothing broke through — the floor
was already in place`.

## THE RETURN — a session resumes after a gap

```
<n> days quiet. The record kept your place.
```

## SHIPPING AHEAD OF SAFETY — the run screen's one alarm

```
SHIPPING AHEAD OF SAFETY
The product is moving (<n> milestones done) while 20-SECURITY is still <state>.
That gap is the one this run exists to close.
```

Threshold, stated once: two or more milestones DONE while 20-SECURITY is
neither PASSED nor WAIVED. One milestone done is a walking skeleton, not
a product moving ahead of its safety.

## SMALL RUN — announced at the intake when the weekend answer selects it

```
SMALL RUN — <project>
in full     00-KICKOFF · 05-AGENT-WORKBENCH · 20-SECURITY · 90-SHIP
lite        70-DEPLOYMENT — rollback plan and a backup decision; rehearsals deferred
one box     10-ARCHITECTURE · 40-TESTS · 50-CICD · 80-OBSERVABILITY
60-DOCKER   per the containers axis, as usual
say         "full run" at any time — every box reopens. Smaller, not looser.
```

## PARKED — an ask outside the open gate

Answered in one line, recorded in the journal, never refused twice:

```
YYYY-MM-DD — PARKED: <the ask, in the human's words> (revisit at gate NN)
```

## RUN CLEARED — Gate 90, before the closing words

```
RUN CLEARED — <project>
██████████  <n>/<n> gates faced · <n>/<n> milestones · BLACK

the record     <n> days · <n> commits · <n> gate(s) waived, on the record
what held      <one line per row of the scoreboard's Caught table: a key
               found before it was pushed, a red suite stopped at the door,
               a restore rehearsed before it was needed>
what you can   say "checked and evidenced, per the Start Guide's
say            heuristics" — and mean it, because the journal is there
what you       say your app is secure. This kit never said it. Neither
cannot say     do you.

The cabinet goes quiet. Say Hello World to the next one.
```

## The closing words — verbatim, after RUN CLEARED

> The run is complete: every gate faced, every answer on the record. What
> this earns is the black belt for the RUN — a builder's record, not an
> app's certificate. The Start Guide is a coach, not a certification: its
> guardrails are heuristic defaults applied by your own agent. It hardens
> the builder; it never certifies the app. Ship it — and say Hello World
> to the next one.

## The README banner — offered at Gate 90, taken only on GO

```
<!-- start-guide:run -->
Built with the SkillBoss Start Guide · <n>/<n> gates faced · <n> waived, on the record · run belt <colour> · https://skillboss.dev/start
<!-- /start-guide:run -->
```

Regenerated between the markers. It says what the builder did; it never
says the app is secure, verified, or certified.

## The honesty line — verbatim, wherever the kit speaks for itself

```
The Start Guide is a coach, not a certification: its guardrails are
heuristic defaults applied by your own agent. It hardens the builder;
it never certifies the app.
```

## Data the screens are computed from

The ladder, one line — MANIFEST.md and the scoreboard template carry it
byte for byte:

```ladder
WHITE (run started) -> YELLOW (00, 05, 10) -> ORANGE (20) -> GREEN (40, 50) -> BLUE (60, 70) -> BROWN (80) -> BLACK (90 cleared)
```

The cast — gate, Ship Check system, villain, drill. Each gate names the
villains it faces; the run screen marks a villain faced when its gate is
PASSED or WAIVED; Gate 90 faces all ten together:

```cast
20 | secrets | THE LEAK | https://skillboss.dev/demo/secrets
20 | env-hygiene | THE COMMITTED KEY | https://skillboss.dev/demo/env-hygiene
20 | auth-routes | THE OPEN MIC | https://skillboss.dev/demo/auth-routes
20 | db-exposure | THE OPEN DOOR | https://skillboss.dev/demo/db-exposure
50 | dependencies | THE ROTTEN PLANK | https://skillboss.dev/demo/dependencies
70 | backups | THE LOST WEEKEND | https://skillboss.dev/demo/backups
70 | cost-guardrails | THE BILL SHOCK | https://skillboss.dev/demo/cost-guardrails
80 | health | THE SILENT CRASH | https://skillboss.dev/demo/health
80 | error-monitoring | THE 3AM PAGE | https://skillboss.dev/demo/error-monitoring
80 | rate-limiting | THE FLOOD | https://skillboss.dev/demo/rate-limiting
```

The fixed strings the run screen prints — the build refuses a hook that
does not carry every one of them:

```hook-strings
RUN CLEARED
run belt
NEXT
VILLAINS
CAUGHT
WAIVED
PARKED
[x] passed
[~] waived
[>] open now
[ ] ahead
SHIPPING AHEAD OF SAFETY
That gap is the one this run exists to close.
The cabinet goes quiet - say Hello World to the next one.
The cabinet goes quiet. Say Hello World to the next one.
The first gate is the hardest to open. Nothing is built until it is.
days quiet. The record kept your place.
declared by the coach, NOT measured by this kit
Every state above is declared by you and your coach
The Start Guide is a coach, not a certification
```
