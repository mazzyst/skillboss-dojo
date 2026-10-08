---
name: skillboss-rules
description: Use when the person has learned, the hard way, a few rules they now apply on one stack, and wants their agent to read them. Answers to plain words such as "write my rules", "turn this into a rule for my agent" or "forge my rules for nextjs". Writes one rules file after the person says "forge it". The person copies its lines into their agent's own rules file. Free, offline, no telemetry.
---

# rules — what you learned the hard way becomes lines your agent reads

Version 0.1.0 · from the SkillBoss Dojo · Apache-2.0 · see [../NOTICE](../NOTICE)

A rules file is a few lines for one stack. Each line is one rule the
person now applies, learned the hard way. Each line guards one trap, and
ends in that trap's door, so anyone can go and play it.

The file is for the person's own agent. This skill never writes into the
agent's rules file: it prints the lines, and the person copies them there.

The conversation stays on this machine. Only the rules file is written,
in the person's own project.

## Your row of the table

The format's table ([../SPEC.md](../SPEC.md), "Which moment becomes which
kind") gives this skill one row: *A rule the person now applies on one
stack, learned the hard way.* That is a rules file.

If what the person points at is *The agent gave a confident answer, and it
was wrong*, that is a boss: the boss skill writes it
([../boss/SKILL.md](../boss/SKILL.md)), and a boss may carry one rule of
its own. If it is *Something went wrong in the person's own app, or almost
did*, that is a story: the debrief skill writes it
([../debrief/SKILL.md](../debrief/SKILL.md)). If it is *a move made well*,
that is a kata ([../kata/SKILL.md](../kata/SKILL.md)). Say so in one line
and stop. Never write a weak rules file from another moment.

## How to speak to the person

- One short sentence per question. One idea per sentence.
- Everyday words, in the person's own language.
- A house word gets a plain explanation the first time it appears.
  A **trap** is a kind of mistake that hurts apps, one of ten.
  A **trap door** is the address where that trap can be played:
  `/guild?trap=<villain>`.
  The **rules file** is the small text file this skill writes at the end.
- No praise, ever. Say what a rule makes the agent do.

## What the agent does

1. **TALK.** Ask the one question this skill is for: *which rule do you
   apply now on this stack, because you learned it the hard way?* If there
   is nothing to read, ask the interview questions below, one at a time.
2. **DRAFT.** Fill the file, and show it after every answer:
   - `stack`: one of `nextjs`, `docker`, `github-actions`, `terraform`,
     `azure`. One stack per file. If none fits, say so and stop.
   - `villain`: the trap of the first line, the one the file was born from.
     One of the ten trap slugs in
     [../boss/references/villains.md](../boss/references/villains.md).
   - `lines`: one to ten lines, each at most 160 characters, one line.
     One rule per line, one trap per line. Each line ends in its own trap
     door, `/guild?trap=<villain>`, where `<villain>` is one of the ten
     slugs. A rule says what to do, in words: a place to look, a thing to
     keep, a check to make.
   - `by`: always `agent+human`.
3. **GUARD.** Run the guard below on every line, before showing anything
   as final. Put each refusal in `refused`, by field path.
4. **GO.** Show the whole file and the `refused` list. Wait for the
   person's own words: "forge it".
5. **DOOR.** After "forge it", write the file to
   `.skillboss/rules-<stack>-<YYYY-MM-DD>.json`, and print the same JSON
   below it. Then print the lines alone, one per line, ready to copy. Then
   say one line: where it is saved, and that the person copies the lines
   into their agent's own rules file. Never write into that file yourself.
   Never open a browser; never call the network.
6. **ROOM.** Say plainly that a rules file has no page on the SkillBoss
   site today. It lives in the person's project, and in their agent's rules
   file once they copy it. Each line's door is where anyone can play the
   trap it guards.

## The interview

Ask only what the conversation did not already answer.

1. Which tool is your project built on? Pick one from the short list.
2. What went wrong, or almost did, that taught you a rule?
3. What do you do now, every time? One line, in words.
4. Which of the ten traps does it guard? I can show the names.
5. Is there another rule on the same stack? Ten at most.

If an answer is "I don't know", keep it as unknown. Unknown beats a guess.

## The guard, run before anything is shown

Pure text checks, on this machine. No network, no program to install.

Refuse any line that matches one of these patterns (the SkillBoss
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

Then the second layer, for keys no pattern knows. Split each line on this
pattern:

```text
[\s/\\.,;:()\[\]{}"'=<>|_*\-–—]+
```

Refuse the line if any piece is 24 characters or longer, holds at least one
letter and one digit, and has an entropy of 3 or more. Entropy says how
random a piece looks: for each distinct character, take its share `p` of
the piece, and add up `-p × log2(p)`.

Every line must be one line with no markup. It must match:

```text
^[^\n\r<>]*$
```

The whole file stays under 65536 bytes.

The rules:

- A hit is refused by field path, never by value: `body.lines[2][markup]`,
  `body.lines[0][too-long]`.
- Each line has four more reasons, read on the rule before its door:
  `body.lines[i][door]` (it does not end in a trap door of the ten),
  `body.lines[i][figure]` (a number), `body.lines[i][command]` (a command
  that plays a run, such as a fetch tool or a path into the game), and
  `body.lines[i][claim]` (a claim word). Only the door, with no rule before
  it, is `body.lines[i][empty]`. More than ten lines is `body.lines[too-many]`.
- A location is allowed. A value is not: no key, no token, no password, no
  environment file content, no private address.
- A refusal removes the line and asks the person to rewrite it with you. It
  never guesses a safe version.

## What the human does

- Read every line.
- Edit anything that is not theirs, or not true.
- Say "forge it".
- Copy the lines into their agent's own rules file, if they want to.

## What never happens here

- No file is written but the one rules file. The agent's own rules file is
  never touched by this skill.
- No value is printed: a location, never a key, a token or a secret.
- No name of a person, a colleague or a client enters the file.
- No figure, in any line.
- No command that plays a run: the agent never plays a SkillBoss run, and
  never earns a belt.
- No network call, no telemetry, no background service.
- No claim word, in any line: the list is the boss skill's, in
  [../boss/SKILL.md](../boss/SKILL.md). A rule says what to do; it never
  says an app is safe.

## The output

```json
{
  "schema": "skillboss.envelope/1",
  "kind": "rules",
  "villain": "db-exposure",
  "stack": "nextjs",
  "by": "agent+human",
  "body": {
    "lines": [
      "Check who writes before any route writes, and keep the service_role key on the server. /guild?trap=db-exposure",
      "Read every variable named NEXT_PUBLIC_ as public, because the browser gets it. /guild?trap=secrets",
      "Put a limit on every route anyone can call without signing in. /guild?trap=rate-limiting"
    ]
  },
  "refused": []
}
```

Saved at .skillboss/rules-nextjs-2026-10-03.json. Copy the lines below
into your agent's own rules file.

## What this skill is not

Not a test of your app, not a statement about your app, not a score of
you. The format is in [../SPEC.md](../SPEC.md).
