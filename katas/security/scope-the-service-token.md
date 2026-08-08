# Scope the service token

**Hall:** DevSecOps & Security · **Blanks:** 3 · **Par:** 2m00s

The CI deploy token can read every repo and write to prod AND staging — and it never expires. Shrink the blast radius.

## The artifact

Each run of underscores is one blank. Fill every blank with a token from the pool below; each token is used at most once.

```text
token_policy:
  principle: "________ privilege"          # grant the minimum that works
  scope: "deploy:staging ONLY for the staging pipeline"
  lifetime: ____________                    # a leak should expire by itself
  storage: the CI secret store — never a repo, never a laptop
  review: "unused permissions removed on a schedule"
  breach_drill: "rotate + ______ the old token, then read its audit trail"
```

## The pool

`archive` · `least` · `permanent` · `reissue` · `revoke` · `short-lived` · `unlimited` · `zero`

<details>
<summary>Stuck? Hints (no answers)</summary>

1. The two-word principle every scoping decision comes back to.
2. The property that makes a stolen credential rot on its own.
3. Rotation issues the new secret; this kills the old one NOW.

</details>

<details>
<summary><strong>Solution and why it matters</strong> — spoilers</summary>

| # | Answer |
|---|---|
| 1 | `least` |
| 2 | `short-lived` |
| 3 | `revoke` |

**Why it matters**

1. **`least`** — Least privilege bounds the blast radius by construction: a staging token that cannot touch prod turns a leak from an incident into an annoyance.
2. **`short-lived`** — Short-lived credentials mean a leaked token is dead by the time it circulates; eternal tokens turn every old log file into a standing risk.
3. **`revoke`** — Rotating without revoking leaves the compromised token alive until expiry — revocation is the step that actually ends the breach window.

</details>

---

Train this live at **[skillboss.dev](https://skillboss.dev)** — seven halls, a new kata every day.
