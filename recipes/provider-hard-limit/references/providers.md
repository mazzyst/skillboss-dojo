# Where the hard limit lives, per provider

Each row is either READ, with its date and how it was read, or NOT READ.
A NOT READ row is not a gap to fill by guessing: it means nobody has read
that provider's page for this recipe yet. Read it, add the date, open a
pull request. A wrong row here is worse than a missing one, because a
builder would act on it.

How a row was read: `[L]` the provider's own page was read; `[E]` a search
excerpt of it, not the page itself; `[G]` the provider's own source code.
Every read row was read on 2026-09-20 for the SkillBoss study, and **must
be re-read before you rely on it**: consoles change.

| Provider | Enforced limit exists? | Level it applies to | Per end-user limit? | Read | Date |
|---|---|---|---|---|---|
| OpenAI | yes — a hard spend limit | organisation and project | no; not per key, not per end user | `[L]` | 2026-09-20 |
| Anthropic | yes — a spend limit; requests fail once reached | organisation and workspace | no; not per key | `[L]` | 2026-09-20 |
| Vercel AI Gateway | yes — budgets | team, project, API key, member | by key or member, not by your end user | `[L]` | 2026-09-20 |
| Cloudflare AI Gateway | yes — cost-based spend limits | gateway; can key on a `user_id` you pass as metadata | yes, when you pass the id | `[E]` | 2026-09-20 |
| OpenRouter | yes — a credit limit per key; in-flight holds | key | one key per user would be needed | `[L]` | 2026-09-20 |
| Helicone | a rate-limit policy in cents, per user segment | policy header | yes, via the policy | `[E]` | 2026-09-20 |
| Google Gemini API / Vertex | NOT READ | | | | |
| Mistral | NOT READ | | | | |
| Cohere | NOT READ | | | | |
| Groq | NOT READ | | | | |
| Together | NOT READ | | | | |
| Azure OpenAI | NOT READ — Azure budgets alert, they do not stop consumption; that is a different object | | | | |
| AWS Bedrock | NOT READ | | | | |

Two things every row leaves out on purpose: the amount, which is yours, and
what the limit EXCLUDES, which is the provider's business and changes. Read
the exclusions on the provider's page the day you set the limit, and write
them in your exposure sheet.
