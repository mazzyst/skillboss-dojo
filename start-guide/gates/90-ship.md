# Gate 90 — SHIP (the final boss)

> **Gate rule: no box checked without evidence, no advance without the
> human's explicit GO. CONTRACT-CARD.md overrides everything below.**

Stakes: everything before this gate was preparation; this is the fight
the run was named for. The final boss is not the deploy — it is proving,
with the record in hand, that nothing was skipped on the way here.

## Guardrails

- **Run the Ship Check.** The ten ship-ready systems at
  https://skillboss.dev/launch are the final verification: hand
  SHIP-READY.md to your agent and check the floor, system by system. The
  ten villains faced one at a time across the gates — THE LEAK, THE
  COMMITTED KEY, THE OPEN MIC, THE OPEN DOOR, THE ROTTEN PLANK, THE LOST
  WEEKEND, THE BILL SHOCK, THE SILENT CRASH, THE 3AM PAGE, THE FLOOD —
  are faced together here. The Start Guide's last gate is deliberately
  the sibling product's first — start coached, ship checked.
- **Full evidence review.** Walk `state/journal.md` end to end: every
  gate is PASSED or WAIVED with its reason — there is no third state, and
  no box quietly forgotten. The scoreboard is regenerated from the
  journal one last time and they must agree.
- **A launch-day runbook.** Who deploys, who watches, what the first
  hour's checks are, and the rollback command at the top — rehearsed at
  Gate 70, restated here.
- **The first-week watch.** A daily ritual, written down: errors and
  uptime checked every day for seven days, and a simple error budget —
  the threshold at which the team stops feature work and stabilizes.
- **The public banner is offered, never taken.** At ship time the coach
  OFFERS one line at the top of the project's README — the run's shape
  (gates faced, waivers, run belt, a link to the Start Guide) between marker
  comments so it can be regenerated. It ships only on an explicit GO:
  this is the human's repository speaking to the outside. It says what
  the builder did; it never says the app is secure, verified, or
  certified. Declining costs nothing and is never asked twice.
- **The retro is part of the run.** One journal entry after launch week:
  what the gates caught, what they missed, which waiver you regret, and
  what the next run's intake should ask.

The banner, exactly (SCREENS.md) — regenerated between its markers:

```
<!-- start-guide:run -->
Built with the SkillBoss Start Guide · <n>/<n> gates faced · <n> waived, on the record · run belt <colour> · https://skillboss.dev/start
<!-- /start-guide:run -->
```

The evidence review is read-only and graded before anything is
celebrated:

| Severity | Finding |
|---|---|
| CRITICAL | an OPEN box on a gate the profile never waives — 00, 05, 20, 90 |
| HIGH | an OPEN box on any other gate |
| MEDIUM | a WAIVED gate or box whose revisit condition has come true |
| LOW | a cost line still `unknown` |

A CRITICAL or HIGH finding holds the gate; a MEDIUM one reopens the
waiver's question, once; a LOW one is printed and passed. The review is
converged when regenerating the scoreboard from the journal changes
nothing — that is the stop, not a feeling of done.

## Coach Play

Ask:

1. Which waivers are still open on the scoreboard — and does the human
   still stand behind each one, today?
2. Who is watching in the first hour after launch, and what exactly do
   they look at?
3. What number — errors, complaints, cost — would make you stop and
   stabilize?

Then: run the Ship Check with the human, complete the evidence review,
finalize the runbook, schedule the first-week watch, and after launch
week, write the retro.

Refuse: shipping with a gate in OPEN state; a "provisional" pass pending
evidence; any closing statement that certifies the app.

Definition of done: Ship Check run, record clean and converged, runbook
ready, watch scheduled — and the closing words said exactly as written
below.

## Evidence Checklist

- [ ] ship-check-run — evidence: the journal entry with the date the ten
      systems were checked and their outcomes
- [ ] evidence-review-clean — evidence: the scoreboard regenerated from
      the journal — every gate PASSED or WAIVED with reason, zero OPEN
- [ ] runbook-ready — evidence: the runbook's path, rollback command at
      the top
- [ ] first-week-watch — evidence: the daily ritual and error budget,
      written in the runbook or journal
- [ ] retro-written — evidence: the retro's journal entry date (after
      launch week; scheduled at GO time)

## RUN CLEARED — the celebration, posted before the closing words

The run opened with a coin. It closes with the score screen. Post this
block filled from the record — every number in it is one you can point
at, which is what makes it worth reading:

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

Rules for it, because a celebration is where honesty usually slips:

- **Every figure comes from the record.** Days and commits from git,
  gates and waivers from the scoreboard, `what held` quoted from the
  scoreboard's Caught table. If the run caught nothing worth naming, write "nothing broke
  through — the floor held from the start" rather than inventing a
  trophy.
- **A waived gate is printed, not hidden.** A run with three waivers is
  still a completed run, and the record that says so is worth more than a
  clean-looking one that lies.
- **It celebrates the RUN, never the app.** The two closing lines above
  are not decoration: they are the same honesty line the kit carries
  everywhere, at the one moment a builder most wants to hear otherwise.

## The coach's closing words (verbatim)

> The run is complete: every gate faced, every answer on the record. What
> this earns is the black belt for the RUN — a builder's record, not an
> app's certificate. The Start Guide is a coach, not a certification: its
> guardrails are heuristic defaults applied by your own agent. It hardens
> the builder; it never certifies the app. Ship it — and say Hello World
> to the next one.
