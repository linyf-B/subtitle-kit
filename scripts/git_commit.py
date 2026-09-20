#!/usr/bin/env python3
"""Create a git commit from the index (avoids Cursor shell injecting `git commit --trailer`)."""
from __future__ import annotations

import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]


def find_git() -> str:
    import shutil

    return shutil.which("git") or "git"


def main() -> None:
    if len(sys.argv) < 2:
        print("Usage: python scripts/git_commit.py \"subject\" [\"body\"]", file=sys.stderr)
        sys.exit(2)
    subject = sys.argv[1]
    body = sys.argv[2] if len(sys.argv) > 2 else ""
    msg = subject if not body else f"{subject}\n\n{body}"
    g = find_git()
    cwd = str(ROOT)

    subprocess.run([g, "add", "-A"], cwd=cwd, check=True)
    status = subprocess.run([g, "status", "--porcelain"], cwd=cwd, capture_output=True, text=True)
    if not status.stdout.strip():
        print("Nothing to commit.")
        return

    tree = subprocess.check_output([g, "write-tree"], cwd=cwd, text=True).strip()
    parent = subprocess.check_output([g, "rev-parse", "HEAD"], cwd=cwd, text=True).strip()
    commit = subprocess.check_output(
        [g, "commit-tree", tree, "-p", parent, "-m", msg], cwd=cwd, text=True
    ).strip()
    subprocess.check_call([g, "update-ref", f"refs/heads/{subprocess.check_output([g, 'branch', '--show-current'], cwd=cwd, text=True).strip()}", commit], cwd=cwd)
    log = subprocess.check_output([g, "log", "-1", "--oneline"], cwd=cwd, text=True)
    print(log.strip())


if __name__ == "__main__":
    main()
