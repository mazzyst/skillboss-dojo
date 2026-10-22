---
name: skillboss-mr
description: Use when the person wants to practise reviewing a merge request on their own work, an agent's or a teammate's, without sending anything anywhere. Answers to plain words such as "make me an MR to review", "turn this change into a review" or "forge an MR from my history". Builds one play link on this machine after the person says "play it", and writes one MR file after they say "forge it". Free, offline, no telemetry.
---

# mr — a change from your own project becomes a review you play

Version 0.1.0 · from the SkillBoss Dojo · Apache-2.0 · see [../NOTICE](../NOTICE)

An MR here is one change, a few lines of diff, rewritten from the person's
own project. The person reviews it in three shots: the line that decides,
the verdict, the reason they would write on it. There are three verdicts:
fix it (CHANGES), ask for evidence (PROVE IT), accept it in scope (MERGE).
The answer opens only after the review is locked.

The change stays on this machine. The play link carries the case after its
`#`, a part of an address the browser never sends to any server, and the
page it opens forbids every connection. Nothing is sent, in this skill or
in that page.

## Your row of the table

The format's table ([../SPEC.md](../SPEC.md), "Which moment becomes which
kind") gives this skill one row: *A change the person or their agent made,
where the review decides.* That is an MR.

If what the person points at is *The agent gave a confident answer, and it
was wrong*, that is a boss: the boss skill writes it
([../boss/SKILL.md](../boss/SKILL.md)). If it is *Something went wrong in
the person's own app, or almost did*, that is a story: the debrief skill
writes it ([../debrief/SKILL.md](../debrief/SKILL.md)). If it is *a move
made well*, that is a kata ([../kata/SKILL.md](../kata/SKILL.md)). Say so
in one line and stop. Never write a weak MR from another moment.

## How to speak to the person

- One short sentence per question. One idea per sentence.
- Everyday words, in the person's own language.
- A house word gets a plain explanation the first time it appears.
  An **MR** is a merge request: a change someone asks to merge.
  The **key** is the answer: the line, the verdict and the reason.
  The **play link** is the address that opens the review in a browser.
- No praise, ever. Say what the change does, not how well it was reviewed.

## What the agent does

1. **FIND.** Walk down the ladder below and stop at the first rung that
   gives one change. Ask before you read anything on a rung.
2. **REWRITE.** Turn the change into a case: 4 to 30 diff lines, the
   requirement, the context, the author's claim, the evidence, the scope.
   Rewrite every name before you show anything: the company, the product,
   people, hostnames, internal addresses, ticket numbers. Keep the shape
   of the mistake, never a value.
3. **DRAFT.** Write three reasons for each verdict, nine in all, and the
   key. The key's reason is never the longest of the nine.
4. **GUARD.** Run the guard below on every field, before showing anything.
   Each refusal is a field path, never a value.
5. **SHOW.** Show the case without the key: the diff, the claim, the nine
   reasons. Ask one thing: is anything in it still private?
6. **PLAY.** After "play it", build the play link on this machine with the
   recipe below, and give it as the last line. Never open a browser; never
   call the network. Never pick a line, a verdict or a reason for the
   person, and never say the key before they lock their review.
7. **DOOR.** After "forge it", write the MR file to
   `.skillboss/mr-<theme>-<YYYY-MM-DD>.json` and print the same JSON below
   it. Say where it is saved. It stays in the person's project.

## The ladder

Each rung reads less of the person's work than the one above it. The
person can stop on any rung, or skip it.

1. **The local history.** A merged change that a later commit fixed or
   reverted: the fix gives the key. Read it with `git log` and `git show`,
   on this machine. Prefer a change the person did not review themselves.
2. **The tools already connected to you.** A merge request the person can
   already read through a code host tool they connected themselves. Read
   it where it is. Nothing new is connected.
3. **The work in progress.** The person's own change before they send it,
   from `git diff`. There is no key: the author is `DEVELOPER`, and the
   page shows their review only.
4. **The stack of the repository.** No change to read. Write a case from
   the files the repository uses (a workflow, a manifest, a Terraform
   file) and one of the agent mistakes below.
