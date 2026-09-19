'use client';

/* oxlint-disable next/no-img-element, jsx-a11y/prefer-tag-over-role -- Native images preserve the existing Vinext asset pipeline; SVG chart groups require interactive roles. */

import { useEffect, useState } from 'react';
import type { ComponentType, ReactNode } from 'react';
import { DRIVERLESS_STATS, PROTOTYPES, RESEARCH_STEPS, TONGXIANG_ASOF, VARIABLES, type EvidenceCode } from './driverless-data';
import { DriverlessModelLens, MeasurementQuality, RobustnessStrip } from './driverless-model-lens';
import { DriverlessThreeEnd } from './driverless-three-end';
import { DriverlessInterview } from './driverless-interview';
import { CountUp, Reveal } from './driverless-motion';
import { IconArchive, IconBookOpen, IconBoxes, IconCalculator, IconChartLine, IconClipboardList, IconDiagnostics, IconEyeOff, IconLayers, IconOutside, IconRoute, IconScrollText, IconTarget, IconTrendingUp, IconTriangleAlert, IconTrust, IconUsers } from './driverless-icons';
import './driverless-evidence.css';

const SECTION_LINKS = [
  { id: 'problem', label: '问题', icon: IconTarget },
  { id: 'method', label: '我怎么做', icon: IconRoute },
  { id: 'findings', label: '关键发现', icon: IconChartLine },
  { id: 'interview-layer', label: '多方立场', icon: IconUsers },
  { id: 'prototypes', label: '三端联动', icon: IconOutside },
  { id: 'appendix', label: '附录', icon: IconArchive },
] as const;

const NEWS_WALL = [
  {
    id: 'progress',
    tag: '发展',
    icon: IconTrendingUp,
    title: '一边，技术在加速',
    items: [
      { year: '2025', text: '工信部发放首批 L3 级自动驾驶准入许可：深蓝 SL03、极狐阿尔法 S6 在北京、重庆限定路段试点上路。', source: '来源：新华社', image: '/images/driverless/news/news-l3.webp', title: 'L3级自动驾驶车型获附条件准入许可，释放哪些信号？' },
      { year: '2026', text: '全国城市 NOA 年销量 312.9 万辆、渗透率 15.1%，高阶智驾成为主流卖点。', source: '来源：中汽协／经济参考报', image: '/images/driverless/news/news-noa.webp', title: '2025年搭载量超300万辆 城市NOA规模化发展加速' },
      { year: '2026', text: '杭州全域 L3 级测试许可落地：覆盖 9224 平方公里、超 1500 公里高速，全国面积最大、里程最长。', source: '来源：腾讯新闻', image: '/images/driverless/news/news-hangzhou.webp', title: 'L3自动驾驶时代将至，这三款新能源车一步到位' },
    ],
  },
  {
    id: 'incidents',
    tag: '事故',
    icon: IconTriangleAlert,
    title: '另一边，事故在发生',
    items: [
      { year: '2025', text: '小米 SU7 在高速 NOA 状态下碰撞起火，3 名大学生遇难；监管部门随后叫停“智驾”式宣传。', source: '来源：新华社／证券时报', image: '/images/driverless/news/news-su7.webp', title: '小米SU7碰撞前约3秒仍处智驾状态' },
      { year: '2026', text: '美国 NTSB 公布两起福特 BlueCruise 致命事故调查结论：驾驶员过度依赖自动驾驶，共 3 人死亡。', source: '来源：NTSB', image: '/images/driverless/news/news-ntsb.webp', title: 'NTSB Finds Automation Overreliance Contributed to Two Fatal Ford BlueCruise Crashes' },
      { year: '2026', text: '特斯拉在自动化驾驶状态下高速撞入美国民宅，屋内 76 岁老人死亡，监管机构启动专项调查。', source: '来源：CNBC', image: '/images/driverless/news/news-tesla.webp', title: 'Tesla faces federal probe after Model 3 crash that killed 76-year-old' },
    ],
  },
] as const;

