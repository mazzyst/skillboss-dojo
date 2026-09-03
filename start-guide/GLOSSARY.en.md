# Glossary — every word of the run, in plain language

One page, two lists. The first is the kit's own vocabulary; the second
is the builder vocabulary the gates will use. If any word in the guide
or in a coach message is unclear, it is defined here — and if it is not,
that is a bug worth reporting.

## The kit's own words

- **The run** — one full delivery, from "Hello World" to shipped. Ten
  gates, one record, one ladder.
- **Hello World** — the words you say to your agent to start (or resume)
  the run. The oldest phrase in programming, repurposed as the coin in
  the arcade machine.
- **The coach** — the role your agent adopts: it plans, asks, refuses to
  skip steps, and never advances without your GO. You stay the boss of
  every decision.
- **Gate** — one locked stage of the run (architecture, security, tests,
  and so on). A gate is OPEN (being worked), PASSED (evidenced, and you
  said GO), or WAIVED (you chose to skip it, on the record). There is no
  "failed".
- **GO** — the word you type to approve a mission or close a gate. The
  coach never assumes it, never infers it from "looks good".
- **Evidence** — the proof behind every checked box: a file path, a
  command with its output, or a URL. "Done" and "I think so" do not
  count. Evidence records where things live, never secret values.
- **Waiver / SKIP** — your right to overrule the coach:
  `SKIP <gate or box> because <reason>`. Recorded word for word, no
  guilt, never re-argued.
