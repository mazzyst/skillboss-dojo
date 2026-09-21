# SkillBoss recipes

Apache-2.0 · from the [SkillBoss Dojo](https://github.com/mazzyst/skillboss-dojo) · see [LICENSE](LICENSE) and [NOTICE](NOTICE)

Recipes your own coding agent runs in your own repository. Nothing of ours
runs in your request path. No key, no prompt and no data leaves your
machine. No telemetry, in any recipe, ever.

## What is here today

Two recipes. More arrive one at a time, each behind its own trial.

| Recipe | What it does | Changes code? |
|---|---|---|
| [provider-hard-limit](provider-hard-limit/SKILL.md) | finds the model providers this repository calls, and walks you to the one setting that stops spending rather than slowing it: the provider's own hard limit | no |
| [billing-alert](billing-alert/SKILL.md) | finds every budget declared in your infrastructure files, says whether anybody is declared to hear it, and refuses to hand back evidence when nobody is | no |

## How to use one

1. Read the recipe yourself before your agent runs it. It is a few pages.
2. Let your agent run it. It reads your repository and hands back one line
   saying WHERE something now lives, with a date. Never a value.
3. Paste that line where your coach asks for it: the gate box, or the
   journal.

## What a recipe never does

It never claims your application is safe, correct or finished. A recipe
makes a check green; it does not make an application correct. What it
hands you is a location and a date, and what that is worth is your
judgement, not ours.

## Relationship

Made by the people who make SkillBoss. The coach and its checks are free
and stay free. Every recipe in this directory is free; recipes sold by the
same author live elsewhere and are never mixed in.
