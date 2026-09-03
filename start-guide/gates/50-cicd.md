# Gate 50 — CI/CD

> **Gate rule: no box checked without evidence, no advance without the
> human's explicit GO. CONTRACT-CARD.md overrides everything below.**

Stakes: a pipeline is the project's immune system — it catches what
humans forget, on every push, without being asked. This gate makes green
cheap, red loud, and the artifact trustworthy.

## Guardrails

- **One command to green.** A single script runs lint plus tests locally,
  and CI runs exactly that script — never a parallel set of steps that
  can drift from what developers run. The same command the `pre-push`
  guard runs (Gate 05): if those three ever diverge, the floor is gone.
  `hooks/ci-checks.yml` is a ready floor to copy — no third-party action,
  so it works anywhere and recommends no vendor.
- **CI on every push.** Not on request, not nightly-only. A red default
  branch is an incident to fix now, not a mood to live with.
- **Stage order: lint, test, build, scan, artifact.** Cheap checks fail
  first; the security scan (dependency audit, secret scan) runs before
  anything is published.
- **CI secrets live in the platform's vault.** Never in the pipeline
  YAML, never in the repository — the Gate 20 discipline extends to the
  pipeline itself.
- **Branch protection once CI exists.** The default branch requires the
  pipeline green before merge. Profile-gated for a solo builder with no
  deploy target: recorded n/a-with-reason until either changes.
- **Build once, promote.** The artifact is built one time and promoted
  through environments. Rebuilding per environment means testing one
  artifact and shipping another.

## Villains at this gate

The house names the failures these boxes hold back — ten in all, one per
Ship Check system, each with a drill that is free and needs no signup.
Faced here one at a time; faced together at Gate 90.

- **THE ROTTEN PLANK** — an unpinned or unmaintained dependency on the
  path. The audit in the scan stage is where it is caught. Drill:
  https://skillboss.dev/demo/dependencies

## Coach Play

Ask:

1. What is the one command today, and does CI run exactly it?
2. What happens on a red default branch — who notices, and how fast?
3. Where do the pipeline's secrets live right now?

Then: wire the script, point CI at it, order the stages, move any secret
into the vault, enable protection per the profile, and make the build
step produce one promotable artifact.

Refuse: a CI config that duplicates the local commands instead of calling
them; a secret in pipeline YAML "because it is just staging"; a skip-CI
label used to merge red.

Definition of done: a push triggers the pipeline, the pipeline runs the
one command, and the artifact it produces is the one that will ship.

## Evidence Checklist

- [ ] one-command-wired — evidence: the script path, and the CI config
      line that invokes it
- [ ] ci-on-push — evidence: the CI config trigger block; a link or ID of
      the latest run on the default branch
- [ ] stage-order — evidence: the pipeline stages as configured, in order
- [ ] pipeline-secrets-vaulted — evidence: a search over the CI config
      showing no secret values; the vault's variable names (location,
      never value)
- [ ] branch-protection — evidence: the protection setting on the default
      branch; n/a-with-reason per the profile
- [ ] build-once-promote — evidence: the config showing the artifact
      built in one stage and reused, not rebuilt
