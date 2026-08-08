# Harden the dependency chain

**Hall:** DevSecOps & Security · **Blanks:** 3 · **Par:** 2m00s

A transitive dependency shipped a malicious install hook last night. Make the pipeline immune, not lucky.

## The artifact

Each run of underscores is one blank. Fill every blank with a token from the pool below; each token is used at most once.

```text
supply_chain_policy:
  ci_install: npm ci --______-scripts   # lifecycle hooks never run in CI
  lockfile: committed — the exact resolved tree, or the build fails
  gate: npm ______ --audit-level=high   # known CVEs break the build
  publish: npm publish --____________
  # a verifiable link from the tarball back to this repo and CI run
```

## The pool

`audit` · `checksum` · `ignore` · `licenses` · `outdated` · `provenance` · `scan` · `signature` · `skip`

<details>
<summary>Stuck? Hints (no answers)</summary>

1. Lifecycle hooks are code from strangers — CI must not execute them.
2. The built-in command that checks your resolved tree against the CVE database.
3. A verifiable trail from the published tarball back to the exact source and build.

</details>

<details>
<summary><strong>Solution and why it matters</strong> — spoilers</summary>

| # | Answer |
|---|---|
| 1 | `ignore` |
| 2 | `audit` |
| 3 | `provenance` |

**Why it matters**

1. **`ignore`** — --ignore-scripts stops install-time hooks from running: the exact channel the malicious package used is closed by default.
2. **`audit`** — npm audit --audit-level=high fails the build on known-vulnerable resolutions — the gate is the pipeline, not someone's memory.
3. **`provenance`** — --provenance attaches a signed attestation linking the package to its repo and CI run, so consumers can verify it was not built on a laptop.

</details>

---

Train this live at **[skillboss.dev](https://skillboss.dev)** — seven halls, a new kata every day.
