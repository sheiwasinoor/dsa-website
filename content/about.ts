// content/about.ts

export const letterText = {
  en: [
    "Staying true to our founding mission, we fear no exploration. Born in the torrent of our era and raised amid industry transformation, Dayang has undergone multiple metamorphoses, continually breaking through sector barriers to forge our own unique path forward.",

    "All human imagination and aesthetic sensibility stem from art and interdisciplinary thinking—the unfettered freedom to envision and create endless possibilities. Guided by a new ecological cultural and artistic aesthetic, Dayang is dedicated to innovative design in public environmental spaces. We champion human-centered, nature-friendly design philosophies that transcend formal constraints. Rooted in a profound understanding of Eastern culture and committed to its inheritance and innovation, we blend Chinese creativity with a global perspective.",

    "Amidst the wave of urban renewal, Dayang, as a creator of public spaces, approaches design from our own perspective. We reject the notion of relying solely on “masters” or treating everyone as mere “cogs in the machine.” Instead, we strive to ensure every dreamer in our team has the opportunity to take on every role within a project, embracing challenges and scrutiny. We actively seek out our own shortcomings—whether stemming from youth or inexperience—for therein lies the source of our hope, strength, and unwavering conviction.With warmth, steadfastness, sincerity, and kindness, we convey the warmth of design and the depth of life. We pursue a “high-quality flow state” in every project—a sustained presence of feeling, a continuous surge of spiritual vitality, and an inexhaustible inner drive, mirroring our dedicated creation in every endeavor. This stems from the cyclical empowerment of cognition, ambition, courage, and execution. We may not excel at marketing, but conveying value is our mission. I firmly believe: “Those who know it are not as good as those who love it, and those who love it are not as good as those who delight in it.” For us, design is not merely a career—it is passion and purpose, the embodiment of self-worth. With nature, light, and the brush of artistry, we invite you to explore the beauty of design and the joy of living.",

    "Friendship between kindred spirits is a mutual enrichment. Whether in work or shared pursuits, we cherish and anticipate each exploration, each gathering—conveying value and sharing warmth.",
  ],

  zh: [
    "不忘初心，不畏探索。生在时代洪流，长在行业变革，大漾的成长经历了数次蜕变，不断打破行业壁垒，摸索出属于自己的独特发展之道。",

    "人类所有的想象力、审美力源于艺术和跨学科思维，是自由的充分的去想象和创造各种可能性。大漾以新生态文化艺术美学为导向，致力于公共环境空间营造的创新设计，倡导人性化、亲近自然的设计理念，突破形式的限制，以中国创意、全球视野的格局，扎根于对东方文化的深厚理解与传承创新。",

    "在城市更新的浪潮中，大漾作为公共空间的营造者，营造的理念从我们自身出发，不以唯“大师”论或人人“螺丝钉”，只愿团队的每一位有梦想的设计师都有机会担当项目的所有角色并且接受质疑与考验，也从积极自身寻找问题“年轻亦或经验不足，也是希望力量或坚定信念所在。”愿以温暖、踏实、真诚与善良，传递设计的温度，传递生命的厚度。我们追求每一个项目“高质量的心流”，那是感觉的持续存在、精神生命的持续涌动、内在驱动力的永不枯竭，正如我们每一次的用心创作。这一切，源于认知、野心、勇气与执行力的循环赋能。我们或许不善营销，但传达价值是我们的使命，我始终坚信：“知之者不如好之者，好之者不如乐之者。” 设计于我们 ,不仅是事业，更是热爱与使命，是自我价值的体现。愿以自然与光影、艺术之笔，与您共话设计之美、生活之趣。",

    "与朋之交，君子相生。无论工作或谈趣， 重视且期待我们的每一次探索，每一次相会，传达价值，传递温情。",

  ],
};

/**
 * Explicit paragraph split for manual two-column layout.
 * This avoids CSS column-flow issues (Safari/WebKit).
 * Order is intentional.
 */
