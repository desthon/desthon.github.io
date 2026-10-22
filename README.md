# desthon · 芙宁娜的花园

**desthon 的个人博客**，以《原神》枫丹水神**芙宁娜 / Focalors** 为主题。
用 [Astro](https://astro.build) 构建，纯静态输出，零 UI 框架、零第三方统计、零后端。

站点：<https://desthon.github.io>

> 水会记得一切。即使是那些你希望它忘记的。—— 芙宁娜

## 内容

- **相册**：芙宁娜的官方立绘、卡面、壁纸与纪念绘，共 10 张，支持分类筛选与大图查看（方向键 / 触屏滑动）。
- **文章**：随笔与技术笔记，Markdown 写作（当前为空，等待第一篇）。
- **关于**：站主是谁、这个站怎么来的、配色为什么是这四个颜色。

## 视觉

配色直接取自角色：珍珠白的水汽、法庭的深蓝、水元素的青，以及极少量作点缀的金饰。

| 角色 | 色值 | 用法 |
| --- | --- | --- |
| 珍珠白 | `#f6fafd` | 页面底色，比纯白更软 |
| 法庭深蓝 | `#0b2039` | 英雄区与正文主色 |
| 水元素青 | `#7fd8ec` | 强调、水波、进度条 |
| 金饰 | `#c9a063` | 分隔线、引号、徽记边缘（面积 < 3%） |

其他设计决定：

- 标题字体 **霞鹜文楷**（按 `unicode-range` 分片加载，只下载用到的字），正文用系统无衬线。
- 深色模式不是反色，而是另一套「夜晚法庭」配色（深海底、提亮的青与金）。
- 相册是瀑布流（CSS columns），封面不裁剪图片，点开进灯箱。
- 动效全部 CSS 实现，尊重 `prefers-reduced-motion`；文字对比度按 WCAG AA 校准。

## 技术栈

- **框架**：Astro 7（静态输出，6 个页面、零客户端框架）
- **内容**：Markdown + Content Collections（`glob` loader + Zod schema）
- **相册数据**：`src/data/gallery.ts`（一份带尺寸的清单，避免布局跳动）
- **样式**：手写 CSS 变量系统，约 36 KB，无 Tailwind
- **RSS / 站点地图**：`@astrojs/rss`、`@astrojs/sitemap`
- **部署**：GitHub Pages（GitHub Actions）

## 本地开发

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # 产物在 dist/
npm run preview  # 预览构建结果
```

## 加一张图

1. 图片压成 webp 放进 `public/images/gallery/`（建议长边 ≤ 1800，质量 80）：

   ```bash
   node -e "require('sharp')('in.png').resize({width:1200}).webp({quality:84}).toFile('public/images/gallery/name.webp')"
   ```

2. 在 `src/data/gallery.ts` 的 `GALLERY` 里追加一条（`width` / `height` 必填，用来占位防抖动）：

   ```ts
   { file: 'name.webp', title: '标题', caption: '一句话描述', category: '立绘', width: 1200, height: 1139 }
   ```

首页自动展示前 6 张，`/gallery/` 展示全部并按 `category` 筛选。

## 写一篇文章

在 `src/content/posts/` 下新建 `your-slug.md`（文件名即 URL）：

```markdown
---
title: 标题
description: 一句话摘要，会出现在列表、RSS 与 meta 描述里
date: 2026-10-18
tags: [随笔, 芙宁娜]
featured: true # 可选，首页「精选」取前 3 篇
draft: false # 可选，true 则不参与构建
---
```

无文章时首页与 `/posts/` 会显示空状态，不会报错。

## 结构

```
src/
├─ components/   GalleryGrid · Lightbox · HydroEmblem · PostCard · SiteHeader · SiteFooter
├─ content/posts/ 文章（Markdown）
├─ data/gallery.ts 相册清单
├─ layouts/      BaseLayout（head/SEO/主题/入场动效/灯箱）
├─ pages/        首页、相册、文章、标签、关于、404、rss.xml
├─ styles/       global.css（设计系统）
└─ consts.ts     站点信息与日期/阅读时长工具
public/
├─ images/       英雄立绘、横幅
└─ images/gallery/ 相册图片（webp）
```

## 部署

推送 `main` 后 `.github/workflows/deploy.yml` 自动构建并发布到 GitHub Pages。
仓库 Pages 已设为 **Source: GitHub Actions**（`build_type=workflow`）。

一次性推送（token 只出现在命令行，不落盘）：

```bash
GITHUB_TOKEN=<你的 PAT> bash scripts/push.sh
```

## 版权

文字与代码归 desthon 所有。角色、美术与世界观版权归 © HoYoverse 所有，本站为非商业同人作品，图片仅作展示。
