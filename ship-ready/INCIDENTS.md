# The incident ledger

Real incidents from the vibe-coding wave — blameless, cited, and each
one mapped to the reflex that would have stopped it. The traps are the
villains here; the builders never are. Figures are counts or published
samples, sourced below — never folklore.

Know an incident that belongs here, with a source? Pull requests
welcome.

---

## 2025-03 — The build-in-public SaaS that got found

A builder shipped a SaaS with an AI coding editor and shared the journey in a thread that reached roughly two million views. Within days he reported it plainly himself: API keys maxed out, subscriptions bypassed, rows appearing in the database. The transparency made it the defining incident of the vibe-coding wave — and the clearest case study in what ships without a floor.

**The villain:** THE FLOOD (RATE LIMITS)
**The reflex:** Per-IP limits on auth and every public POST, server-side auth on every mutation, and keys that never reach the client.
**Train it:** https://skillboss.dev/demo/rate-limiting

Sources:
- https://x.com/leojr94_/status/1901560276488511759
- https://pivot-to-ai.com/2025/03/18/guys-im-under-attack-ai-vibe-coding-in-the-wild/

## 2025-05 — The open door that became a CVE

A researcher scan of Lovable-built projects found 303 endpoints across 170 apps readable without logging in — names, payment status, API keys. The missing row-level-security default was assigned CVE-2025-48757, and follow-up reporting put the reachable tokens at about 1.5 million.

**The villain:** THE OPEN DOOR (DATABASE)
**The reflex:** Row-level security ON with explicit policies for every table the browser can reach, proven with a second, non-owner account.
**Train it:** https://skillboss.dev/demo/db-exposure

Sources:
- https://northflank.com/blog/how-to-vibe-code-securely

## 2026-02 — Eighteen thousand profiles, one missing check

A generated app shipped with client-side database queries and no access controls; 18,000 users’ personal data was exposed. The app worked — the checks that were nobody’s job did not.

**The villain:** THE OPEN MIC (AUTH)
**The reflex:** Every read and write verifies identity and ownership server-side; a check that only lives in the UI is not a check.
**Train it:** https://skillboss.dev/demo/auth-routes

Sources:
- https://northflank.com/blog/how-to-vibe-code-securely

## 2026 — The measured baseline (a survey, not one incident)

A published sample of 1,645 Lovable-built apps found roughly seven in ten with row-level security disabled. Not a breach story — the field measurement that says how many open doors are standing right now.

**The villain:** THE OPEN DOOR (DATABASE)
**The reflex:** The same one as above — which is the point: the most common failure is also the most preventable.
**Train it:** https://skillboss.dev/demo/db-exposure

Sources:
- https://catdoes.com/blog/vibe-coding-security-checklist

## 2025-03 — The vibe-coding platform, breached itself

In the same season, the vibe-coding site same.dev was reported hacked, with leaked internal data circulating — reported by a threat intelligence researcher. Nobody is above the floor, including the tools that generate the apps.

**The villain:** THE LEAK (SECRETS)
**The reflex:** Secrets out of code and history, a pre-commit scan on every repo, rotation the moment exposure is even suspected.
**Train it:** https://skillboss.dev/demo/secrets

Sources:
- https://www.linkedin.com/posts/alon-gal-utb_vibe-coding-website-samedev-was-hacked-activity-7310779858278612993-ZZUR

---

Arm all ten systems before your name is in a ledger like this one:
https://skillboss.dev/launch
