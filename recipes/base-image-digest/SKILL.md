---
name: skillboss-base-image-digest
description: Use when the user asks whether their container builds are repeatable, mentions pinning a base image, or a Pre-flight report shows deps.floating-base-image. Reads every Dockerfile and says, for each BASE image, whether it is pinned by a digest or named by a tag that can move. Distinguishes a build stage from a base image. Changes no code, reaches no registry, and invents no digest. Free, offline, no telemetry.
---

# base-image-digest — a tag is a pointer, a digest is not

Version 0.1.0 · from the [SkillBoss Dojo](https://github.com/mazzyst/skillboss-dojo) · Apache-2.0 · see [../NOTICE](../NOTICE)

`FROM node:20-alpine` is a different image this month than it was last month,
and nothing in your repository records which one built the thing now running.
A tag is a pointer its publisher can repoint. A digest cannot be repointed.
That gap is the whole finding, and it is the difference between a build you
can reproduce and a build you can only re-run.

It is not a security claim. A pinned digest makes a build repeatable; it does
not make the image safe, and a digest nobody ever refreshes is an unpatched
image with a date on it. Gate 60 asks for both — the pins AND the journal
entry recording your update routine — and this recipe can only see the first.

## What the agent does

1. Run the finder, read-only. It reads every Dockerfile and names each BASE
   image as a location and a state.

       node scripts/find-bases.mjs <path-to-the-repository>

2. Read each state. `PINNED BY DIGEST` is the only one that evidences the
   box. `FLOATING` and `UNRESOLVED` do not, and the finder withholds the
   gate line while any base is either.
3. If nothing was found, say so plainly and stop. No Dockerfile is NOT no
   base image — a platform that builds your image for you leaves nothing
   here to read, and the agent cannot see what it chose.

## What the human does

4. For each floating base, ask **your own registry** for the digest behind
   the tag, and write it in as `image@sha256:…`.
5. Record the update routine in your journal: who refreshes these digests,
   and on what trigger. Gate 60 asks for it in the same breath as the pins,
   and it is the half no file can show.

**This recipe does not name the command for step 4.** Not because it is
secret, but because it has not run one: a recipe that prints a command it has
never executed is guessing in an authoritative voice. See
[references/pinning.md](references/pinning.md), whose registry rows ship NOT
READ for the same reason.

## What this finder does not see, and says so

- An image built with no Dockerfile in the repository — a buildpack or a
  managed builder chooses a base this finder never sees.
- A base chosen by a build argument (`FROM ${BASE}`). The builder supplies it
  and the file does not say what. Marked `UNRESOLVED`, never assumed pinned:
  an unknown is not a pass.
- What a digest actually contains, and whether anyone refreshes it.

**The trap it is built to avoid.** In a multi-stage file, `FROM builder`
names the stage declared above it, not an image any registry holds. A finder
that reads every `FROM` as a base reports a phantom image and teaches its
reader to ignore it — the failure the previous recipe in this directory
shipped and corrected. Stage names declared earlier in the same file are
tracked and skipped, and a fixture plants exactly that case.

## What never happens here

- No file is written by this recipe. It does not pin anything for you.
- No network call, to a registry or anywhere else.
- No digest is ever printed that was not already in the file, and a fixture
  asserts the output carries none.

## The line to hand back

    bases-pinned — evidence: the FROM lines at <locations>, each pinned by digest, read <date>

It fits gate 60's box and the Pre-flight rule `deps.floating-base-image`. It
is withheld entirely while any base is floating or unresolved, because the
sentence says "each", and "each" has to be true.

## What this recipe is not

Not a vulnerability scan, not a guarantee, not a statement about your
application. It reads four words on a line and tells you whether they can
change under you. A recipe makes a check green; it does not make an
application correct. If you are stuck, ask your coach: say Hello World.
