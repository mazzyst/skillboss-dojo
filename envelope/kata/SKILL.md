---
name: skillboss-kata
description: Use when the person and their agent got something right in their project, and want to turn that move into a short practice other people can play. Answers to plain words such as "make a kata of this", "forge a kata" or "show them what we did right". Writes one kata file after the person says "forge it". Free, offline, no telemetry.
---

# kata — a move you made well becomes a practice other people can play

Version 0.1.3 · from the SkillBoss Dojo · Apache-2.0 · see [../NOTICE](../NOTICE)

A kata is a few lines of real work with one line taken out: the line that
does the right thing. Four lines could fill the hole. One is the move.
Three look right and are not. Twenty seconds, one shot, and then the
impact: what the move makes possible.

The conversation stays on this machine. Only the kata file leaves it, and
only when the person takes it somewhere.

## Your row of the table

The format's table ([../SPEC.md](../SPEC.md), "Which moment becomes which
kind") gives this skill one row: *The person made a move well with their
agent, and it matters.* That is a kata.

If what the person points at is *The agent gave a confident answer, and it
was wrong*, that is a boss, not a kata: the boss skill writes it
([../boss/SKILL.md](../boss/SKILL.md)). If it is *Something went wrong in
the person's own app, or almost did*, that is a story: the debrief skill
writes it ([../debrief/SKILL.md](../debrief/SKILL.md)). Say so in one line
and stop. Never write a weak kata from another moment.

## How to speak to the person

- One short sentence per question. One idea per sentence.
- Everyday words, in the person's own language.
- A house word gets a plain explanation the first time it appears.
  A **trap** is a kind of mistake that hurts apps, one of ten.
  The **kata file** is the small text file this skill writes at the end.
- Answer in the same voice. No praise, ever. Say what the move does, not
  how well it was done.

## What the agent does

1. **TALK.** Ask the one question this skill is for: *show me what you did
   right, and why it matters.* Read what the person points at: a file, a
   step of a pipeline, a check, a script. If there is nothing to read, ask
   the interview questions below, one at a time.
2. **DRAFT.** Fill the kata, and show it after every answer:
   - `title`: at most 80 characters, one line.
   - `scenario`: at most 280 characters, one line. Where this runs, and
     what was about to go wrong.
   - `artifact`: at most 12 lines, each at most 120 characters. The lines
     around the move, copied from the person's work. The move's own line
     is replaced by the marker `_____`, exactly once.
   - `fills`: exactly four whole lines, at most 120 characters each, all
     different. One is the removed line. Three look right and do not do
     the move.
   - `correct`: the index of the removed line in `fills`, 0 to 3.
   - `impact`: at most 200 characters, one line, in words. What the move
     makes possible, or what it stops. No number, ever.
   - `guards`: the trap it guards, the same slug as `villain`.
   - `exerciseType`: always `CLOZE`.
   - `villain`: one of the ten trap slugs in
     [../boss/references/villains.md](../boss/references/villains.md),
     except `env-hygiene`, `backups` and `dependencies`. Those three have
     no hall in the Dojo yet, so a kata on them has nowhere to be played.
     Say so and stop; never move the kata to another trap.
   - `stack`: one of `nextjs`, `docker`, `github-actions`, `terraform`,
     `azure`. If none fits, say so and stop.
   - `by`: always `agent+human`.
3. **GUARD.** Run the guard below on every field, before showing anything
   as final. Put each refusal in `refused`, by field path.
4. **GO.** Show the whole kata and the `refused` list. Wait for the
   person's own words: "forge it".
