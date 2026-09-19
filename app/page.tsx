import Link from 'next/link';
import type { Metadata } from 'next';
import type { CSSProperties } from 'react';
import { PortfolioFooter, PortfolioNav } from '@/components/portfolio-nav';
import { publicPortfolioProjects } from '@/lib/portfolio';
import './portfolio-home.css';
import './portfolio-cover.css';
import './portfolio-pages.css';
import './final-polish.css';

/* oxlint-disable next/no-img-element -- Existing portfolio assets use explicit dimensions and optimized WebP/static sources. */

const projects = publicPortfolioProjects.map((project, index) => ({
  no: project.publicNo ?? project.no,
  kind: project.english,
  title: project.title,
  summary: project.premise,
  methods: project.keywords,
  tone: (['blue', 'sand', 'green'][index % 3]) as 'blue' | 'sand' | 'green',
  href: `/projects/${project.slug}`,
  proof: project.proof,
  output: project.output,
  slug: project.slug,
  states: [project.stage, project.time].filter(Boolean),
}));

export const metadata: Metadata = {
  title: '金科佚｜空间策略、GIS 与数据研究作品集',
  description: '金科佚的求职作品集：以真实项目材料呈现空间分析、GIS、数据研究、策略判断与方案表达。',
  openGraph: {
    type: 'website',
    title: '金科佚｜空间策略、GIS 与数据研究作品集',
    description: '金科佚的求职作品集：以真实项目材料呈现空间分析、GIS、数据研究、策略判断与方案表达。',
    images: [{ url: '/og/og-default.jpg', width: 1200, height: 630, alt: '金科佚作品集' }],
  },
};

export default function Home() {
  return (
    <main className="portfolio-v3">
      <PortfolioNav current="home" />

      <section className="portfolio-cover" id="profile" aria-labelledby="profile-title">
        <div className="portfolio-cover__mosaic" aria-hidden="true">
          <img className="cover-asset cover-asset--space" src="/images/chaoguo-aerial.webp?v=3" alt="" />
          <img className="cover-asset cover-asset--gis" src="/images/serum-route-clean.webp" alt="" />
          <img className="cover-asset cover-asset--research" src="/images/chaoguo-temple-scene-clean.webp" alt="" />
          <img className="cover-asset cover-asset--scene" src="/images/chaoguo-street-clean.webp?v=1" alt="" />
        </div>
        <div className="portfolio-cover__veil" aria-hidden="true" />
        <div className="portfolio-cover__content">
          <p className="portfolio-cover__meta">JIN KEYI / 2027届本科生 · 城乡规划</p>
          <div><p className="portfolio-cover__label">PERSONAL PORTFOLIO</p><h1 id="profile-title"><span>能读空间，</span><em>也能讲清问题。</em></h1></div>
        <div className="portfolio-cover__bottom"><p>从场地与资料中发现问题，用空间分析、数据研究与场景表达组织判断。面向文旅策划、城市更新、空间策略及行业方案岗位。</p><Link href="/projects">查看 4 个代表案例 <b>↓</b></Link></div>
        </div>
        <aside className="portfolio-cover__index"><span>PROFILE / 01</span><b>SPACE × DATA × STORY</b><p>空间解读<br />研究分析<br />方案表达</p></aside>
      </section>

      <section className="home-workway" aria-label="工作方式">
        <p className="eyebrow"><i /> HOW I WORK</p>
        <p>先读问题，再组织证据；最后把判断翻译成可讨论的策略或场景。</p>
        <Link href="/method">查看方法路径 <b>↗</b></Link>
      </section>

      <section className="project-list-v3">
        <div className="section-heading"><p className="eyebrow"><i /> SELECTED CASES / 04</p><span>每个案例对应一项可回看的证据</span></div>
        {projects.map((project) => <article className={`project-row project-${project.tone} project-${project.slug}`} key={project.href}><span className="project-no">{project.no}</span><div className="project-main"><p>{project.kind}</p><h2><Link href={project.href}>{project.title} <b>↗</b></Link></h2><span>{project.summary}</span><strong className="project-proof">关键证据：{project.proof}</strong>{project.output && <strong className="project-output">结果形态：{project.output}</strong>}{project.slug === 'driverless-trust' && <div className="project-credit"><b>第二作者｜独立完成问卷设计与全部统计建模，主责量化分析</b><span>研究到产品：证据重组、网页信息架构与交互可视化由本人设计实现</span></div>}<div className="method-chips">{project.methods.map((method) => <i key={method}>{method}</i>)}</div></div>{project.slug === 'driverless-trust' ? <div className="project-evidence-preview" aria-label="Q2 四组真实样本占比：23.9%、41.5%、13.0%、21.6%"><strong>Q2</strong><span>现实智驾经验分层</span><div className="q2-mini-bars">{[['1','23.9%'],['2','41.5%'],['3','13.0%'],['4','21.6%']].map(([group, value]) => <i key={group} style={{ '--q2-share': value } as CSSProperties}><b>{group}</b><em>{value}</em></i>)}</div></div> : <div className="project-mark" aria-hidden="true"><i /><i /><i /></div>}<div className="project-status" aria-label={`${project.title}内容状态`}>{project.states.map((state) => <span key={state}>{state}</span>)}</div></article>)}
      </section>

      <section className="home-method-entry"><div><p className="eyebrow"><i /> METHOD</p><h2>问题 → 证据 → 判断<br /><em>→ 策略 / 场景 → 验证</em></h2></div><p>方法页把这条路径和四个公开案例的对应关系放在一起，方便继续阅读。</p><Link href="/method">进入方法页 <b>→</b></Link></section>
      <PortfolioFooter />
    </main>
  );
}
