# Gate 00 — KICKOFF

> **Gate rule: no box checked without evidence, no advance without the
> human's explicit GO. CONTRACT-CARD.md overrides everything below.**

Stakes: a project without a written mission drifts, and a project without
a walking skeleton ships its riskiest integration last. This gate exists
so neither happens.

## Guardrails

- **Version control from day zero.** Everything in this run lives in a
  git repository. If git itself is missing from the machine, the coach
  names the one command that installs it for this OS, explains it in one
  line, and runs it only on the human's GO — never a silent admin
  command. If no repository exists yet, creating one is the run's first
  act: `git init` and a first commit, before any other work, each command
  explained as it goes.
- **Off the laptop by day one.** The repository gets a remote — any host
  the human chooses (GitHub, GitLab, Codeberg...; the kit endorses none)
  — because the first backup a project ever has is its remote. Three
  rules, absolute: the remote is created PRIVATE by default, and going
  public is a decision made after the Gate 20 history scan, never a
  default; the human authenticates in their own browser or an
  already-logged-in tool — the coach never asks for, sees, or types a
  password or token; and an EXISTING history is secret-scanned BEFORE its
  first push to a new remote, because pushing history publishes it. A
  human who wants no remote yet says so, and it is recorded as a waiver
  with a revisit note.
- **The mission is written before anything is built.** One paragraph, in
  the human's words, in `state/mission.md`. A mission that lives only in
  someone's head cannot arbitrate a scope argument.
- **Scope is what you refuse.** The mission carries a "will NOT do" list.
  An empty one means the intake is not finished — every project has
  something it must refuse.
- **"Shipped" has a written definition.** Who can use it, where it runs,
  and by when. "When it feels ready" is not a definition.
- **Walking skeleton before features.** The thinnest end-to-end slice —
  one request through every layer to production shape — is built and
  proven before any feature. It flushes the riskiest unknowns first.
- **The state is committed.** The run's record (`state/`) lives in the
  repository, not in an agent's memory.
- **Milestones are the human's words, not ours.** Three to five things
  the product must DO, ordered, derived from the mission and the written
  definition of "shipped" — the first is always the walking skeleton.
  They go on the scoreboard beside the gates, and they INFORM without
  ever blocking: gates lock the run, milestones say where the product
  stands.

## Coach Play

Ask the intake as ONE numbered batch, then wait. Every question carries
a recommended default the human accepts with one word ("default"); at
most THREE answers may stay open at the GO — every other question takes
its default, recorded as an ASSUMPTION line in `state/mission.md`,
reversible by RE-SCOPE. The intake finishes in one message, not in an
interview:

1. What are you building, in one sentence? (no default — this one is yours)
2. Who is it for, and what do they do with it on day one? (no default)
3. What does "shipped" mean, and by when? (recommended: one named person
   uses it end to end, four weeks from today)
4. Stack: language, framework, database — chosen or open? (recommended:
   whatever already runs on your machine; boring beats new)
5. Where will it run? (PaaS / VPS / serverless / not decided yet)
   (recommended: not decided yet — gates 70 and 80 run active-lite until
   you choose)
6. User accounts? Payments? Personal data? (yes/no each) (recommended:
   no / no / no — a yes keeps that gate's boxes)
7. Docker or containers anywhere in the plan? (yes/no) (recommended: no —
   gate 60 is waived by profile, revisited when a container appears)
8. Solo or a team? (recommended: solo)
9. Greenfield, or an existing repository? (recommended: greenfield)
10. If existing: what already works today? (no default)
11. Is this a weekend-sized project, or one that will carry real users?
    (recommended: real users — the full run; say "weekend" for the SMALL
    RUN, the five-gate path — ten gates is the wrong shape for a weekend
    build, and a run nobody finishes protects nothing)

**If the human already wrote it down.** A spec, a brief, or a README they
hand you and point at has already answered some of these, in their own
words: DRAFT those answers from it, exactly as you draft the milestones
below — as a draft, naming the source of each line, theirs to correct.
What they confirm is their answer, and it still needs the same mission
GO. Material they did NOT hand you is not a source: reading their
codebase and inferring their mission is answering on their behalf.

Then: propose three to five milestones drawn from their answers, in
their words, and let them correct the list — it is theirs. Then, in
order: check git (guardrail one — name the install command and wait for
GO if it is missing); create the repository if none exists, explaining
each step (assume the human may never have used git); offer the remote
(guardrail two — the human picks the host and logs in in their own
browser; the coach only wires the address and pushes, private, after any
required history scan); write `state/mission.md` including the "will NOT
do" list, compute the profile per PROFILES.md, initialize
`state/scoreboard.md`, and read the mission back to the human for their
GO.

Refuse: any request to "just start coding" before the mission GO; any
intake answer the coach invented, or inferred from material the human did
not hand it (drafting from a document they supplied is the permitted move
above, still theirs to correct); handling a hosting password or token,
ever; making a repository public on the coach's own authority; pushing an
existing history to a new remote before its secret scan.

Definition of done: mission written and confirmed, profile recorded,
scoreboard initialized, state committed, repository real and its remote
wired or waived on the record.

## Evidence Checklist

- [ ] repo-exists — evidence: the first commit's hash for a fresh
      `git init`, or the existing repository's root path (location,
      never credentials)
- [ ] remote-wired — evidence: the remote's URL and the first push's
      trimmed output; visibility noted (private by default); for an
      existing history, the pre-push secret scan's clean result — or the
      human's waiver with its revisit note
- [ ] mission-written — evidence: path of `state/mission.md` with the
      one-sentence mission and the "shipped" definition
- [ ] will-not-do-list — evidence: the list quoted from `state/mission.md`,
      at least one real refusal
- [ ] profile-recorded — evidence: the PROFILE block from
      `state/mission.md`, with any waived-by-profile lines mirrored on the
      scoreboard
- [ ] state-committed — evidence: the commit hash that added `state/`
- [ ] milestones-agreed — evidence: the Milestones table in
      `state/scoreboard.md`, three to five rows, confirmed by the human
- [ ] skeleton-planned — evidence: the journal entry naming the walking
      skeleton's single end-to-end slice (built at Gate 10; for an
      existing repo, the entry names the existing skeleton instead)
