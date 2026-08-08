# Kill the flaky suite

**Hall:** Pipelines & CI/CD · **Blanks:** 3 · **Par:** 2m00s

The pipeline fails one run in five on the same test — and the team has started clicking "re-run" without reading. Stop the rot.

## The artifact

Each run of underscores is one blank. Fill every blank with a token from the pool below; each token is used at most once.

```text
flaky_policy:
  detect: "same test, pass↔fail on identical ______"   # the definition of flaky
  first_response: ____________ the test from the gate   # visible, time-boxed
  fix_owner: assigned within 24h — a ticket, not a hope
  root_causes_checked:
    - shared state between tests
    - real clocks and real ________                     # replace both with fakes
  never: "auto-retry as the permanent fix"
```

## The pool

`assertions` · `branch` · `commit` · `delete` · `logging` · `network` · `quarantine` · `retry`

<details>
<summary>Stuck? Hints (no answers)</summary>

1. Flaky means the VERDICT changes while the input does not.
2. Take it out of the blocking path — loudly, with an expiry date.
3. The other non-deterministic dependency tests keep reaching for.

</details>

<details>
<summary><strong>Solution and why it matters</strong> — spoilers</summary>

| # | Answer |
|---|---|
| 1 | `commit` |
| 2 | `quarantine` |
| 3 | `network` |

**Why it matters**

1. **`commit`** — A test is flaky when the same commit yields different verdicts — the signal carries no information about the code, so the gate is lying to you.
2. **`quarantine`** — Quarantining restores trust in the gate while the fix is owned and time-boxed; deleting hides the coverage, and leaving it in teaches everyone to ignore red.
3. **`network`** — Real clocks and real network calls are the classic flake sources: both vary run to run. Fake timers and stubbed I/O make the test's world deterministic.

</details>

---

Train this live at **[skillboss.dev](https://skillboss.dev)** — seven halls, a new kata every day.
