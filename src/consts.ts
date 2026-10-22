export const SITE = {
  title: 'desthon',
  subtitle: '芙宁娜的花园',
  tagline: '水之记忆 · Focalors',
  description:
    'desthon 的个人博客，以芙宁娜为主题：一处放照片、写字和记技术笔记的水边小屋。',
  author: 'desthon',
  url: 'https://desthon.github.io',
  locale: 'zh-CN',
  nav: [
    { label: '首页', href: '/' },
    { label: '相册', href: '/gallery/' },
    { label: '文章', href: '/posts/' },
    { label: '关于', href: '/about/' },
  ],
} as const;

export const CREDIT =
  '图源：《原神》官方美术与角色资料（© HoYoverse）。本站为非商业同人站点。';

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    timeZone: 'Asia/Shanghai',
  })
    .format(date)
    .replace(/\//g, ' · ');
}

export function readingTime(text: string): number {
  const cjk = (text.match(/[\u4e00-\u9fa5]/g) || []).length;
  const words = (text.match(/[A-Za-z0-9]+/g) || []).length;
  return Math.max(1, Math.round(cjk / 400 + words / 220));
}
