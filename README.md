# Subtitle Kit

**Live site:** [https://subtitle-kit.pages.dev](https://subtitle-kit.pages.dev)  
**Repository:** [github.com/linyf-B/subtitle-kit](https://github.com/linyf-B/subtitle-kit)

**系统计划（0 → $50/日）：** [docs/PLAN-50USD-DAY.md](./docs/PLAN-50USD-DAY.md) · **30 天先做：** [docs/PLAN-30DAY-SPRINT.md](./docs/PLAN-30DAY-SPRINT.md) · **继续 SEO：** [docs/SEO-CONTINUE-PLAN.md](./docs/SEO-CONTINUE-PLAN.md) · 外链：[docs/seo-outreach.md](./docs/seo-outreach.md)

面向剪辑/短剧/字幕工作流的 **浏览器本地工具站**（英文 SEO），可 **零域名** 部署到 Cloudflare Pages。
## 本地预览

```powershell
cd d:\_A\MeDOCS\Project\web3\subtitle-kit
npm install
npm run dev
```

浏览器打开终端里显示的地址（一般是 `http://localhost:4321`）。

## 没有域名怎么挂外网（推荐）

### 你需要准备的（免费）

| 物品 | 说明 |
|------|------|
| GitHub 账号 | 存代码，Cloudflare 从仓库构建 |
| Cloudflare 账号 | 免费 Pages + 自带 `xxx.pages.dev` 子域名 |

**不需要** 买域名、不需要 VPS、不需要备案（ visitors 走 Cloudflare 海外 CDN；若你主要做大陆投放，策略自行评估）。

### 步骤概览

1. **在本机确认能构建**

   ```powershell
   npm run build
   ```

   成功后会生成 `dist/`。

2. **推到 GitHub**

   - 在 GitHub 新建空仓库（例如 `subtitle-kit`）
   - 在本目录：

   ```powershell
   git init
   git add .
   git commit -m "Initial Subtitle Kit static tools"
   git remote add origin https://github.com/你的用户名/subtitle-kit.git
   git push -u origin main
   ```

3. **Cloudflare Pages 连接仓库**

   - 登录 [Cloudflare Dashboard](https://dash.cloudflare.com/) → **Workers & Pages** → **Create** → **Pages** → **Connect to Git**
   - 选刚建的仓库
   - 构建设置：
     - **Framework preset**: Astro
     - **Build command**: `npm run build`
     - **Build output directory**: `dist`
   - **Environment variable**（重要，换域名后要改）：
     - `SITE_URL` = `https://你的项目名.pages.dev`（部署成功后 Cloudflare 会告诉你确切 URL）

4. **首次部署**

   - 点 Deploy，等 2–5 分钟
   - 访问 `https://<project-name>.pages.dev` 即可对外访问

5. **SEO 下一步（仍不用买域名）**

   - [Google Search Console](https://search.google.com/search-console) → 添加 **URL 前缀** → 填你的 `pages.dev` 地址 → 按提示验证
   - 提交 sitemap：`https://你的项目.pages.dev/sitemap-index.xml`
   - （可选）Bing Webmaster Tools 同样提交

6. **以后买域名（可选）**

   - Cloudflare 或任意注册商买域名 → Pages 项目 **Custom domains** 绑定
   - 把 `SITE_URL` 和 `public/robots.txt` 里的 sitemap 地址改成新域名 → 重新部署

## 变现（国际展示广告）

页脚广告位支持 **AdSense / Monetag / PropellerAds / Adsterra**（仅 Banner/Native，不含弹窗）。未配置 ID 时显示占位，不加载第三方脚本。

1. 申请账号并创建 **展示广告位**（不要用 Popunder / OnClick，以免 AdSense 封号）
2. 把 ID 写进 Cloudflare Pages → **Environment variables**（Production），变量名见 [`.env.example`](./.env.example)
3. 重新部署；打开 `https://你的站点/ads.txt` 应能看到 `google.com, pub-…, DIRECT, …`
4. AdSense 申请期至少填 `PUBLIC_ADSENSE_CLIENT`（会写入 meta + adsbygoogle.js，供站点验证）

本地预览：复制 `.env.example` 为 `.env` 后 `npm run dev`。

## 开源

MIT License — 见 [LICENSE](./LICENSE)。

## 工具列表

- `/tools/srt-time-shift/` — SRT 整体时间偏移
- `/tools/vtt-time-shift/` — WebVTT 整体时间偏移
- `/tools/srt-to-vtt/` — SRT 转 WebVTT
- `/tools/vtt-to-srt/` — WebVTT 转 SRT
- `/tools/srt-to-text/` — SRT 转纯文本
- `/tools/line-length/` — 字幕行字数检查
- `/tools/read-time/` — 旁白时长估算
- `/tools/strip-html/` — 去除 SRT 内 HTML 标签
- `/tools/merge-split-cues/` — 合并/拆分 SRT 轴
- `/tools/fps-offset/` — 帧率 ↔ 毫秒偏移计算

## 技术

- Astro 5 静态站 + `@astrojs/sitemap`
- 工具逻辑在浏览器执行，见 `src/lib/srt.ts`、`src/lib/vtt.ts`
