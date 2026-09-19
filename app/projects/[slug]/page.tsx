import Link from 'next/link';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { DaidongExplorer } from '@/components/daidong-explorer';
import { DriverlessEvidence } from '@/components/driverless-evidence';
import { EmergencyNetworkEvidence } from '@/components/emergency-network-evidence';
import { PingyaoExplorer } from '@/components/pingyao-explorer';
import { HuashuFlightStory } from '@/components/huashu-flight-story';
import { PortfolioNav } from '@/components/portfolio-nav';
import { projectBySlug, publicPortfolioProjects } from '@/lib/portfolio';
import '../../portfolio-pages.css';
import '../../final-polish.css';

/* oxlint-disable next/no-img-element -- Existing case assets use explicit dimensions and optimized static sources. */

const cases = {
  daidong: { no:'01', eyebrow:'乡村文旅前期策划 · 项目方向', title:'岱东镇“农耕乡韵”发展支轴', lead:'从分散的文化资源与村庄场地出发，组织一条能被体验、被理解、也能进入后续实施讨论的乡村发展轴。', role:'项目阶段：团队方案方向 / 未实施', facts:['项目方向'], problem:'岱东的村庄、文化线索、既有场地和发展机会并不集中。项目需要把它们读成一条可讨论的发展逻辑，再将不同节点转化为具体的空间和体验场景。', action:'页面按目标愿景、总体空间与关键节点组织团队方案材料，让策略与场景之间的关系可以被连续阅读。', outcome:'页面中的效果图、场景意向与业态推演都属于项目方向，不表述为已实施或已产生运营结果。', visual:'daidong' },
  pingyao: { no:'05', eyebrow:'文旅空间策略 · 项目方向', title:'瓶窑文旅空间策略', lead:'以瓶窑项目为主线，和河坊街空间句法分析形成一组可比较的街区阅读。', role:'项目阶段：前期策略方向', facts:['项目方向','资料整理中'], problem:'街区项目包含老街、山地、民艺资源与居民生活等多重条件。关键不是叠加业态，而是先确认路径、停留节点与空间是否支持相应体验。', action:'后续将以场地证据、空间句法比较、策略回应和场景表达四层材料组织页面。', outcome:'在原始踏勘、模型、街区分析与方案资料补齐前，页面不将任何运营判断表述为既有项目结论。', visual:'diagram' },
  'driverless-trust': { no:'02', eyebrow:'自动驾驶 · 研究驱动的产品策略', title:'自动驾驶信任机制研究', lead:'从问卷题项、统计模型与人群差异出发，把研究发现转译为车内、车外与监管平台三端概念机制。', role:'研究项目：第二作者 / 主责量化分析', facts:['研究项目','项目获 WUPENICITY 2026 一等奖｜2026年7月'], problem:'无人驾驶的信任不是单一的“接受或拒绝”。需要从外部交互、车内黑箱、事后责任与机制认可度中，识别不同人群如何形成判断。', action:'页面以 Pearson 相关、OLS、PLS-SEM、PCA／PC1 与分组检验组成多模型证据链，再转译为三端产品机制。', outcome:'网页呈现 301 份有效问卷的聚合统计与团队概念设计；不公开原始答卷或可识别信息。', visual:'rings' },
  'emergency-network': { no:'03', eyebrow:'低空血清 · GIS 空间决策研究', title:'应急配送网络如何布局', lead:'从需求风险、道路可达性、候选点与无人机航线，解释空间决策为什么成立。', role:'项目阶段：研究模型 / 非实际运营网络', facts:['研究项目'], problem:'当应急资源具有时效约束时，问题不只是“哪里缺点位”，还要同时考虑风险分布、既有道路保障与不同方案的覆盖表现。', action:'页面沿识别需求、比较可达性、筛选候选点、评估航线的路径呈现模型逻辑。', outcome:'页面区分模型推荐、验证结果和实际运营，不将研究成果写成医疗机构已经采用的方案。', visual:'map' },
  huashu: { no:'04', eyebrow:'桦树 · 无人机遥感影测', title:'桦树｜从飞行采样抵达空间场景', lead:'让影像、地表与等高线成为理解村庄公共空间与策略落点的空间证据。', role:'项目阶段：研究项目 / 规划方案材料', facts:['研究项目','项目方向'], problem:'桦树的地形、建筑、道路与公共空间需要被放在同一坐标下阅读，才能识别哪些地方需要保护、修补、连接或重新使用。', action:'以“现场—采集—重建—地形阅读—策略落点—方案场景”的路径，组织影测材料与空间判断。', outcome:'最后的场景属于规划方案效果，不表述为已建成或运营成果；完整源数据不在网页公开。', visual:'huashu' },
  'ai-workflow': { no:'06', eyebrow:'AI 数字化工作流 · 资料整理中', title:'AI 工作流与产品化实践', lead:'把资料整理、表达结构、视觉构思与网页原型放入可回溯的协作流程。', role:'项目阶段：资料整理中 / 待补充原始案例', facts:['资料整理中'], problem:'数字化工具只有进入真实任务，才能被评估为是否真正缩短信息处理与表达迭代的路径。', action:'后续将按输入材料、处理步骤、人工判断点与最终交付物补齐真实案例，而不是罗列工具名称。', outcome:'在真实案例、输入材料与可公开交付物补齐前，页面不宣称效率提升、客户使用或商业化结果。', visual:'grid' },
};

