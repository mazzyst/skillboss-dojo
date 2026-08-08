# Hunt the bad commit

**Hall:** Git & Version Control · **Blanks:** 3 · **Par:** 2m00s

A bug shipped somewhere in the last 40 commits and nobody knows where. Let git find it for you.

## The artifact

Each run of underscores is one blank. Fill every blank with a token from the pool below; each token is used at most once.

```text
# 1. Open the hunt over the suspect range
git ______ start
git bisect bad HEAD

# 2. Mark the release you KNOW was healthy
git bisect ______ v1.4.0

# 3. Let the tests drive — no manual guessing
git bisect ______ ./run-tests.sh
```

## The pool

`bisect` · `blame` · `check` · `exec` · `good` · `rebase` · `run` · `stash`

<details>
<summary>Stuck? Hints (no answers)</summary>

1. Binary-search the history — git halves the suspect range for you.
2. Name the last state you trust — the search needs both ends of the range.
3. Hand the hunt a command; git repeats it at every step and reads the exit code.

</details>

<details>
<summary><strong>Solution and why it matters</strong> — spoilers</summary>

| # | Answer |
|---|---|
| 1 | `bisect` |
| 2 | `good` |
| 3 | `run` |

**Why it matters**

1. **`bisect`** — bisect turns "somewhere in 40 commits" into ~6 checks by binary search; reading diffs one by one is the slow path it replaces.
2. **`good`** — Marking a known-healthy commit bounds the search: bisect needs one bad and one trusted end to halve anything.
3. **`run`** — bisect run executes your test at each step and marks commits from its exit code — automated, reproducible, no human misjudgment mid-hunt.

</details>

---

Train this live at **[skillboss.dev](https://skillboss.dev)** — seven halls, a new kata every day.
