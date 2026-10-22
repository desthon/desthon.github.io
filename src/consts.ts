export const SITE = {
  title: '芙宁娜的花园',
  tagline: '水之记忆 · Focalors',
  description:
    '一座以芙宁娜为主题的私人花园：存放水神的传说、歌剧院的回声，以及所有被水记住的、微小的事。',
  author: 'desthon',
  url: 'https://desthon.github.io',
  locale: 'zh-CN',
  nav: [
    { label: '首页', href: '/' },
    { label: '文集', href: '/posts/' },
    { label: '标签', href: '/tags/' },
    { label: '关于', href: '/about/' },
  ],
} as const;

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