type CaseKey = keyof typeof cases;
const caseCover: Partial<Record<CaseKey, string>> = {
  daidong: '/images/chaoguo-model.webp',
  'emergency-network': '/images/serum-route-clean.webp',
  huashu: '/images/huashu-field-web.webp',
};
const publicCaseSlugs = new Set(publicPortfolioProjects.map((project) => project.slug));

const ogBySlug: Partial<Record<CaseKey, string>> = {
  daidong: '/og/og-daidong.jpg',
  'driverless-trust': '/og/og-driverless.jpg',
  'emergency-network': '/og/og-emergency.jpg',
  huashu: '/og/og-huashu.jpg',
};

const caseLogic: Record<CaseKey, { evidence: string; judgement: string; strategy: string; execution: string; contribution: string }> = {
  daidong: { evidence: '超果禅寺、村庄节点、总体空间与团队方案图像。', judgement: '先建立文化锚点和参访—停留关系，再讨论节点业态。', strategy: '以发展支轴串联目标愿景、总体空间与关键节点。', execution: '形成可供后续讨论的节点与场景方向；尚未实施。', contribution: '团队成果；当前公开材料未拆分个人职责。' },
  'driverless-trust': { evidence: '301 份有效问卷；Q2 与 Q24 聚合；Pearson、单维度／联合 OLS、PLS-SEM、PCA／PC1、分组与 Logit 的分层结果。', judgement: '不同模型回答不同问题：比较结论方向与显著性，但不把 r、B、β、OR、R²、F 放在同一标尺。', strategy: '把稳定证据转译为分层引导、车内解释、车外沟通与事故追溯机制。', execution: '网页提供可交互的证据阅读；产品机制属于概念设计。', contribution: '第二作者｜独立完成问卷设计与全部统计建模，主责量化分析；研究证据重组、网页信息架构与交互可视化由本人设计实现。' },
  'emergency-network': { evidence: '风险、人口、道路、地形、禁飞约束、候选点与模型航线图层。', judgement: '点位和路径需要在同一空间决策框架中比较。', strategy: '按需求识别、可达性、候选点和航线逐层收敛。', execution: '形成研究模型、图层对照与航线输出；非实际运营网络。', contribution: '研究成果；当前公开材料未拆分个人职责。' },
  pingyao: { evidence: '踏勘、模型、街区分析与方案材料待补齐。', judgement: '先确认路径、停留节点与空间条件，再讨论业态。', strategy: '以瓶窑为主线，与河坊街空间句法分析对照阅读。', execution: '页面仍处于资料整理阶段。', contribution: '团队方案与个人贡献均待核实。' },
  huashu: { evidence: '现场影像、无人机影测、地形重建、等高线与清理后的网页方案图。', judgement: '先识别需要保护、修补、连接或再利用的位置。', strategy: '沿“现场—采集—重建—地形—策略—场景”建立证据链。', execution: '形成影测阅读和规划方案场景；方案未建成。', contribution: '研究与方案材料；当前公开材料未拆分个人职责。' },
  'ai-workflow': { evidence: '真实案例、输入材料与可公开交付物仍待补齐。', judgement: '数字化能力必须放回真实任务才能被评价。', strategy: '按输入、处理、人工判断与交付物建立可回溯流程。', execution: '资料整理中，不宣称效率或商业化结果。', contribution: '待确认。' },
};

