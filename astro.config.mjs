import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

/** 上线后改成你的 pages.dev 或自定义域名，SEO 与 sitemap 才完整 */
const site = process.env.SITE_URL || "https://subtitle-kit.pages.dev";

export default defineConfig({
  site,
  integrations: [sitemap()],
});