const METHOD_STEPS = [
  { num: '301', unit: '份', title: '问卷', icon: IconClipboardList, text: '24 题四维度量表，覆盖从无支持／仅巡航到城市 NOA 的不同智驾经验人群，回收 301 份有效问卷。' },
  { num: '4', unit: '种视角', title: '建模', icon: IconCalculator, text: 'Pearson 相关 → 单维度／联合 OLS → PLS-SEM，并以分组回归与 Chow 检验核对稳健性。' },
  { num: '3', unit: '个端口', title: '产品机制', icon: IconBoxes, text: '把发现转译为车内、车外与监管三端概念，并用 X4 检验机制是否真正获得认可。' },
] as const;

const FINDINGS = [
  { id: 'experience', tone: 'positive', kicker: 'FINDING 01', icon: IconTrendingUp, title: '真实使用经验，是最强的正向路径。', value: '+0.691', note: 'Q2 使用经验 → 托付意愿（PLS 显著）', text: '而驾龄（Q1）路径为 −0.028：开得久，不如真的用过。' },
  { id: 'blackbox', tone: 'negative', kicker: 'FINDING 02', icon: IconEyeOff, title: '黑箱焦虑，是伤害最深的负向路径。', value: '−0.235', note: 'X2 车内黑箱与接管焦虑（PLS 显著）', text: 'X2 在四种模型中始终保持显著负向，是联合模型里最明确的独立负向关联。' },
  { id: 'strata', tone: 'negative', kicker: 'FINDING 03', icon: IconUsers, title: '经验越少，焦虑的传导越强。', value: '−6.348', note: '无支持／仅巡航组 B（显著）', text: '到高速 NOA 组降为 −1.070，本样本中未达到统计显著。' },
] as const;

const q2Path = DRIVERLESS_STATS.pls.paths.find((path) => path.code === 'Q2');
const Q2_BETA = q2Path ? q2Path.beta : 0.691;

function ChapterBand({ no, kicker, icon, title, stat, statLabel }: { no: string; kicker: string; icon?: ComponentType<{ size?: number; className?: string }>; title: ReactNode; stat?: ReactNode; statLabel?: string }) {
  const Icon = icon;
  return <header className="chapter-band">
    <div className="chapter-band__main">
      <span className="section-ghost" aria-hidden="true">{no}</span>
      <p className="driverless-kicker chapter-band__kicker">{Icon && <Icon size={14} />}{kicker}</p>
      <h2>{title}</h2>
    </div>
    {stat !== undefined && <div className="chapter-band__stat"><strong>{stat}</strong>{statLabel && <em>{statLabel}</em>}</div>}
  </header>;
}

function NewsWall() {
  const [zoom, setZoom] = useState<{ image: string; title: string; source: string } | null>(null);
  return <>
    <div className="news-wall">
      {NEWS_WALL.map((column) => <section key={column.id} className="news-wall__col" aria-label={column.title}>
        <header>
          <span className="news-wall__badge" aria-hidden="true"><column.icon size={16} /></span>
          <div className="news-wall__head-text"><span>{column.tag}</span><h3>{column.title}</h3></div>
        </header>
        <ol>{column.items.map((item) => <li key={item.text}>
          <b>{item.year}</b>
          <div><p>{item.text}</p><small>{item.source}</small></div>
          <button type="button" className="news-wall__shot" onClick={() => setZoom(item)} aria-label={`放大查看新闻截图：${item.title}`}>
            <img src={item.image} width={1200} height={750} loading="lazy" alt={`${item.title} 新闻页面截图`} />
            <span className="news-wall__shot-hint" aria-hidden="true">点击放大</span>
          </button>
        </li>)}</ol>
      </section>)}
    </div>
    <p className="news-wall__bridge">这正是本研究的起点——<b>问卷 301 份</b>，加上车企、平台与交警的访谈。</p>
    {/* oxlint-disable jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions -- 弹层：点击背景关闭；ESC 与关闭按钮提供键盘路径 */}
    {zoom && (
      <div className="award-zoom" role="dialog" aria-modal="true" aria-label="新闻截图放大" onClick={() => setZoom(null)} onKeyDown={(event) => { if (event.key === 'Escape') setZoom(null); }}>
        <button type="button" className="award-zoom__close" onClick={() => setZoom(null)} aria-label="关闭">×</button>
        <img src={zoom.image} width={1200} height={750} alt={`${zoom.title} 新闻页面截图`} onClick={(event) => event.stopPropagation()} />
        <p>{zoom.source} · {zoom.title}</p>
      </div>
    )}
    {/* oxlint-enable jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions */}
  </>;
}

