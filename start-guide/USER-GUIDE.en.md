# SkillBoss Start Guide — User Guide

This guide is for you, the human. Your agent has its own entry point
(HELLO-WORLD.md); you never need to read the gate files unless you want
to. Ten minutes here is the whole learning curve.

> The Start Guide is a coach, not a certification: its guardrails are
> heuristic defaults applied by your own agent. It hardens the builder;
> it never certifies the app.

## What you get

A delivery coach living in your repository. Your agent adopts a contract
that forbids it to skip steps: ten gates from kickoff to ship, each
locked until the work is evidenced and you say GO. You stay the
arbitrator — the coach can be overruled, but only on the record. The
method has a name, Evidence-Gated Delivery, and one page if you want the
why: THE-RUN.md.

## Before you start

Two minutes of ground rules:

- The coach will refuse to write feature code before the intake is done.
  That is the product working, not the product broken.
- Everything important lands in three files under `state/` — mission,
  journal, scoreboard. Commit them; they are the run's record.
- "GO" is a word you type. The coach never advances a gate without it.

## Step 0 — What you need (junior-friendly)

Three things, nothing else:

- **An AI coding agent** — Claude Code, Cursor, or Copilot in your
  editor, or even a plain chat agent. If you can ask it to write code,
  it can be your coach.
- **Git installed — or not, that is fine too.** Git is the tool that
  keeps the history of your project — every "commit" is a saved snapshot
  you can always go back to. If it is missing, the coach names the one
  command that installs it for your machine and runs it only on your GO;
  you never have to figure it out alone.
- **A git repository** — the project folder git watches. You may already
  have one (any folder you cloned from GitHub or ran `git init` in).
  **No repository yet? That is fine — do not create anything by hand.**
  Creating it is officially the coach's first job at Gate 00: it will
  run `git init` for you and explain each command in one line as it
  goes. It also sets up the online copy of your repository (GitHub,
  GitLab, or any host you pick — private by default), and it NEVER
  touches your passwords: you log in in your own browser, the coach only
  wires the address.

You do NOT need: prior DevOps experience, a server, a paid account, or
to have read any file in this kit other than this guide. Any word that
is unclear — here, in a gate, or in a coach message — is defined in
plain language in GLOSSARY.en.md.

## Step 1 — Install the kit

The modern way is one paste: on https://skillboss.dev/start, copy the
INSTALL PROMPT and give it to your agent. It downloads the kit, checks
its fingerprint (the page shows the expected checksum), and unzips it at
the right place.

Then it stops. It shows you a READY screen and waits — nothing is
created, nothing is asked, nothing is built. Starting is your move, and
it is the next step.

The manual way still works: unzip (or copy) the kit into your project
folder so it sits at `start-guide/` at the top level (next to your code
— that top level is called the "repo root"). If you have a repository,
commit it; if not, the coach will commit it with the first commit at
Gate 00.

## Step 2 — Wire your agent

Open ADAPTERS.md and follow the section for your tool — Claude Code,
Cursor, Copilot, or a plain chat agent. It is one paste each. If in
doubt, the universal line always works:

    Read start-guide/HELLO-WORLD.md and follow it exactly. Hello World

## Step 3 — Say the words

Your agent is standing ready and its last line reads: **INSERT COIN — say
the two words every program says first.**

Say "Hello World". It answers with the Boot Sequence — the contract
loaded, the gate map, your WHITE run belt — and moves to the intake. That is
the whole ritual: the oldest phrase in programming, used once more, this
time to start a delivery.

The coach will never say it for you. If it starts writing code instead,
point it at `start-guide/CONTRACT-CARD.md` and say "Hello World" again.

## Step 4 — The intake

The coach asks about ten questions in one batch, each with a recommended
default you can accept with one word: what you are building, for whom,
what "shipped" means, your stack, where it will run, whether there are
accounts, payments, personal data, containers. At most three answers stay
open; the rest are recorded as assumptions you can revisit. Your answers
become `state/mission.md` and shape the whole run — a project without
containers, for example, gets the Docker gate waived up front, on the
record.

**Already written it down?** If you have a spec, a brief, or a README,
hand it over and say so. The coach drafts the answers that document
covers, tells you which line came from where, and lets you correct each
one — the same way it proposes milestones below. What you confirm is your
answer. What it will not do is answer from something you did not hand it:
reading your codebase and inferring your mission is answering for you,
and it is refused.

The coach also proposes three to five **milestones**: the things your
product must DO, in your words, starting with the thinnest version that
runs end to end. Correct that list freely — it is yours. Milestones say
where the product stands; gates say whether it is safe. They never block
each other. The intake ends when you GO the written mission.

## Step 5 — Let the guards install themselves

At Gate 05 the coach runs one command that installs four git hooks in
your project. Three of them are guards: from then on, three mistakes are
caught by the machine and not by anyone's memory — an environment file
about to be committed, a credential-shaped string in your changes, and a
push with a failing test suite. The fourth guards nothing: it draws your
run screen (section below).

They start in "warn" mode — they print, they do not stop you — and the
coach will show you one firing on a harmless test so you have seen it
work. When you trust them, one line switches a guard to "block". This is
the part of the kit that keeps working on a bad day, when nobody is
reading anything.

## Step 6 — Run the gates

From there the rhythm is always the same: the coach states the gate's
stakes, asks its questions, proposes a plan, you approve, the work
happens, and the coach shows you a Gate Report — every box evidenced or
honestly OPEN. You type GO; the scoreboard updates; the next gate opens.
Expect the early gates (00, 05, 10) in the first sessions; the run then
follows your project's real pace — days or months, the record keeps up.