export const letterParagraphs = {
  en: {
    left: letterText.en.slice(0, 4),
    right: letterText.en.slice(4),
  },
  zh: {
    left: letterText.zh.slice(0, 3),
    right: letterText.zh.slice(3),
  },
} as const;

export const introText = {
  en: [
    "DSA Dayoung is an innovative design platform dedicated to the creation of public environment Spaces, guided by the aesthetics of new ecological culture and art. Through collaborative practice in landscape architecture, dynamic lighting, and public art, we create multi-dimensional, high-value spatial experiences. With Chinese creativity and an international perspective, Danyang systematically reshapes the value of public environmental spaces, providing comprehensive solutions for the entire process, from environmental renewal and lighting environments to environmental art, achieving spatial revitalization, long-term operation, and ecological sustainability.",
  ],
  zh: [
    "DSA大漾一家以新生态文化艺术美学为导向, 致力于公共环境空间营造的创新设计平台。通过景观建筑, 动态光影, 公共艺术专业共创实践, 创造多维度高价值空间使用体验。大漾以中国创意 + 国际视野, 系统重塑公共环境空间价值, 即可提供从环境更新, 光环境到环境艺术的全过程综合解决方案, 实现空间活化, 长效运营与生态可持续发展。",
  ]
};

export type MemberGroup = "chinese" | "international";

export interface Member {
  id: string;
  group: MemberGroup;
  nameEn: string;
  nameCn?: string;
  role: {
    en: string;
    zh: string;
  };
  avatar: string;
  bio: {
    en: string[];
    zh: string[];
  };
}

