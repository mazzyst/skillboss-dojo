# Where a budget lives, per platform

Each row is either READ, with its date and how it was read, or NOT READ.
A NOT READ row is not a gap to fill by guessing: it means nobody has read
that platform's page for this recipe yet. Read it, add the date, open a
pull request. A wrong row here is worse than a missing one, because a
builder would act on it.

How a row was read: `[L]` the platform's own page was read; `[E]` a search
excerpt of it, not the page itself; `[G]` the platform's own source code.

**This table ships with every row NOT READ, on purpose.** The recipe was
written and its fixtures were proved without reading a single console page,
and publishing a row nobody read would be the one failure this directory
cannot afford. The finder works with the table exactly as it is: it reports
locations from the repository and sends the human to their own console.

| Platform | Budget or alert exists? | Notifies whom? | Also offers a hard cap? | Read | Date |
|---|---|---|---|---|---|
| AWS | NOT READ | NOT READ | NOT READ | | |
| Google Cloud | NOT READ | NOT READ | NOT READ | | |
| Azure | NOT READ | NOT READ | NOT READ | | |
| Vercel | NOT READ | NOT READ | NOT READ | | |
| Netlify | NOT READ | NOT READ | NOT READ | | |
| Render | NOT READ | NOT READ | NOT READ | | |
| Fly.io | NOT READ | NOT READ | NOT READ | | |
| Railway | NOT READ | NOT READ | NOT READ | | |
| Supabase | NOT READ | NOT READ | NOT READ | | |
| Cloudflare | NOT READ | NOT READ | NOT READ | | |

## Two things to record, whatever the platform says

1. **Where** the budget is configured — a location, never the amount.
2. **Which role** receives the notification — a role, never a person's name
   and never an address.

## The question the table cannot answer

Whether anyone reads what the alert sends. No platform page can tell you
that, and neither can this recipe. If the answer is "nobody", the budget is
documentation rather than a control, and the honest place to write that down
is your exposure sheet.