function MethodSteps() {
  return <div className="method-steps">{METHOD_STEPS.map((step) => <article key={step.title} className="method-step">
    <b>{step.num}<small>{step.unit}</small></b>
    <div className="method-step__title"><step.icon size={18} /><h3>{step.title}</h3></div>
    <p>{step.text}</p>
  </article>)}</div>;
}

function FindingCards() {
  return <div className="finding-cards">{FINDINGS.map((item) => <article key={item.id} className="finding-card" data-tone={item.tone}>
    <span className="finding-card__kicker"><item.icon size={14} />{item.kicker}</span>
    <h3>{item.title}</h3>
    <div className="finding-card__value"><strong>{item.value}</strong><small>{item.note}</small></div>
    <p>{item.text}</p>
  </article>)}</div>;
}

function Q24Chart({ activeIndex, onSelect }: { activeIndex: number; onSelect: (index: number) => void }) {
  const data = DRIVERLESS_STATS.q24.bins;
  const plot = { left: 62, top: 22, width: 624, height: 176 };
  const barWidth = 30;
  const gap = (plot.width - barWidth * data.length) / (data.length - 1);
  const max = 60;
  const xForScore = (score: number) => plot.left + score / 100 * plot.width;

  const select = onSelect;

  return <div className="q24-chart-shell">
    <div className="q24-chart-legend" aria-label="统计标记图例"><span><i className="mean" />均值 {DRIVERLESS_STATS.q24.mean}</span><span><i className="median" />中位数 {DRIVERLESS_STATS.q24.median}</span></div>
    <svg className="q24-chart q24-chart--desktop" viewBox="0 0 740 270" role="group" aria-label="Q24 托付意愿分布，十个区间均可聚焦或点击">
      <title>Q24 向自动驾驶委托驾驶的意愿分布</title>
      <desc>横轴为 0 到 100 分，纵轴为人数；均值 47.49，中位数 49。</desc>
      <defs>
        <linearGradient id="q24Grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#6fb3ac" />
          <stop offset="100%" stopColor="#d5e8e4" />
        </linearGradient>
      </defs>
      {[0, 20, 40, 60].map((tick) => {
        const y = plot.top + plot.height - tick / max * plot.height;
        return <g key={tick}><line x1={plot.left} x2={plot.left + plot.width} y1={y} y2={y} className="q24-gridline" /><text x={plot.left - 12} y={y + 4} textAnchor="end" className="q24-axis-label">{tick}</text></g>;
      })}
      <line x1={plot.left} x2={plot.left} y1={plot.top} y2={plot.top + plot.height} className="q24-axis" />
      <line x1={plot.left} x2={plot.left + plot.width} y1={plot.top + plot.height} y2={plot.top + plot.height} className="q24-axis" />
      {data.map((bin, index) => {
        const x = plot.left + index * (barWidth + gap);
        const height = bin.count / max * plot.height;
        const y = plot.top + plot.height - height;
        return <g
          key={bin.label}
          className="q24-bar"
          data-active={index === activeIndex || undefined}
          role="button"
          tabIndex={0}
          aria-pressed={index === activeIndex}
          aria-label={`${bin.label} 分，${bin.count} 人，占 ${bin.percent}%`}
          onMouseEnter={() => select(index)}
          onFocus={() => select(index)}
          onClick={() => select(index)}
          onKeyDown={(event) => {
            if (event.key === 'Enter' || event.key === ' ') {
              event.preventDefault();
              select(index);
            }
          }}
        >
          <rect x={x} y={y} width={barWidth} height={height} rx="6" fill="url(#q24Grad)" />
          <text x={x + barWidth / 2} y={y - 8} textAnchor="middle" className="q24-value">{bin.count}</text>
          <text x={x + barWidth / 2} y={plot.top + plot.height + 21} textAnchor="middle" className="q24-axis-label">{bin.label}</text>
        </g>;
      })}
      <line x1={xForScore(DRIVERLESS_STATS.q24.mean)} x2={xForScore(DRIVERLESS_STATS.q24.mean)} y1={plot.top - 4} y2={plot.top + plot.height} className="q24-marker q24-marker--mean" />
      <line x1={xForScore(DRIVERLESS_STATS.q24.median)} x2={xForScore(DRIVERLESS_STATS.q24.median)} y1={plot.top - 4} y2={plot.top + plot.height} className="q24-marker q24-marker--median" />
      <text x={plot.left + plot.width / 2} y="258" textAnchor="middle" className="q24-axis-title">托付意愿（0–100）</text>
      <text x="17" y={plot.top + plot.height / 2} textAnchor="middle" transform={`rotate(-90 17 ${plot.top + plot.height / 2})`} className="q24-axis-title">人数</text>
    </svg>
    <div className="q24-mobile" role="group" aria-label="Q24 托付意愿移动端分布">
      <div className="q24-mobile__scale" aria-label="总体刻度 0 到 100 分"><span>0</span><i><b style={{ left: `${DRIVERLESS_STATS.q24.mean}%` }} /><em style={{ left: `${DRIVERLESS_STATS.q24.median}%` }} /></i><span>100</span></div>
      <p className="q24-mobile__legend"><span>总体刻度 0–100</span><b>均值 {DRIVERLESS_STATS.q24.mean}</b><em>中位数 {DRIVERLESS_STATS.q24.median}</em></p>
      <div className="q24-mobile__rows">{data.map((bin, index) => <button
        type="button"
        key={bin.label}
        aria-pressed={index === activeIndex}
        onClick={() => select(index)}
        onFocus={() => select(index)}
      ><span>{bin.label}</span><i aria-hidden="true"><b style={{ width: `${bin.count / max * 100}%` }} /></i><strong>{bin.count} 人</strong><em>{bin.percent}%</em></button>)}</div>
    </div>
  </div>;
}

