# 30 天 Traffic Sprint — subtitle 工具 + 社区/首发

> **本月 KPI（二选一达标即可）：**  
> - Cloudflare **UV ≥ 800**（28 天累计可看日均）  
> - 或 GSC **28 天点击 ≥ 40** 且 **索引 ≥ 12**  
>  
> **本月不要求：** $50/日。有 UV 后再接广告。

**站点：** https://subtitle-kit.pages.dev  
**长期计划：** [PLAN-50USD-DAY.md](./PLAN-50USD-DAY.md)  
**外链文案：** [seo-outreach.md](./seo-outreach.md)

---

## 每天怎么分配（1～2 小时）

| 比例 | 做什么 |
|------|--------|
| **60%** | Cursor：guides / 改标题 / PH 素材 |
| **40%** | 浏览器：**发帖、填目录、回评论**（Cursor 只写草稿） |

每周日：填 §9 数据表（见 PLAN-50USD-DAY.md）。

---

## Week 1 — 基线 + 2 篇 guide

### 必做

- [ ] `git push` 确保线上是最新（含 P0 SEO、docs）
- [ ] Cursor 新建 2 篇 guides（见 PLAN-50USD-DAY §7 第 1～2 条）
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
今天执行 docs/PLAN-30DAY-SPRINT.md 的 Week {N} 未打勾项；
若是 Reddit/PH 只生成英文草稿，我手动发帖；
若是 guide 则直接改仓库并 npm run build。
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