export function generateStaticParams() {
  return Object.keys(cases).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const item = cases[slug as CaseKey];
  if (!item) return {};
  const ogImage = ogBySlug[slug as CaseKey] ?? '/og/og-default.jpg';
  return {
    title: `${item.title}｜金科佚作品集`,
    description: item.lead,
    openGraph: {
      type: 'article',
      title: `${item.title}｜金科佚作品集`,
      description: item.lead,
      images: [{ url: ogImage, width: 1200, height: 630, alt: item.title }],
    },
  };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = cases[slug as CaseKey];
  if (!item) notFound();
  const project = projectBySlug[slug];
  const displayNo = project?.public ? (project.publicNo ?? project.no) : '—';
  const logic = caseLogic[slug as CaseKey];
  if (slug === 'driverless-trust') return <main className="case-page">
    <PortfolioNav />
    <DriverlessEvidence />
    <footer className="case-footer"><Link href="/projects">← 返回项目索引</Link><span>JIN KEYI · {displayNo}/04</span></footer>
  </main>;
  return <main className="case-page">
    <PortfolioNav />
    <header className={`case-hero case-hero--${slug}`}>
      {caseCover[slug as CaseKey] && <div className="case-hero__image" aria-hidden="true"><img src={caseCover[slug as CaseKey]} alt="" /></div>}
      <div className="case-hero__content"><p className="case-number">{displayNo}</p><div><p className="eyebrow">{item.eyebrow}</p><h1>{item.title}</h1><p className="case-lead">{item.lead}</p></div></div>
    </header>
    <section className="case-role"><p className="section-kicker">PROJECT STATUS</p><p>{item.role}</p><div className="fact-tags">{item.facts.map((fact) => <span key={fact}>{fact}</span>)}</div></section>
    <section className="case-logic" aria-label="项目证据链">
      {[['问题', item.problem], ['证据', logic.evidence], ['判断', logic.judgement], ['策略', logic.strategy], ['可执行动作', logic.execution], ['个人贡献', logic.contribution]].map(([label, text], index) => <article key={label}><span>{String(index + 1).padStart(2, '0')}</span><h2>{label}</h2><p>{text}</p></article>)}
    </section>
    {slug === 'daidong' ? <DaidongExplorer /> : slug === 'pingyao' ? <PingyaoExplorer /> : slug === 'driverless-trust' ? <DriverlessEvidence /> : slug === 'emergency-network' ? <EmergencyNetworkEvidence /> : slug === 'huashu' ? <HuashuFlightStory /> : <section className="case-content"><div className={`case-visual ${item.visual}`} aria-hidden="true">{item.visual === 'map' && <img src="/images/serum-site-selection.webp" alt="" />}{item.visual !== 'map' && <><i /><i /><i /><b>{item.no}</b></>}</div><div className="case-copy"><article><p className="section-kicker">THE QUESTION</p><h2>先把问题说清楚。</h2><p>{item.problem}</p></article><article><p className="section-kicker">THE APPROACH</p><h2>把判断变成可读的过程。</h2><p>{item.action}</p></article><article><p className="section-kicker">PROJECT BOUNDARY</p><h2>项目方向与实施，明确区分。</h2><p>{item.outcome}</p></article></div></section>}
    <footer className="case-footer"><Link href="/projects">← 返回项目索引</Link><span>JIN KEYI · {publicCaseSlugs.has(slug) ? `${displayNo}/04` : '未公开项目'}</span></footer>
  </main>;
}
