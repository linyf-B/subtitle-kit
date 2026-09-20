# Reddit 草稿 — 复制发帖（勿 spam）

站点：https://subtitle-kit.pages.dev  
工具链：https://subtitle-kit.pages.dev/tools/srt-time-shift/

---

## 帖 1 — r/videoeditors（字幕整体慢半拍）

**标题（自拟，不要像广告）：**  
`Fixing SRT that's consistently late after export — workflow question`

**正文：**

If every cue is late by roughly the same amount (not drifting over time), you usually don't need to nudge hundreds of lines by hand.

1. Play one line and note how many ms the text appears after speech starts.
2. Export your `.srt` from the NLE.
3. Apply the **same offset to every timestamp** (positive = move subs later).
4. Re-import and spot-check opening, middle, and end.

I do step 3 in a **browser tab** with paste/download—no upload to a random converter—using [this SRT shift tool](https://subtitle-kit.pages.dev/tools/srt-time-shift/) when I'm fixing dubs. There's also a [short guide on constant delay](https://subtitle-kit.pages.dev/guides/fix-subtitle-sync-constant-delay/) if you want the checklist.

What do you use when the error is uniform vs drift?

---

## 帖 2 — r/translator 或 r/NewTubers（SRT → 翻译 / 竖屏行宽）

**标题：**  
`Handing off SRT to translators without timing codes — how do you strip cues?`

**正文：**

Translators on my projects often want plain dialogue, not `00:00:01,000 --> ...`.

1. Export SRT from the video team.
2. Strip to one line per cue (no indices if they don't need them).
3. Translate in CAT/Word; re-time in TMS or back in Premiere.
4. Before vertical delivery, run a **line-length pass** so Reels/TikTok don't wrap into three rows.

I use a local-in-browser [SRT → text](https://subtitle-kit.pages.dev/tools/srt-to-text/) step and a [line length checker](https://subtitle-kit.pages.dev/tools/line-length/) with a ~32 char cap—both free, nothing uploaded. Guide: [SRT to text for translation](https://subtitle-kit.pages.dev/guides/srt-to-text-for-translation/).

Do you keep timestamps in the first pass or always strip?

---

## 发帖规则提醒

- 先搜社区是否已有类似问题，优先 **回复** 旧帖而非新发。
- 每周最多 1–2 条带链；其余只干货不带链。
- 发完后在 `docs/sprint-state.json` 把 `redditPosts` +1 并记 subreddit。
