---
name: skillboss-mr
description: Use when the person wants to practise reviewing a merge request on their own work, an agent's or a teammate's, without sending anything anywhere. Answers to plain words such as "make me an MR to review", "turn this change into a review" or "forge an MR from my history". Builds one play link on this machine after the person says "play it", and writes one MR file after they say "forge it". Free, offline, no telemetry.
---

# mr — a change from your own project becomes a review you play

Version 0.2.0 · from the SkillBoss Dojo · Apache-2.0 · see [../NOTICE](../NOTICE)

An MR here is one change, a few lines of diff, rewritten from the person's
own project. The person reviews it in three shots: the line that decides,
the verdict, the reason they would write on it. There are three verdicts:
fix it (CHANGES), ask for evidence (PROVE IT), accept it in scope (MERGE).
The answer opens only after the review is locked.

The case reads like a real team's MR: a ticket with its acceptance
criteria, the author's claim cut into its promises, the pipeline, and a
debrief the person reads after the lock. This skill is the contract for
that standard. The forge checks every rule that is a shape; the editor
reads every rule that is a fact.

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
2. **REWRITE.** Turn the change into a case at the ticket standard below:
   the ticket (its title, its description, its criteria, a team comment
   when it carries something real), then 4 to 30 diff lines, the author's
   claim and its promises, the evidence and the pipeline, the scope.
   Rewrite every name before you show anything: the company, the product,
   people, hostnames, internal addresses, ticket numbers. Keep the shape
   of the mistake, never a value.
3. **DRAFT.** Write three reasons for each verdict, nine in all, and the
   key, by the method below: the verdict, the decisive lines and
   condition, the smallest check, a check of each criterion and of each
   promise, the trap, a note on each decisive line, the fix, what the
   proof showed, what the ticket asked, the lesson's name. The key's
   reason is never the longest of the nine.
4. **GUARD.** Run the guard below on every field, before showing anything.
   Each refusal is a field path, never a value.
5. **SHOW.** Show the case without the key: the ticket, the diff, the
   claim and its promises, the pipeline, the nine reasons. Ask one thing: is anything in it still private?
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

## The ticket standard

The person reads the ticket first, as in a real team. The difficulty comes
from the technical reasoning, never from confusing writing or a hidden
fact.

1. **Short first.** A title, a description in two short paragraphs, three
   or four short criteria. The first paragraph (`requirement`) says the
   problem and its impact; the second (`context`) what one must know of
   the system. Do not repeat what the diff shows. A long ticket reads as
   an exercise, not as a ticket.
2. **The type shapes the description.** The title names its type: `Bug`,
   `Task`, `Improvement` or `Investigation`. A bug: what is observed, what
   is expected, the environment, how to reproduce it. An improvement: the
   limit today, its impact, the outcome wanted. A task: the motivation,
   the scope, the constraints. An investigation: the question, what is
   known, what to deliver; a supposed cause is never written as proven.
   "As a…, I want…" only for a real user need.
3. **A team comment when it carries something real.** Keep a lead's or a
   product owner's comment only when it brings a real constraint or
   decision: a capacity, a scope, a past incident. It never hints at the
   answer, and none is invented to look credible. Its author is a role,
   never a name.
4. **Testable criteria.** Each one is a behaviour someone can observe, or
   a measure with its conditions: where, under what load. At least one
   says what must stay true. Never "faster" or "robust" without a
   definition. The team's Definition of Done is not a criterion.
5. **Numbers with their scope.** A duration is an observation: where, over
   how many runs, from which event to which. Invented values stay
   plausible and agree with each other; from the person's real change, a
   value nobody knows is written as unknown. Never blame a delay on a
   cause without proof.
6. **Three layers, kept apart.** The ticket, then the proposal (the diff,
   the claim, the evidence, the pipeline), are shown before the verdict;
   the key and its notes only after the lock. Every fact the verdict needs
   is in the first two, and no parameter is left to guess: say an absence
   that matters, such as "no startup probe".
7. **The internal sheet, separate.** Before the key, write for yourself:
   the skill trained, the reasoning error aimed at, the expected verdict
   and the other defensible ones, the visible evidence for it, the lesson.
   A proposal may be right, wrong or short of proof: not every MR is
   faulty, and `MERGE` is a real answer. A ticket left incomplete on
   purpose exists only when the exercise is about asking for the
   requirement, and then the key rewards the question.