5. **The MR of the day.** Nothing in the project fits. Give the address
   `https://skillboss.dev/app/review` and stop.

Agent mistakes that make a good case, by theme:

- `agile`: the change meets the ticket's words and misses its intent.
- `git`: a force push, a rebase or a hook that rewrites someone's work.
- `k8s`: a probe, a limit or a selector that looks right and never fires.
- `cloud`: a policy or a lifecycle rule one level wider than asked.
- `ci-cd`: a cache key, a trigger or a permission that skips a check.
- `sre`: an alert that never fires, or fires on the wrong window.
- `security`: an input trusted one hop too far.

## The case, its fields and its limits

- `author`: `AI_AGENT` when an agent wrote the change, `DEVELOPER` when
  the person did.
- `title` at most 120 characters, `filePath` at most 200, `fileFormat` at
  most 32.
- `requirement` at most 240, `context` at most 600, `claim` at most 240,
  `evidence` at most 400, `scope` at most 240.
- `diff`: 4 to 30 lines, each at most 200 characters. Each line starts
  with a space, `+`, `-` or `@@`.
- `reasons`: exactly three for each of `MERGE`, `CHANGES` and `PROVE`,
  each at most 200 characters, all nine different.
- `key`: `verdict`, `reasonIndex` (0 to 2), `decisiveLines` (the indexes
  of changed lines, from 0), `decisiveCondition` at most 200,
  `smallestCheck` at most 240, `whyOthersWeaker` at most 400, `source` at
  most 240.
- `theme`, in the file only: one of `agile`, `git`, `k8s`, `cloud`,
  `ci-cd`, `sre`, `security`.

## The guard, run before anything is shown

Pure text checks, on this machine. No network, no program to install.

Refuse any text field that matches one of these patterns (the SkillBoss
Pre-flight redaction patterns, quoted from the source):

```text
A[KS]IA[0-9A-Z]{16}
sk-(?:proj-)?[A-Za-z0-9_-]{20,}
gh[posru]_[A-Za-z0-9]{20,}
github_pat_[A-Za-z0-9_]{20,}
AIza[0-9A-Za-z_-]{20,}
xox[baprs]-[A-Za-z0-9-]{10,}
eyJ[A-Za-z0-9_-]{8,}\.[A-Za-z0-9_-]{8,}\.[A-Za-z0-9_-]{8,}
:\/\/[^\s/:@]+:[^\s/:@]+@
BEGIN[A-Z ]*PRIVATE KEY
(?<![A-Za-z0-9/+=])(?=[A-Za-z0-9/+]*[A-Z])(?=[A-Za-z0-9/+]*[a-z])(?=[A-Za-z0-9/+]*[0-9])[A-Za-z0-9/+]{40}(?![A-Za-z0-9/+=])
(?:[Kk]ey|KEY|[Tt]oken|TOKEN|[Ss]ecret|SECRET|[Pp]assword|PASSWORD)["':= ]{1,4}[0-9A-Fa-f]{8}-[0-9A-Fa-f]{4}-[0-9A-Fa-f]{4}-[0-9A-Fa-f]{4}-[0-9A-Fa-f]{12}
```

Then the second layer, for keys no pattern knows. Split each field on
this pattern:

```text
[\s/\\.,;:()\[\]{}"'=<>|_*\-–—]+
```

Refuse the field if any piece is 24 characters or longer, holds at least
one letter and one digit, and has an entropy of 3 or more. Entropy says how
random a piece looks: for each distinct character, take its share `p` of
the piece, and add up `-p × log2(p)`.

Every text field and every diff line must be one line with no markup. It
must match:

```text
^[^\n\r<>]*$
```

The rules:

- A hit is refused by field path, never by value: `body.diff[7][credential-shaped]`,
  `body.context[markup]`, `body.reasons.MERGE[1][too-long]`.
- A decisive line that is not a changed line is `body.key.decisiveLines[0][not-changed]`.
  A key whose reason is the longest of the nine is `body.key.reasonIndex[longest]`.
- A refusal removes the field's text and asks the person to rewrite it
  with you. It never guesses a safe version.

## The play link, built on this machine