**Never seen a Gate Report?** `EXAMPLE-RUN.md` shows a filled one, on an
invented project: a gate that held with one box open, the waiver that
unblocked it, the same gate closing two days later, and a table of
evidence that counts beside evidence that does not. Read it once before
your first report; you never have to write one from a blank page.

**Weekend project?** Say so at the intake and the coach runs the SMALL
RUN shape — the five-gate path: five gates in full, the rest reduced to
one box each, announced in one block so you see what was deferred. It is
smaller, not looser — same evidence, same GO — and you can say "full run"
at any time to reopen everything.

## Your run screen

After the first commit, open `state/run-screen.md` as a tab beside your
code — an ordinary file your editor reloads on every commit, rendered by
its markdown preview, with nothing to configure. It shows your run on one
picture: the coach's NEXT line at the top, the map with its legend, gates
faced and milestones done, the ten villains marked as their gates are
faced, what each gate caught, your waivers with their reasons, and the
asks you parked. A dashboard you have to switch windows
to see is a dashboard you stop looking at, so it lives where you already
are. `state/run-screen.html` is the same data for a browser tab, if you
prefer one. No server, no account, not a single network request. It works
on a plane.

One line only appears when it should: **SHIPPING AHEAD OF SAFETY**, when
two or more milestones are done while the security gate is still open. That is the
gap this whole run exists to close, and seeing it beats being told about
it.

Both screens are a picture of `state/scoreboard.md`, never a second
truth: if they ever disagree, the scoreboard wins and the coach rebuilds
them. Do not edit them, and do not commit them — the installer already
put both in your `.gitignore`.

## Never lost — YOU ARE HERE

A run takes days or weeks, across sessions that stop mid-thought. So the
coach re-situates you rather than assuming you remember: it posts a short
YOU ARE HERE block when a gate opens, when it closes, and every time a
session resumes.

```
YOU ARE HERE — kitchen-timer · day 12 · YELLOW
run     ███░░░░░░░  3/10 gates · 2/3 milestones
map     00[x] 05[x] 10[x] 20[>] 40[ ] 50[ ] 60[ ] 70[ ] 80[ ] 90[ ]
now     20-SECURITY — 2 of 7 boxes still open
next    authz on the mutating routes, then the dependency floor
after   40-TESTS opens when you GO this gate
left    7 gates. You can stop any time; the record holds your place.
```

The line that matters most is **next**: one concrete action, never a
list. And you can ask at any moment — type **WHERE AM I** and you get the
same block, whatever the coach was doing.

## Waivers — you always have the last word

Any gate, any box, any time:

    SKIP <gate or box> because <reason>

The coach states the risk once, records your words verbatim, marks the
row WAIVED, and moves on. No guilt, no re-litigating. A waived gate still
counts toward its run belt: the run belt tracks that the question was
faced.

## Resuming a run

New session, new machine, even a new agent: say "Hello World" again.
Because the state files exist, the coach answers COACH RESUMED — the days
quiet, the last journal entry — then YOU ARE HERE, and continues. The record, not the
agent's memory, is the run.

## The run belts

WHITE when the run starts, then YELLOW, ORANGE, GREEN, BLUE, BROWN as
gate groups clear, and BLACK when Gate 90 — the final boss — is done.
Run belts are monotonic: once earned, never lost. A run belt names its
track: it is the run's rank, earned by facing gates in one delivery —
never the dojo's belt, which is earned over weeks of daily practice in
one subject. Same colour names, nothing else in common.

## Staying in it

A ten-gate run is long, and long things get abandoned rather than failed.
The coach keeps you moving with facts about your own work — never with
compliments, which tell a professional that nobody is reading.

- **A run belt earned is announced.** The ladder used to be computed in
  silence; now, when a GO promotes you, the coach says what it took and
  what it means.
- **Every closed gate names what it caught.** One line, quoted from the
  evidence: the key found before it was pushed, the red suite stopped at
  the door. When a gate caught nothing, it says that too — an honest zero
  tells you your own level.
- **Coming back is never a lapse.** Pause for a day or a month; the run
  screen greets you with "eleven days quiet, the record kept your place"
  and nothing else. **There are no streaks in this kit, on purpose**: a
  counter that punishes real life would make the run something to avoid.

## When the run ends

Gate 90 hands you to the Ship Check at https://skillboss.dev/launch —
ten systems to verify the week you ship — then closes with the evidence
review, your launch runbook, and a first-week watch.

Then the celebration, and it is the one moment of the run allowed to be
loud: RUN CLEARED, the map cleared end to end, your run's real numbers —
days, commits, gates faced, waivers taken on the record. Every figure in
it is one you can point at, which is what makes it worth reading. The
last two lines never move: you can say "checked and evidenced, per the
Start Guide's heuristics" and mean it; you cannot say your app is secure,
because this kit never said it either.

Then the cabinet goes quiet, and the closing words send you to the next
one — the same two words that started this run.

## Troubleshooting

| Symptom | Cause | Fix |
|---|---|---|
| The agent writes code at "Hello World" | Contract not loaded | Point it at CONTRACT-CARD.md, say the words again |
| The coach refuses a request | A contract rule applies | It must say which rule in one line; overrule with a SKIP if you disagree |
| A gate feels irrelevant | Profile mismatch | Check PROFILES.md; re-run the intake delta (RE-SCOPE) if the mission changed |
| Scoreboard and journal disagree | Hand-edited scoreboard | The journal wins; ask the coach to regenerate the scoreboard |
| New session forgot everything | State files not committed | Commit `state/`; say "Hello World" for the RESUME |

## The honesty lines

Free forever, heuristic and says so, about the builder never the app, no
vendors inside. The long form is in README.md; the short form is the
quote at the top of this guide.
