# Recover the lost branch

**Hall:** Git & Version Control · **Blanks:** 3 · **Par:** 2m00s

A teammate force-pushed over your feature branch. Your commits are gone from the remote — get them back safely.

## The artifact

Each run of underscores is one blank. Fill every blank with a token from the pool below; each token is used at most once.

```text
# 1. Find the lost commit in your local history
git ______

# 2. Point the branch back at it
git reset ______ a1b2c3d

# 3. Publish without stomping newer teammate work
git push ____________________
```

## The pool

`--force` · `--force-with-lease` · `--hard` · `--mixed` · `--soft` · `cherry-pick` · `log --oneline` · `reflog` · `revert`

<details>
<summary>Stuck? Hints (no answers)</summary>

1. The journal of where YOUR HEAD has been — even after a rewrite.
2. You want the working tree to MATCH the target commit, not keep the wrong state staged.
3. Force — but only if the remote is still where you last saw it.

</details>

<details>
<summary><strong>Solution and why it matters</strong> — spoilers</summary>

| # | Answer |
|---|---|
| 1 | `reflog` |
| 2 | `--hard` |
| 3 | `--force-with-lease` |

**Why it matters**

1. **`reflog`** — reflog records every position HEAD has held locally, so a commit "lost" by a force-push is still reachable from it.
2. **`--hard`** — --hard moves the branch AND resets index + working tree; --soft/--mixed would keep the overwritten state around.
3. **`--force-with-lease`** — --force-with-lease refuses to push if someone else updated the remote since your last fetch; bare --force overwrites blindly.

</details>

---

Train this live at **[skillboss.dev](https://skillboss.dev)** — seven halls, a new kata every day.