function Q24Section() {
  const [activeIndex, setActiveIndex] = useState(0);
  const bins = DRIVERLESS_STATS.q24.bins;
  const active = bins[activeIndex];
  return <div className="q24-layout">
    <Q24Chart activeIndex={activeIndex} onSelect={setActiveIndex} />
    <aside className="q24-metrics">
      <div className="q24-metrics__hero">
        <span>全样本 · 均值</span>
        <strong><CountUp value={DRIVERLESS_STATS.q24.mean} decimals={2} /></strong>
        <em>满分 100</em>
      </div>
      <div className="q24-metrics__now" aria-live="polite">
        <span>当前选中区间</span>
        <strong>{active.label} 分</strong>
        <b>{active.count} 人 · 占 {active.percent}%</b>
      </div>
      <div><span>全样本 · 中位数</span><strong>{DRIVERLESS_STATS.q24.median}</strong></div>
      <div><span>全样本 · 标准差</span><strong>{DRIVERLESS_STATS.q24.standardDeviation}</strong></div>
      <p>十档人数来自 301 条原始记录重新汇总；图中颜色只表示选中状态，不暗示“两极化”。全样本均值／中位数／标准差为固定值，不随选中区间改变。</p>
    </aside>
  </div>;
}

function GroupDifference() {
  const [activeId, setActiveId] = useState(1);
  const active = DRIVERLESS_STATS.groups.find((group) => group.id === activeId) ?? DRIVERLESS_STATS.groups[0];
  const min = -7;
  const max = 0;
  const position = (value: number) => (value - min) / (max - min) * 100;

  return <div className="group-explorer">
    <div className="group-composition" role="group" aria-label="Q2 四组样本构成">
      {DRIVERLESS_STATS.groups.map((group) => <button type="button" key={group.id} aria-pressed={group.id === activeId} data-active={group.id === activeId || undefined} onClick={() => setActiveId(group.id)} onFocus={() => setActiveId(group.id)}>
        <span>Q2 = {group.id}</span><strong>{group.count}</strong><b>{group.percent}%</b><small>{group.short}</small>
      </button>)}
    </div>
    <div className="coefficient-plot" aria-label="各组 PC1 对 Q24 的非标准化回归系数 B">
      <div className="coefficient-axis"><span>−7</span><span>PC1 → Q24 非标准化 B</span><span>0</span></div>
      {DRIVERLESS_STATS.groups.map((group) => <button type="button" className="coefficient-row" key={group.id} aria-pressed={group.id === activeId} data-active={group.id === activeId || undefined} onClick={() => setActiveId(group.id)} onFocus={() => setActiveId(group.id)}>
        <span>{group.short}</span>
        <i className="coefficient-track"><b className="coefficient-zero" /><em style={{ left: `${position(group.coefficient)}%` }} /></i>
        <strong>{group.coefficient.toFixed(3)}</strong>
        <small>{group.p}</small>
      </button>)}
    </div>
    <div className="group-reading" aria-live="polite"><span>当前查看 · Q2 = {active.id}</span><h3>{active.label}</h3><div className="group-reading__stats"><b>B = {active.coefficient.toFixed(3)}</b><b>{active.p}</b><b>组内 R² = {active.rSquared.toFixed(3)}</b><b>N = {active.count}</b></div><p>{active.implication}</p><strong>{active.significant ? '本样本中达到统计显著' : '本样本中未达到统计显著，不等于没有关系'}</strong></div>
  </div>;
}

