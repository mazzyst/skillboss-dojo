# Gate 60 — DOCKER

> **Gate rule: no box checked without evidence, no advance without the
> human's explicit GO. CONTRACT-CARD.md overrides everything below.**

Stakes: a container done right makes every environment the same machine;
done wrong it ships your `.env`, runs as root, and rots on an unpinned
base image. Profile-gated: if the stack has no containers, this gate is
waived-by-profile at intake, and reopens the day one appears.

## Guardrails

- **Multi-stage build, minimal runtime.** Build tools stay in the build
  stage; the runtime image carries the app and its runtime deps, nothing
  else. Smaller image, smaller attack surface, faster pulls.
- **Non-root user.** The container process runs as a dedicated user. Root
  in the container is root-shaped risk on the host boundary.
- **`.dockerignore` is a security file.** It excludes `.env`, `.git`,
  local dependency folders, and state. What the build context never sees,
  the image can never leak.
- **Base images are pinned, with an update routine.** A named tag or
  digest, never `latest` — and a written routine (who bumps it, how
  often) so pinning does not become fossilization.
- **A healthcheck is defined.** The container reports its own health so
  the platform can restart it and deploys can verify it (the contract
  lands at Gate 80).
- **Compose is dev/prod parity.** The same images run in development and
  production; environments differ by configuration only, never by
  Dockerfile.

## Coach Play

Ask:

1. What ends up in the image today — and what would `docker history` or
   an image inspection show that should not be there?
2. Who does the container run as?
3. When a base image publishes a security fix, how does this project find
   out?

Then: split the build into stages, add the user, write the
`.dockerignore`, pin the bases with a routine recorded in the journal,
define the healthcheck, and align compose with production shape.

Refuse: `latest` as a base tag; a build context that includes `.env` or
`.git`; a root process "because permissions were annoying".

Definition of done: the image builds from a clean clone, runs non-root,
reports health, and contains nothing the runtime does not need.

## Evidence Checklist

- [ ] multi-stage-minimal — evidence: the Dockerfile's stage names and
      the runtime stage's base
- [ ] non-root-user — evidence: the USER line, and the running process
      owner from a container inspection
- [ ] dockerignore-guards — evidence: the `.dockerignore` path and its
      `.env` / `.git` / deps entries
- [ ] bases-pinned — evidence: the FROM lines with their pins; the
      journal entry recording the update routine
- [ ] healthcheck-defined — evidence: the healthcheck config and one
      passing check output
- [ ] compose-parity — evidence: the compose file showing the same images
      as production, config-only differences