- **state/** — the three files that ARE the run's memory: `mission.md`
  (what you are building), `journal.md` (every decision and report,
  append-only), `scoreboard.md` (gate states and your rank).
- **READY** — the state between installing the kit and starting the run:
  the coach is armed and waiting, and has created nothing. Installing is
  not consenting; the run begins when you say the words.
- **INSERT COIN** — the last line of the READY screen, asking you for the
  magic word. The coach never says it for you.
- **Boot Sequence** — the short status block the coach answers with at
  wake-up: contract loaded, gate map, your starting rank.
- **YOU ARE HERE** — the short block that says where you are, what is
  next, and what is left. The coach posts it when a gate opens, when it
  closes, and when a session resumes.
- **WHERE AM I** — type it any time and the coach answers with YOU ARE
  HERE, whatever it was doing. A long run is only survivable if you can
  always ask.
- **RESUME** — what the coach answers instead of the Boot Sequence when
  the state files already exist: where the run stands, so nothing is
  lost between sessions.
- **RE-SCOPE** — the ritual for changing the mission mid-run: a short
  delta of intake questions, then a new GO. No silent drift.
- **Profile** — the shape the intake gives your run: gates that do not
  apply to your project (no containers, no user accounts) are waived up
  front, on the record.
- **The ladder** — the rank track of the run, WHITE to BLACK. Earned by
  facing gates (passed or waived), monotonic: never lost. In the kit's
  own files it is the ladder of run belts — and a run belt is never the
  dojo's belt: a dojo belt is earned over weeks of daily practice in one
  subject, a run belt by facing gates in one delivery. They share colour
  names and nothing else.
- **The final boss / SHIP** — Gate 90: the evidence review, the launch
  runbook, and the hand-off to the Ship Check.
- **RUN BELT EARNED** — the short block the coach posts when a GO promotes
  you: what it took, what it means, what is next.
- **RUN CLEARED** — the celebration at Gate 90: the map cleared, your
  run's real numbers, and the two lines that never move. It celebrates
  the run, never the app.
- **SMALL RUN** — the weekend-project shape: five gates in full, the rest
  reduced to one box each. Smaller, never looser.
- **Hook** — a small script git runs automatically on commit or push. The
  kit ships three guards and one screen hook, so its most critical rules
  do not depend on memory.
- **Milestone** — one thing the product must DO, in your words, agreed at
  Gate 00. Milestones say where the product stands; gates say whether it
  is safe. Milestones never block a gate, and a gate never denies a
  milestone.
- **The run screen** — `state/run-screen.md`, an editor tab beside your
  code (or `state/run-screen.html` in a browser): both axes on one
  picture, rewritten by a hook after every commit. Local, offline, no
  service. Its sharpest line appears when the product moves ahead of its
  safety.
- **Villain** — the named failure one system guards against: THE LEAK,
  THE COMMITTED KEY, THE OPEN MIC, THE OPEN DOOR, THE ROTTEN PLANK, THE
  LOST WEEKEND, THE BILL SHOCK, THE SILENT CRASH, THE 3AM PAGE, THE
  FLOOD. Ten names, one per Ship Check system; each gate names the ones
  it faces, and Gate 90 faces them together.
- **Gate Report** — the journal entry that reviews a gate: every box with
  its evidence or its OPEN status, waivers, risks accepted, cost, verdict.
  One shape, in SCREENS.md.
- **WHAT THIS CAUGHT** — the one line the coach adds when a gate closes,
  naming what it actually prevented, quoted from the evidence — or the
  honest zero. Also a row of the scoreboard's Caught table.
- **THE RETURN** — what the coach says when a session resumes after a
  gap: "<n> days quiet. The record kept your place." Never a lapse; this
  kit has no streaks.
- **SHIPPING AHEAD OF SAFETY** — the run screen's one alarm: two or more
  milestones done while 20-SECURITY is still open.
- **PARKED** — an ask outside the open gate, recorded with the gate where
  it comes back. Answered in one line, never refused twice.
- **ASSUMPTION** — an intake answer taken by its recommended default,
  recorded in mission.md, reversible by RE-SCOPE. At most three answers
  stay open; the rest are assumptions.
- **The banner** — the one line the coach OFFERS for your README at Gate
  90: gates faced, waivers, run belt, a link. Taken only on GO; it speaks
  of the builder, never of the app.
- **FinOps — measured / declared** — the run's cost, in two natures never
  mixed: measured by the hook from git (days, commits), declared by the
  coach from what its tool reports — and labelled as declared.
- **COACH READY / ONLINE / RESUMED** — the three headers the coach answers
  with: armed and waiting, the run booting, the run resuming.
- **Activation level** — what the profile does to a gate: active (in
  full), active-lite (some boxes recorded n/a-with-reason),
  waived-by-profile (waived at the intake, with a revisit condition).
- **n/a-with-reason** — how a box that does not apply is recorded: the
  reason written next to it. "n/a" alone is refused.
- **The coin, the cabinet** — the arcade image the run lives in: the kit
  is the cabinet, "Hello World" is the coin, and the cabinet goes quiet
  when the run is cleared.

## The builder's words

- **Repository (repo)** — the project folder that git watches; the "repo
  root" is its top level. Created with `git init` or by cloning.
- **Commit** — one saved snapshot of the project in git's history. You
  can always go back to any commit; that is the whole point.
- **Push** — sending your commits to a copy of the repository hosted
  elsewhere (GitHub, GitLab...), so they survive your laptop.
- **Remote (origin)** — the online copy of your repository, on a host
  like GitHub or GitLab. The first backup a project ever has: your
  commits survive your laptop. Created private by default in this run,
  and pushing an existing history to one counts as publishing it.
- **Branch** — a parallel line of commits, used to prepare changes
  without touching the main line until they are ready.
- **CI (continuous integration)** — a robot that runs your checks (lint,
  tests, build) on every push, so a mistake is caught in minutes, not in
  production.
- **Pipeline** — the ordered list of steps that robot runs: lint, test,
  build, scan, artifact.
- **Lint** — an automatic check of code style and obvious mistakes,
  before any test runs.
- **Red / green** — a failing / passing test suite. In this kit a red
  suite blocks every gate.
- **Dependency** — code your project uses but did not write (packages,
  libraries). The **lockfile** pins their exact versions so every
  machine installs the same thing.
- **Secret** — any value that grants access: passwords, API keys,
  tokens. Secrets live in the environment, never in code and never in
  git history.
- **.env / environment variable** — named values the app reads at
  startup (database address, API keys). `.env.example` lists their NAMES
  with no real values, so a new machine knows what to provide.
- **Migration** — a scripted, versioned change to the database's shape
  (a new table, a new column), applied in order like commits.
- **Staging** — a practice environment shaped like production, where a
  deploy is rehearsed before the real one.
- **Deploy** — publishing a version of the app to an environment. Boring
  and scripted on purpose.
- **Rollback** — the one command that puts the previous version back
  when a deploy goes wrong. Written and tested BEFORE the first deploy.
- **Artifact** — the built, ready-to-run package of your app. Built
  once, then promoted between environments — never rebuilt per
  environment.
- **Backup / restore** — the saved copy of your data, and the act of
  loading it back. A backup that has never been restored is a hope, not
  a backup.
- **Health endpoint** — a URL the app exposes to say "I am up, and my
  database answers". Deploys and monitors check it.
- **Structured logs** — the app's flight recorder: one machine-readable
  event per line, with no secrets or personal data inside.
- **Alert** — a message a machine sends a human when a symptom crosses a
  line. Every alert must be actionable, or it gets deleted.
- **Walking skeleton** — the thinnest possible end-to-end slice of the
  app (one request through every layer), built FIRST to prove the whole
  shape works before features pile on.
