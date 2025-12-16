// content/lighting.ts

export type LocaleCode = 'en' | 'zh';

export interface LocalizedText {
  en: string;
  zh: string;
}

export interface LightingHeroCopy {
  title: LocalizedText;
  body: LocalizedText;
}

export interface LightingProject {
  id: string;
  title: LocalizedText;
  category: LocalizedText;
  thumbnail: string;
  keywords: string[];
}

export const heroCopy: LightingHeroCopy = {
  title: {
    en: 'LIGHTING SHOW',
    zh: 'LIGHTING SHOW'
  },
  body: {
    en:
      'Dynamic Light and Shadow - TS Lighting, a major shareholder of Dayang, is a pioneering Sino-French dual-core driven lighting art institution with offices in Shenzhen, Shanghai, and Paris. The lighting and shadow division is co-founded and led by partner Ms. Ouyang Xiaoping and Mr. Zhong Ming, the chief lighting consultant of the Shanghai Bund. The team excels at balancing and controlling the execution from concept to final implementation, considering both effect and cost. They collaborate with lighting, landscape, and art professionals to create new urban lightscapes.',
    zh:
      '动态光影-大漾股东TS 照明是一所中法双核驱动的先锋灯光艺术机构, 在深圳, 上海, 巴黎设有办公室, 光影板块由合伙人欧阳小平女士与上海外滩灯光总顾问钟鸣先生共同创立与主持设计, 团队能最好的执行从创意到最终落地效果与造价的平衡与管控 ,照明与景观, 艺术专业并肩合力,营造城市新光景。近期著名代表作：上海《外滩漫步》动态光影秀, 广东港澳十五运会《光影跃动》动态光影秀, 前海沿江高速大桥跨海段动态光影, 深圳中心区光影秀等重量级城市标杆文化共建与文旅光影艺术项目.'
  }
};

// Placeholders for 17 projects
export const projects: LightingProject[] = [
  {
    id: 'p1',
    title: { en: 'Project Name 1', zh: '项目 1' },
    category: { en: 'Category', zh: '类别' },
    thumbnail: '/images/placeholders/project.png',
    keywords: ['urban', 'quality', 'enhancement']
  },
  {
    id: 'p2',
    title: { en: 'Project Name 2', zh: '项目 2' },
    category: { en: 'Category', zh: '类别' },
    thumbnail: '/images/placeholders/project.png',
    keywords: ['park', 'green']
  },
  {
    id: 'p3',
    title: { en: 'Project Name 3', zh: '项目 3' },
    category: { en: 'Category', zh: '类别' },
    thumbnail: '/images/placeholders/project.png',
    keywords: ['lighting']
  },
  {
    id: 'p4',
    title: { en: 'Project Name 4', zh: '项目 4' },
    category: { en: 'Category', zh: '类别' },
    thumbnail: '/images/placeholders/project.png',
    keywords: ['design']
  },
  {
    id: 'p5',
    title: { en: 'Project Name 5', zh: '项目 5' },
    category: { en: 'Category', zh: '类别' },
    thumbnail: '/images/placeholders/project.png',
    keywords: ['urban']
  },
  {
    id: 'p6',
    title: { en: 'Project Name 6', zh: '项目 6' },
    category: { en: 'Category', zh: '类别' },
    thumbnail: '/images/placeholders/project.png',
    keywords: ['architecture']
  },
  {
    id: 'p7',
    title: { en: 'Project Name 7', zh: '项目 7' },
    category: { en: 'Category', zh: '类别' },
    thumbnail: '/images/placeholders/project.png',
    keywords: ['renewal']
  },
  {
    id: 'p8',
    title: { en: 'Project Name 8', zh: '项目 8' },
    category: { en: 'Category', zh: '类别' },
    thumbnail: '/images/placeholders/project.png',
    keywords: ['design']
  },
  {
    id: 'p9',
    title: { en: 'Project Name 9', zh: '项目 9' },
    category: { en: 'Category', zh: '类别' },
    thumbnail: '/images/placeholders/project.png',
    keywords: ['green']
  },
  {
    id: 'p10',
    title: { en: 'Project Name 10', zh: '项目 10' },
    category: { en: 'Category', zh: '类别' },
    thumbnail: '/images/placeholders/project.png',
    keywords: ['sustainability']
  },
  {
    id: 'p11',
    title: { en: 'Project Name 11', zh: '项目 11' },
    category: { en: 'Category', zh: '类别' },
    thumbnail: '/images/placeholders/project.png',
    keywords: ['management']
  },
  {
    id: 'p12',
    title: { en: 'Project Name 12', zh: '项目 12' },
    category: { en: 'Category', zh: '类别' },
    thumbnail: '/images/placeholders/project.png',
    keywords: ['park']
  },
  {
    id: 'p13',
    title: { en: 'Project Name 13', zh: '项目 13' },
    category: { en: 'Category', zh: '类别' },
    thumbnail: '/images/placeholders/project.png',
    keywords: ['ecology']
  },
  {
    id: 'p14',
    title: { en: 'Project Name 14', zh: '项目 14' },
    category: { en: 'Category', zh: '类别' },
    thumbnail: '/images/placeholders/project.png',
    keywords: ['urban', 'design']
  },
  {
    id: 'p15',
    title: { en: 'Project Name 15', zh: '项目 15' },
    category: { en: 'Category', zh: '类别' },
    thumbnail: '/images/placeholders/project.png',
    keywords: ['renewal']
  },
  {
    id: 'p16',
    title: { en: 'Project Name 16', zh: '项目 16' },
    category: { en: 'Category', zh: '类别' },
    thumbnail: '/images/placeholders/project.png',
    keywords: ['development']
  },
  {
    id: 'p17',
    title: { en: 'Project Name 17', zh: '项目 17' },
    category: { en: 'Category', zh: '类别' },
    thumbnail: '/images/placeholders/project.png',
    keywords: ['lighting', 'public']
  }
];