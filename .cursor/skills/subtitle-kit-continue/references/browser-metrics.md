# 浏览器读数（subtitle-kit sprint）

Agent 用 **cursor-ide-browser** MCP。  
**GSC 搜索关键信息** = 已验证属性的 Google Search Console，**固定从下面入口打开**（不要用别的 resource_id）。

## GSC 属性入口（主 URL）

```
https://search.google.com/search-console?resource_id=https%3A%2F%2Fsubtitle-kit.pages.dev%2F&after_verification_success=
```

属性：**URL 前缀** `https://subtitle-kit.pages.dev/`（与 `resource_id` 一致）。

读数流程：先 `browser_navigate` 到 **主 URL** → 若已是控制台首页，`browser_snapshot` 读概览；再进入子页读明细（同一 `resource_id`）。

### 子页（在同一属性下点左侧菜单，或直接 navigate）

| 目的 | 建议 URL（`resource_id` 同上） |
|------|--------------------------------|
| **效果 / 搜索分析（28d 点击、展示）** | `https://search.google.com/search-console/performance/search-analytics?resource_id=https%3A%2F%2Fsubtitle-kit.pages.dev%2F` → 日期 **Last 28 days** → 记 **Total clicks**、**Total impressions** |
| **索引（已编入索引页数）** | `https://search.google.com/search-console/index?resource_id=https%3A%2F%2Fsubtitle-kit.pages.dev%2F` → Pages → **Indexed**（及未索引对比） |
| **Sitemap** | `https://search.google.com/search-console/sitemaps?resource_id=https%3A%2F%2Fsubtitle-kit.pages.dev%2F` → `sitemap-index.xml` 是否 **Success** |

Week4+ 改标题时：Performance → **Queries** 表，记「有展示、低/零点击」的 query（供 Cursor 改 title/H1）。

若页面是 **Start now / 登录 Google**：Agent **不能**代登录。报告写：「请在本机浏览器打开上述 GSC 链接并登录，再说 继续」；`lastMetrics` 保留旧值。

### MCP 浏览器限制

- 外网 HTTPS 常出现 **`chrome-error://chromewebdata/`**（Cursor 浏览器不走终端代理）。见 [docs/METRICS-READ.md](../../../docs/METRICS-READ.md)。
- 公开站可用 **`curl.exe`** 做 200 检查；GSC/Cloudflare 指标靠用户粘贴或 side 栏登录后 snapshot。

---

## 1. 线上健康检查（无需登录）

- `https://subtitle-kit.pages.dev/`
- `https://subtitle-kit.pages.dev/sitemap-index.xml`
- 任选一个工具页，确认可访问、标题含 Subtitle Kit

---

## 2. Cloudflare UV（可选，需登录 Cloudflare）

- Workers & Pages → **subtitle-kit** → Analytics
- **Unique visitors**（Last 28 days；写入 `uv28d` 时在 `source` 注明区间）

月 KPI 二选一：**UV≥800（CF）** 或 **GSC 28d 点击≥40 且索引≥12**。GSC 为主时仍建议 CF 作交叉验证。

---

## 3. 写入 `docs/sprint-state.json`

```json
"lastMetrics": {
  "date": "2026-09-20",
  "uv28d": 42,
  "gscImpressions28d": 120,
  "gscClicks28d": 3,
  "indexedPages": 6,
  "source": "browser:GSC https://search.google.com/search-console?resource_id=... + Cloudflare 28d"
}
```

`gscPropertyUrl` 字段（state 内）应与主 URL 一致，便于 Agent 复制 navigate。

---

## 4. 调整规则（与 `scripts/sprint_status.py` 一致）

- UV 28d < (800/28)×当前天×0.5 且 Week≥2 → 加重分发
- Week1 第 5 天仍缺 2 guides → 优先写 guide
- Week3+ UV<200 且 GSC 点击<15 → 预备 Week4 P1/P2

任务清单：`docs/PLAN-30DAY-SPRINT.md`、`docs/PLAN-50USD-DAY.md` §7。
