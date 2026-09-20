# Subtitle Kit — 从 0 到稳定 $50/日 系统计划

> **北极星**：连续 90 天，日均综合收入 ≥ **$50**（AdSense + 联盟 + 其他），波动 ≤ ±30%。  
> **当前约束**：**Cursor 辅助为主**（Agent 写代码/ guides / commit）；**瓶颈在 push、GSC/CF 读数、社区亲手发帖**，不是每天 1～2 小时写作。可写内容、可做白帽外链；域名第 6 月前可不买。  
> **若多阶段闸门连续失败**：执行 [§8 停机 / Pivot]，避免无限耗时间。

---

## §1 倒推终点（$50/日 系统长什么样）

| 指标 | 目标区间（中性假设 RPM ~$5） |
|------|------------------------------|
| 日 UV | **~3,000–5,000** |
| GSC 日点击 | **~300–800**（视 CTR） |
| 可索引 URL | **60–100+** |
| 在线工具 | **8–12** |
| guides / 意图页 | **40–60** |
| 域名 | **强烈建议第 6 月自有 .com** |
| 运行时间 | 多数 **18–30 月**；Cursor 辅助可缩短 **生产** 侧，**分发与搜索滞后**仍按行业节奏 |

---

## §2 阶段闸门（必须按顺序通过）

| 阶段 | 时间 | 收入目标 | 通过闸门（同时满足） |
|------|------|----------|----------------------|
| **S0 上线** | 第 0 周 | $0 | 站可访问、GSC 验证、sitemap 提交、build 绿 |
| **S1 被发现** | 1–12 周 | $0 | 索引页 ≥ **15**；GSC 28d 展示 ≥ **500** |
| **S2 有点击** | 3–6 月 | **$0.3–1/日** | 28d 点击 ≥ **100**；日 UV **30–80** |
| **S3 可变现** | 6–9 月 | **$1–5/日** | AdSense 或联盟已接；日 UV **150–400** |
| **S4 放大** | 9–18 月 | **$5–20/日** | 28d 点击 ≥ **1,500**；索引 **40+** |
| **S5 北极星** | 18–30 月 | **稳定 $50/日** | 90d 日均 ≥ **$50** |

**未通过当前阶段闸门 → 不得把 KPI 设为下一阶段收入**；先补 P0 动作或触发 §8。

---

## §3 每周产出预算（Cursor 辅助 — 按交付物，非小时）

| 块 | 周产出 | 谁做 |
|----|--------|------|
| **A 生产** | guides **2–4 篇** / 周（sprint 期可加速）；S2+ 按 GSC 改 title | **Cursor**（build + commit） |
| **B 数据** | GSC + UV 至少更新 **1 次/周** 进 §9 表 | 你粘贴或侧栏 GSC |
| **C 发布** | 每个 Agent commit 后 **你 push 1 次**（可合并为每天 1 push） | 你 |
| **D 外链** | S1：0；S2 起目录+社区 **2h 等价手动**（Reddit/目录条数见 30 天 sprint） | 你发帖，Cursor 草稿 |

> 旧版「1～2h/天 ≈ 7–14h/周」仅适用于无 Agent 手工站；有 **subtitle-kit-continue** 时不以该上限约束 A 块。

---

## §4 Cursor 生产流水线（固定 SOP）

### 4.1 新增 guide 页（每周 2–3 篇，S1–S4）

```
在 subtitle-kit 新增 src/pages/guides/{slug}/index.astro：
- 英文 title/description/canonicalPath、H1
- 800–1200 词 + 数字/步骤表
- 主 CTA → 一个 /tools/.../
- 内链 2 个工具 + SeoToolExtras（FAQ 5–7 + steps 3）
- npm run build 通过
```

意图页清单见 README 或本文件 §7。

### 4.2 新工具（S1 末起，共 +4～8 个，每 2–4 周一個）

优先（仍浏览器本地）：VTT shift、strip HTML tags、merge/split cues、fps 说明页+简单 calc。

### 4.3 有 GSC 数据后（S2+）

```
Performance → Queries：取 Top 10 有展示无点击
只改对应页 title、H1、首段 100 词，不新开同质页
```

---

## §5 外链 SOP（S2 起，每周 2h，白帽 only）

| 周任务 | 数量 |
|--------|------|
| 工具/startup 目录提交 | 2 |
| 或 Reddit/StackExchange 真实回答带链 | 1 |
| 或调研 Awesome 列表 PR | 1（隔周） |

**禁止**：买链、群发的 comment spam、Fiverr  bulk links。

Cursor 提示词模板见 `docs/seo-outreach.md`（若已创建）。

---

## §6 域名与变现节点

| 时间 | 动作 |
|------|------|
| 日 UV **50+** 持续 2 周 | 申请 **AdSense**，代码进 `BaseLayout.astro` ad-slot |
| **第 6 月** 或 S2 闸门通过 | 买 **.com**，Cloudflare 绑定，**SITE_URL** 改域名，GSC 新属性 |
| 日 UV **200+** | 页脚 **1–2** 个剪辑/字幕联盟链接 |

---

## §7 前 12 周内容日历（guides）

| 周 | slug（guides/…） | 主工具 |
|----|------------------|--------|
| 1 | fix-subtitle-sync-constant-delay | srt-time-shift |
| 1 | shift-srt-timing-online-free | srt-time-shift |
| 2 | srt-to-text-for-translation | srt-to-text |
| 2 | subtitle-line-length-tiktok-reels | line-length |
| 3 | voice-over-read-time-calculator | read-time |
| 3 | delay-subtitles-500ms-dubbing | srt-time-shift |
| 4 | browser-subtitle-tools-privacy | / |
| 4 | srt-offset-milliseconds-lip-sync | srt-time-shift |
| 5–12 | 每周 2 篇：从 GSC queries 或竞品标题改写的长尾 | 轮换 4 工具 |

---

## §8 停机 / Pivot（「达不到就停」的客观定义）

在 **已执行 §3 时间预算 ≥8 周** 的前提下：

### 8.1 硬停机（建议停止 subtitle 赛道）

- **第 16 周**：索引 **<8** 且 28d 展示 **<100**
- **第 12 月**：28d 点击 **<50** 且日 UV **<20**

→ 结论：niche/域名/竞争不匹配；**Pivot 到新工具簇**（仍用 Astro 模板），不要继续堆同一站。

### 8.2 软 Pivot（降北极星，不断臂）

- 第 12 月：日 **$3–8** 稳定 → 北极星改为 **$15/日**，继续 12 月
- 第 18 月：仍 **<$10/日** → 放弃 $50，改为 **副业 $5/日** 或换 niche

### 8.3 继续冲 $50 的必要条件（第 12 月检查）

- 已 **自有域名**
- 索引 **≥35**
- 28d 点击 **≥800**

缺任一条 → **$50/日在 30 月内 unlikely**，应先补条件而非加页。

---

## §9 数据表（每周日填 5 行）

| 周次 | 索引页 | 28d 展示 | 28d 点击 | 日均 UV | 周收入 $ | 备注 |
|------|--------|----------|----------|---------|----------|------|

---

## §10 对 Cursor 的一句话任务

> 读取本文件当前阶段 S*，只执行该阶段 P0；每周完成 guides 日历 + push；外链仅 S2 起；未过闸门不讨论 $50/日。

**Live**: https://subtitle-kit.pages.dev  
**Repo**: https://github.com/linyf-B/subtitle-kit
