# 为什么 Agent 读不到 GSC / Cloudflare 数据

## 实测结论（2026-09-20）

| 方式 | subtitle-kit.pages.dev | Google Search Console | Cloudflare 控制台 |
|------|------------------------|------------------------|-------------------|
| 终端 `curl.exe`（走系统/代理） | ✅ 200 | ❌ 需登录 + 非 API | ❌ 需登录 |
| Cursor **cursor-ide-browser** MCP | ❌ `chrome-error://chromewebdata/` | ❌ 同上 | ❌ 同上 |
| MCP 访问 `http://127.0.0.1:4321/` | ✅ 正常 snapshot | — | — |

**根因有两层：**

1. **网络** — Cursor 自动化浏览器往往**不走**你在终端里用的 SOCKS/HTTP 代理。本机 `curl` 能出网，但 MCP 浏览器访问外网 HTTPS 会直接失败（`chrome-error`），不是 GSC 配置错了。
2. **鉴权** — GSC 与 Cloudflare Analytics **没有公开 API** 给 Agent 用。即使能打开域名，也必须在**同一浏览器配置里**登录 Google / Cloudflare；MCP 的 Cookie 与 Chrome 主浏览器**不共享**。

因此 sprint 报告里出现「28d UV / GSC 点击 / 索引 = 未知」是预期行为，直到你用下面任一方式喂数据。

---

## 推荐做法（按省事程度）

### A. 口头粘贴（最快）

在 subtitle-kit 对话里发一行，Agent 写入 `docs/sprint-state.json` → `lastMetrics`：

```text
数据 点击3 展示120 索引6 uv28d42
```

字段可省略；有就更新。

### B. 在 Cursor 侧栏浏览器里登录一次

1. 让 Agent 用 `browser_navigate` + `position: "side"` 打开 [GSC 属性链接](https://search.google.com/search-console?resource_id=https%3A%2F%2Fsubtitle-kit.pages.dev%2F&after_verification_success=)（若仍 chrome-error，说明外网仍不通，改用 A）。
2. 你在**该侧栏页**手动登录 Google，进入 Performance（Last 28 days）与 Pages。
3. 再说「继续」，Agent 对**已登录且加载成功的标签**做 `browser_snapshot` 读数。

Cloudflare UV 同理：在侧栏登录 dash.cloudflare.com → Pages → subtitle-kit → Analytics。

### C. 仅健康检查用 curl

Agent 继续用 `curl.exe -sI https://subtitle-kit.pages.dev/` 确认部署是否上线；**不能**替代 GSC 指标。

---

## Skill 与脚本

- 读数 SOP：`.cursor/skills/subtitle-kit-continue/references/browser-metrics.md`
- 进度：`python scripts/sprint_status.py`
- 状态：`docs/sprint-state.json`

---

## Git 约定（用户指定）

- Agent **每次改仓库都 `git commit`**，消息说明本次 sprint/功能。
- **不** `git push`；由用户本机 push（可继续用 SOCKS 代理）。