8. **Validate before publishing.** Before you show the case, ask: could a
   real team use this ticket? Are the need and its impact clear? Do the
   criteria judge the proposal? Is every deciding fact visible? Does the
   ticket keep the answer out? Does the key link the change, the behaviour
   and the consequence? Is another verdict defensible from the same facts?
   If one is, make the case clearer, or say so in `whyOthersWeaker`.
9. **The essentials, in the team's voice.** Every ticket carries a goal, a
   scope, observable criteria and the technical conventions a clear
   decision needs, and states every constraint that is mandatory. No extra
   headings: the goal and the scope go in the description, the
   conventions and constraints in the team comment, the way a real lead
   reminds them. The answer and the trap's explanation stay in the key.

## The method for the key

A case teaches only if its key is true. The forge checks shapes; it cannot
check a fact. So the key follows this method.

- **The documentation you know.** Check every decisive claim against the
  official documentation of the version the change uses, as you know it.
  Cite the official documentation and its version in `source`, for
  example "npm v10, npm-ci". Never invent a version, a commit or a hash.
  You read no page on the network for this: the editor reads the
  documentation before a case goes any further.
- **Three kinds of statement.** Keep apart what the documentation says,
  what the case assumes, what was measured. Every assumption that decides
  the verdict is written in the ticket, the `context` or the `evidence`.
  A duration is a measure of the scenario; never derive it from a setting.
- **Mechanism before numbers.** The state at the start, the condition that
  changes it, the threshold, the action. Separate start-up, normal running
  and shutdown when they behave differently.
- **Nothing hidden.** Every fact the verdict needs is visible before the
  verdict. The debrief never reveals a deciding fact that was hidden, and
  never invents one.
- **Precise verbs.** Say what is established and no more: "becomes
  eligible for traffic", not "receives traffic".
- **The proof tests the requirement.** `proofNote` says what the evidence
  shows and what it cannot show. A check that passed is evidence, not a
  promise.
- **The smallest check is complete.** Real requests through the real
  path, before, during and after; count the errors; compare with and
  without the change, under comparable conditions.
- **The fix apart from the tuning.** The fix separates the necessary
  correction from the optimisation to evaluate. `fix` says first what must
  change, then what to measure, and what each tuning depends on.
- **A counter-example.** Look for a counter-example to the key and to the
  fix: when would they be wrong? Read the decisive lines again against the
  whole diff.
- **The plain answer.** The key's reason stays the plain answer; a valid
  but harder alternative goes to `whyOthersWeaker`.
- **The tone never predicts the verdict.** Write the claim in the voice a
  real agent uses: almost always sure. A sure claim may hold, break or
  lack proof.
- **What you did not check.** Write what you did not check, as is, in
  `source`: "not run on a real runner", "the docs as known, not reread".
  Never write a check as passed when it was not run.

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
- The ticket standard's fields. The forge takes a case without them; this
  skill always writes them. With a ticket, `scope` is the question "Does
  this MR meet the ticket's acceptance criteria?": the criteria decide.
  - `ticket.title` at most 120 characters, shaped `KEY-12 · Type · what it
    is about`, the type one of `Bug`, `Task`, `Improvement`,
    `Investigation`. The key is a rewritten project key.
  - `ticket.history` up to 4 lines, each at most 200: what happened
    before, oldest first.
  - `ticket.comment`: `author` at most 60 and `text` at most 300.
  - `ticket.criteria` 1 to 4, each at most 160.
  - `pipeline` 1 to 6 steps: `name` at most 60, `status` one of
    `passed`, `failed`, `skipped`, `detail` at most 120.
  - `promises` 2 to 3, each at most 120: the claim, cut into what it
    promises.
- In the key, read only after the lock:
  - `criteriaChecks`: one per criterion, `met`, `unmet` or `unproven`,
    its `note` at most 240.
  - `promiseChecks`: one per promise, `holds`, `broken` or `unproven`,
    its `note` at most 240. They agree with the verdict: for `MERGE`
    every promise holds; for `CHANGES` at least one is broken; for
    `PROVE` none is broken and at least one is unproven.
  - `trap` at most 240: why the wrong answer looks right.
  - `lineNotes`: by the index of a diff line that is not `@@`, each at
    most 240.
  - `lessonName` at most 80.
  - `fix`, `proofNote` and `ticketNote` at most 300 each: the
    correction, what the evidence showed, what the ticket asked.
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
- A field of the standard is refused the same way: `body.ticket.title[shape]`,
  `body.key.criteriaChecks[count]` when the checks and the criteria differ
  in number, `body.key.promiseChecks[verdict]` when the checks disagree
  with the verdict, `body.key.lineNotes[0][not-a-line]` on a hunk header.
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

