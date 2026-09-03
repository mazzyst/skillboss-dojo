# Gate 10 — ARCHITECTURE AND DESIGN

> **Gate rule: no box checked without evidence, no advance without the
> human's explicit GO. CONTRACT-CARD.md overrides everything below.**

Stakes: architecture is the set of decisions that are expensive to
reverse, and design is what keeps them changeable afterwards. This gate
makes each of them boring, explicit, and written down — and proves the
whole shape works before features pile onto it.

## Guardrails

- **Boring tech wins by default.** The most boring stack that satisfies
  the mission is the right one. Every exciting choice must beat the
  boring alternative on a mission requirement, in writing, or it loses.
- **One committed diagram.** Components and data flow, in the repository.
  Text or ASCII is fine; a diagram nobody can update is not.
- **Hard boundaries.** UI, business logic, and data access are separated,
  and the dependency points one way: no database call from the UI layer,
  no HTTP awareness inside business logic.
- **Twelve-factor config.** All configuration comes from the environment.
  One `.env.example` is committed with every variable named and no real
  values. Zero configuration constants buried in code.
- **Errors are explicit.** No silent catch anywhere: every caught error is
  handled, logged with context, or rethrown. Fail loud at the boundaries
  — and fail CLOSED on auth paths: when an auth check errors, the answer
  is no, never a pass-through.
- **Dependencies are injected at the seams.** Anything you will want to
  fake in a test — clock, network, storage, randomness — arrives as a
  parameter or a constructor argument, not as a hardwired import in the
  middle of logic. Gate 40 will need exactly these seams.
- **Abstractions are earned, never anticipated.** Rule of three: the first
  duplication is data, the second a hint, the third earns the
  abstraction. No premature microservices, no god object, no pattern
  applied for its name's sake.
- **Irreversible choices get a decision record.** Database, framework,
  hosting model, auth approach: each gets a journal entry — context, the
  options weighed, the choice, the reason. Two paragraphs, not a wiki.
- **The skeleton ships before the features.** The walking skeleton named
  at Gate 00 is built now: one request through every layer, deployable
  shape, proven end to end.

## Coach Play

Ask:

1. For each layer (UI, logic, data): what is the most boring option that
   satisfies the mission? What would justify anything fancier?
2. Which decisions in this project are expensive to reverse?
3. Where does configuration currently live, and what happens on a new
   machine with a fresh clone?
4. What happens today when an auth check or an external call throws?

Then: draw the diagram with the human, write the decision records, set up
the config discipline, fix the silent catches and auth failure modes,
inject the seams the tests will need, and build the walking skeleton.

Refuse: starting a feature before the skeleton runs end to end; any
"we'll split the layers later"; config values pasted into code "for now";
an empty catch block, whatever the excuse; a speculative abstraction with
one caller.

Definition of done: diagram committed, decision records in the journal,
`.env.example` complete, skeleton proven with a command or URL, and the
error and seam boxes evidenced on the real codebase.

## Evidence Checklist

- [ ] diagram-committed — evidence: path of the committed diagram file
- [ ] boundaries-hold — evidence: the module or folder layout showing the
      three layers, plus one example of the dependency direction
- [ ] twelve-factor-config — evidence: path of `.env.example`; a search
      showing no hardcoded config constants in code
- [ ] no-silent-catch — evidence: a search over the codebase for empty or
      swallowing catch blocks, with its clean (or fixed) result
- [ ] auth-fails-closed — evidence: the auth path's error branch, quoted;
      n/a-with-reason if the profile has no user accounts
- [ ] seams-injected — evidence: two examples of an injected dependency
      that a test can fake (clock, network, storage)
- [ ] decision-records — evidence: journal entry dates for each
      irreversible choice
- [ ] skeleton-proven — evidence: the command or URL that exercises the
      walking skeleton end to end, with its trimmed output
