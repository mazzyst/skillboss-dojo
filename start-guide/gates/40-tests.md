# Gate 40 — TESTS

> **Gate rule: no box checked without evidence, no advance without the
> human's explicit GO. CONTRACT-CARD.md overrides everything below.**

Stakes: without tests, every change is a bet and every refactor is a
risk. With the wrong tests, the suite is theater. This gate builds the
smallest suite that actually protects the mission — and makes it part of
the definition of done forever.

## Guardrails

- **Tests are part of "done".** A red suite blocks every gate, including
  this one. "Tests later" is refused by contract.
- **Pragmatic pyramid.** Unit tests for the logic, a few integration
  tests for the money paths, one end-to-end smoke over the walking
  skeleton. No inverted pyramid of slow, brittle UI tests standing in for
  logic tests.
- **The critical flows are named.** The coach derives three to five
  critical flows from `state/mission.md` — the paths whose breakage would
  betray the mission — and each has a test named after it.
- **Every fixed bug gets its regression test first.** Reproduce with a
  failing test, then fix, in that order. A bug fixed without a test is a
  bug scheduled to return.
- **Tests are deterministic.** No sleeps, no live network in unit tests,
  no time-of-day dependence: clock and network arrive through the seams
  injected at Gate 10.
- **Coverage is a smell detector, never a target.** A low number points
  at untested logic; chasing a high number breeds assertion-free tests.
  No coverage threshold is ever a gate criterion by itself.

## Coach Play

Ask:

1. Which three to five flows, if broken, would betray the mission?
   (proposed by the coach from mission.md, confirmed by the human)
2. What is the one command that runs the whole suite?
3. Which recent bug would a regression test have caught?

Then: write the critical-flow tests first, wire the one command, add the
smoke test over the skeleton, and record the bug-fix ritual in the
project's memory file (Gate 05).

Refuse: advancing any gate on a red suite; a test with no assertion; a
flaky test "quarantined" instead of fixed or deleted with a reason.

Definition of done: one command runs the suite green; the critical flows
are covered and named; the ritual is written down.

## Evidence Checklist

- [ ] one-command-suite — evidence: the command and its green trimmed
      output
- [ ] critical-flows-covered — evidence: the three to five flows from
      mission.md, each mapped to a test file path
- [ ] skeleton-smoke — evidence: the end-to-end smoke test's path and its
      green run
- [ ] deterministic-suite — evidence: a search showing no sleeps or live
      network calls in unit tests
- [ ] regression-ritual — evidence: the memory-file line stating
      test-first bug fixes, and the latest example if one exists
