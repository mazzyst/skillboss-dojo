# Move the key out of the code

**Hall:** DevSecOps & Security · **Blanks:** 3 · **Par:** 2m00s

Your agent dropped the API key straight into the source file — it works, but anyone who reads the repo reads the key. Move it into an environment variable so the code never holds the secret.

## The artifact

Each run of underscores is one blank. Fill every blank with a token from the pool below; each token is used at most once.

```text
# .env  (never commit this file)
API_KEY=sk-abc123xyz

# .env.example  (commit this — it shows what keys are needed)
API_KEY=____

# .gitignore
____

# In your app code: read from the environment, not from the file
api_key = os.environ.get('____')
```

## The pool

`.env` · `.env.example` · `API_KEY` · `API_SECRET` · `SECRET_KEY` · `os.environ` · `sk-abc123xyz` · `your-api-key-here`

<details>
<summary>Stuck? Hints (no answers)</summary>

1. This file is a template for the next developer — it must show that a value is required without leaking what that value actually is.
2. Git will keep tracking any file it already knows about unless you tell it to ignore that specific file. The entry here must match the exact filename that holds the real secret.
3. The code should ask the environment for the same name that is defined in both the .env and the .env.example files — consistency between those three places is what makes the setup work.

</details>

<details>
<summary><strong>Solution and why it matters</strong> — spoilers</summary>

| # | Answer |
|---|---|
| 1 | `your-api-key-here` |
| 2 | `.env` |
| 3 | `API_KEY` |

**Why it matters**

1. **`your-api-key-here`** — A placeholder like 'your-api-key-here' tells the next person (or agent) what to fill in without exposing any real credential. Leaving it blank looks like the variable has no value; copying the real key defeats the entire purpose of having a separate .env file.
2. **`.env`** — Adding '.env' to .gitignore tells Git to skip that file entirely, so the real key never enters the commit history. Ignoring '.env.example' would hide the template file that every new contributor needs to see.
3. **`API_KEY`** — 'API_KEY' matches the variable name set in .env, so the runtime value flows through automatically. Using a different name — like 'api_key' in lowercase — would cause the lookup to return nothing, silently breaking the app without any error about the key being wrong.

</details>

---

Train this live at **[skillboss.dev](https://skillboss.dev)** — seven halls, a new kata every day.
