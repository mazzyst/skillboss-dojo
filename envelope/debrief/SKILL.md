---
name: skillboss-debrief
description: Use when the person lived through something that went wrong in their app, or almost did, and wants to tell it so other builders learn from it, without blame. Answers to plain words such as "write a debrief of this", "tell this story" or "debrief what happened". Writes one debrief file after the person says "file it". Free, offline, no telemetry.
---

# debrief — what happened to you becomes a story other builders can use

Version 0.1.4 · from the SkillBoss Dojo · Apache-2.0 · see [../NOTICE](../NOTICE)

A debrief is a short, blameless story: what happened, what worked, what you
would do differently. It is the same form as the story composer of the
SkillBoss Mess Hall, field for field, so the file pastes into it as is.

The conversation stays on this machine. Only the debrief file leaves it,
and only when the person takes it somewhere.

## Your row of the table

The format's table ([../SPEC.md](../SPEC.md), "Which moment becomes which
kind") gives this skill one row: *Something went wrong in the person's own
app, or almost did.* That is a story.

If what the person points at is *The agent gave a confident answer, and it
was wrong*, that is a boss, not a story: the boss skill writes it
([../boss/SKILL.md](../boss/SKILL.md)). If it is *The person made a move
well with their agent, and it matters*, that is a kata: the kata skill
writes it ([../kata/SKILL.md](../kata/SKILL.md)). Say so in one line and
stop. Never write a weak story from a boss.

## How to speak to the person

- One short sentence per question. One idea per sentence.
- Everyday words, in the person's own language.
- A house word gets a plain explanation the first time it appears.
  A **trap** is a kind of mistake that hurts apps, one of ten.
  The **debrief file** is the small text file this skill writes at the end.
- Answer in the same voice. Say what happened, not how well it went.
- Mock the trap, never the builder. Not the person, not a colleague, not
  the agent's user.

## What the agent does

1. **TALK.** Read what the person points at: this conversation, a bug, an
   incident, or "what went wrong this week". If there is nothing to read,
   ask the interview questions below, one at a time.
2. **DRAFT.** Fill the debrief, and show it after every answer:
   - `villainSlug`: one trap slug, at most 64 characters, from the ten in
     [../boss/references/villains.md](../boss/references/villains.md).
     The header's `villain` is the same slug, written twice on purpose: the
     header for the format, the body for the composer. If none fits, say so
     and stop; never force a trap onto a story.
   - `ship`: one line, at most 80 characters: what the app is built with,
     in the person's words ("Next.js + Supabase", "Lovable").
   - `whatHappened`: the story, paragraphs allowed, at most 1500 characters.
   - `whatWorked`: what got it back, paragraphs allowed, at most 800 characters.
   - `doDifferently`: optional, at most 800 characters; what the person
     would do next time, paragraphs allowed.
   - `repoUrl`: optional; a public https link, at most 512 characters, to
     the person's repository. Only if the person confirms it is public: you
     cannot check that, so ask. Never a private link, never a password in
     it.
   - The header's `stack` is one of `nextjs`, `docker`, `github-actions`,
     `terraform`, `azure`. If none fits, say so and leave `ship` to carry
     the tool in words.
   - `by`: always `agent+human`.
3. **GUARD.** Run the guard below on every text field, before showing
   anything as final. Put each refusal in `refused`, by field path.
4. **GO.** Show the whole debrief and the `refused` list. Wait for the
   person's own words: "file it".
