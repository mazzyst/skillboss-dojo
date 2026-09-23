# CHANGELOG — SkillBoss Start Guide

One entry per kit version. The ZIP served at https://skillboss.dev/start
is rebuilt for every entry, and its checksum is printed on that page.

## v4

- **The crew names a recipe; it never runs one.** Crew rule 1 now says
  where a helpful recipe or tool may appear in a CREW REPORT: in its
  `next:` line only, never among blockers or passed. Your main agent runs
  it, after your GO. The kit names no recipe.
- **One list of claim words.** The coach contract's refusal (§8) is the
  kit's one list: "secure", "production-ready", "guaranteed", "certified",
  "audited". Crew rule 4 points to it instead of keeping its own.
- **Gate 70, one check in one place.** The DevOps card says the billing
  alert (`billing-alert-set`) is FinOps's check: DevOps owns the gate and
  gathers that report without repeating it.

## v3

- **The crew.** The coach no longer works alone: crew/ adds nine
  specialist agents (architecture, security, data and privacy, tests,
  DevOps, FinOps, design, go-to-market, first user), one card each, with
  what it checks, what it refuses and what it hands off.
- **The crew is a graph.** CREW.md says which agent owns each gate and
  which are consulted, as a fenced block the build checks: one owner per
  gate, no unknown node, no card without an agent, no hand-off loop.
- **Seven crew rules.** Read-only, one CREW REPORT shape, the human
  arbitrates, no inflated claims, roles not characters, called at the
  gate, portable to any agent.
- **The coach runs the crew.** The gate-advance protocol (COACH-CONTRACT
  rule 4) calls the owner, then the consulted agents; each files a CREW
  REPORT (shape in SCREENS.md) before the Gate Report, which gains a
  `reviewed by` line. A pending agent means the gate is not GO-READY. The
  build refuses a report shape that drifts between files.
- **The run screen shows the crew.** A CREW block lists, per gate, who
  reviewed and who is pending, from the scoreboard's new `## Crew` table.
- **You code alone. You do not ship alone.** The README, both user
  guides (a new "Your crew" section), both glossaries, THE-RUN.md and the
  READY and boot screens now say it first: the crew is on call at every
  gate, read-only.
- **"Adopt" is gone.** No reader-facing file asks the agent to adopt the
  kit any more; it follows it at the human's request. ADAPTERS.md's
  install paragraph now includes the hook audit.
- EXAMPLE-RUN.md shows gate 20 with three crew reports, and the FinOps
  warning the gate file alone would not have raised. ADAPTERS.md explains
  sub-agents or hats.

## v2

- **The guards say where, never what.** The pre-commit secret guard
  matches case-insensitively (API_KEY= is caught), counts compound names
  and PEM headers, and prints only file:line and the shape of the key —
  never the value. The CI history scan prints commit and file only.
- **The method has a name.** THE-RUN.md: Evidence-Gated Delivery, four
  laws, two paths.
- **Every fixed block is defined once.** SCREENS.md carries the coach's
  screens, the journal shapes, the celebration, the banner and the
  strings the run screen prints; the build refuses a copy that drifts.
- **The gates have a cast.** The ten Ship Check villains are named at the
  gates that face them (20, 50, 70, 80) and faced together at Gate 90;
  the dependencies drill moves from gate 20 to gate 50, where its hall is.
- **The run belt names its track.** Every printed belt is a run belt: a
  rank earned by facing gates in one delivery, never the dojo's belt.
- **RUN CLEARED** replaces RUN COMPLETE as the celebration header.
- **Three blocks get a shape**: COACH RESUMED, the SMALL RUN announcement,
  the README banner. **PARKED** joins the journal: an ask outside the
  open gate is recorded with the gate where it comes back.
- **The intake finishes in one message.** Every question carries a
  recommended default; at most three answers stay open; the rest are
  recorded as assumptions, reversible by RE-SCOPE.
- **Gate 90 grades its review** (CRITICAL / HIGH / MEDIUM / LOW) and
  stops when regenerating the scoreboard changes nothing.
- **The run screen v2.** The coach's NEXT / NOW / AFTER lines at the
  top, the map with its legend, gates faced and milestones done, the run
  belt and its next rung, the ten villains marked as their gates are
  faced, what each gate caught, the waivers with their reasons, the
  parked asks, RUN CLEARED rendered from the record — in the house's
  colours, with no green and no danger red, HTML-escaped, and every fixed
  string asserted against SCREENS.md.
- **Truth fixes.** The Gate Report has one shape (with its cost line);
  the guide's YOU ARE HERE example adds up; state/ is stated to live at
  the repository root; gate 05's harmless test fires; gate 40 points at
  gate 10; the SHIPPING AHEAD OF SAFETY threshold is written down.

## v1

- First public kit: twelve rules, ten gates, three git guards, the run
  screen, profiles and the SMALL RUN, the worked example, the glossaries
  in English and French, Apache-2.0.