export const members: Member[] = [
  {
    id: "bitch",
    group: "chinese",
    nameEn: "DEMI",
    nameCn: "欧阳小平",
    role: {
      en: "DSA Founder\nPrincipal Designer",
      zh: "DSA 创始人\n主持设计师"
    },
    avatar: "/images/team/demi.png",
    bio: {
      zh: [
        "DSA大漾 创始人 / 主持设计师",
        "TS Lighting 光影主持设计师",
        "Young ART 主持设计师",
        "大漾创始人, 主持设计师, 景观光影艺术空间营造引领者, 上市环境企业特聘顾问。致力于新生态文化艺术美学为导向, 系统重塑公共空间价值。拥有国际事务所, 城市更新局, 地产集团多重角色的综合设计管理工作经验, 擅长公共环境景观与光影艺术整体氛围营造主持设计与统筹管理。",
      ],

      en: [
        "DSA Founder / Principal Designer",
        "TS Lighting Show Lead Designer",
        "Young Art Lead Designer",
        "Founder and Principal Designer of Da Yang, a renowned designer of landscape lighting art spaces, and a specially appointed consultant for listed environmental companies. Dedicated to systematically reshaping the value of public spaces with a focus on new ecological and cultural artistic aesthetics. Possesses comprehensive design management experience in international firms, urban renewal bureaus, and real estate groups, specializing in the overall atmosphere creation, principal design, and overall management of public environmental landscapes.",
      ]
    }
  },

    {
    id: "dumbass",
    group: "chinese",
    nameEn: "STONE",
    nameCn: "石祐嘉",
    role: { en: "Partner | Chief Architect", zh: "首席建筑师" },
    avatar: "/images/team/stone.png",
    bio: {
      en: [
        "As a designer in Taiwan, Stone consistently strives to deliver the appropriate design for each project. He is dedicated to expressing spatial aesthetics and vitality through design, bridging the connections between environment, technology, and cultural arts, while bringing innovative approaches to every project and challenge. While focusing on landscape and cultural architecture design, he possesses the integrated design capabilities to oversee projects from concept to completion across architecture, landscape, and interiors.",
      ],
      zh: [
        "台湾优秀青年设计师，stone始终坚持为每个项目进行最适当的设计，致力于透过设计来表达我们对环境、科技与文化艺术之间的空间美学与活力，为每个项目和挑战带来创新的呈现方式。他专注于景观、文化建筑设计方案创作的同时具备对建筑、景观、室内等专业一体化设计到落地的把控能力。",
      ]
    }
  },
  
  {
    id: "zhong",
    group: "chinese",
    nameEn: "ZHONG",
    nameCn: "钟鸣",
    role: { en: "Chief Lighting Designer", zh: "首席灯光设计师" },
    avatar: "/images/team/zhong.png",
    bio: {
      en: [
        "A renowned lighting designer and founder of TS Lighting, he is dedicated to reshaping cities' nocturnal identities through light. His work—from the legendary Shanghai Bund to the revitalized Suzhou River, and across numerous international landmark complexes—transcends mere illumination to narrate profound regional narratives. At the core of his design philosophy lies the use of light and shadow dialogue to invigorate public spaces, creating timeless and emotionally resonant theatrical experiences for cities.",
      ],
      zh: [
        "业界知名照明设计师，TS照明创办人，致力于通过光重塑城市的夜间身份。作品从传奇的上海外滩到焕新的苏州河，再到众多国际地标综合体，超越了单纯的照明，转而讲述深厚的地域故事。他的设计哲学核心在于利用光影对话，增强公共空间活力，为城市创造永恒且充满情感的情绪剧场。",
      ]
    }
  },


    {
    id: "zhixiong",
    group: "chinese",
    nameEn: "ZHIXIONG",
    nameCn: "杜志雄",
    role: { en: "Chief Urban\nRenewal Engineer", zh: "城市更新总师" },
    avatar: "/images/team/zhixiong.png",
    bio: {
      en: [
        "He has served as chief editor for multiple urban renewal policy development projects and currently acts as an expert advisor to Shenzhen district governments and several real estate groups. Specializing in resolving urban renewal challenges through land use analysis and intelligent computation, he balances the economic interests of all parties to ensure precise preliminary project assessments. Having independently developed an urban spatial diagnosis system application, his next step involves collaborating with DSA to create a system that integrates spatial diagnosis reports with AI-powered one-click generation of tailored design solutions. This initiative aims to establish efficient public space design implementation and operational solutions."
      ],
      zh: [
        "曾主编多个城市更新政策制定工作，现为深圳各区政府及多家地产集团专家顾问，擅长解决城市更新类通过用地梳理、智慧运算,平衡各方经济利益，为项目前期精准研判提供保障，已自主研发城市空间诊断系统应用软件，下一步将与DSA联合研发结合空间诊断报告，AI一键生成对症设计多方案系统，制定高效的公共空间设计落地运营解决方案。"
      ]
    }
  },

  {
    id: "adrian",
    group: "chinese",
    nameEn: "ADRIAN",
    nameCn: "陈旭佳",
    role: { en: "Project Director", zh: "项目总监" },
    avatar: "/images/team/adrian.png",
    bio: {
      en: [
        "Director of Ecological Projects at DSA, he has dedicated himself to the field of new ecological greenery since returning to China after graduating from the University of New South Wales in Australia in 2013. Leading his team in specialized research on artistic greenery design and technological development, he has pioneered boundary-free landscape planting techniques that surpass domestic industry standards by optimizing traditional landscaping construction methods, integrating smart devices, and utilizing innovative materials. This breakthrough breaks down barriers between architecture and natural ecosystems. He provides specialized ecological art implementation solutions to ensure the successful execution of DSA projects.",
      ],
      zh: [
        "DSA生态项目总监，自2013年澳洲University of NSW毕业回国后,便深耕于新生态绿植领域，带领团队专研艺术绿植设计与技术研发，通过优化传统的景观施工技术、智能设备和创新材料运用，打破建筑与自然生态的屏障，率先实现无边界景观种植技术领先国内同行业水平；为DSA项目提供专项生态艺术落地解决方案保障。",
      ]
    }
  },

  {
    id: "lunker",
    group: "chinese",
    nameEn: "LUNKER",
    nameCn: "王鹤宁",
    role: { en: "Project Director", zh: "项目总监" },
    avatar: "/images/team/lunker.png",
    bio: {
      en: [
        "With 12 years of extensive project design and management experience, I specialize in overseeing integrated landscape and lighting design for urban renewal real estate, cultural tourism, and commercial projects. I ensure quality control during detailed design implementation, coordinate across design disciplines, construction teams, and client departments including operations, and manage overall communication and execution."
      ],
      zh: [
        "12年丰富的项目设计实践与管理经验，擅长城市更新类地产、文旅、商业等领域景观与灯光综合设计统筹负责，深化设计落地品质管控,协调各设计专业与施工落地方、运营方等业主各部门进行统筹协调沟通与执行工作。"
      ]
    }
  },

  {
    id: "chelsea",
    group: "chinese",
    nameEn: "CHELSEA",
    nameCn: "吴粤",
    role: { en: "Project Director", zh: "项目总监" },
    avatar: "/images/team/chelsea.png",
    bio: {
      en: [
        "Graduated with a Master of Landscape Architecture from RMIT University in Australia, specializing in integrated design applications of landscape, light and shadow, and public art. Has participated in conceptual design for multiple prestigious real estate flagship projects, possessing extensive experience in conceptual design creation. Focuses on exploring new pathways for sustainable urban development and ecological restoration methods, dedicated to advancing the creation of green, intelligent, and human-centered spatial environments."
      ],
      zh: [
        "毕业于澳洲RMIT大学风景园林专业硕士，擅长景观、光影与公共艺术的综合应用设计，曾参与多个知名地产顶级项目方案设计，拥有丰富的方案设计创作经验，专注探索新生态可持续城市发展路径与生态环境修复方法，致力于推动绿色、智能和人性化的空间营造创作。"
      ]
    }
  },

  {
    id: "julien",
    group: "international",
    nameEn: "JULIEN ALBERTINI",
    role: { en: "Design Partner", zh: "设计合伙人" },
    avatar: "/images/team/julien.png",
    bio: {
      en: [
        "Mr. Julien, a designer with DSA International Group hailing from the United States, holds a Master of Arts degree from the City University of New York. With extensive experience in architectural renovation and spatial transformation, he serves as the exclusive landscape architect and luxury aesthetic designer for numerous internationally renowned European and American brands. In 2019, Julien's team and DSA formally upgraded their project collaboration to a design partnership—marking the sole partnership established since DSA's entry into the Chinese market."
      ],
      zh: [
        "Julien先生来自美国，DSA国际组设计师，毕业于美国纽约城市大学艺术学专业硕士，他在建筑翻新+场景改造中有着丰富的经验，是多个欧美国际知名品牌景观建筑及高奢美学御用设计师。2019年，Julien团队与DSA团队从项目合作正式升级为设计合伙人，是进入中国市场后的唯一合伙人关系。"
      ]
    }
  },

  {
    id: "alina",
    group: "international",
    nameEn: "ALINA PIMKINA",
    role: { en: "Director", zh: "设计总监" },
    avatar: "/images/team/alina.png",
    bio: {
      en: [
        "Alina, as Julien's international design partner, brings vitality and inspiration to every project. Born into a Russian artistic family, her creativity is fueled by the world around her. She excels in delivering comprehensive professional renovation designs for luxury hotel brands, corporate headquarters, exclusive clubs, and high-profile venues—all approached from a brand-building perspective."
      ],
      zh: [
        "Alina，作为Julien国际组设计拍档，她为每一个项目带来活力和灵感。Alina生于俄罗斯艺术世家，她的创造力都是由她周围世界所激发，擅长从品牌打造的视角为高端品牌酒店、总部大楼、顶级会所、名利场所进行全域专业升级改造设计。​"
      ]
    }
  }
];
