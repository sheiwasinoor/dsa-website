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
    zh: '景观设计',
  },
  body: {
    en:
      'Led by DAYOUNG Creation, DA Landscape specializes in activating aging spaces and natural sites to revitalize urban and ecological areas, creating sustainable, human-centric, and operational public spaces. ' +
      'Leveraging the platform’s expertise in comprehensive environmental management, green energy, and dual-carbon research, DA delivers end-to-end solutions—from diagnosis, design, construction, to maintenance—empowered by integrated industrial-chain capabilities for holistic public environment renewal.',
    zh:
      '在 DAYOUNG Creation 的引领下，DA Landscape 专注于激活老旧空间与自然场地，' +
      '以可持续、人本与可运营为导向，重塑城市与生态空间的公共活力。' +
      '依托在环境综合治理、绿色能源与双碳研究等领域的经验，' +
      'DA 从诊断、设计、施工到运维提供一体化解决方案，' +
      '通过完整产业链能力推动公共环境的整体更新。',
  },
};

export const projects: LandscapeProject[] = [
  {
    id: 'urban-quality-enhancement',
    title: {
      en: 'Urban Quality Enhancement',
      zh: '城市品质提升',
    },
    category: {
      en: 'Urban Renewal',
      zh: '城市更新',
    },
    thumbnail: '/images/projects/landscape-urban-quality.jpg',
    keywords: ['urban', 'quality', 'enhancement', 'renewal'],
  },
  {
    id: 'project-01',
    title: {
      en: 'Project Name',
      zh: '项目名称',
    },
    category: {
      en: 'Cultural Landscape',
      zh: '文化景观',
    },
    thumbnail: '/images/projects/landscape-project-01.jpg',
    keywords: ['cultural', 'landscape'],
  },
  {
    id: 'project-02',
    title: {
      en: 'Project Name',
      zh: '项目名称',
    },
    category: {
      en: 'Waterfront',
      zh: '滨水空间',
    },
    thumbnail: '/images/projects/landscape-project-02.jpg',
    keywords: ['waterfront', 'riverside'],
  },
  {
    id: 'project-03',
    title: {
      en: 'Project Name',
      zh: '项目名称',
    },
    category: {
      en: 'Park & Green',
      zh: '公园绿地',
    },
    thumbnail: '/images/projects/landscape-project-03.jpg',
    keywords: ['park', 'green'],
  },
  {
    id: 'project-04',
    title: {
      en: 'Project Name',
      zh: '项目名称',
    },
    category: {
      en: 'Transport Hub',
      zh: '交通枢纽',
    },
    thumbnail: '/images/projects/landscape-project-04.jpg',
    keywords: ['transport', 'hub'],
  },
  {
    id: 'project-05',
    title: {
      en: 'Project Name',
      zh: '项目名称',
    },
    category: {
      en: 'Campus',
      zh: '校园空间',
    },
    thumbnail: '/images/projects/landscape-project-05.jpg',
    keywords: ['campus'],
  },
  {
    id: 'project-06',
    title: {
      en: 'Project Name',
      zh: '项目名称',
    },
    category: {
      en: 'Community',
      zh: '社区空间',
    },
    thumbnail: '/images/projects/landscape-project-06.jpg',
    keywords: ['community'],
  },
];