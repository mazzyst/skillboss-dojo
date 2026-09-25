# `skillboss.envelope/1` — the format

**Status: DRAFT until ruling 1 of the envelope rulings pack is signed.**
Nothing here is final. Fields, caps and names may change at signature. The
source of each rule is named beside it.

An envelope is one JSON file your own agent writes after you say GO. It has
one header shared by every kind, and one small closed body per kind.

## The header

| Field | Rule |
|---|---|
| `schema` | always `skillboss.envelope/1` |
| `kind` | one of `debrief`, `boss`, `rules`, `questions`, `readback` |
| `villain` | one of the ten trap slugs in [boss/references/villains.md](boss/references/villains.md) |
| `stack` | one of `nextjs`, `docker`, `github-actions`, `terraform`, `azure` (the Pre-flight closed list; any extension needs the ruling) |
| `by` | `human` or `agent+human`; always shown to the reader |
| `locations` | optional; file paths, each matching the location pattern of the guard |
| `refused` | what the local guard withheld, by field path, never by value |
| `body` | the kind's own fields, below |

The author is never in the file. The site takes it from the signed-in
account.

## The five kinds

| Kind | Body | State today |
|---|---|---|
| `boss` | `scene` (≤ 280 characters) · `shots` (exactly four, ≤ 120 each) · `correct` (0 to 3, exactly one) · `lesson` (≤ 280) · `difficulty` (`NORMAL` or `HARD`) | skill written: [boss/SKILL.md](boss/SKILL.md) |
| `debrief` | the Mess Hall composer's fields and caps: `villainSlug` (the header's `villain`, repeated) · `ship` (≤ 80, one line) · `whatHappened` (≤ 1500) · `whatWorked` (≤ 800) · `doDifferently` (optional, ≤ 800) · `repoUrl` (optional, public https, ≤ 512); the composer's reply-to link stays on the site | skill written: [debrief/SKILL.md](debrief/SKILL.md) |
| `rules` | a per-stack rules file for agents, ending in the trap doors it guards | planned |
| `questions` | exactly three lines, each a question, no order, no link | parked until its ruling |
| `readback` | one finding that changed · one doubt that remains · which questions it answers | parked until its ruling |

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
- Telemetry, a network call or a background service inside any skill.
- An agent playing an official SkillBoss run, or earning a belt.

## The provenance words

`by: agent+human` means an agent drafted the content and a person read it
and said GO. It is always shown. Hiding it would be the first dark pattern.

## The file

The boss skill writes `.skillboss/boss-<villain>-<YYYY-MM-DD>.json` in the
person's project; the debrief skill writes
`.skillboss/debrief-<villain>-<YYYY-MM-DD>.json`. The folder and the name are part of ruling 1.
