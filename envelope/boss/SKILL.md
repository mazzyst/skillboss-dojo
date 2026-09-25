---
name: skillboss-boss
description: Use when the person had a conversation with their agent about something that went wrong, or almost did, and wants to turn it into a boss other people can fight in twenty seconds. Answers to plain words such as "forge a boss from this", "make a boss of that" or "that was a trap". Writes one boss file after the person says "forge it". Free, offline, no telemetry.
---

# boss — your conversation becomes something other people can play

Version 0.1.0 · from the SkillBoss Dojo · Apache-2.0 · see [../NOTICE](../NOTICE)

A boss is a trap question written by someone who was trapped for real. A
short scene. Four answers that sound like an agent talking. Three are wrong
but sound sure. One is right. Twenty seconds, one shot, the lesson after.

The conversation stays on this machine. Only the boss file leaves it, and
only when the person takes it somewhere.

## How to speak to the person

- One short sentence per question. One idea per sentence.
- Everyday words, in the person's own language.
- A house word gets a plain explanation the first time it appears.
  A **trap** is a kind of mistake that hurts apps, one of ten.
  The **boss file** is the small text file this skill writes at the end.
- Answer in the same voice. No praise, ever. Say what happened, not how
  well it went.

## What the agent does

1. **TALK.** Read what the person points at: this conversation, a diff, a
   bug, or "what we did today". If there is nothing to read, ask the
   interview questions below, one at a time.
2. **DRAFT.** Fill the boss, and show it after every answer (the card
   grows while you talk):
   - `scene`: at most 280 characters, one line.
   - `shots`: exactly four, at most 120 characters each, one line each.
     Keep the four about the same length: the right one must never stand
     out by its size.
   - `correct`: the index of the one right shot, 0 to 3.
   - `lesson`: at most 280 characters, one line.
   - `difficulty`: `NORMAL` or `HARD`.
   - `villain`: one of the ten trap slugs in
     [references/villains.md](references/villains.md). If none fits, say
     so and stop; never force a trap onto a story.
   - `stack`: one of `nextjs`, `docker`, `github-actions`, `terraform`,
     `azure`. This closed list is the house's own. If none fits, say so and
     stop; never invent a new one.
   - `by`: always `agent+human`.
3. **GUARD.** Run the guard below on every text field, before showing
   anything as final. Put each refusal in `refused`, by field path.
4. **GO.** Show the whole boss and the `refused` list. Wait for the
   person's own words: "forge it".
5. **DOOR.** After "forge it", write the boss to one file,
   `.skillboss/boss-<villain>-<YYYY-MM-DD>.json`, and print the same JSON below
   it. Then say one line: where it is saved, and where to drop it.
6. **ROOM.** Say plainly where a boss can go today: the owner's timing page
   and the owner's inbox. There is no public upload yet.

## The interview

Ask only what the conversation did not already answer.

1. What went wrong, or almost did?
2. Which of the ten traps is it? I can show the ten names.
3. Which tool is your project built on? Pick one from the short list.
4. What did the agent say that looked right but was wrong?
5. Give me two more wrong answers a sure agent would say.
6. Now the right answer, in one line.
7. What should a player remember? Two short lines.
8. Now play it yourself. Answer in one breath.

If an answer is "I don't know", keep it as unknown. Unknown beats a guess.

## The forge, step by step

### The trigger phrases

The skill starts on plain words, never on a command: "forge a boss from
this", "make a boss of that", "that was a trap", "turn this into a boss".

### The agent proposes the trap

Read what the person pointed at, then propose the trap yourself: "I think
the trap is THE OPEN DOOR. Right?" The person says yes, or names another.
Show the ten names only if they ask.

### The agent writes the wrong answers, the person judges

You are good at sounding sure. The person is good at knowing. Write three
wrong answers in your own confident voice: "here is what I would have
said." The person keeps, edits or replaces each one. The person writes or
picks the right one, and confirms that exactly one shot is right.

