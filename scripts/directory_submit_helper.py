#!/usr/bin/env python3
"""Open directory submit pages, copy outreach blurbs, log and update sprint-state.

Fully automated form POST is intentionally not supported: sites use different
forms, CAPTCHAs, email verification, and manual review — bot submits hurt SEO.

Usage:
  python scripts/directory_submit_helper.py              # print field pack + checklist
  python scripts/directory_submit_helper.py open         # open default browser tabs
  python scripts/directory_submit_helper.py clip 150     # copy 50|150|300 word blurb (Windows clip)
  python scripts/directory_submit_helper.py mark 2       # set directorySubmits in sprint-state.json
  python scripts/directory_submit_helper.py log listin.gg pending
"""
from __future__ import annotations

import json
import re
import subprocess
import sys
import webbrowser
from datetime import date
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SEO_PATH = ROOT / "docs" / "seo-outreach.md"
STATE_PATH = ROOT / "docs" / "sprint-state.json"
LOG_PATH = ROOT / "docs" / "directory-submit-log.json"

SITE_URL = "https://subtitle-kit.pages.dev"
PRODUCT_NAME = "Subtitle Kit"
TAGLINE = "Browser-only SRT tools—shift timing, no upload"

FEATURE_LINES = [
    "Shift SRT timing in the browser",
    "SRT to plain text for translation",
    "Caption line length for vertical video",
    "Voice-over read time estimate",
    "No upload — files stay on device",
]

# Verify in browser before submit; URLs may change.
TARGETS = [
    {
        "id": "freemiumtools",
        "name": "FreemiumTools",
        "submit_url": "https://freemiumtools.com/directory/submit",
        "package": "Free (Completely free)",
        "notes": "Short desc max 200 chars → use 50-word blurb. Review ~2–3 business days.",
    },
    {
        "id": "tolodora",
        "name": "Tolodora",
        "submit_url": "https://tolodora.com/",
        "package": "Free launch (login required)",
        "notes": "Header → Launch Your Product → Log in to launch. listin.gg often blocked on some networks.",
    },
]

FREEMIUM_SHORT_MAX = 200


def parse_blurbs(md: str) -> dict[str, str]:
    out: dict[str, str] = {}
    for label in ("50 words", "150 words", "300 words"):
        pat = rf"\*\*{re.escape(label)}\*\*\s*\n(.+?)(?=\n\n\*\*|\n---|\Z)"
        m = re.search(pat, md, re.DOTALL)
        if m:
            out[label.split()[0]] = m.group(1).strip()
    return out


def load_blurbs() -> dict[str, str]:
    text = SEO_PATH.read_text(encoding="utf-8")
    blurbs = parse_blurbs(text)
    if "150" not in blurbs:
        sys.exit(f"Could not parse blurbs from {SEO_PATH}")
    return blurbs


def field_pack(blurbs: dict[str, str]) -> str:
    lines = [
        f"Name: {PRODUCT_NAME}",
        f"URL: {SITE_URL}",
        f"Tagline: {TAGLINE}",
        "",
        "Features (one per line):",
        *[f"  - {f}" for f in FEATURE_LINES],
        "",
        "Description (150 words):",
        blurbs.get("150", ""),
        "",
        "Short (50 words) if form is tight:",
        blurbs.get("50", ""),
        "",
        "FreemiumTools Short Description (≤200 chars):",
        blurbs.get("50", "")[:FREEMIUM_SHORT_MAX],
        f"  ({len(blurbs.get('50', '')[:FREEMIUM_SHORT_MAX])} chars)",
        "",
        "FreemiumTools Platforms:",
        "Web",
    ]
    return "\n".join(lines)


def copy_windows_clip(text: str) -> None:
    p = subprocess.Popen(["clip"], stdin=subprocess.PIPE, shell=True)
    p.communicate(input=text.encode("utf-8"))
    if p.returncode != 0:
        sys.exit("clip failed — copy manually from seo-outreach.md")


def open_targets() -> None:
    for t in TARGETS:
        webbrowser.open(t["submit_url"])


def load_log() -> list:
    if not LOG_PATH.exists():
        return []
    return json.loads(LOG_PATH.read_text(encoding="utf-8"))


def save_log(entries: list) -> None:
    LOG_PATH.write_text(json.dumps(entries, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")


def cmd_log(site: str, status: str) -> None:
    entries = load_log()
    entries.append(
        {
            "date": date.today().isoformat(),
            "site": site,
            "status": status,
            "url": SITE_URL,
        }
    )
    save_log(entries)
    print(f"Logged → {LOG_PATH}")


def cmd_mark(count: int) -> None:
    state = json.loads(STATE_PATH.read_text(encoding="utf-8"))
    state["directorySubmits"] = count
    STATE_PATH.write_text(json.dumps(state, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
    print(f"Updated directorySubmits = {count} in {STATE_PATH}")


def cmd_print() -> None:
    blurbs = load_blurbs()
    print(field_pack(blurbs))
    print("\n--- Submit pages (open with: ... open) ---")
    for i, t in enumerate(TARGETS, 1):
        print(f"{i}. {t['name']}: {t['submit_url']}")
        print(f"   {t['package']} — {t['notes']}")
    print("\nManual steps: open → clip 150 → paste Name/URL/Description → Submit → log ... pending")


def main() -> None:
    args = sys.argv[1:]
    if not args:
        cmd_print()
        return

    cmd = args[0].lower()
    if cmd == "open":
        open_targets()
        print("Opened submit URLs in default browser.")
        return
    if cmd == "clip":
        size = args[1] if len(args) > 1 else "150"
        blurbs = load_blurbs()
        if size not in blurbs:
            sys.exit(f"Unknown size {size!r}; use 50, 150, or 300")
        if sys.platform != "win32":
            print(blurbs[size])
            print("(Non-Windows: text printed above; copy manually.)")
            return
        copy_windows_clip(blurbs[size])
        print(f"Copied {size}-word blurb to clipboard.")
        return
    if cmd == "mark":
        if len(args) < 2:
            sys.exit("Usage: ... mark <count>")
        cmd_mark(int(args[1]))
        return
    if cmd == "log":
        if len(args) < 3:
            sys.exit("Usage: ... log <site> <pending|live|rejected>")
        cmd_log(args[1], args[2])
        return
    sys.exit(f"Unknown command: {cmd}")


if __name__ == "__main__":
    main()
