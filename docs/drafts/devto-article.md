# Dev.to 文章 — 草稿

**标题：** How I built privacy-first subtitle tools on Cloudflare Pages  
**Tags:** `webdev`, `javascript`, `opensource`, `video`  
**Canonical URL（发布后填）：** https://subtitle-kit.pages.dev

---

## 正文（Markdown，可整篇粘贴 Dev.to）

Subtitle files are small but sensitive—client dialogue, unreleased episodes, legal review cuts. I kept hitting the same workflow gaps: shift every cue by 500 ms after a dub, strip timecodes for a translator, check whether Reels captions wrap ugly.

I didn't want another "upload your SRT" SaaS. So I shipped **Subtitle Kit**: static Astro pages, tools in the browser with JavaScript, hosted on Cloudflare Pages.

### What it does

1. **SRT time shift** — global offset in ms or seconds, download corrected `.srt`.
2. **SRT to text** — dialogue export for translation.
3. **Line length** — flag long lines for 9:16.
4. **Read time** — rough VO duration from word count.

No accounts. No server-side subtitle processing.

### Architecture choices

- **Astro 5** static output → fast global CDN, cheap ops.
- **Client-only parsing** in `src/lib/srt.ts` → predictable privacy story.
- **Guides** as intent pages for SEO and for sharing on Reddit/PH with a credible landing path.

Live: https://subtitle-kit.pages.dev  
Guides: https://subtitle-kit.pages.dev/guides/  
Repo: https://github.com/linyf-B/subtitle-kit

### What's next

VTT shift, locale pages, and whatever editors ask for on launch threads.

If you edit video or localize subs—what would you add first?

---

**文末 CTA：** Link to `/tools/srt-time-shift/` and `/guides/shift-srt-timing-online-free/`.
