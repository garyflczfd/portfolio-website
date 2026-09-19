import Link from 'next/link';
import type { Metadata } from 'next';
import { PortfolioFooter, PortfolioNav } from '@/components/portfolio-nav';
import { publicPortfolioProjects } from '@/lib/portfolio';
import '../portfolio-pages.css';
import '../final-polish.css';

/* oxlint-disable next/no-img-element -- Existing portfolio assets use explicit dimensions and optimized static sources. */

export const metadata: Metadata = {
  title: '项目｜金科佚作品集',
  description: '岱东文旅场景、无人驾驶信任、低空血清 GIS 决策与桦树无人机影测四个代表案例。',
  openGraph: {
    type: 'website',
    title: '项目｜金科佚作品集',
    description: '岱东文旅场景、无人驾驶信任、低空血清 GIS 决策与桦树无人机影测四个代表案例。',
    images: [{ url: '/og/og-default.jpg', width: 1200, height: 630, alt: '金科佚作品集' }],
  },
};

export default function ProjectsPage() {
  return <main className="portfolio-shell">
    <PortfolioNav current="projects" />
    <section className="portfolio-page projects-page">
      <header className="page-intro">
        <div><p className="page-kicker">SELECTED PROJECTS / 04</p><h1>从四个代表案例，<br /><em>看我的问题阅读方式。</em></h1></div>
        <p>每个案例先说明它能证明什么，再展开其材料、判断与边界。页面仅使用可公开、可回看的项目材料。</p>
      </header>
      <div className="portfolio-grid" aria-label="项目索引">
        {publicPortfolioProjects.map((project) => <Link href={`/projects/${project.slug}`} className={`project-index-card ${project.cover ? '' : 'project-index-card--no-image'}`} key={project.slug}>
          {project.cover && <div className="project-index-card__image"><img src={project.cover} alt={`${project.title}项目材料预览`} style={{ objectPosition: project.coverPosition }} /><div className="project-index-card__wash" /></div>}
          <div className="project-index-card__top"><span>{project.publicNo ?? project.no}{project.time ? ` / ${project.time}` : ''}</span><span>{project.stage}</span></div>
          <div className="project-index-card__copy"><p className="project-index-card__english">{project.english}</p><h2>{project.title} <small>↗</small></h2><p className="project-index-card__premise">{project.premise}</p><p className="project-index-card__proof">证明：{project.proof}</p><div className="project-index-card__meta"><span>{project.category}</span>{project.keywords.map((keyword) => <span key={keyword}>{keyword}</span>)}</div></div>
        </Link>)}
      </div>
    </section>
    <PortfolioFooter />
  </main>;
}
