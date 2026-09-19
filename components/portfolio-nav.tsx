import Link from 'next/link';

type PortfolioNavProps = { current?: 'home' | 'projects' | 'method' | 'about' };

const links = [
  { key: 'home', label: '首页', href: '/' },
  { key: 'projects', label: '项目', href: '/projects' },
  { key: 'method', label: '方法', href: '/method' },
  { key: 'about', label: '关于我', href: '/about' },
] as const;

export function PortfolioNav({ current }: PortfolioNavProps) {
  return <header className="portfolio-nav">
    <Link className="portfolio-nav__mark" href="/" aria-label="返回首页">JKY<span>/ PORTFOLIO</span></Link>
    <nav aria-label="作品集主导航">
      {links.map((link) => <Link key={link.key} href={link.href} aria-current={current === link.key ? 'page' : undefined}>{link.label}</Link>)}
    </nav>
    <Link className="portfolio-nav__cta" href="/projects">项目索引 <b>↘</b></Link>
  </header>;
}

export function PortfolioFooter() {
  return <footer className="portfolio-footer">
    <div><p>JIN KEYI / PORTFOLIO</p><h2>空间策略、GIS 与数据研究</h2></div>
    <div><p>公开材料持续核实与整理</p></div>
  </footer>;
}
