# 30 天 Traffic Sprint — subtitle 工具 + 社区/首发

> **本月 KPI（二选一达标即可）：**  
> - Cloudflare **UV ≥ 800**（28 天累计可看日均）  
> - 或 GSC **28 天点击 ≥ 40** 且 **索引 ≥ 12**  
>  
> **本月不要求：** $50/日。有 UV 后再接广告。

**运行模式（默认）：Cursor 辅助** — 见 [§0](#0-cursor-辅助不以小时为上限)。你说「继续」= Agent 尽量多完成 **仓库内** 交付；**不以「每天 1～2 小时」卡产能**。

**站点：** https://subtitle-kit.pages.dev  
**长期计划：** [PLAN-50USD-DAY.md](./PLAN-50USD-DAY.md)  
**外链文案：** [seo-outreach.md](./seo-outreach.md)

---

## §0 Cursor 辅助：不以小时为上限

原假设「每天 1～2h」适合**纯手工**建站。你用 **Cursor + subtitle-kit-continue skill** 时，写作 / 改代码 / build / commit 由 Agent 批量做，**真正瓶颈**只有下面几类（和小时数无关）：

| 类型 | 谁做 | 说明 |
|------|------|------|
| **仓库产出** | Cursor | guides、SEO 改 title、工具页、草稿；每次「继续」可 **连写多篇** guide（build 通过后 **一次 commit**） |
| **上线** | 你 | `git push` → Cloudflare 部署（Agent 不 push） |
| **数据** | 你或侧栏浏览器 | GSC 点击/展示/索引、CF UV：粘贴 `数据 点击X 展示Y 索引Z` 或登录 Cursor 浏览器 |
| **分发** | 你 | Reddit / 目录 / PH **亲手发**；Agent 只出英文草稿 |
| **实时互动** | 你 | PH Launch 日回评、 Reddit 跟帖 |

### 每次「继续」Agent 默认做什么

1. 读 `sprint-state.json` + 指标（有则调策略）。
2. **清空当前 Week 的 guide  backlog**（最多连做 **当周日历里尚未完成的 guides**，单次上限 **3 篇**，避免一轮过长）；或仅 1 篇若你说了「今天只发 1 篇」。
3. `npm run build` → `python scripts/git_commit.py` → 提醒你 **push**。
4. 列出 **下一项手动闸门**（push / 粘贴数据 / 发第几条 Reddit），**不**用「今天只能干 1 小时」截断。

### 手动闸门配额（按 Week，不是按天小时）

| Week | 你最少要完成的手动项 |
|------|----------------------|
| 1 | push ≥1；GSC sitemap/索引看过 1 次；指标进表 1 次 |
| 2 | Reddit **2** + 目录 **2** + push 随 Agent commit 走 |
| 3 | PH（或路径 B）Launch **1 天** + 当天回评 |
| 4 | 目录 **2** + Reddit **1**；UV≥200 则 AdSense 申请 |

### 加速（可选）

- **Week 1～2 的 4 篇 guide** 可在 **2～4 次「继续」** 内写完（旧计划按周 2 篇是保守值）。
- UV 落后时：**优先手动分发**，Agent 暂停加 guide；索引落后时：**优先 push + 请求编入索引**。

---

## 节奏参考（原 1～2h/天 → 改为交付物）

| 优先 | 做什么 |
|------|--------|
| **P0 仓库** | 当周 guides / 改 title / PH 素材（Cursor，可一次多篇） |
| **P0 手动** | push、GSC/CF 数据、发帖 |
| **P2** | 周日填 PLAN-50USD §9 数据表一行 |

---

## Week 1 — 基线 + guides（Cursor 可一次多篇）

### 必做

- [ ] `git push` 确保线上是最新（含 P0 SEO、docs）
- [ ] Cursor：**Week1 共 2 篇 guides**（§7 第 1～2 条；可 1 次「继续」连做）
- [ ] GSC：确认 sitemap Success；Indexing 记索引页数
- [ ] 建表格：日期 | UV | 28d展示 | 28d点击 | 索引 | 本周动作

### Cursor 口令

```
读 docs/PLAN-30DAY-SPRINT.md Week 1，在 subtitle-kit 新增 guides/{slug}/index.astro，
规范同 PLAN-50USD-DAY §4.1，做完 npm run build。
```

### 不做

- Reddit / PH（还没内容可展示）

---

## Week 2 — 社区冷启动

### 目标

2 条 **真实帮助** 的英文帖（带链或不带链见下），4 个目录提交。

### Reddit（选 2 个，不要同一周狂发）

| 社区 | 适用场景 |
|------|----------|
| r/videoeditors | 字幕不同步、导出 SRT |
| r/translator | SRT 转文本给翻译 |
| r/NewTubers | 短剧/口播字幕行太长 |
| r/captions | 字幕时间轴 |

**规则：** 先写 200 字干货（步骤 1-2-3），**最后一句**「I use a free browser tool for shifting SRT timing」+ 链到 **具体工具页**（不要只链首页）。  
**禁止：** 标题像广告、新号只发推广。

### Cursor 口令

```
我在 r/videoeditors 回答问题：「{粘贴问题}」
写 150 词英文：先给手工步骤，再自然提到 Subtitle Kit 的 SRT shift（链到 /tools/srt-time-shift/），像真人，不要 marketing。
另写 50/150 字目录提交描述，见 seo-outreach.md。
```

### 目录

- 每周 **2 个**，用 `seo-outreach.md` 三版描述  
- Google：`free web tool directory submit`、`submit saas tool free`

### 生产

- guides 第 3～4 篇（Cursor）

---

## Week 3 — Product Hunt（或备选）

### 路径 A：Product Hunt（推荐，若英文能读能回评论）

**提前 7～10 天：**

1. 注册 PH，关注几个 launch，**给别人留言**（养号）
2. Cursor 写：tagline（≤60 字符）、首评 founder story（200 词）、3 条 FAQ 回复模板
3. 准备 3 张图或 GIF：首页 + SRT shift 界面 + 「runs in browser, no upload」

**Launch 日（周二～周四 00:01 PST 更好）：**

- [ ] 发布；**10 分钟内** 回复每条评论
- [ ] X/朋友圈可发一句，可选
- [ ] 当天 guides 可暂停，全力 PH

**预期：** 中游 **500～2000 UV** 即算 Week 3 成功（非 #1 也 OK）

### 路径 B：做不了 PH 时

- **Indie Hackers** 发 Show 帖（英文）
- **Hacker News** Show HN（标题：`Show HN: Browser-only SRT tools, no upload`）— 一天 1 次，被拒正常
- **Dev.to** 一篇「How I built privacy-first subtitle tools on Cloudflare Pages」链到 live 站

### 生产

- guides 第 5～6 篇

---

## Week 4 — 放大或接广告

### 若 UV 已有 200+

- [ ] 申请 **Google AdSense** 或 **Monetag**（工具站短停留，见社区经验）
- [ ] 代码放进 `src/layouts/BaseLayout.astro` 的 `ad-slot`
- [ ] GSC Performance → **Top queries**，Cursor 只改 **有展示无点击** 的 2 页 title/H1

### 若 UV 仍 <200 且点击 <15

- [ ] 执行 **P1 多语言**：先做 **西班牙语** 4 工具页（`/es/tools/...`）或 guides 2 篇（Cursor 翻译+本地化）
- [ ] 或 **P2**：5 页「fix subtitle sync」「srt shift online free」强化（见 PLAN-50USD-DAY §8）

### 分发

- 再 2 目录 + 1 条 Reddit（换 subreddit）

---

## 第 28 天验收

| 结果 | 下一步 |
|------|--------|
| UV≥800 或 点击≥40 | 进入 PLAN-50USD 的 **S2**；第 6 月考虑 .com |
| 中间档（UV 200～800） | 再 sprint 4 周，加 es 语言 |
| 未达标 | Pivot P1/P3 或停机（PLAN-50USD §8） |

---

## Cursor 每日一句（复制）

```
按 docs/PLAN-30DAY-SPRINT.md §0 Cursor 辅助：
读 sprint-state，补指标；当周未完成的 guides 尽量本轮写完（最多 3 篇），build + git_commit；
Reddit/PH 只出草稿。最后列出我要 push / 发帖 / 粘贴数据的下一项。
```

---

## 和「只堆 SEO」的区别

| 只堆 SEO | 本 sprint |
|----------|-----------|
| 等 Google 爬 | **主动把人拉进站** |
| 30 天 8 点击常见 | **目标 500+ UV 可能** |
| 适合 6 月+ | **适合第 1 月验证** |
| SEO 仍要做 guides | guides **为 Reddit/PH 提供可信落地页** |

SEO 没废：**guides 同时服务 Google**；只是 **第 1 月主引擎是分发**。
