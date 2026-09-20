# 草稿怎么发、发哪里

草稿目录：`docs/drafts/`  
**前提：** 已 `git push`，线上能打开 https://subtitle-kit.pages.dev/guides/

---

## 1. Reddit（Week 2，优先做）

**草稿：** [reddit-posts.md](./drafts/reddit-posts.md)

| 帖 | 发哪里 | 入口 |
|----|--------|------|
| 帖 1（SRT 整体延迟） | **r/videoeditors** | https://www.reddit.com/r/videoeditors/submit |
| 帖 2（翻译/竖屏） | **r/translator** 或 **r/NewTubers** | https://www.reddit.com/r/translator/submit · https://www.reddit.com/r/NewTubers/submit |

**怎么发：**

1. 浏览器登录 Reddit（建议账号有一定 karma，新号只发链易删）。
2. 打开上表 **submit** 链接 → 选 **Post**（文字帖，不是 Link 独占）。
3. **Title** 用草稿里的英文标题（可微调，别像广告）。
4. **Body** 从草稿复制正文（含 Markdown 链接）。
5. 发帖前在该 sub 搜类似问题：若能 **回复别人帖子** 带同样干货+链，往往比新发更安全。
6. 发完记一笔：改 `docs/sprint-state.json` 的 `redditPosts`（+1）。

**规则：** 每周本 sub 最多 1～2 条带站链；先干货后链接；读各版 sidebar 规则。

---

## 2. Product Hunt（Week 3，路径 A）

**草稿：** [product-hunt.md](./drafts/product-hunt.md)

| 步骤 | 哪里 |
|------|------|
| 注册 / 登录 | https://www.producthunt.com/ |
| 提交产品 | 登录后 **Submit** → https://www.producthunt.com/posts/new （或站内 “Submit product”） |
| 养号（提前 7 天） | 给别的 launch **Upvote + 写评论** |

**怎么发：**

1. **Name：** Subtitle Kit  
2. **Website：** https://subtitle-kit.pages.dev  
3. **Tagline：** 草稿里 ≤60 字符那句  
4. **Description / 首评：** 复制草稿 “一句话描述” + “首评 Founder comment”  
5. **Gallery：** 上传首页 + SRT shift 界面截图（1280×720 左右）  
6. **Launch 日：** 周二～周四；当天 **10 分钟内回复每条评论**（用 FAQ 模板）  
7. 发完：`phLaunched: true` in sprint-state

---

## 3. Show HN（Week 3，路径 B，做不了 PH 时）

**草稿：** [show-hn.md](./drafts/show-hn.md)

| 哪里 | 链接 |
|------|------|
| 提交 Show HN | https://news.ycombinator.com/submit |

**怎么发：**

1. 登录 Hacker News 账号（https://news.ycombinator.com/login）  
2. **title：** 草稿二选一，如 `Show HN: Subtitle Kit – browser-only SRT tools, no upload`  
3. **url：** `https://subtitle-kit.pages.dev`  
4. **text：** 可选，把草稿正文贴到 text（若选 “Ask” 则不对；Show HN 一般是 **link + 评论里补充**）  
5. 提交后自己 **发第一条 comment** 贴 guides 链接与隐私说明  
6. **一天只 submit 一次**；被拒正常，隔几天改标题再试

---

## 4. Dev.to（Week 3，路径 B）

**草稿：** [devto-article.md](./drafts/devto-article.md)

| 哪里 | 链接 |
|------|------|
| 注册 / 写文 | https://dev.to/ → **Create Post** |
| 或直达 | https://dev.to/new |

**怎么发：**

1. Editor 选 **Markdown**  
2. **Title** 用草稿标题  
3. 正文粘贴 `devto-article.md` 里 `## 正文` 以下部分  
4. **Tags：** `webdev`, `javascript`, `video`（最多几个）  
5. **Canonical URL（可选）：** `https://subtitle-kit.pages.dev`  
6. **Publish** → 把文章链接存下来，以后 Reddit 可引用 “write-up on Dev.to”

---

## 5. 工具目录（Week 2，和 Reddit 并行）

**文案：** [seo-outreach.md](./seo-outreach.md) 三版 50/150/300 词  

**怎么找站：**

- Google 搜：`free web tool directory submit`、`submit saas tool free`  
- 打开站点 → 找 **Submit** / **Add your tool** → 填 URL + 150 词描述  

**记录：** `directorySubmits` +1，日期写进 PLAN-50USD §9 表

---

## 推荐顺序（第一次）

```
Day A  git push → 确认 /guides/ 线上
Day B  Reddit 帖 1 → r/videoeditors
Day C  Reddit 帖 2 → r/translator 或 r/NewTubers
Day D  2 个工具目录（seo-outreach 150 词）
Week3  PH 或 Show HN + Dev.to 三选一/组合
```

发完对我说 **「已发 Reddit」** 或粘贴 `数据 点击X…`，我会更新 sprint-state。