### Play it first

Show the finished boss as a player sees it: the scene, then the four shots.
The scene is read first, with no clock.
The clock starts when the shots appear: twenty seconds from there.
Ask the person to answer in one breath.
If it takes them more than twenty seconds, ask them to shorten the shots. The true clock is the
timing page; your count is a first check.

### The refusal line

After the guard, say in one line what was removed and where, never what it
was:

    I removed two things: body.scene[credential-shaped], body.shots[1][markup].

Nothing is silent. Nothing is a value.

### Forge it

The GO is two words from the person: "forge it". Then write the file and
say one line:

    Saved at .skillboss/boss-db-exposure-2026-10-03.json. Drop it where the owner said.

Nothing else.

### No login, no handle

The file carries `by: agent+human` and no name. Never ask for a login, an
account or a handle. The person's name goes on later, on the site, from
their own account.

### Forge another

"Forge another" finds the next trap in the same conversation and starts
again from TALK. An expert's afternoon: ten bosses from ten stories.

### The resumable draft

Past ten minutes, offer to stop. Keep the draft in the same file, with
`"draft": true`. The next "forge a boss" reads it and resumes.

### When there is no story

Offer a seed question: "Tell me about the last time your agent said done,
and it was not." The seed helps the person remember. The scene must still
come from the person, never from your imagination.

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

Every text field must be one line with no markup. It must match:

```text
^[^\n\r<>]*$
```

A location (a file path, optionally with a line) is allowed. It must match:

```text
^(?:[A-Za-z0-9_./@+~-]+(?::\d+)?|git:[0-9a-f]{7,40})$
```

The whole file stays under 65536 bytes.

The rules:

- A hit is refused by field path, never by value:
  `body.scene[credential-shaped]`, `body.shots[2][markup]`,
  `body.lesson[too-long]`.
- A location is allowed. A value is not: no key, no token, no password, no
  environment file content, no private address.
- Markup is not allowed: no `<` or `>`, no line break inside a field.
- A refusal removes the field's text and asks the person to rewrite it with
  you. It never guesses a safe version.

## What the human does

- Read every line of the boss.
- Edit anything that is not theirs, or not true.
- Answer the boss themselves against a twenty-second clock before sharing.
- Say "forge it".
- Keep the file. Drop it, or paste the JSON, where the room says.

## What never happens here

- No file is written but the one boss file.
- No value is printed: a location, never a key, a token or a secret.
- No name of a person, a colleague or a client enters the file.
- No code of the person's repository is copied into `scene`.
- The agent never plays a SkillBoss run, and never earns a belt.
- No network call, no telemetry, no background service.
- No claim word, in any field. The words are: certified, certification,
  guaranteed, guarantees, audited, audit-grade, skillboss-verified,
  verified by, secure by default, bulletproof. A boss says what happened;
  it never says an app is safe.

## The output

Filled from brainstorm §15, with a trap and a tool from the closed lists:

```json
{
  "schema": "skillboss.envelope/1",
  "kind": "boss",
  "villain": "db-exposure",
  "stack": "nextjs",
  "by": "agent+human",
  "body": {
    "scene": "Next.js + Supabase. Your agent just added a route that creates orders. It says: ready.",
    "shots": [
      "Wrap the insert in a try/catch and return a clean error",
      "Pass the service_role key to the client to avoid the 401",
      "Check the session and enable row-level access",
      "Cache the route so it absorbs the load at peak time"
    ],
    "correct": 2,
    "lesson": "A route that writes without checking who writes is the open door. The service_role key on the client opens it wide.",
    "difficulty": "HARD"
  },
  "refused": []
}
```

## What this skill is not

Not a test of your app, not a statement about your app, not a score of you.
The format is a draft until its ruling is signed; see [../SPEC.md](../SPEC.md).

From the recipes' own README, and true here too: "A recipe makes a check
green; it does not make an application correct."
