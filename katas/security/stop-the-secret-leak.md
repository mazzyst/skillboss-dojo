# Stop the secret leak

**Hall:** DevSecOps & Security · **Blanks:** 3 · **Par:** 2m00s

A database password just showed up in a pull request diff. Contain it — in the right order.

## The artifact

Each run of underscores is one blank. Fill every blank with a token from the pool below; each token is used at most once.

```text
# 1. FIRST — assume it is compromised
______ the exposed credential

# 2. Remove the file from tracking and block re-adds
git rm --cached .env && echo ".env" >> ____________

# 3. Keep the next leak out of every future PR
pre-commit hook: run ____________
```

## The pool

`.dockerignore` · `.env.example` · `.gitignore` · `delete` · `encrypt` · `eslint` · `gitleaks` · `prettier` · `rotate`

<details>
<summary>Stuck? Hints (no answers)</summary>

1. Deleting the file does not un-see the value. What makes the OLD value worthless?
2. The file that keeps files OUT of tracking from now on.
3. A scanner that fails the commit when it SEES a credential shape.

</details>

<details>
<summary><strong>Solution and why it matters</strong> — spoilers</summary>

| # | Answer |
|---|---|
| 1 | `rotate` |
| 2 | `.gitignore` |
| 3 | `gitleaks` |

**Why it matters**

1. **`rotate`** — Rotation is step one: once a secret has been visible anywhere, only issuing a new one and revoking the old removes the risk — history rewrites do not.
2. **`.gitignore`** — .gitignore prevents the untracked env file from ever being staged again; rm --cached alone leaves it one `git add .` away.
3. **`gitleaks`** — A secret scanner in the pre-commit/CI path catches the next leak before it reaches the repo — process beats vigilance.

</details>

---

Train this live at **[skillboss.dev](https://skillboss.dev)** — seven halls, a new kata every day.