The link is the page's address, then `#v1.`, then the case's `body` as
compact JSON in base64url (no padding). Build it with one local command,
from the drafted file:

```sh
node -e "const b=JSON.parse(require('fs').readFileSync(0,'utf8')).body;process.stdout.write('https://skillboss.dev/play/mr.html#v1.'+Buffer.from(JSON.stringify(b)).toString('base64url'))" < case.json
```

Opening the link loads one page and sends nothing else: the browser keeps
the part after `#` to itself. The page is one file, so the person can also
save it and open the saved copy. Its sha256 is listed under `pages` at
`/api/v1/protocol/guards`, for the person to compare if they want to.

For work in progress (rung 3), leave `key` out of the link's body: the page
shows the person's own review and no key.

## What the human does

- Read the case before it becomes a link.
- Remove anything still private.
- Say "play it", then play the review.
- Say "forge it" only if they want the file kept.

## What never happens here

- No file is written but the one MR file, and only after "forge it".
- No value is printed: a location, never a key, a token or a secret.
- No name of a person, a colleague, a client or a company enters the case.
- The agent never reviews for the person, and never says the key before
  the review is locked.
- No network call, no telemetry, no background service. The case is never
  sent: the play link is built here and opened by the person.
- No claim word, in any field: the list is the boss skill's, in
  [../boss/SKILL.md](../boss/SKILL.md). A review says what a change does;
  it never says an app is safe.

## The output

```json
{
  "schema": "skillboss.envelope/1",
  "kind": "mr",
  "theme": "ci-cd",
  "body": {
    "author": "AI_AGENT",
    "title": "Cache the dependencies in the test job",
    "filePath": ".github/workflows/test.yml",
    "fileFormat": "YAML",
    "requirement": "The test job installs the dependencies faster, with the versions the lockfile names.",
    "context": "The repository uses npm with package-lock.json. The test job runs on every pull request.",
    "diff": [
      "@@ -12,8 +12,11 @@ jobs:",
      "   test:",
      "     runs-on: ubuntu-latest",
      "     steps:",
      "       - uses: actions/checkout@v4",
      "+      - uses: actions/cache@v4",
      "+        with:",
      "+          path: node_modules",
      "+          key: deps-${{ runner.os }}-${{ hashFiles('package.json') }}",
      "-      - run: npm ci",
      "+      - run: npm install",
      "       - run: npm test"
    ],
    "claim": "The cache cuts the install time, and the versions do not change.",
    "evidence": "Two runs on this branch: the second one restored the cache and passed.",
    "scope": "The cache step and the install command only.",
    "reasons": {
      "MERGE": [
        "Two green runs show the cache restores and the tests pass.",
        "Caching node_modules is a common pattern, the scope is small, and the tests still run on every pull request.",
        "The install command change is cosmetic: npm install and npm ci do the same."
      ],
      "CHANGES": [
        "The key hashes package.json, not the lockfile, and npm install can move versions.",
        "The cache step should come after the install, not before it.",
        "The test job needs a timeout before this merges."
      ],
      "PROVE": [
        "Ask for a run where package-lock.json changed, to see the cache refresh.",
        "Ask for timings before and after, to show the install got faster.",
        "Ask which runner image the cache was tried on."
      ]
    },
    "key": {
      "verdict": "CHANGES",
      "reasonIndex": 0,
      "decisiveLines": [8, 10],
      "decisiveCondition": "The cache key ignores package-lock.json and npm install may resolve new versions, so the versions can move while the cache says nothing did.",
      "smallestCheck": "Change one version in package-lock.json only, run the job twice, and compare the cache key and the installed version.",
      "whyOthersWeaker": "Two green runs say the cache restores, not that the versions hold. Timings show speed, not versions. The order of the steps is right: the cache restores before the install.",
      "source": "Written for this skill: a lockfile left out of a cache key, and npm ci swapped for npm install."
    }
  }
}
```

Saved at .skillboss/mr-ci-cd-2026-10-22.json.

## What this skill is not

Not a test of your app, not a statement about your app, not a score of
you. A review you play here never approves a merge at your company. The
format is in [../SPEC.md](../SPEC.md).
