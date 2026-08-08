# Ship on push, not on memory

**Hall:** Pipelines & CI/CD · **Blanks:** 3 · **Par:** 2m00s

Your app deploys only when you remember to run the command. Wire a pipeline that installs from the lockfile, runs tests, and deploys automatically — but only when tests pass.

## The artifact

Each run of underscores is one blank. Fill every blank with a token from the pool below; each token is used at most once.

```text
name: deploy-on-push
on:
  push:
    branches:
      - main
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      # install exactly what the lockfile recorded — fail if it has drifted
      - run: npm ____
      - run: npm test
  deploy:
    needs: ____
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm run ____
```

## The pool

`build` · `ci` · `deploy` · `install` · `start` · `test` · `update`

<details>
<summary>Stuck? Hints (no answers)</summary>

1. You want the install to respect the exact versions your lockfile recorded — not to discover newer ones mid-build.
2. The deploy job should only start after a specific earlier job finishes successfully — name the job it must wait for.
3. The run line invokes a script by name — it must match the script your package.json defines as the release step, the one that actually ships the app.

</details>

<details>
<summary><strong>Solution and why it matters</strong> — spoilers</summary>

| # | Answer |
|---|---|
| 1 | `ci` |
| 2 | `test` |
| 3 | `deploy` |

**Why it matters**

1. **`ci`** — npm ci installs exactly what is in package-lock.json and fails if the file is out of sync. npm install may quietly update versions, so what runs in the pipeline could differ from what you tested locally.
2. **`test`** — needs: test makes the deploy job wait for the test job to pass before it runs. Without this field, both jobs start in parallel and deploy can go out before tests even finish.
3. **`deploy`** — npm run deploy invokes the deploy script defined in package.json, which is the project-specific command that actually ships the app. npm start or npm build would run the wrong script and not publish anything.

</details>

---

Train this live at **[skillboss.dev](https://skillboss.dev)** — seven halls, a new kata every day.
