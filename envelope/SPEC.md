# `skillboss.envelope/1` — the format

**Status: Ruling 1 signed 2026-09-25 (option B)** — the format as first
published, plus the optional story reference below
(`rulings-platform-env1-2026-09.md`, card 1, in the SkillBoss repository).
A change to this file is a new ruling. The source of each rule is named
beside it.

An envelope is one JSON file your own agent writes after you say GO. It has
one header shared by every kind, and one small closed body per kind.

## The header

| Field | Rule |
|---|---|
| `schema` | always `skillboss.envelope/1` |
| `kind` | one of `debrief`, `boss`, `kata`, `rules`, `questions`, `readback` |
| `villain` | one of the ten trap slugs in [boss/references/villains.md](boss/references/villains.md); for `rules`, the trap of the first line, the one the file was born from; each line names its own trap in its door |
| `stack` | one of `nextjs`, `docker`, `github-actions`, `terraform`, `azure` (the Pre-flight closed list; any extension needs the ruling) |
| `by` | `human` or `agent+human`; always shown to the reader |
| `locations` | optional; file paths, each matching the location pattern of the guard |
| `refused` | what the local guard withheld, by field path, never by value |
| `storyDebriefId` | optional, `boss` only: the id of the author's own debrief this boss came from, never a value; a UUID, `^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$`; absent when there is none. The file cannot prove whose debrief it is: the site checks that it belongs to the signed-in author when the file comes in (SP-11a) |
| `body` | the kind's own fields, below |

The author is never in the file. The site takes it from the signed-in
account.

## The six kinds

| Kind | Body | State today |
|---|---|---|
| `boss` | `scene` (≤ 280 characters) · `shots` (exactly four, ≤ 120 each) · `correct` (0 to 3, exactly one) · `lesson` (≤ 280) · `difficulty` (`NORMAL` or `HARD`) · `rulesLine` (optional, ≤ 160, one line, ending in the boss's own trap door `/guild?trap=<villain>`) | skill written: [boss/SKILL.md](boss/SKILL.md) |
| `kata` | `title` (≤ 80) · `scenario` (≤ 280) · `artifact` (≤ 12 lines, each ≤ 120, one line; exactly one line is the marker `_____`, where the move's own line was removed) · `fills` (exactly four whole lines, ≤ 120 each, all different; one right, the removed line) · `correct` (0 to 3) · `impact` (≤ 200, one line, in words: no figure, never "secure" or "verified") · `guards` (one trap slug, the header's `villain` repeated; never `env-hygiene`, `backups` or `dependencies`, which have no Dojo hall) · `exerciseType` (`CLOZE` only) | skill written: [kata/SKILL.md](kata/SKILL.md) (card LP-5 A, 2026-09-27); the site's door to come |
| `debrief` | the Mess Hall composer's fields and caps: `villainSlug` (the header's `villain`, repeated) · `ship` (≤ 80, one line) · `whatHappened` (≤ 1500) · `whatWorked` (≤ 800) · `doDifferently` (optional, ≤ 800) · `repoUrl` (optional, public https, ≤ 512); the composer's reply-to link stays on the site | skill written: [debrief/SKILL.md](debrief/SKILL.md) |
| `rules` | `lines` (one to ten, each ≤ 160, one line, one trap per line, each ending in its trap door `/guild?trap=<villain>` with one of the ten slugs; no figure, no claim word, no command that plays a run); the stack is the header's | skill written: [rules/SKILL.md](rules/SKILL.md) (card DK-8 A, 2026-09-29); no site door — the person copies the lines into their agent's own rules file; the boss's `rulesLine` (card LP-1 A) stays |
| `questions` | exactly three lines, each a question, no order, no link | parked until its ruling |
| `readback` | one finding that changed · one doubt that remains · which questions it answers | parked until its ruling |

## Which moment becomes which kind

Ruling: card 10, option A, `GO 10 — 2026-09-26 — HH (A)`. The kinds above
say the shape of a file; this table says which moment becomes which file.
Each skill opens with its own row and, when the moment is another row's,
names the right skill instead of writing a weak file.

| The moment | Kind | What the file carries from it | What it never carries |
|---|---|---|---|
| The agent gave a confident answer, and it was wrong | `boss` | the scene in one line, four things the agent could have said, the one right one, the lesson | the conversation, the code, the diff, a value |
| The person made a move well with their agent, and it matters | `kata` | the artefact in at most twelve lines with the move's line removed, four lines to fill it, the one right one, the impact in words | the conversation, the diff, a value, a real hostname, a figure |
| Something went wrong in the person's own app, or almost did | `debrief` | what happened, what worked, what they would do differently, the ship | blame, a private link, a value |
| A rule the person now applies on one stack, learned the hard way | `rules` | one line per trap, ending in the trap door it guards | a figure, a claim word, a command that plays a run |
| Three questions an expert would ask a builder on one trap | `questions` | exactly three questions, no order, no link | a command verb, a link, an answer |
| The builder's answer to those three questions, months later | `readback` | one finding that changed, one doubt that remains, which questions it answers | the code, a value, a statement about the app |

A moment that fits no row is not an envelope. The `kata` row is from
card LP-5 A (2026-09-27), which amends card 10. The `questions` and
`readback` rows bind nothing until their kinds' rulings (cards 2 and 3 of
the pack). The `rules` row binds two things: one line on a boss (card LP-1 A,
2026-09-27), written at forge time; and the per-stack rules file the rules
skill writes (card DK-8 A, 2026-09-29).

## The caps

- The whole file: at most 65536 bytes.
- A text field is one line with no `<` or `>` (`^[^\n\r<>]*$`), unless its
  kind names it a story field: then it may hold paragraphs, and still never
  `<` or `>` (`^[^<>]*$`). The debrief's story fields are `whatHappened`,
  `whatWorked` and `doDifferently`, as in the composer. Every field is
  rendered as text, never as markup.
- Every location: a path, optionally with a line, or a commit reference.

## What never crosses — the guard list

- A value: anything matching the nine credential patterns quoted in
  [boss/SKILL.md](boss/SKILL.md), a password inside an address, a private
  key, the content of an environment file. Refused by path.
- A private repository link, a file body, a diff. Only locations.
- An instruction in a testimony field reaching another agent as an
  instruction.
- A claim word, in any field. The list is in [boss/SKILL.md](boss/SKILL.md).
- An envelope published without a human GO.
- A boss served to an agent. Bosses are for people to play.
- Telemetry or a background service inside any skill, or a network call
  other than one POST of the file to a slot line the person hands over
  (card DK-7 A).
- An agent playing an official SkillBoss run, or earning a belt.

## The provenance words

`by: agent+human` means an agent drafted the content and a person read it
and said GO. It is always shown. Hiding it would be the first dark pattern.

## The file

The boss skill writes `.skillboss/boss-<villain>-<YYYY-MM-DD>.json` in the
person's project; the debrief skill writes
`.skillboss/debrief-<villain>-<YYYY-MM-DD>.json`; the kata skill writes
`.skillboss/kata-<villain>-<YYYY-MM-DD>.json`; the rules skill writes
`.skillboss/rules-<stack>-<YYYY-MM-DD>.json` (named by its stack, card DK-8 A). The folder and the name are part of ruling 1.