function PrototypeCard({ prototype, activeEvidence }: { prototype: typeof PROTOTYPES[number]; activeEvidence: EvidenceCode }) {
  const [activeHotspot, setActiveHotspot] = useState<string>(prototype.hotspots[0].id);
  const detail = prototype.hotspots.find((hotspot) => hotspot.id === activeHotspot) ?? prototype.hotspots[0];
  const related = prototype.related.includes(activeEvidence);

  return <article id={`prototype-${prototype.id}`} className="prototype-card" data-related={related || undefined}>
    <header><span>{prototype.title}</span><div><b>三端概念设计</b><small>界面数据为模拟演示</small></div></header>
    <div className="prototype-image">
      <img src={prototype.image} srcSet={`${prototype.image.replace('.webp', '-2x.webp')} 2x`} width={prototype.width} height={prototype.height} loading="lazy" alt={`${prototype.title}概念原型，界面数据为模拟演示`} />
      {prototype.hotspots.map((hotspot) => <button
        type="button"
        key={hotspot.id}
        className="prototype-hotspot"
        data-active={activeHotspot === hotspot.id || undefined}
        data-related={hotspot.related.includes(activeEvidence) && activeHotspot !== hotspot.id || undefined}
        aria-pressed={activeHotspot === hotspot.id}
        style={{ left: `${hotspot.x}%`, top: `${hotspot.y}%` }}
        onClick={() => setActiveHotspot(hotspot.id)}
        onFocus={() => setActiveHotspot(hotspot.id)}
        aria-label={`${prototype.title}热点 ${hotspot.no}：${hotspot.label}${hotspot.related.includes(activeEvidence) ? '，与当前研究维度相关' : ''}`}
      >{hotspot.no}</button>)}
    </div>
    <div className="prototype-detail" aria-live="polite"><span>热点 {detail.no}</span><strong>{detail.label}</strong><p>{detail.detail}</p></div>
    <dl><div><dt>用户担忧</dt><dd>{prototype.concern}</dd></div><div><dt>设计回应</dt><dd>{prototype.response}</dd></div><div><dt>研究依据</dt><dd>{prototype.evidence}</dd></div></dl>
  </article>;
}

