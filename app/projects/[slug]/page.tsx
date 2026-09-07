import Link from 'next/link';
import { notFound } from 'next/navigation';
import { PingyaoExplorer } from '@/components/pingyao-explorer';

const cases = {
  pingyao: { no:'01', eyebrow:'文商旅前期策划 · 实习项目', title:'瓶窑老街更新', lead:'让老街、窑山与民艺资源形成一段可被体验、被停留、也能被持续运营的微度假路径。', role:'现场调研、整体及关键节点建模、汇报细化', facts:['原项目事实','团队方案','本人完成','作品集深化'], problem:'项目现场包含老街、山地、民艺和居民生活等多重资源。对前期策划而言，关键并非继续叠加业态，而是先确认：谁会来、从哪里进入、愿意在哪一段停留，以及空间是否能支持相应体验。', action:'在保留团队方案背景的前提下，我选择一条主要轴线与关键节点，梳理现场理解、模型细化和汇报表达之间的对应关系。后续将补齐客群、竞品、产品—空间关系和试运行指标。', outcome:'项目页只陈述已核实的实习交付；新增的客群与运营判断会明确标注为作品集阶段深化，不写成原项目中已经完成的成果。', visual:'diagram' },
  'driverless-trust': { no:'02', eyebrow:'用户研究 · 个人分析', title:'无人驾驶，如何建立信任', lead:'把用户的顾虑拆开，找到影响信任形成的关键环节，并将研究结论转化为可讨论的产品与沟通建议。', role:'本人负责分析与结论', facts:['研究材料','本人完成','待进一步核对'], problem:'无人驾驶的信任不是单一的“接受或拒绝”。需要从用户对风险、控制感、信息透明度和使用情境的理解中，识别真正影响判断的因素。', action:'我基于已有问卷与访谈材料组织分析和结论，避免把统计方法堆成术语；页面会优先展示关键发现、其证据和由此导出的建议。', outcome:'原始问卷与可识别访谈材料不公开展示。样本口径、变量定义与图表将在最终发布前按原始数据复核。', visual:'rings' },
  'emergency-network': { no:'03', eyebrow:'GIS · 空间决策研究', title:'应急配送网络如何布局', lead:'从需求风险、道路可达性、候选站点到无人机航线，解释为什么推荐这些位置。', role:'问题拆解、数据搜集、空间分析、GPA 演示', facts:['研究模型','团队成果','本人贡献'], problem:'当应急资源具有时效约束时，问题不只是“哪里缺点位”，还要同时考虑风险分布、既有道路保障与不同方案的覆盖表现。', action:'围绕一种蛇种先讲清决策路径：识别需求、比较可达性、筛选候选点、评估航线；再以多种血清的结果说明方法如何扩展。', outcome:'页面区分模型推荐、验证结果和实际运营，不将研究成果写成医疗机构已经采用的方案。', visual:'map' },
  qingyuan: { no:'04', eyebrow:'城市更新 · 实际项目', title:'庆元城市更新交付', lead:'将资料、房屋属性和现状图件组织成能支持团队汇报与后续工作的空间信息链。', role:'房屋信息整理、现状图斑／图则、汇报参与', facts:['实际项目','团队交付','本人完成'], problem:'城市更新的基础信息通常分散在不同图层、台账和资料中。若缺乏一致的属性与图面组织，后续判断与汇报就难以共享同一套事实。', action:'我参与整理房屋信息、组织现状图斑与图则，并配合汇报成果输出；项目页将用一段清楚的“资料整理 → 属性组织 → 图面表达 → 汇报交付”工作链呈现。', outcome:'不将团队项目包装为个人独立策略。项目正式名称、个人分工和可公开图件仍以项目资料核对为准。', visual:'grid' },
};

type CaseKey = keyof typeof cases;

export function generateStaticParams() {
  return Object.keys(cases).map((slug) => ({ slug }));
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = cases[slug as CaseKey];
  if (!item) notFound();
  return <main className="case-page">
    <nav className="topbar"><Link className="wordmark" href="/">JKY<span>／</span>PORTFOLIO</Link><Link className="back-link" href="/">← 返回项目列表</Link></nav>
    <header className="case-hero"><p className="case-number">{item.no}</p><div><p className="eyebrow">{item.eyebrow}</p><h1>{item.title}</h1><p className="case-lead">{item.lead}</p></div></header>
    <section className="case-role"><p className="section-kicker">MY CONTRIBUTION</p><p>{item.role}</p><div className="fact-tags">{item.facts.map((fact) => <span key={fact}>{fact}</span>)}</div></section>
    {slug === 'pingyao' ? <PingyaoExplorer /> : <section className="case-content"><div className={`case-visual ${item.visual}`} aria-hidden="true">{item.visual === 'map' && <img src="/images/serum-site-selection.png" alt="" />}{item.visual !== 'map' && <><i /><i /><i /><b>{item.no}</b></>}</div><div className="case-copy"><article><p className="section-kicker">THE QUESTION</p><h2>先把问题说清楚。</h2><p>{item.problem}</p></article><article><p className="section-kicker">THE WORK</p><h2>把判断变成可读的交付。</h2><p>{item.action}</p></article><article><p className="section-kicker">BOUNDARY</p><h2>事实和推演，明确区分。</h2><p>{item.outcome}</p></article></div></section>}
    <footer className="case-footer"><Link href="/">← 返回首页</Link><span>JIN KEYI · {item.no}/04</span></footer>
  </main>;
}