The page shows the ticket, the promises and the pipeline before the
review, and the checks and the notes only after it is locked.

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
    "requirement": "Every pull request waits on the test job, and most of that job is the dependency install. Make the install faster, with no change to the versions the tests run on.",
    "context": "The repository uses npm with a committed package-lock.json. The test job runs on every pull request, on ubuntu-latest, and installs with npm ci today, with no cache.",
    "ticket": {
      "title": "CI-58 · Improvement · Cut the dependency install time in the test job",
      "history": [
        "Raised at the last retro: the test job is the slowest check on a pull request."
      ],
      "comment": {
        "author": "Tech lead",
        "text": "Keep the full test suite on every pull request: we save time on the install, never by skipping tests. One cache per runner OS is fine."
      },
      "criteria": [
        "The test job installs the exact versions package-lock.json names, on every run.",
        "A run that restores the cache installs faster than a run without it, on the same runner image.",
        "The whole test suite still runs on every pull request."
      ]
    },
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
    "promises": [
      "The cache cuts the install time.",
      "The versions the tests run on do not change."
    ],
    "evidence": "Two runs on this branch: the second one restored the cache and passed.",
    "pipeline": [
      {
        "name": "test, run 1",
        "status": "passed",
        "detail": "Cache not found for the key; the cache was saved at the end of the job."
      },
      {
        "name": "test, run 2",
        "status": "passed",
        "detail": "Cache restored from the same key; the suite passed."
      }
    ],
    "scope": "Does this MR meet the ticket's acceptance criteria?",
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
      "decisiveLines": [
        8,
        10
      ],
      "decisiveCondition": "The cache key ignores package-lock.json and npm install may resolve new versions, so the versions can move while the cache says nothing did.",
      "smallestCheck": "Change one version in package-lock.json only, run the job twice, and compare the cache key and the installed version.",
      "whyOthersWeaker": "Two green runs say the cache restores, not that the versions hold. Timings show speed, not versions. The order of the steps is right: the cache restores before the install.",
      "source": "Written for this skill. Docs as known: npm v10, npm-ci and npm-install; actions/cache v4, its npm example keyed on package-lock.json. Not checked: a run on a real runner.",
      "criteriaChecks": [
        {
          "status": "unmet",
          "note": "npm install may resolve other versions than the lockfile, and the key changes with package.json only."
        },
        {
          "status": "unproven",
          "note": "Two runs show a restore; no timing compares a run with the cache and one without it."
        },
        {
          "status": "met",
          "note": "npm test still runs after the install, unchanged."
        }
      ],
      "promiseChecks": [
        {
          "status": "unproven",
          "note": "No timing is shown, only that the cache restored."
        },
        {
          "status": "broken",
          "note": "When package-lock.json and package.json disagree, npm install rewrites the lockfile and installs other versions; npm ci stops instead."
        }
      ],
      "trap": "Two green runs look like proof that nothing moved, but a cache that restores says nothing about which versions it holds.",
      "lineNotes": {
        "8": "The key hashes package.json only: a change in package-lock.json alone keeps the same key, and the old folder comes back.",
        "10": "npm install updates package-lock.json when it disagrees with package.json; npm ci stops with an error and installs the lockfile as written."
      },
      "lessonName": "A cache key that leaves the lockfile out",
      "fix": "Necessary: run npm ci again, so the lockfile decides the versions, and key the cache on package-lock.json. To evaluate: npm ci removes node_modules before it installs, so cache the npm cache folder instead, then measure the gain.",
      "proofNote": "The two runs show the cache restores and the suite passes on what was installed. They do not show which versions those were, nor a run where package-lock.json changed.",
      "ticketNote": "Criterion 1 asks for the lockfile's versions on every run. The claim says the versions hold, and nothing in the evidence shows it."
    }
  }
}
```

Saved at .skillboss/mr-ci-cd-2026-10-22.json.

## What this skill is not

Not a test of your app, not a statement about your app, not a score of
you. A review you play here never approves a merge at your company. The
format is in [../SPEC.md](../SPEC.md).
