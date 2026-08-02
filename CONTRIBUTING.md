# Contributing a kata

This is the path by which a reader becomes an author. Katas in this repo
are the same content that ships inside SkillBoss, so a contributed kata is
held to the same bar as everything the pipeline produces — no lower, no
higher.

**The review promise:** every pull request goes through the same human
review as our generated content. AI-drafted or hand-written makes no
difference; nothing is published on autopilot, and nothing enters the
product's bank without a human signing off. Review is honest and specific —
if your kata is rejected, you'll be told exactly which bar it missed.

## The kata format

A kata is one markdown file under `katas/<hall>/<kebab-title>.md`, where
`<hall>` is one of: `git`, `agile`, `ci-cd`, `cloud`, `security`, `k8s`,
`sre`. Copy the structure of any existing kata — for example
[Recover the lost branch](katas/git/recover-the-lost-branch.md). The parts,
in order:

### 1. Scenario

One or two lines of real, present-tense pressure. It sets the stakes and
disambiguates the answers (see the ambiguity bar below). Not a textbook
prompt — a situation:

> A teammate force-pushed over your feature branch. Your commits are gone
> from the remote — get them back safely.

### 2. Artifact

A realistic artifact with blanks: a command sequence, CI pipeline, K8s
manifest, Terraform snippet, or runbook — the representation professionals
actually work in. Rules:

- The completed artifact must be **correct and runnable** (or, for
  runbooks, executable as written).
- Blanks are runs of underscores. 2–5 blanks; each blank is one token.
- Comments in the artifact may carry constraints ("never deploy untested
  code") — that's often where disambiguation lives.

### 3. Pool

One flat, alphabetized token list: the correct tokens plus plausible
near-miss distractors, roughly **2.5–3× the blank count** in total. Good
distractors are things a practitioner might actually reach for (`--force`
next to `--force-with-lease`), never noise words.

### 4. Hints (folded, optional)

One line per blank inside a `<details>` block — direction, never the
answer.

### 5. Solution and why-notes (folded, mandatory)

Inside a `<details>` block, **always below the exercise**: the answer table,
then one why-note per blank. A why-note explains why the correct token is
right **and** why the nearest distractor is wrong. This is the part readers
remember; write it like you'd explain it to a teammate at the incident
review.

## The ambiguity bar

The single hardest requirement, and the most common rejection reason. Real
configs admit many valid completions — a kata that marks a defensible
answer wrong burns trust, so we check every blank against every pool token:

- **Each blank's correct token must be *uniquely* correct given the
  scenario and artifact.** If two tokens both work, tighten the scenario or
  the artifact comments until only one survives, or cut the blank.
- **No distractor may satisfy *any* blank.** "Also works in practice
  sometimes" counts as satisfying it.
- If a reviewer can construct a reasonable reading under which a distractor
  is right, the kata goes back to you with that reading spelled out.

## What gets rejected

- **Ambiguous blanks** — see above. This is most rejections.
- **Trivia** — port numbers, flag spellings nobody memorizes, version
  history. A kata tests judgment inside a scenario, not recall of a table.
- **Artifacts that don't run** or configs no one would ship.
- **Answers visible above the fold** — solutions and hints live in
  `<details>`, below the exercise, no exceptions.
- **Real secrets or proprietary material** — no live credentials (even
  revoked ones), no internal configs from your employer, nothing you don't
  have the right to license CC BY-SA.
- **Copyrighted or franchise content** — inspirations stay genre-level.
- **Incident material that names individuals or uses non-public
  postmortems** — public, well-documented postmortems only, always
  blameless.
- **Filler distractors** — a pool padded with implausible tokens makes the
  kata an easy multiple-choice in costume.

## Process

1. Fork, add your kata file, open a pull request. One kata per PR.
2. In the PR description: which hall, and one sentence on the scenario's
   source (experience, public postmortem, docs).
3. A human reviews against the format and the ambiguity bar — expect
   specific feedback, and possibly a round or two of tightening.
4. On merge, your kata is in the repo under CC BY-SA 4.0 with your
   authorship in the git history. Accepted katas may also be imported into
   the SkillBoss training bank, credited.

By submitting a pull request you agree to license your contribution under
[CC BY-SA 4.0](LICENSE).
