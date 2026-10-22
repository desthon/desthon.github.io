# 芙宁娜的花园 · Furina Blog

一座以《原神》枫丹水神**芙宁娜 / Focalors** 为主题的静态个人博客。
用 [Astro](https://astro.build) 构建，纯静态输出，零 UI 框架、零第三方统计、零后端。

> 水会记得一切。即使是那些你希望它忘记的。—— 芙宁娜

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
- 首字下沉、手写水纹、缓慢自转的水神徽记、滚动入场的位移，全部用 CSS 完成，且尊重 `prefers-reduced-motion`。
- 文字对比度按 WCAG AA 校准（正文 14.9:1，次要文字 4.9:1）。

## 技术栈

- **框架**：Astro 7（静态输出）
- **内容**：Markdown + Content Collections（`glob` loader + Zod schema）
- **样式**：手写 CSS 变量系统，约 30KB，无 Tailwind
- **RSS**：`@astrojs/rss`
- **站点地图**：`@astrojs/sitemap`
- **部署**：GitHub Pages（GitHub Actions）

## 本地开发

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # 产物在 dist/
npm run preview  # 预览构建结果
```

## 写一篇文章

在 `src/content/posts/` 下新建 `your-slug.md`：

```markdown
---
title: 标题
description: 一句话摘要，会出现在列表、RSS 与 meta 描述里
date: 2026-10-18
tags: [随笔, 芙宁娜]
featured: true # 可选，首页「精选篇章」会取前 3 篇
draft: false # 可选，true 则整篇不参与构建
---

正文……
```

文件名就是 URL：`your-slug.md` → `/posts/your-slug/`。

## 结构

```
src/
├─ components/   PostCard · SiteHeader · SiteFooter · HydroEmblem
├─ content/posts/ 文章（Markdown）
├─ layouts/      BaseLayout（head/SEO/主题脚本/入场动效）
├─ pages/        首页、文集、标签、关于、404、rss.xml
├─ styles/       global.css（设计系统）
└─ consts.ts     站点信息与日期/阅读时长工具
```

## 部署

仓库推送 `main` 后，`.github/workflows/deploy.yml` 会自动构建并发布到 GitHub Pages。
首次使用需在仓库 **Settings → Pages → Build and deployment** 将 Source 设为 **GitHub Actions**。

站点域名：<https://desthon.github.io>

## 许可

文章版权归作者所有；代码部分可自由取用。角色与世界观设定版权归 © HoYoverse 所有，本站为非商业同人作品。