5. **DOOR.** After "forge it", write the kata to one file,
   `.skillboss/kata-<villain>-<YYYY-MM-DD>.json`, and print the same JSON
   below it. Then say one line: where it is saved. If the machine has a
   clipboard tool (`pbcopy`, `wl-copy`, `xclip -selection clipboard`,
   `clip.exe`), copy the same JSON to the clipboard too, and say so in the
   same line. Never open a browser; never call the network, with one
   exception: if the person hands you a slot line ("Send the file to
   https://…/counter/CODE …"), send the same JSON there once, as the body of
   one POST (`curl -sS -X POST -H 'Content-Type: application/json'
   --data-binary @<file> <address>`), and say in one line whether it went.
   Nothing else is sent, and nowhere else.
6. **ROOM.** Say plainly where a kata can go today: the forge page of the
   SkillBoss site, `/forge`, from the person's own account. Paste the file
   there, drop it on the slot, or open the slot and hand me its line. A kata
   carries its author's handle, so it needs a published builder page first.
   The operator reads it before anyone plays it.

## The interview

Ask only what the conversation did not already answer.

1. What did you and your agent get right?
2. Why does it matter? One line, in words, no numbers.
3. Which of the ten traps does it guard? I can show the names.
4. Which tool is your project built on? Pick one from the short list.
5. Show me the lines around the move. Twelve at most.
6. Which one line is the move itself?
7. Give me three lines that look right but do not do it.
8. Now play it yourself. Answer in one breath.

If an answer is "I don't know", keep it as unknown. Unknown beats a guess.

## The forge, step by step

### The move, and only the move

The removed line is the whole point. Pick the one line without which the
right thing does not happen. If two lines do it together, pick the one a
tired builder would leave out.

### The agent writes the three other fills, the person judges

Write three lines in the same style as the artefact: the same language,
the same length, the same indentation. Each must look like it belongs.
None may do the move. Ask the person, line by line: "Would this one also
work?" A fill that also works is thrown away and rewritten. Two identical
fills are refused.

### No value, no real address

The artefact is copied from real work, so read every line twice. A key, a
token, a password or a real server name is refused by line. Replace a
name with one from `example.com`, and a value with a word such as
`PAYMENTS_KEY`. Only a line of the artefact is refused, never the person.

### Play it first

Show the kata as a player sees it: the scenario, then the artefact with
its hole, then the four fills. The clock starts when the fills appear:
twenty seconds from there. If it takes the person more than twenty
seconds, shorten the artefact.

### The refusal line

After the guard, say in one line what was removed and where, never what
it was:

    I removed two things: body.artifact[2][hostname], body.fills[1][markup].

Nothing is silent. Nothing is a value.

### Forge it

The GO is two words from the person: "forge it". Then write the file and
say one line:

    Saved at .skillboss/kata-health-2026-10-03.json, and copied. Paste it on the forge page, /forge.

Nothing else.

### No login, no handle

The file carries `by: agent+human` and no name. Never ask for a login, an
account or a handle.

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

Every text field, and every line of the artefact, must be one line with
no markup. It must match:

```text
^[^\n\r<>]*$
```

The whole file stays under 65536 bytes.

The rules:

- A hit is refused by field path, never by value:
  `body.title[too-long]`, `body.artifact[3][credential-shaped]`,
  `body.fills[2][markup]`.
- The kata has six more reasons:
  `body.artifact[blank]` (not exactly one `_____` line),
  `body.artifact[4][hostname]` (a real server name or address in a line;
  `example.com`, `localhost` and `127.0.0.1` pass),
  `body.fills[duplicate]` (two fills are the same line),
  `body.impact[figure]` (a number in the impact),
  `body.guards[mismatch]` (`guards` is not the file's own trap),
  `body.guards[no-hall]` (the trap has no hall in the Dojo yet).
- The impact never says "secure", "safe" or "verified": `body.impact[claim]`.
- A refusal removes the field's text and asks the person to rewrite it with
  you. It never guesses a replacement.

## What the human does

- Read every line of the kata.
- Say, for each of the three other fills, that it does not also work.
- Play the kata themselves against a twenty-second clock before sharing.
- Say "forge it".
- Keep the file.

## What never happens here

- No file is written but the one kata file.
- No value is printed, and no real server name.
- No name of a person, a colleague or a client enters the file.
- The conversation and the diff never enter the file: only the lines of
  the artefact the person chose.
- No free-text answer: the player picks one of four lines.
- The agent never plays a SkillBoss run, and never earns a belt.
- No network call unless the person hands you a slot line; then one POST,
  the file only, to that address. No telemetry, no background service.
- No claim word, in any field: the list is the boss skill's, in
  [../boss/SKILL.md](../boss/SKILL.md). A kata says what a move does; it
  never says an app is safe.

## The output

A health check that waits for the database, from a Dockerfile:

```json
{
  "schema": "skillboss.envelope/1",
  "kind": "kata",
  "villain": "health",
  "stack": "docker",
  "by": "agent+human",
  "body": {
    "title": "The health check that asks the app, not the container",
    "scenario": "Docker, one Node service behind a load balancer. The container said up while the app inside could not reach its database.",
    "artifact": [
      "FROM node:20-slim",
      "WORKDIR /app",
      "COPY . .",
      "RUN npm ci --omit=dev",
      "_____",
      "CMD [\"node\", \"server.js\"]"
    ],
    "fills": [
      "HEALTHCHECK CMD node healthcheck.js || exit 1",
      "EXPOSE 3000",
      "ENV NODE_ENV=production",
      "USER node"
    ],
    "correct": 0,
    "impact": "The balancer stops sending traffic to a box that cannot answer, and the platform restarts it on its own.",
    "guards": "health",
    "exerciseType": "CLOZE"
  },
  "refused": []
}
```

## More examples

### Valid: the key read that stays on the server

```json
{
  "schema": "skillboss.envelope/1",
  "kind": "kata",
  "villain": "secrets",
  "stack": "nextjs",
  "by": "agent+human",
  "body": {
    "title": "The key read that stays on the server",
    "scenario": "Next.js route that calls a payments service. The agent first put the key where the browser could read it.",
    "artifact": [
      "export async function GET() {",
      "_____",
      "  const res = await fetch(PAYMENTS_URL, { headers: { authorization: key } });",
      "  return Response.json(await res.json());",
      "}"
    ],
    "fills": [
      "  const key = process.env.PAYMENTS_KEY;",
      "  const key = process.env.NEXT_PUBLIC_PAYMENTS_KEY;",
      "  const key = window.localStorage.getItem('key');",
      "  const key = document.cookie;"
    ],
    "correct": 0,
    "impact": "The key stays on the server. The browser sees the answer, never what opened the door.",
    "guards": "secrets",
    "exerciseType": "CLOZE"
  },
  "refused": []
}
```

### Refused: `body.guards[no-hall]`

A backup move is real work, but `backups` has no hall in the Dojo yet.

```json
{
  "schema": "skillboss.envelope/1",
  "kind": "kata",
  "villain": "backups",
  "stack": "github-actions",
  "by": "agent+human",
  "body": {
    "title": "The restore that runs every week",
    "scenario": "A nightly dump to storage. Nobody had ever restored one.",
    "artifact": ["on:", "  schedule:", "_____", "jobs:", "  restore:"],
    "fills": ["    - cron: '0 3 * * 1'", "    - cron: 'never'", "  push:", "  pull_request:"],
    "correct": 0,
    "impact": "A backup that was never restored is a hope. This one is tried each week.",
    "guards": "backups",
    "exerciseType": "CLOZE"
  },
  "refused": []
}
```

### Refused: `body.fills[duplicate]`

Two fills are the same line, so the player has only three choices.

```json
{
  "schema": "skillboss.envelope/1",
  "kind": "kata",
  "villain": "rate-limiting",
  "stack": "nextjs",
  "by": "agent+human",
  "body": {
    "title": "The limit before the login check",
    "scenario": "A login route that anyone could call as fast as they liked.",
    "artifact": ["export async function POST(req) {", "_____", "  return login(req);", "}"],
    "fills": [
      "  await limiter.check(req);",
      "  await limiter.check(req);",
      "  console.log(req.url);",
      "  req.headers.get('user-agent');"
    ],
    "correct": 0,
    "impact": "A script that guesses passwords meets a wall after a few tries, and real people still get in.",
    "guards": "rate-limiting",
    "exerciseType": "CLOZE"
  },
  "refused": []
}
```

### Refused: `body.artifact[1][hostname]`

A real server name was copied into the artefact. Use a name from
`example.com` instead.

```json
{
  "schema": "skillboss.envelope/1",
  "kind": "kata",
  "villain": "db-exposure",
  "stack": "terraform",
  "by": "agent+human",
  "body": {
    "title": "The database with no public address",
    "scenario": "Terraform for a managed Postgres. The first draft opened it to the whole internet.",
    "artifact": [
      "resource \"db_instance\" \"main\" {",
      "  host = \"orders-db.acme-shop.com\"",
      "_____",
      "}"
    ],
    "fills": [
      "  publicly_accessible = false",
      "  publicly_accessible = true",
      "  deletion_protection = false",
      "  skip_final_snapshot = true"
    ],
    "correct": 0,
    "impact": "The database answers only the app next to it. A stranger on the internet finds no door.",
    "guards": "db-exposure",
    "exerciseType": "CLOZE"
  },
  "refused": []
}
```

## What this skill is not

Not a test of your app, not a statement about your app, not a score of
you. The format is in [../SPEC.md](../SPEC.md).
