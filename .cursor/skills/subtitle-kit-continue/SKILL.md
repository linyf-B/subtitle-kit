---
name: subtitle-kit-continue
description: >-
  Project-local skill for the subtitle-kit repository only (not keeperhub, 墨团尊,
  or other monorepo roots). Runs the 30-day traffic sprint when the user says 继续
  while working in subtitle-kit. Preflight requires docs/sprint-state.json and
  package.json name subtitle-kit. Reads GSC via gscPropertyUrl, executes guides/build,
  updates state, replies in Chinese with KPIs and next manual steps. Ignore this skill
  if those files are absent or the active task is another project.
---

# Subtitle Kit — 每日「继续」

**范围：仅本仓库 `subtitle-kit`。** 不复制到 `~/.cursor/skills/`；不在其他项目里执行同名流程。

**项目根：** 含 `package.json`（`"name": "subtitle-kit"`）与 `docs/sprint-state.json` 的目录。  
**计划：** [docs/PLAN-30DAY-SPRINT.md](../../../docs/PLAN-30DAY-SPRINT.md) · [docs/PLAN-50USD-DAY.md](../../../docs/PLAN-50USD-DAY.md) · [docs/seo-outreach.md](../../../docs/seo-outreach.md)  
**状态：** [docs/sprint-state.json](../../../docs/sprint-state.json)

用户在本项目里说 **「继续」** 时，按下面顺序**全部执行**，不要只给建议。

---

## 0. 项目边界（必须先过）

1. 定位仓库根：`docs/sprint-state.json` 存在，且同级 `package.json` 的 `name` 为 **`subtitle-kit`**。
2. 之后所有 Shell 的 `working_directory` = 该根；只改本仓库文件。
3. **任一不满足** → 停止，回复：「`subtitle-kit-continue` 仅用于 subtitle-kit 项目；请用 Cursor 打开 `subtitle-kit` 文件夹（或把该目录加入工作区）后再说 继续。」**不要**跑 sprint、不要改其他仓库。

多根工作区：若用户明显在处理别的项目（路径含 `墨团尊`、`keeperhub-intent-agent` 等且无 subtitle-kit 根），**不**触发本 skill。

---

## 0b. 触发

匹配（且 §0 已通过）：继续、今日继续、subtitle-kit 继续、跑 sprint、30天 sprint 下一步。

---

## 1. 加载进度

```bash
python scripts/sprint_status.py
```

解析 JSON：`sprintDay`、`sprintWeek`、`nextGuide`、`openWeekTasks`、`kpi`、`adjustments`。

同步：`guidesOnDisk` 与 `src/pages/guides/` 一致时，把 slug 合并进 `docs/sprint-state.json` 的 `guidesDone`。

---

## 2. 浏览器读当前效果

读 [references/browser-metrics.md](references/browser-metrics.md)，用 **cursor-ide-browser**：

1. 从 `docs/sprint-state.json` 的 **`gscPropertyUrl`** 打开 GSC（默认即 subtitle-kit 已验证属性）：
   `https://search.google.com/search-console?resource_id=https%3A%2F%2Fsubtitle-kit.pages.dev%2F&after_verification_success=`
2. `browser_tabs` → 若已有该 GSC 标签，先 `browser_lock` 再 `browser_snapshot`；否则 `browser_navigate` 到 **gscPropertyUrl**，再进 Performance（28d 点击/展示）、Pages（索引）、Sitemaps（sitemap-index.xml）。
3. 可选：`browser_navigate` live 站健康检查；Cloudflare Analytics 读 **28d UV**。
4. 提取：**28d UV**、**GSC 28d 展示/点击**、**索引页数**、sitemap 状态；写入 `lastMetrics`（含 `date`、`source`，source 注明 GSC 入口 URL）。

**无法读 GSC/CF 时：** 按 [docs/METRICS-READ.md](../../../docs/METRICS-READ.md) 请用户粘贴 `数据 点击X 展示Y 索引Z uv28dN`，或 side 栏手动登录后再 snapshot。

外网健康检查改用 **`curl.exe -sI https://subtitle-kit.pages.dev/`**（可走本机代理）；不要假设 MCP 能打开 Google。

---

## 3. 策略微调

合并 `sprint_status.py` 的 `adjustments` 与读数结果：

