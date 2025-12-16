// content/youngArt.ts

export type LocaleCode = 'en' | 'zh';

export interface LocalizedText {
  en: string;
  zh: string;
}

export interface YoungArtHeroCopy {
  title: LocalizedText;
  body: LocalizedText;
}

export interface YoungArtProject {
  id: string;
  title: LocalizedText;
  category: LocalizedText;
  thumbnail: string;
  keywords: string[];
}

export const heroCopy: YoungArtHeroCopy = {
  title: {
    en: 'PUBLIC ART',
    zh: 'PUBLIC ART'
  },
  body: {
    en:
      'The Public Art Section - YOUNG ART brings together globally renowned artists and ecological technology innovation teams who are committed to an ecological foundation, providing public spaces with the highest quality and most cost-effective ecological technology + cultural art implementation solutions. Recent notable works include: Shenzhen Qianhai "Large-scale Public Art Installation" and Pengrui Foshan No. 1 "Rebirth of All Things" Large-scale Public Art Installation.',
    zh:
      '公共艺术-YOUNG AR集结了坚持以生态为本底, 享誉全球的艺术家与生态科技创新团队, 擅长以全域专业视角, 构建新生态艺术跨界融合新模式,不断探索新材料新工艺应用, 打破空间屏障, 实现设计与技术应用落地无缝对接, 为公共空间提供最高质且成本最有效的生态科技+文化艺术落地解决方案。近期著名代表作：深圳前海《海上光影艺术剧场》大型公共艺术装置, 鹏瑞集团佛山一号《万物更生》大型公共艺术装置。'
  }
};

// Placeholders for 17 projects
export const projects: YoungArtProject[] = [
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
    keywords: ['youngArt']
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
    keywords: ['youngArt', 'public']
  }
];