5. **DOOR.** After "file it", write the debrief to one file,
   `.skillboss/debrief-<villain>-<YYYY-MM-DD>.json`, and print the same JSON
   below it. Then say one line: where it is saved, and where it goes. If the
   machine has a clipboard tool (`pbcopy`, `wl-copy`, `xclip -selection
   clipboard`, `clip.exe`), copy the same JSON to the clipboard too, and say
   so in the same line. Never open a browser; never call the network, with
   one exception: if the person hands you a slot line ("Send the file to
   https://…/counter/CODE …"), send the same JSON there once, as the body of
   one POST (`curl -sS -X POST -H 'Content-Type: application/json'
   --data-binary @<file> <address>`), and say in one line whether it went.
   Nothing else is sent, and nowhere else.
6. **ROOM.** Say plainly where a debrief can go today: the forge page of the
   SkillBoss site, `/forge`, from the person's own account. Paste the file
   there, drop it on the slot, or open the slot and hand me its line. A
   story is told under its author's handle, so it needs a published builder
   page first. It goes live at once, under the person's handle, in their own
   words.

## The interview

Ask only what the conversation did not already answer.

1. What went wrong, or almost did?
2. Which of the ten traps is it? I can show the ten names.
3. What is your app built with, in your own words?
4. How did you notice?
5. What got it back to working?
6. What would you do differently next time?
7. Is there a public link to the code? It is fine to say no.

If an answer is "I don't know", keep it as unknown. Unknown beats a guess.

### When there is no story

Offer a seed question: "Tell me about the last time your app broke in a way
you did not expect." The seed helps the person remember. The story must
still come from the person, never from your imagination.

### The blameless rule

The composer refuses a story that insults a person, and so does this skill.
A field that holds one of these words is refused by field path, and you
ask the person to retell it:

- English: `idiot`, `stupid`, `clueless`, `deserved`, `incompetent`,
  `lazy`, `fool`, `amateurish`.
- French: `stupide`, `incompétent`, `incompétente`, `incompetente`,
  `minable`, `débile`, `debile`, `crétin`, `crétine`, `cretin`, `cretine`,
  `abruti`, `abrutie`, `imbécile`, `imbecile`, `idiote`.

A word counts only as a whole word, in any case. The list is short on
purpose: the form is the real rule. The story is about the trap and the
fix, never about who was at fault.

### File it

The GO is two words from the person: "file it". Then write the file and
say one line:

    Saved at .skillboss/debrief-db-exposure-2026-10-03.json, and copied. Paste it on the forge page, /forge.

Nothing else.

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

The shape of each field is the composer's own. `ship` is one line with no
markup. It must match:

```text
^[^\n\r<>]*$
```

The three story fields, `whatHappened`, `whatWorked` and `doDifferently`,
may hold paragraphs, and never `<` or `>`. Each must match:

```text
^[^<>]*$
```

The whole file stays under 65536 bytes.

The rules:

- A hit is refused by field path, never by value:
  `body.whatHappened[credential-shaped]`, `body.ship[markup]`,
  `body.whatWorked[blame-word]`.
- A location is allowed. A value is not: no key, no token, no password, no
  environment file content, no private address.
- A refusal removes the field's text and asks the person to rewrite it with
  you. It never guesses a safe version.

## What never happens here

- No file is written but the one debrief file.
- No value is printed: a location, never a key, a token or a secret.
- No name of a person, a colleague or a client enters the file.
- No code of the person's repository is copied into a story field.
- No link but `repoUrl`, and only a public one the person confirmed.
- No network call unless the person hands you a slot line; then one POST,
  the file only, to that address. No telemetry, no background service.
- No claim word, in any field: the list is in
  [../boss/SKILL.md](../boss/SKILL.md), "What never happens here". A
  debrief says what happened; it never says an app is safe.
- The composer's reply-to link to another story is not in the file. It is
  chosen on the site, where the other story lives.

## The output

```json
{
  "schema": "skillboss.envelope/1",
  "kind": "debrief",
  "villain": "db-exposure",
  "stack": "nextjs",
  "by": "agent+human",
  "body": {
    "villainSlug": "db-exposure",
    "ship": "Next.js + Supabase",
    "whatHappened": "My agent added a route that creates orders and said it was ready. The route wrote to the table without checking who was signed in.\n\nI noticed when an order appeared under an account that never placed it.",
    "whatWorked": "I asked the agent to show every table the route could write to. Then I checked the session in the route and turned on row-level access for the orders table.",
    "doDifferently": "Ask the agent who can write before I ask if it works.",
    "repoUrl": "https://example.com/orders-app"
  },
  "refused": []
}
```

## What this skill is not

Not a test of your app, not a statement about your app, not a score of you.
The format is a draft until its ruling is signed; see [../SPEC.md](../SPEC.md).