export function DriverlessEvidence() {
  const [activeEvidence, setActiveEvidence] = useState<EvidenceCode>('X2');
  const [awardZoom, setAwardZoom] = useState(false);
  const [activeSection, setActiveSection] = useState('problem');

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const line = window.innerHeight * 0.35;
      let current: (typeof SECTION_LINKS)[number]['id'] = SECTION_LINKS[0].id;
      for (const link of SECTION_LINKS) {
        const top = document.getElementById(link.id)?.getBoundingClientRect().top ?? Infinity;
        if (top <= line) current = link.id;
      }
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 80) {
        current = SECTION_LINKS[SECTION_LINKS.length - 1].id;
      }
      setActiveSection(current);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    raf = requestAnimationFrame(update);
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const scrollTo = (targetId: string) => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    document.getElementById(targetId)?.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'start' });
  };

  return <div className="driverless-case">
    <header className="driverless-hero">
      <div className="driverless-hero__cover"><img src="/images/driverless/research-cover.webp" width="1800" height="1014" loading="eager" fetchPriority="high" alt="自动驾驶的悖论研究正式封面" /></div>
      <div className="driverless-hero__summary">
        <p className="driverless-kicker">02 · RESEARCH-DRIVEN PRODUCT STRATEGY</p>
        <h1 className="driverless-hero__title"><span>自动驾驶<em>信任</em></span><span>机制研究</span></h1>
        <p className="driverless-hero__finding">信任不是靠懂，而是靠用过。</p>
        <p className="driverless-hero__finding-note">使用经验 Q2 +0.691 · 驾龄 Q1 −0.028 · 技术认知 Q3 −0.020（PLS-SEM 标准化路径系数）</p>
        <p className="driverless-hero__full-title">自动驾驶的悖论：技术进步与公众焦虑——自动驾驶乘用车信任焦虑调查与协同优化机制研究</p>
        <div className="driverless-hero__facts"><div><strong>项目获一等奖</strong><span>2026年7月</span></div><div><strong>第二作者</strong><span>问卷设计与统计建模</span></div><div><strong>301</strong><span>份有效问卷</span></div></div>
        <div className="driverless-hero__role"><p>第二作者｜独立完成问卷设计与全部统计建模，主责量化分析</p><p>研究到产品：证据重组、网页信息架构与交互可视化由本人设计实现</p></div>
        <div className="driverless-method-tags"><span><IconCalculator size={13} />Pearson 相关</span><span><IconChartLine size={13} />OLS／PLS-SEM</span><span><IconLayers size={13} />PCA／分组回归</span><span><IconTrust size={13} />Logit 稳健性</span></div>
      </div>
      <aside className="award-proof">
        <button type="button" className="award-proof__zoom" onClick={() => setAwardZoom(true)} aria-haspopup="dialog" aria-label="点击放大查看证书高清版">
          <img src="/images/driverless/award-proof.webp" width="860" height="1217" loading="lazy" alt="WUPENICITY 2026 城市可持续调研报告国际竞赛（智慧低碳交通赛道）一等奖证书" />
          <span>点击放大 · 可扫码验证</span>
        </button>
        <p><b>项目获奖</b><span>项目获 WUPENICITY 2026 城市可持续调研报告国际竞赛（智慧低碳交通赛道）一等奖｜2026年7月</span></p>
      </aside>
      {/* oxlint-disable jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions -- 弹层：点击背景关闭；ESC 与关闭按钮提供键盘路径 */}
      {awardZoom && (
        <div className="award-zoom" role="dialog" aria-modal="true" aria-label="证书高清版" onClick={() => setAwardZoom(false)} onKeyDown={(event) => { if (event.key === 'Escape') setAwardZoom(false); }}>
          <button type="button" className="award-zoom__close" onClick={() => setAwardZoom(false)} aria-label="关闭">×</button>
          <img src="/images/driverless/award-proof-hd.webp" width="1131" height="1600" alt="WUPENICITY 2026 城市可持续调研报告国际竞赛（智慧低碳交通赛道）一等奖证书高清版" onClick={(event) => event.stopPropagation()} />
          <p>WUPENICITY 2026 一等奖证书 · 点击背景或按 ESC 关闭 · 二维码可扫描验证</p>
        </div>
      )}
      {/* oxlint-enable jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions */}
    </header>

    <nav className="driverless-anchor-nav" aria-label="案例章节">{SECTION_LINKS.map((link, index) => <a key={link.id} href={`#${link.id}`} data-active={activeSection === link.id || undefined}><link.icon size={15} /><span>{String(index + 1).padStart(2, '0')}</span>{link.label}</a>)}</nav>

    <Reveal><section id="problem" className="driverless-section">
      <ChapterBand no="01" icon={IconTarget} kicker="THE PROBLEM · 问题" title={<>技术进步，<em>不等于</em>公众信任。</>} stat={<CountUp value={DRIVERLESS_STATS.q24.mean} decimals={2} />} statLabel="平均托付意愿（满分 100）" />
      <NewsWall />
    </section></Reveal>

    <Reveal><section id="method" className="driverless-section">
      <ChapterBand no="02" icon={IconRoute} kicker="METHOD · 我怎么做" title={<>三步：问对人，建对模型，落到产品。</>} stat={<CountUp value={DRIVERLESS_STATS.sampleSize} />} statLabel="份有效问卷" />
      <MethodSteps />
    </section></Reveal>

    <Reveal><section id="findings" className="driverless-section">
      <ChapterBand no="03" icon={IconChartLine} kicker="FINDINGS · 关键发现" title={<>经验，比<em>认知</em>更能解释信任。</>} stat={<>+<CountUp value={Q2_BETA} decimals={3} /></>} statLabel="使用经验 → 托付意愿（PLS 标准化路径系数）" />
      <FindingCards />
      <div className="sample-block">
        <h3 className="sample-block__title"><span>一</span>托付意愿分布（Q24）</h3>
        <Q24Section />
        <details className="data-table"><summary>查看可访问数据表</summary><table><thead><tr><th>区间</th><th>人数</th><th>占比</th></tr></thead><tbody>{DRIVERLESS_STATS.q24.bins.map((bin) => <tr key={bin.label}><td>{bin.label}</td><td>{bin.count}</td><td>{bin.percent}%</td></tr>)}</tbody></table></details>
      </div>
      <div className="sample-block">
        <h3 className="sample-block__title"><span>二</span>现实智驾经验分层（Q2）</h3>
        <GroupDifference />
        <div className="pc1-note"><div><span>PCA／PC1 口径</span><p>{DRIVERLESS_STATS.pc1.meaning}</p></div><div><span>正式表来源</span><p>N = 301 的《427问卷报告》表 4 与表 7；B 为分组 OLS 非标准化系数。</p></div></div>
      </div>
      <div className="sample-block">
        <h3 className="sample-block__title"><span>三</span>换一种模型，结论还成立吗？</h3>
        <DriverlessModelLens activeEvidence={activeEvidence} onEvidenceChange={setActiveEvidence} />
      </div>
    </section></Reveal>

    <Reveal><section id="interview-layer" className="driverless-section">
      <ChapterBand no="04" icon={IconUsers} kicker="MULTI-STAKEHOLDER · 多方立场" title={<>同一条信任链，<em>不同的人</em>怎么看？</>} stat={<><CountUp value={35} /> 万</>} statLabel={`公里 · 桐乡车路云平台累计运行里程（${TONGXIANG_ASOF}）`} />
      <p className="chapter-lead">问卷给出分布，访谈给出立场。车企、平台与交警对“信任靠什么建立”的分歧，正是三端机制需要回答的问题。</p>
      <DriverlessInterview />
    </section></Reveal>

    <Reveal><section id="prototypes" className="driverless-section prototype-section">
      <ChapterBand no="05" icon={IconOutside} kicker="THREE-END STAGE · 三端联动" title={<>一条研究证据，<br />如何穿过三个端口？</>} stat="3" statLabel="个端口同步联动：车内 / 车外 / 监管平台" />
      <p className="chapter-lead">选择场景阶段，车外、车内与监管平台同步变化。原始概念板收进附录。</p>
      <DriverlessThreeEnd activeEvidence={activeEvidence} onEvidenceChange={setActiveEvidence} />
      <aside className="role-data-stage"><h3>我的贡献与方法口径</h3><dl><div><dt>项目角色</dt><dd>第二作者；独立完成问卷设计与全部统计建模，主责量化分析。</dd></div><div><dt>我的工作范围</dt><dd>问卷设计、数据清理与统计建模、分层与稳健性检验；研究证据重组、网页信息架构与交互可视化。</dd></div><div><dt>数据口径</dt><dd>网页仅展示可复核的聚合统计，不公开原始答卷、访谈记录与过程文件。</dd></div></dl><p>本页聚合值来源：{DRIVERLESS_STATS.sources.aggregates}。模型结果来源：{DRIVERLESS_STATS.sources.tables}；{DRIVERLESS_STATS.sources.pls}。访谈引语来源：《4.15访谈汇总》。</p></aside>
    </section></Reveal>

    <Reveal><section id="appendix" className="driverless-section appendix-section">
      <ChapterBand no="A" icon={IconArchive} kicker="APPENDIX · 数据与方法附录" title={<>证据的完整细节，<br />折叠在这里。</>} />
      <details className="appendix-fold">
        <summary>
          <span className="appendix-fold__title">数据与方法附录</span>
          <span className="appendix-fold__hint when-closed">展开：研究路径 8 步 / 变量字典 / 测量质量 / 稳健性与异质性 / 边界与来源</span>
          <span className="appendix-fold__hint when-open">收起附录</span>
        </summary>
        <div className="appendix-body">
          <div className="appendix-block">
            <h4><IconRoute size={14} />研究路径 · 8 步</h4>
            <ol className="research-path">{RESEARCH_STEPS.map((step, index) => <li key={step}><span>{String(index + 1).padStart(2, '0')}</span><strong>{step}</strong></li>)}</ol>
          </div>
          <div className="appendix-block">
            <h4><IconBookOpen size={14} />变量字典 · 四个问题域</h4>
            <div className="variable-grid">{VARIABLES.map((variable) => <article key={variable.code} className="variable-card">
              <div className="variable-card__head">
                <span>{variable.code} · {variable.items}</span><strong>{variable.name}</strong><p>{variable.meaning}</p><b>{variable.direction}</b>
              </div>
              <div className="variable-card__detail" id={`variable-detail-${variable.code}`}><dl><div><dt>使用阶段</dt><dd>{variable.stage}</dd></div><div><dt>对应产品端</dt><dd>{variable.endpoint}</dd></div></dl><p><b>代表性题项</b>{variable.representative}</p><p><b>产品映射</b>{variable.product}</p><button type="button" className="variable-jump" onClick={() => scrollTo(variable.code === 'X4' ? 'prototypes' : `prototype-${variable.prototype}`)}>{variable.code === 'X4' ? '查看三端联动 ↓' : '查看联动原型 ↓'}</button></div>
            </article>)}</div>
          </div>
          <div className="appendix-block">
            <h4><IconDiagnostics size={14} />测量质量与模型诊断</h4>
            <MeasurementQuality activeEvidence={activeEvidence} />
          </div>
          <div className="appendix-block">
            <h4><IconTrust size={14} />稳健性与异质性核对</h4>
            <RobustnessStrip />
            <aside className="heterogeneity-check"><header><span>异质性证据核对</span><strong>描述性分组模式可见，但调节证据并不一致。</strong></header><div><article><span>{DRIVERLESS_STATS.chow.model}</span><b>F = {DRIVERLESS_STATS.chow.f.toFixed(3)} · {DRIVERLESS_STATS.chow.p}</b><p>{DRIVERLESS_STATS.chow.comparison}。{DRIVERLESS_STATS.chow.note}</p></article><article><span>{DRIVERLESS_STATS.interaction.model}</span><b>B = +{DRIVERLESS_STATS.interaction.coefficient.toFixed(3)} · {DRIVERLESS_STATS.interaction.p}</b><p>{DRIVERLESS_STATS.interaction.note}</p></article></div><p>因此本页把四组结果称为“样本内分组模式”，不写成已被完全证实的因果调节。</p></aside>
          </div>
          <div className="appendix-block">
            <h4><IconScrollText size={14} />边界声明与数据来源</h4>
            <p className="model-boundary">最重要的变化不是“谁的数字最大”，而是四个构念在简单关系中都呈负向；共同进入模型后，X2 与 X4 仍保留负向独立关联，X1 与 X3 未呈现统计显著的独立关联。所有结果均限于样本内关联与预测。</p>
            <p className="appendix-sources">本页聚合值来源：{DRIVERLESS_STATS.sources.aggregates}。模型结果来源：{DRIVERLESS_STATS.sources.tables}；{DRIVERLESS_STATS.sources.pls}。访谈引语来源：《4.15访谈汇总》。</p>
          </div>
          <div className="appendix-block">
            <h4><IconBoxes size={14} />原始概念设计证据 · 界面数据为模拟演示</h4>
            <div className="prototype-grid">{PROTOTYPES.map((prototype) => <PrototypeCard key={prototype.id} prototype={prototype} activeEvidence={activeEvidence} />)}</div>
          </div>
        </div>
      </details>
    </section></Reveal>
  </div>;
}
