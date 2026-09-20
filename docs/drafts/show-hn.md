# Show HN — 草稿

**提交：** https://news.ycombinator.com/submit  
**标题（二选一）：**

- `Show HN: Subtitle Kit – browser-only SRT tools, no upload`
- `Show HN: Fix SRT sync in the browser without uploading files`

**正文：**

I made a small static site for subtitle chores that don't deserve a desktop install:

- Shift all SRT cues by ms/seconds (constant delay after dub/export)
- SRT → plain text for translation handoff
- Caption line length check for vertical video
- Read-time estimator from word count

All tools run client-side (Astro + vanilla JS on Cloudflare Pages). Subtitle content isn't sent to a server for processing.

https://subtitle-kit.pages.dev

Guides with workflows: https://subtitle-kit.pages.dev/guides/

Would appreciate HN feedback on privacy UX and what you'd trust for client scripts.

---

**注意：** Show HN 一天一次，被拒正常；不要 cross-post 同一小时到 Reddit。
