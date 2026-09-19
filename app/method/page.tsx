import type { Metadata } from 'next';
import Link from 'next/link';
import { PortfolioFooter, PortfolioNav } from '@/components/portfolio-nav';
import '../portfolio-pages.css';
import '../final-polish.css';

export const metadata: Metadata = {
  title: '项目证据矩阵｜金科佚作品集',
  description: '对照四个代表项目的核心问题、方法、证据、判断、交付物、个人贡献与项目阶段。',
};

const evidenceMatrix = [
  { no: '01', project: '岱东镇超果禅寺及周边片区', href: '/projects/daidong', problem: '分散的文化资源、村庄场地与发展机会，如何形成连续且可讨论的体验逻辑。', method: '场地与资源梳理、节点串联、场景推演', evidence: '超果禅寺、村庄节点、总体空间与团队方案图像', judgement: '先建立文化锚点与参访—停留关系，再讨论节点业态和空间更新。', deliverable: '目标愿景、总体空间、关键节点与场景方向', contribution: '团队成果；当前公开材料未拆分个人职责', stage: '项目方向 / 未实施' },
  { no: '02', project: '自动驾驶信任机制研究', href: '/projects/driverless-trust', problem: '外部交互、车内黑箱、事后责任与机制认可度如何关联托付意愿，并呈现人群差异。', method: 'Pearson r；单维度／联合 OLS 的 B；PLS-SEM 的 β、f² 与 R²；PCA／PC1、分组与 Logit 分层呈现，不共用数值标尺', evidence: '301 份有效问卷；Q2 与 Q24 聚合；PLS 五条路径及 R²=.5731；联合 OLS R²=.5709；PC1 解释 72.0%；测量模型与分组结果', judgement: '现实智驾经验分层是当前车辆能力暴露的代理指标；多模型只比较问题、方向与显著性，并只描述关联或样本内预测。', deliverable: '多模型交互证据台、三端产品机制与概念原型联动', contribution: '第二作者｜独立完成问卷设计与全部统计建模，主责量化分析；研究证据重组、网页信息架构与交互可视化由本人设计实现', stage: '研究项目｜项目获一等奖｜2026年7月' },
  { no: '03', project: '低空血清应急配送网络', href: '/projects/emergency-network', problem: '如何在风险、道路保障、候选点和航线约束之间比较应急资源布局。', method: 'GIS 叠加分析、可达性比较、候选点筛选、航线评估', evidence: '风险与人口、道路、地形、禁飞约束和模型航线图层', judgement: '点位与路径必须放在同一空间决策框架中比较，不能只看单一覆盖指标。', deliverable: '空间决策模型、图层对照与航线输出', contribution: '研究成果；当前公开材料未拆分个人职责', stage: '研究项目 / 非实际运营网络' },
  { no: '04', project: '桦树无人机遥感影测', href: '/projects/huashu', problem: '如何把地形、建筑、道路与公共空间放入同一坐标下阅读。', method: '无人机影测、地形重建、等高线与空间场景对照', evidence: '现场影像、地形重建与清理后的网页方案图', judgement: '先识别需要保护、修补、连接或再利用的位置，再形成空间策略。', deliverable: '影测证据链、地形阅读与规划方案场景', contribution: '研究与方案材料；当前公开材料未拆分个人职责', stage: '研究项目 / 方案未建成' },
];

const fields = [['problem', '核心问题'], ['method', '方法与工具'], ['evidence', '关键证据'], ['judgement', '形成的判断'], ['deliverable', '交付物'], ['contribution', '个人贡献'], ['stage', '项目阶段']] as const;

export default function MethodPage() {
  return <main className="portfolio-shell"><PortfolioNav current="method" />
    <section className="portfolio-page"><header className="page-intro method-intro"><div><p className="page-kicker">METHOD / EVIDENCE MATRIX</p><h1>项目证据矩阵</h1></div><p>方法不单独罗列软件名称，而是回到每个项目的问题、证据、判断与交付边界。尚未由材料拆分的个人职责保持克制表述。</p></header>
      <section className="evidence-matrix" aria-label="四个公开项目的证据矩阵">{evidenceMatrix.map((item) => <article key={item.no}><header><span>{item.no}</span><h2><Link href={item.href}>{item.project} <small>↗</small></Link></h2></header><dl>{fields.map(([key, label]) => <div key={key}><dt>{label}</dt><dd>{item[key]}</dd></div>)}</dl></article>)}</section>
    </section><PortfolioFooter />
  </main>;
}
