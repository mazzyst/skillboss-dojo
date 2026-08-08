# Carry the fix across branches

**Hall:** Git & Version Control · **Blanks:** 3 · **Par:** 2m00s

A one-commit hotfix landed on main, but the release branch ships tonight and needs exactly that fix — nothing else.

## The artifact

Each run of underscores is one blank. Fill every blank with a token from the pool below; each token is used at most once.

```text
# 1. Move to the branch that ships tonight
git switch release/2.4

# 2. Copy EXACTLY that one commit onto it
git ____________ f00dcafe

# 3. The fix conflicts — keep the resolution and continue
git add services/payment.ts
git cherry-pick ____________

# 4. A bad idea to undo a shared-branch conflict mess:
#    rewriting published history — use ______ instead
```

## The pool

`--continue` · `--proceed` · `--resume` · `cherry-pick` · `merge --squash` · `rebase` · `reset --hard` · `revert`

<details>
<summary>Stuck? Hints (no answers)</summary>

1. The command that replays ONE chosen commit onto your current branch.
2. After staging the resolution, the SAME command resumes its own operation.
3. The undo that ADDS history instead of rewriting what teammates already pulled.

</details>

<details>
<summary><strong>Solution and why it matters</strong> — spoilers</summary>

| # | Answer |
|---|---|
| 1 | `cherry-pick` |
| 2 | `--continue` |
| 3 | `revert` |

**Why it matters**

1. **`cherry-pick`** — cherry-pick applies a single commit's diff as a new commit on the current branch — the surgical tool when a merge would drag everything else along.
2. **`--continue`** — cherry-pick pauses on conflict; staging the fix and running cherry-pick --continue finishes the replay. Committing by hand mid-operation leaves the sequencer dangling.
3. **`revert`** — revert creates a new commit that inverses the bad one — shared history stays intact. Resetting a published branch forces every clone to untangle the rewrite.

</details>

---

Train this live at **[skillboss.dev](https://skillboss.dev)** — seven halls, a new kata every day.
