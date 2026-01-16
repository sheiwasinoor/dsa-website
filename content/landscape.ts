// content/landscape.ts

export type LocaleCode = 'en' | 'zh';

export interface LocalizedText {
  en: string;
  zh: string;
}

export interface LandscapeHeroCopy {
  title: LocalizedText;
  body: LocalizedText;
}

export interface LandscapeProject {
  id: string;
  title: LocalizedText;
  category: LocalizedText;
  thumbnail: string;
  keywords: string[];
}

export const heroCopy: LandscapeHeroCopy = {
  title: {
    en: 'LANDSCAPE ARCHITECTURE',
    zh: 'LANDSCAPE ARCHITECTURE'
  },
  body: {
    en:
      'Led by DAYOUNG Creation, DA Landscape specializes in activating aging spaces and natural sites to revitalize urban and ecological areas, creating sustainable, human-centric, and operational public spaces. Leveraging the platform’s expertise in comprehensive environmental management, green energy, and dual-carbon research, DA delivers end-to-end solutions—from diagnosis, design, construction, to maintenance—empowered by integrated industrial-chain capabilities for holistic public environment renewal.',
    zh:
      '由DSA大漾牵头的景观建筑-DA Landscape环境更新专注区域活化设计, 通过激活老旧空间与自然场域, 重焕空间活力与生命力, 打造出可持续, 有温度, 可运营的公共空间。并依托平台在环境综合治理, 绿色能源, 双碳研究等全产业链布局优势,赋能DA核心技术支持, 从诊断-设计-营造-运维, 提供“一站式”公共环境综合解决方案。近期代表作有：2025年世界级城市景观-深圳前海城市品质提升环湾景观光影艺术整体空间营造, 2024年纳入深圳市政府重点示范城市有机更新案例-深圳宝安区清平古墟影视小镇等项目。'
  }
};

// Placeholders for 17 projects
export const projects: LandscapeProject[] = [
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
    keywords: ['landscape']
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
    keywords: ['landscape', 'public']
  }
];