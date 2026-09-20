#!/usr/bin/env python3
"""Read subtitle-kit sprint state and print next actions (JSON + human summary)."""
from __future__ import annotations

import json
import sys
from datetime import date, datetime
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
STATE_PATH = ROOT / "docs" / "sprint-state.json"
GUIDES_DIR = ROOT / "src" / "pages" / "guides"

GUIDE_QUEUE = [
    {"week": 1, "slug": "fix-subtitle-sync-constant-delay", "tool": "/tools/srt-time-shift/"},
    {"week": 1, "slug": "shift-srt-timing-online-free", "tool": "/tools/srt-time-shift/"},
    {"week": 2, "slug": "srt-to-text-for-translation", "tool": "/tools/srt-to-text/"},
    {"week": 2, "slug": "subtitle-line-length-tiktok-reels", "tool": "/tools/line-length/"},
    {"week": 3, "slug": "voice-over-read-time-calculator", "tool": "/tools/read-time/"},
    {"week": 3, "slug": "delay-subtitles-500ms-dubbing", "tool": "/tools/srt-time-shift/"},
    {"week": 4, "slug": "browser-subtitle-tools-privacy", "tool": "/"},
    {"week": 4, "slug": "srt-offset-milliseconds-lip-sync", "tool": "/tools/srt-time-shift/"},
]

WEEK_TASKS = {
    1: [
        {"id": "w1-push", "kind": "repo", "title": "git push 确保线上含 P0 SEO"},
        {"id": "w1-guides-2", "kind": "cursor", "title": "新建 Week1 两篇 guides"},
        {"id": "w1-gsc-sitemap", "kind": "browser", "title": "GSC 确认 sitemap Success，记索引页数"},
        {"id": "w1-metrics-table", "kind": "manual", "title": "建/更新指标表（UV/展示/点击/索引）"},
    ],
    2: [
        {"id": "w2-reddit-2", "kind": "manual", "title": "Reddit 2 条真实帮助帖（Cursor 只写草稿）"},
        {"id": "w2-dir-4", "kind": "manual", "title": "目录提交累计 4 个（本周 +2）"},
        {"id": "w2-guides-34", "kind": "cursor", "title": "guides 第 3～4 篇"},
    ],
    3: [
        {"id": "w3-ph-prep", "kind": "mixed", "title": "PH 养号/素材 或 路径 B Show HN / Dev.to"},
        {"id": "w3-ph-launch", "kind": "manual", "title": "Launch 日发帖并 10 分钟内回评"},
        {"id": "w3-guides-56", "kind": "cursor", "title": "guides 第 5～6 篇"},
    ],
    4: [
        {"id": "w4-ads-or-es", "kind": "conditional", "title": "UV≥200 接 AdSense；否则 es 或 P2 强化"},
        {"id": "w4-gsc-titles", "kind": "cursor", "title": "GSC 有展示无点击 → 改 2 页 title/H1"},
        {"id": "w4-dist", "kind": "manual", "title": "再 2 目录 + 1 Reddit"},
    ],
}


def load_state() -> dict:
    if not STATE_PATH.exists():
        raise SystemExit(f"Missing {STATE_PATH}")
    return json.loads(STATE_PATH.read_text(encoding="utf-8"))


def guides_on_disk() -> list[str]:
    if not GUIDES_DIR.is_dir():
        return []
    return sorted(p.name for p in GUIDES_DIR.iterdir() if p.is_dir())


def sprint_day(start: str, today: date | None = None) -> int:
    today = today or date.today()
    d0 = datetime.strptime(start, "%Y-%m-%d").date()
    return max(1, (today - d0).days + 1)


def sprint_week(day: int) -> int:
    return min(4, (day - 1) // 7 + 1)


def pending_guides(state: dict, week: int) -> list[dict]:
    done = set(state.get("guidesDone") or []) | set(guides_on_disk())
    return [g for g in GUIDE_QUEUE if g["week"] <= week and g["slug"] not in done]


def kpi_status(metrics: dict) -> dict:
    uv = metrics.get("uv28d")
    clicks = metrics.get("gscClicks28d")
    idx = metrics.get("indexedPages")
    on_track_uv = uv is not None and uv >= 800
    on_track_clicks = (
        clicks is not None
        and clicks >= 40
        and idx is not None
        and idx >= 12
    )
    pace_uv = None
    if uv is not None:
        pace_uv = uv  # agent compares with day/28 * 800 in skill
    return {
        "hitMonthKpi": on_track_uv or on_track_clicks,
        "uv28d": uv,
        "gscClicks28d": clicks,
        "indexedPages": idx,
        "paceNote": pace_uv,
    }


def adjust_strategy(day: int, week: int, metrics: dict, pending: list) -> list[str]:
    tips: list[str] = []
    uv = metrics.get("uv28d")
    clicks = metrics.get("gscClicks28d")
    target_pace = (800 / 28) * day if day else None
    if uv is not None and target_pace and uv < target_pace * 0.5 and week >= 2:
        tips.append("UV 明显落后：今日 40% 时间优先 Reddit/目录，guides 只做 1 篇或暂停。")
    if len(pending) >= 2 and week == 1 and day >= 5:
        tips.append("Week1 guides 未完成：Cursor 优先补 guide，暂缓外链。")
    if week >= 3 and (uv or 0) < 200 and (clicks or 0) < 15:
        tips.append("接近 Week4 低档：预备 P1 西班牙语或 P2 长尾强化（见 PLAN-30DAY-SPRINT Week4）。")
    if week >= 2 and (clicks or 0) == 0 and (metrics.get("indexedPages") or 0) < 5:
        tips.append("索引偏少：GSC URL 检查 + 手动 Request indexing 2 个工具页与 1 篇 guide。")
    if not tips:
        tips.append("按 PLAN-30DAY-SPRINT 当前 Week 默认比例：60% Cursor / 40% 浏览器发帖。")
    return tips


def main() -> None:
    state = load_state()
    day = sprint_day(state["sprintStart"])
    week = sprint_week(day)
    disk_guides = guides_on_disk()
    pending = pending_guides(state, week)
    metrics = state.get("lastMetrics") or {}
    kpi = kpi_status(metrics)
    adjustments = adjust_strategy(day, week, metrics, pending)

    next_guide = pending[0] if pending else None
    tasks = WEEK_TASKS.get(week, [])
    completed = set(state.get("completedTaskIds") or [])
    open_tasks = [t for t in tasks if t["id"] not in completed]

    out = {
        "sprintDay": day,
        "sprintWeek": week,
        "sprintStart": state["sprintStart"],
        "siteUrl": state.get("siteUrl"),
        "guidesOnDisk": disk_guides,
        "nextGuide": next_guide,
        "openWeekTasks": open_tasks,
        "kpi": kpi,
        "adjustments": adjustments,
        "counters": {
            "redditPosts": state.get("redditPosts", 0),
            "directorySubmits": state.get("directorySubmits", 0),
            "phLaunched": state.get("phLaunched", False),
        },
    }
    print(json.dumps(out, ensure_ascii=False, indent=2))

    print("\n---\n# Sprint 摘要\n", file=sys.stderr)
    print(f"第 {day} 天 / Week {week}", file=sys.stderr)
    if next_guide:
        print(f"下一篇 guide: {next_guide['slug']}", file=sys.stderr)
    else:
        print("本阶段 guide 队列已清空或需读 GSC 定 Week5+ 长尾", file=sys.stderr)
    for line in adjustments:
        print(f"- {line}", file=sys.stderr)


if __name__ == "__main__":
    main()
