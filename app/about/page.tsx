import type { Metadata } from 'next';
import { PortfolioFooter, PortfolioNav } from '@/components/portfolio-nav';
import '../portfolio-pages.css';
import '../final-polish.css';

export const metadata: Metadata = {
  title: '关于我｜金科佚作品集',
  description: '城乡规划与 GIS 背景，关注如何从现场和数据中识别问题，并把判断转化为清晰、可执行的方案。',
};

export default function AboutPage() {
  return <main className="portfolio-shell"><PortfolioNav current="about" />
      <section className="portfolio-page"><header className="page-intro"><div><p className="page-kicker">ABOUT / SPATIAL STRATEGY</p><h1>从现场和数据中识别问题，<br /><em>把判断转化为方案。</em></h1></div><p>城乡规划与 GIS 背景，正在把空间分析、数据研究与产品思维连接起来。我关注如何从现场和数据中识别问题，并把判断转化为清晰、可执行的方案。</p></header>
      <section className="about-ledger"><p>求职方向收束为文旅策划、城市更新、空间策略与行业方案。项目页面分别标注研究材料、团队成果、作品集深化与尚待确认的信息。</p><dl><div><dt>教育背景</dt><dd>城乡规划本科 / 2027 届</dd></div><div><dt>关注方向</dt><dd>文旅策划、城市更新、空间策略、行业方案。</dd></div><div><dt>判断基础</dt><dd>场地与空间阅读、GIS 与数据分析、图件与方案表达。</dd></div><div><dt>事实边界</dt><dd>未实施内容不表述为已落地成果；个人贡献未核实处保留“待确认”。</dd></div></dl></section>
      <p className="about-note">资料说明：本页仅呈现已确认的教育背景与方向；具体经历、项目时间与联系方式在原始材料核实前不补造。</p>
    </section><PortfolioFooter />
  </main>;
}