| 条件 | 今日优先 |
|------|----------|
| Week 1 | 连写 Week1 guides（最多 3 篇/轮）+ GSC 基线；**不做** Reddit/PH |
| UV 落后且 Week≥2 | **你**优先 Reddit/目录；Agent 只出草稿、少开新 guide |
| `nextGuide` 存在且 Week1 将结束仍缺 guide | 先写完 guide 再分发 |
| Week 3 | PH 或路径 B；Launch 日可暂停 guide |
| Week 4 + UV≥200 | AdSense 准备；否则 es/P2（见 PLAN-30DAY Week4） |
| GSC 有展示无点击（Week4+） | 改 2 页 title/H1，不新开同质页 |

---

## 4. 自动执行（Cursor 可完成部分）

**不以「每天 1～2 小时 / 每天 1 篇」为上限**（见 [PLAN-30DAY-SPRINT §0](../../../docs/PLAN-30DAY-SPRINT.md)）。

默认每一轮「继续」：

1. 从 `nextGuide` 起，**连写当周尚未完成的 guides**，单次上限 **3 篇**（用户说「今天只 1 篇」则只写 1 篇）。
2. 全部改完后 **一次** `npm run build`。
3. `python scripts/git_commit.py "..." "..."` → 汇报 **请你 push**。

仍按 **一条 P0 手动闸门** 在汇报里点明（push / 粘贴数据 / 发贴），但不要因工时假设提前停写 guide。

### 4.1 下一篇 guide（最常见）

若 `nextGuide` 非空且用户未说「今天只发帖」：

- 路径：`src/pages/guides/{slug}/index.astro`
- 规范：[PLAN-50USD-DAY §4.1](../../../docs/PLAN-50USD-DAY.md)（800–1200 词英文、CTA 到对应 tool、SeoToolExtras、内链 2 工具）
- 跑 `npm run build`，失败则修到通过
- 更新 `guidesDone`；可选 `completedTaskIds` 如 `w1-guides-2` 部分完成由 agent 判断

### 4.2 仓库/SEO 杂项

- 提醒用户 **`git push`**（Agent 只 commit，不 push）；可 `curl.exe` 检查线上是否已更新
- GSC 标题优化：仅当 `lastMetrics` 显示有点击/展示数据且 Week≥4

### 4.3 仅草稿（不代发帖）

Reddit / 目录 / PH：生成英文正文到聊天或 `docs/drafts/YYYY-MM-DD-{topic}.md`，**禁止**假装已发布。发布后请用户确认，再递增 `redditPosts` / `directorySubmits` / `phLaunched`。

---

## 5. 更新 state

编辑 [docs/sprint-state.json](../../../docs/sprint-state.json)：

- `lastMetrics`（§2）
- 完成的任务 id → `completedTaskIds`
- 新 guide → `guidesDone`
- 用户确认的发帖/目录 → 计数器
- 周日：追加 `weeklyLog` 一行（对齐 PLAN-50USD §9 字段）

---

## 5b. Git（用户约定）

本仓库有改动且 sprint/功能任务结束时：

1. `git status` / `git diff` 确认无 `.env` 等密钥
2. `git add` 相关文件
3. **`git commit`** 写清本次内容（guides、sprint、SEO 等）  
   - Cursor 终端里裸 `git commit` 可能因 Git 2.22 + `--trailer` 失败 → 用：  
     `python scripts/git_commit.py "subject" "optional body"`
4. **禁止** `git push` — 由用户本机 push（可用 SOCKS 代理）
5. 汇报里写：`git log -1 --oneline` 与「请你 push」

---

## 6. 回复模板（简体中文）

必须包含以下小节：

```markdown
## 当前效果（第 D 天 / Week W）
- 28d UV：…（来源）
- GSC 28d 点击 / 展示：…
- 索引：…
- 月 KPI 进度：UV≥800 或 点击≥40+索引≥12 → 是/否/未知

## 今日已自动完成
- …

## 请你手动做（约 40% 时间，1 条最重要）
- …

## 明日说「继续」时会…
- …

## 策略调整
- …（来自 adjustments + 读数）
```

---

## 7. 禁止

- 买链、spam、代用户登录发 Reddit
- 未 `npm run build` 就宣称 guide 已上线
- 跳过读数说明（至少 `curl.exe` 检查 live 站 + 读 state；GSC 失败见 METRICS-READ.md）

---

## 8. 示例

**用户：** 继续  

**Agent：** 跑 `sprint_status.py` → 浏览器读 GSC/CF → 新建 `guides/fix-subtitle-sync-constant-delay/` → build → 更新 state → 输出 §6 模板，手动项为「GSC 看 sitemap 是否 Success」。
