export type ProjectStage = '项目方向' | '研究项目' | '实际交付' | '资料整理中';

export type PortfolioProject = {
  slug: string;
  no: string;
  publicNo?: string;
  title: string;
  english: string;
  time?: string;
  category: string;
  stage: ProjectStage;
  keywords: string[];
  premise: string;
  cover?: string;
  coverPosition?: string;
  featured?: boolean;
  public?: boolean;
  proof: string;
  output?: string;
};

/**
 * 作品集的唯一项目索引。新增项目时，先在这里补齐事实与素材，再接入详情页。
 * 时间、项目阶段和封面均只记录已确认信息；缺失信息不在公开界面中显示。
 */
export const portfolioProjects: PortfolioProject[] = [
  {
    slug: 'daidong', no: '01', publicNo: '01', title: '岱东镇超果禅寺及周边片区', english: 'DAIDONG · CULTURAL LANDSCAPE',
    time: '2025', category: '文旅场景策划 / 空间叙事', stage: '项目方向',
    keywords: ['文化锚点', '场景组织', '空间更新'],
    premise: '以超果禅寺为文化起点，组织参访、停留与疗愈场景的连续关系。',
    proof: '文旅场景与空间叙事',
    output: '目标愿景 / 总体空间 / 节点场景',
    cover: '/images/chaoguo-street-clean.webp', featured: true, public: true,
  },
  {
    slug: 'driverless-trust', no: '02', publicNo: '02', title: '自动驾驶信任机制研究', english: 'AUTONOMOUS MOBILITY · PRODUCT STRATEGY',
    time: '2026.07', category: '量化研究 / 产品策略', stage: '研究项目',
    keywords: ['301 份问卷', '多模型证据', '研究到产品'],
    premise: '从问卷题项、统计模型与人群差异出发，将研究发现转译为三端产品机制。',
    proof: '项目获 WUPENICITY 2026 一等奖｜301 份问卷', public: true,
    output: '团队产品策略｜车内外交互｜事故追溯平台',
    cover: '/images/driverless/research-cover.webp', coverPosition: 'center center',
  },
  {
    slug: 'emergency-network', no: '03', publicNo: '03', title: '低空血清应急配送网络', english: 'LOW-ALTITUDE · GIS',
    category: '空间数据分析 / 应急决策', stage: '研究项目',
    keywords: ['GIS', '可达性', '航线优化'],
    premise: '把疾病风险、候选点与路径效率放进同一个空间决策框架。',
    proof: 'GIS 空间决策、可达性与约束',
    output: 'GIS 图层 / 候选点 / 模型航线',
    cover: '/images/serum-route.webp', coverPosition: 'center 53%', public: true,
  },
  {
    slug: 'pingyao', no: '04', title: '瓶窑文旅空间策略', english: 'PINGYAO · CULTURAL STREET',
    category: '文旅策略 / 空间分析', stage: '项目方向',
    keywords: ['街区更新', '空间句法', '体验路径'],
    premise: '以瓶窑项目为主线，并与河坊街空间句法分析形成可比较的街区阅读。',
    proof: '街区阅读与策略框架', public: false,
  },
  {
    slug: 'huashu', no: '05', publicNo: '04', title: '桦树无人机遥感影测', english: 'HUASHU · UAV',
    category: '乡村空间 / 遥感影测', stage: '研究项目',
    keywords: ['无人机影测', '地形阅读', '空间场景'],
    premise: '让飞行采样、地形数据与村庄公共空间策略形成一条可追溯的链路。',
    proof: '无人机影测到空间方案的证据链',
    output: '影测影像 / 地形阅读 / 规划场景',
    cover: '/images/huashu-field-web.webp', coverPosition: 'center 62%', public: true,
  },
  {
    slug: 'ai-workflow', no: '06', title: 'AI 数字化工作流与产品化实践', english: 'DIGITAL PROTOTYPING',
    category: 'AI 工作流 / 产品表达', stage: '资料整理中',
    keywords: ['资料结构化', '表达迭代', '网页原型'],
    premise: '以真实工作流为线索，整理从信息处理到可读交付的数字化实践。',
    proof: '真实案例资料整理中', public: false,
  },
];

export const projectBySlug = Object.fromEntries(
  portfolioProjects.map((project) => [project.slug, project]),
) as Record<string, PortfolioProject>;

export const publicPortfolioProjects = portfolioProjects.filter((project) => project.public);
