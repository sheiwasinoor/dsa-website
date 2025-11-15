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
    zh: '景观设计'
  },
  body: {
    en:
      'Led by DAYOUNG Creation, DA Landscape specializes in activating aging spaces and natural sites to revitalize urban and ecological areas, creating sustainable, human-centric, and operational public spaces. Leveraging the platform’s expertise in comprehensive environmental management, green energy, and dual-carbon research, DA delivers end-to-end solutions—from diagnosis, design, construction, to maintenance—empowered by integrated industrial-chain capabilities for holistic public environment renewal.',
    zh:
      '在 DAYOUNG Creation 的引领下，DA Landscape 专注于激活老化空间和自然场地，以 revitalizing 城市和生态区域，打造可持续、以人为本、可运营的公共空间。依托平台在综合环境管理、绿色能源和双碳研究方面的专业能力，DA 提供从诊断、设计、建设到维护的端到端解决方案——以一体化产业链能力实现整体公共环境焕新。'
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