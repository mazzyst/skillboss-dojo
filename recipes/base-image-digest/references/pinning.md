# Tags, digests, and where the digest comes from

## The part that needs no reading, because it is how the format works

A container image reference is either `name:tag` or `name@sha256:<digest>`.

- A **tag** is a mutable pointer. The publisher of `node:20-alpine` repoints
  it at new bytes whenever they rebuild, which is the point of that tag.
  Two builds a month apart from the same Dockerfile can produce different
  images, and neither the file nor the build log says so.
- A **digest** is the content address of one exact image. It cannot be
  repointed: if the bytes change, the digest changes, so the reference
  stops resolving rather than silently meaning something else.
- `name` with no tag means `name:latest`, which is the most movable pointer
  of all and is not a statement that the image is recent.

The same reasoning is already written down in this project's own CI, for
GitHub Actions rather than images: *"A tag is a movable pointer: whoever
controls the action can repoint v7 at different code… A SHA cannot be
repointed."* The argument does not change with the artifact.

## What a pin does NOT do

It makes a build repeatable. It does not make the image correct, current or
safe, and it freezes the vulnerabilities along with everything else. A digest
nobody refreshes is an unpatched image with a date on it. That is why gate 60
asks for the pins **and** the journal entry recording the update routine, and
why this recipe can only ever evidence the first half.

## Where the digest comes from, per registry

Each row is either READ, with its date and how it was read, or NOT READ.
A NOT READ row is not a gap to fill by guessing: it means nobody has read
that registry's page for this recipe yet. Read it, add the date, open a
pull request. A wrong row here is worse than a missing one, because a
builder would paste it.

**This table ships with every row NOT READ, on purpose**, and so does the
command column. The recipe was written and its fixtures were proved without
running a registry command or reading a registry's documentation. Printing a
command this recipe has never executed would be guessing in an authoritative
voice — the one thing a reference table must never do. The finder works with
the table exactly as it is: it reports locations and hands the act to a
person who knows their own registry.

| Registry | How to read the digest behind a tag | Digest shown in the web UI? | Read | Date |
|---|---|---|---|---|
| Docker Hub | NOT READ | NOT READ | | |
| GitHub Container Registry (ghcr.io) | NOT READ | NOT READ | | |
| Amazon ECR | NOT READ | NOT READ | | |
| Google Artifact Registry | NOT READ | NOT READ | | |
| Azure Container Registry | NOT READ | NOT READ | | |
| Quay.io | NOT READ | NOT READ | | |

## What to record, whatever the registry says

1. **Where** each base is declared — the Dockerfile and the line.
2. **The update routine** — who refreshes the digests, on what trigger, and
   where that is written down. A location and a habit, never a promise.
