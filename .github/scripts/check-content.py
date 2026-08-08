#!/usr/bin/env python3
"""Content checks for the SkillBoss Dojo — run in CI, and by you before a PR.

    python3 .github/scripts/check-content.py

Python 3 standard library only, on purpose: a content repository should not
need an install step to validate itself, and a contributor should be able to
check a kata without setting anything up.

What this does NOT do: judge a kata. The ambiguity bar, whether the scenario is
real pressure, whether a distractor is plausible — those are the human review
CONTRIBUTING.md promises, and no script replaces it. This handles the counting,
so the review can spend its attention on the parts that matter.
"""

import glob
import math
import os
import re
import sys

HALLS = ("git", "agile", "ci-cd", "cloud", "security", "k8s", "sre")

# `**Blanks:** 3` — the count the kata claims, checked against the artifact.
META_RE = re.compile(
    r"^\*\*Hall:\*\*.*?\*\*Blanks:\*\*\s*(\d+).*?\*\*Par:\*\*", re.M
)
FENCE_RE = re.compile(r"```[a-z]*\n(.*?)```", re.S)
BLANK_RE = re.compile(r"_{2,}")
TOKEN_RE = re.compile(r"`([^`]+)`")
# A solution row: `| 1 | `reflog` |`
ANSWER_ROW_RE = re.compile(r"^\|\s*(\d+)\s*\|\s*`([^`]+)`\s*\|", re.M)
DETAILS_RE = re.compile(r"<details>.*?</details>", re.S)
MD_LINK_RE = re.compile(r"\[[^\]]*\]\(([^)\s]+)\)")


class Report:
    def __init__(self):
        self.failures = []

    def fail(self, where, msg):
        self.failures.append("%s: %s" % (where, msg))

    def section(self, name, count):
        mark = "ok  " if not self.failures else "FAIL"
        print("  %s %s (%d checked)" % (mark, name, count))


def kata_files():
    out = []
    for root, _dirs, files in os.walk("katas"):
        for f in sorted(files):
            if f.endswith(".md"):
                out.append(os.path.join(root, f))
    return sorted(out)


def check_kata(path, text, r):
    parts = path.split(os.sep)
    if len(parts) < 3 or parts[1] not in HALLS:
        r.fail(path, "hall must be one of %s (got %r)" % ("/".join(HALLS), parts[1]))

    meta = META_RE.search(text)
    if not meta:
        r.fail(path, "missing or malformed `**Hall:** … **Blanks:** N … **Par:** …` line")
        return
    declared = int(meta.group(1))
    if not 2 <= declared <= 5:
        r.fail(path, "Blanks is %d; CONTRIBUTING allows 2-5" % declared)

    if "## The artifact" not in text or "## The pool" not in text:
        r.fail(path, "needs both `## The artifact` and `## The pool`")
        return
    if text.index("## The artifact") > text.index("## The pool"):
        r.fail(path, "`## The artifact` must come before `## The pool`")
        return

    artifact = text[text.index("## The artifact"):text.index("## The pool")]
    fences = FENCE_RE.findall(artifact)
    if not fences:
        r.fail(path, "the artifact section has no fenced code block")
        return
    # Blanks are counted in the code block only: prose above it says the word
    # "underscores" and must not be mistaken for one.
    actual = sum(len(BLANK_RE.findall(f)) for f in fences)
    if actual != declared:
        r.fail(path, "declares %d blanks, artifact has %d" % (declared, actual))

    pool_text = text[text.index("## The pool"):]
    cut = pool_text.find("<details")
    pool = TOKEN_RE.findall(pool_text[:cut] if cut != -1 else pool_text)
    if not pool:
        r.fail(path, "the pool lists no `token`")
        return
    # CONTRIBUTING says "roughly 2.5-3x the blank count". Rounding outward is what
    # "roughly" means once it has to be code: floor(2.5n)..ceil(3n). Implementing
    # the bound with no slack failed a committed kata on its first contact with
    # real content (7 tokens for 3 blanks, i.e. 2.33x) — and a check that fails
    # on content its author considers valid is a check that gets worked around.
    # The band still rejects what it is there for: a pool of 5, or of 12, for
    # three blanks.
    lo, hi = math.floor(2.5 * declared), math.ceil(3.0 * declared)
    if not lo <= len(pool) <= hi:
        r.fail(path, "pool has %d tokens; CONTRIBUTING wants roughly 2.5-3x the %d blanks (%d-%d)"
               % (len(pool), declared, lo, hi))
    if pool != sorted(pool):
        r.fail(path, "pool is not alphabetized")
    if len(set(pool)) != len(pool):
        r.fail(path, "pool has duplicate tokens")

    folds = list(DETAILS_RE.finditer(text))
    solution = next((m for m in folds if "Solution" in m.group(0)), None)
    if solution is None:
        r.fail(path, "no <details> block whose summary contains 'Solution'")
        return
    if solution.start() < text.index("## The pool"):
        r.fail(path, "the solution fold sits ABOVE the pool; it must be below the exercise")

    # No answer table may live outside a fold — that is the spoiler rule.
    outside = text[:solution.start()] + text[solution.end():]
    for m in ANSWER_ROW_RE.finditer(outside):
        inside_other_fold = any(f.start() <= outside.index(m.group(0)) <= f.end()
                                for f in folds if f is not solution)
        if not inside_other_fold:
            r.fail(path, "answer row %r appears outside a <details> fold" % m.group(0).strip())
            break

    answers = [t for _n, t in ANSWER_ROW_RE.findall(solution.group(0))]
    if len(answers) != declared:
        r.fail(path, "solution has %d answer rows for %d blanks" % (len(answers), declared))
    missing = [a for a in answers if a not in pool]
    if missing:
        r.fail(path, "answers absent from the pool: %s" % ", ".join(missing))
    if len(set(answers)) != len(answers):
        r.fail(path, "the same token answers more than one blank")


