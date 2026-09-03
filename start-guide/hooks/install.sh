#!/bin/sh
# SkillBoss Start Guide — install the guard hooks into this repository.
#
# Usage, from your repo root:   sh start-guide/hooks/install.sh
# Add --force to replace hooks you already have (it backs them up first).
#
# Hooks are per-clone and never travel in a commit: every machine runs this
# once. They start in warn mode; you switch them to block when ready.
set -e

force=0
[ "$1" = "--force" ] && force=1

if [ ! -d .git ]; then
  echo "No .git directory here. Run this from the root of your repository."
  echo "No repository yet? That is Gate 00's job — ask your coach."
  exit 1
fi

src=$(dirname "$0")
mkdir -p .git/hooks

for h in pre-commit pre-push post-commit; do
  target=".git/hooks/$h"
  if [ -f "$target" ] && [ "$force" -eq 0 ]; then
    if grep -q "SkillBoss Start Guide" "$target" 2>/dev/null; then
      echo "  $h: already installed by the Start Guide, replacing."
    else
      echo "  $h: you already have one. Re-run with --force to back it up and replace."
      continue
    fi
  elif [ -f "$target" ]; then
    cp "$target" "$target.backup"
    echo "  $h: existing hook backed up to $h.backup"
  fi
  cp "$src/$h" "$target"
  chmod +x "$target"
  echo "  $h: installed (mode warn)"
done

# The run screen is a local rendering, regenerated on every commit: it is
# never committed, or every commit would carry a diff nobody reads.
if [ -f .gitignore ] && grep -q "state/run-screen" .gitignore; then
  :
else
  printf '\n# SkillBoss Start Guide - local run screens, regenerated on every commit\nstate/run-screen.md\nstate/run-screen.html\n' >> .gitignore
  echo "  .gitignore: state/run-screen.md and .html added"
fi

echo ""
echo "Done. The guards run on every commit and every push, in warn mode."
echo "To make one refuse instead of warn, edit its MODE line in .git/hooks/."
echo "Your run screen: open state/run-screen.md in your editor after the next commit."
