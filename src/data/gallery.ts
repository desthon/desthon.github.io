export interface Shot {
  /** public/images/gallery 下的文件名 */
  file: string;
  title: string;
  caption: string;
  category: '立绘' | '壁纸' | '卡面' | '官图' | '同人';
  width: number;
  height: number;
}

/** 相册：全部为《原神》官方美术，已压缩为 webp */
export const GALLERY: Shot[] = [
  {
    file: 'splash.webp',
    title: '祈愿立绘',
    caption: '她举起权杖，法庭的灯亮了一半。',
    category: '立绘',
    width: 1200,
    height: 1139,
  },
  {
    file: 'wallpaper-42.webp',
    title: '4.2 版本壁纸',
    caption: '枫丹的雨季，水面上浮着一整座歌剧院。',
    category: '壁纸',
    width: 1800,
    height: 1012,
  },
  {
    file: 'card-1.webp',
    title: '卡面 · 壹',
    caption: '蓝色披风下的少女，看上去比谁都笃定。',
    category: '卡面',
    width: 900,
    height: 1800,
  },
  {
    file: 'shikishi.webp',
    title: '纪念色纸',
    caption: '官方纪念绘：舞台、掌声，与一点点疲惫。',
    category: '官图',
    width: 1280,
    height: 1277,
  },
  {
    file: 'card-2.webp',
    title: '卡面 · 贰',
    caption: '另一套衣装，同一种眼神。',
    category: '卡面',
    width: 900,
    height: 1800,
  },
  {
    file: 'wallpaper-54.webp',
    title: '5.4 版本壁纸',
    caption: '水色天光落在她的裙摆上。',
    category: '壁纸',
    width: 1800,
    height: 1012,
  },
  {
    file: 'wish.webp',
    title: '祈愿横幅',
    caption: '但愿这一次，水记得她的名字。',
    category: '立绘',
    width: 1600,
    height: 800,
  },
  {
    file: 'intro-1.webp',
    title: '角色介绍卡 · 壹',
    caption: '「我是芙宁娜，是水神芙卡洛斯。」',
    category: '官图',
    width: 900,
    height: 900,
  },
  {
    file: 'intro-2.webp',
    title: '角色介绍卡 · 贰',
    caption: '五百年，一场没有落幕的演出。',
    category: '官图',
    width: 900,
    height: 900,
  },
  {
    file: 'fan-miyoushe-1.webp',
    title: '同人绘 · 水色',
    caption: '米游社同人作品，水光沿着裙摆流下去。',
    category: '同人',
    width: 1600,
    height: 959,
  },
  {
    file: 'fan-miyoushe-2.webp',
    title: '同人绘 · 舞台',
    caption: '另一张横版同人，像谢幕后仍亮着的灯。',
    category: '同人',
    width: 1600,
    height: 1093,
  },
  {
    file: 'intro-banner.webp',
    title: '登场横幅',
    caption: '幕布升起的那一刻，枫丹所有水都静了。',
    category: '官图',
    width: 1200,
    height: 675,
  },
];

export const CATEGORIES = ['立绘', '壁纸', '卡面', '官图', '同人'] as const;

export const HERO_SHOT = {
  file: 'hero-furina.webp',
  width: 1100,
  height: 1044,
  title: '芙宁娜 / Furina',
  note: '水神 · Focalors',
};
