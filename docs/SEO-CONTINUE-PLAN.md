# SEO「继续」推进计划（subtitle-kit）

> **触发词：** `继续`、`继续 SEO`、`继续seo`、`subtitle-kit 继续`  
> **执行 skill：** `.cursor/skills/subtitle-kit-continue/SKILL.md`（本文件为队列与边界补充）  
> **开发：** §2 工具已在 2026-09-21 一次性做完；**说「继续 SEO」时不再新建工具**，除非 §8 改版。

**站点：** https://subtitle-kit.pages.dev  
**长期：** [PLAN-50USD-DAY.md](./PLAN-50USD-DAY.md) · **30 天：** [PLAN-30DAY-SPRINT.md](./PLAN-30DAY-SPRINT.md)

---

## 1. 当前基线（2026-09-21）

| 项 | 状态 |
|----|------|
| 工具 | 10 个（见 README 工具列表） |
| Guides 已写 | 6 篇（Week1–3）+ `shift-vtt-timestamps-vertical-video`（待 push 后索引） |
| 本地 commit | 含 VTT 批次；**需你 `git push`** |
| GSC | 重交 `sitemap-index.xml`；新 URL 请求编入索引 |
| 手动 | Reddit 0、目录 1、PH 未 Launch |

---

## 2. 开发项（已完成 — 勿在 SEO 轮次重复）

以下 **仅维护 bugfix**；新功能走 §8 变更流程。

- [x] VTT time shift、SRT↔VTT 转换
- [x] Strip HTML from subtitles
- [x] Merge / split SRT cues
- [x] FPS ↔ ms offset calculator

---

## 3. 你说「继续 SEO」时 Agent 固定流程

1. `python scripts/sprint_status.py` → 读 `nextGuide`、`openWeekTasks`、`adjustments`
2. 浏览器 / `curl.exe` 读 GSC、live 站（见 skill §2）
3. **只写 guide 或改 title/H1**（Week≥4 且有 GSC 展示无点击时）
4. 单次最多 **3 篇 guide**，然后 `npm run build`
5. `python scripts/git_commit.py "..."` → **请你 push**
6. 更新 `docs/sprint-state.json`（`guidesDone`、`lastMetrics`、`completedTaskIds`）

**不做：** 新工具页、Stripe、AdSense 代码（除非 Week4 且 UV≥200 且你明确要求接广告）。

---

## 4. Guide 队列（按顺序写，写满再进 §5）

`sprint_status.py` 的 `GUIDE_QUEUE` 为唯一顺序源。摘要：

| Week | slug | 主 CTA |
|------|------|--------|
| 4 | `browser-subtitle-tools-privacy` | `/` |
| 4 | `srt-offset-milliseconds-lip-sync` | `/tools/srt-time-shift/` |
| 5 | `srt-to-vtt-converter-online` | `/tools/srt-to-vtt/` |
| 5 | `vtt-to-srt-converter-online` | `/tools/vtt-to-srt/` |
| 5 | `strip-html-tags-from-subtitles` | `/tools/strip-html/` |
| 6 | `merge-split-srt-cues-online` | `/tools/merge-split-cues/` |
| 6 | `subtitle-sync-frames-to-milliseconds` | `/tools/fps-offset/` |
| 7+ | 见 §5 | GSC 驱动 |

每篇规范：[PLAN-50USD-DAY §4.1](./PLAN-50USD-DAY.md)（800–1200 词、FAQ 5–7、内链 2 工具）。

---

## 5. Week 7+（guide 队列清空后）

1. GSC Performance → Top queries **有展示、低点击**
2. **只改** 对应已有页 title / H1 / 首段 100 词
3. 若需新页：必须是 **新 query**，且 CTA 指向 **已有工具**，不造同质工具

---

## 6. 手动闸门（Agent 只提醒，不代做）

| Sprint Week | 你最少要做 |
|-------------|------------|
| 1–2 | push、GSC sitemap、指标粘贴 |
| 2 | Reddit×2、目录 +2 |
| 3 | PH Launch + 回评 |
| 4 | 目录×2、Reddit×1；UV≥200 → AdSense |

---

## 7. 月 KPI（30 天 sprint）

- UV 28d **≥800**，或  
- GSC 28d 点击 **≥40** 且索引 **≥12**

---

## 8. 变更（新工具 / 改北极星）

须你明确说「加工具 xxx」或改 PLAN-50USD；**「继续 SEO」不触发 §8**。

---

## 9. Git 分工（固定）

| 谁 | 做什么 |
|----|--------|
| **Agent** | 每次做完仓库改动 → `npm run build` 通过 → **`python scripts/git_commit.py "subject" "body"`**（已提交到本地 `main`） |
| **你** | **只 `git push`**（可用 `E:\soft\GIT\Git\cmd\git.exe -C ... push origin main`） |

Agent **不 push**。你说「我只 push」= 默认按上表执行。