def check_katas(r):
    files = kata_files()
    if not files:
        r.fail("katas/", "no kata found — this repo is a kata repo")
    for p in files:
        check_kata(p, open(p, encoding="utf-8").read(), r)
    return len(files)


def check_relative_links(r):
    n = 0
    for root, dirs, files in os.walk("."):
        dirs[:] = [d for d in dirs if d not in (".git", "node_modules")]
        for f in sorted(files):
            if not f.endswith(".md"):
                continue
            p = os.path.join(root, f)
            text = open(p, encoding="utf-8").read()
            for m in MD_LINK_RE.finditer(text):
                target = m.group(1)
                if target.startswith(("http://", "https://", "mailto:", "#")):
                    continue
                n += 1
                resolved = os.path.normpath(
                    os.path.join(os.path.dirname(p), target.split("#")[0]))
                if not os.path.exists(resolved):
                    r.fail(p, "dead relative link %r" % target)
    return n


def check_review_page(r):
    """Every review page must fetch nothing.

    They sell a confidentiality posture; a page that hands its visitors' IP to
    a CDN for a font would contradict that in silence. Navigation links out are
    fine — the browser only follows them if the reader clicks. ALL html files
    under docs/review are checked, not a hardcoded index.html: the French twin
    (index.fr.html) makes the identical promise to a different reader, and a
    page this check never reads is a promise nothing verifies."""
    pages = sorted(glob.glob(os.path.join("docs", "review", "*.html")))
    patterns = [
        (r"<script\b", "a <script> tag"),
        (r"<link\b", "a <link> tag (stylesheet, preconnect, icon…)"),
        (r"@import\b", "a CSS @import"),
        (r"@font-face\b", "an @font-face rule"),
        (r"url\(", "a CSS url() reference"),
        (r"<(?:img|iframe|video|audio|source|embed|object)\b", "an embedded media tag"),
        (r"\bsrc\s*=\s*[\"']https?:", "a remote src attribute"),
    ]
    for page in pages:
        html = open(page, encoding="utf-8").read()
        for pat, what in patterns:
            if re.search(pat, html, re.I):
                r.fail(page, "contains %s — this page must load nothing" % what)
        # Every local link must resolve, or a download button 404s.
        for target in re.findall(r'href="([^"#:]+)"', html):
            if not os.path.exists(os.path.join(os.path.dirname(page), target)):
                r.fail(page, "dead local link %r" % target)
    return len(pages)


def main():
    r = Report()
    print("SkillBoss Dojo — content checks")

    before = len(r.failures)
    n = check_katas(r)
    print("  %s kata format (%d file%s)" % ("ok  " if len(r.failures) == before else "FAIL",
                                            n, "" if n == 1 else "s"))
    before = len(r.failures)
    n = check_relative_links(r)
    print("  %s relative links (%d link%s)" % ("ok  " if len(r.failures) == before else "FAIL",
                                               n, "" if n == 1 else "s"))
    before = len(r.failures)
    n = check_review_page(r)
    print("  %s review pages (%s)" % ("ok  " if len(r.failures) == before else "FAIL",
                                      "%d checked" % n if n else "none, skipped"))

    if r.failures:
        print("\n%d problem%s:" % (len(r.failures), "" if len(r.failures) == 1 else "s"))
        for f in r.failures:
            print("  - %s" % f)
        return 1
    print("\nall good.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
