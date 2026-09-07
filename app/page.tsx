import Link from 'next/link';

const projects = [
  { href: '/projects/pingyao', number: '01', title: '瓶窑老街更新', label: '文商旅前期策划 · 实习项目', description: '从老街、窑山与民艺资源出发，讨论一条可以被体验、被停留、也能被运营的微度假路径。', contribution: '现场调研 · 整体及关键节点建模 · 汇报细化', tone: 'clay' },
  { href: '/projects/driverless-trust', number: '02', title: '无人驾驶，如何建立信任', label: '用户研究 · 个人分析', description: '将问卷与访谈材料转译为可解释的信任问题，并形成产品与沟通层面的建议。', contribution: '负责分析与结论', tone: 'blue' },
  { href: '/projects/emergency-network', number: '03', title: '应急配送网络如何布局', label: 'GIS · 空间决策研究', description: '以抗蛇毒血清配送为目标，比较需求风险、道路可达性、候选点与无人机航线。', contribution: '问题拆解 · 数据搜集 · 空间分析 · GPA 演示', tone: 'map' },
  { href: '/projects/qingyuan', number: '04', title: '庆元城市更新交付', label: '城市更新 · 实际项目', description: '把分散的房屋与现状信息组织为可读、可用、可进入汇报体系的空间成果。', contribution: '房屋信息整理 · 现状图斑／图则 · 汇报参与', tone: 'ink' },
];

export default function Home() {
  return <main>
    <nav className="topbar"><Link className="wordmark" href="#top" aria-label="返回首页">JKY<span>／</span>PORTFOLIO</Link><div className="nav-links"><a href="#work">精选项目</a><a href="#method">工作方式</a></div></nav>
    <header className="hero" id="top">
      <div className="eyebrow">2027 GRADUATE · URBAN &amp; RURAL PLANNING</div>
      <h1>城市空间与<br /><em>策略研究。</em></h1>
      <div className="hero-bottom"><p>金科佚｜浙江工业大学城乡规划本科<br />关注文商旅前期策划、城市更新与空间决策。</p><a className="scroll-link" href="#work">向下浏览 <span>↓</span></a></div>
      <div className="hero-grid" aria-hidden="true"><i /><i /><i /><i /><i /><i /><i /><i /><b>01° 研究<br />02° 空间<br />03° 落地</b></div>
    </header>
    <section className="intro-section"><p className="section-kicker">ABOUT THE WORK</p><div className="intro-copy"><p>我把调研、数据分析和空间表达放在同一条工作链里：先确认真实问题，再把判断落到产品、场景与可执行的下一步。</p><p className="muted">这里不展示虚构的经营结果。每个项目都会区分原始事实、团队方案、个人交付与作品集阶段的深化判断。</p></div></section>
    <section className="work-section" id="work"><div className="section-head"><p className="section-kicker">SELECTED WORK</p><span>04 PROJECTS</span></div><div className="projects-grid">{projects.map((project) => <Link className={`project-card ${project.tone}`} href={project.href} key={project.href}><div className="project-art" aria-hidden="true"><span>{project.number}</span><i /><i /><i /></div><div className="project-meta"><span>{project.label}</span><b>{project.number}</b></div><h2>{project.title}</h2><p>{project.description}</p><footer><span>{project.contribution}</span><strong>查看项目 <i>↗</i></strong></footer></Link>)}</div></section>
    <section className="method-section" id="method"><div><p className="section-kicker">HOW I WORK</p><h2>从证据出发，<br />回到真实场地。</h2></div><ol><li><b>01</b><div><h3>识别问题</h3><p>踏勘、资料、访谈与数据不是装饰；它们用来界定真正值得解决的矛盾。</p></div></li><li><b>02</b><div><h3>形成判断</h3><p>把资源、客群、动线、需求与约束放在一起，寻找可被验证的策略。</p></div></li><li><b>03</b><div><h3>表达并推进</h3><p>将结论转化为空间、产品、图件与实施动作，让不同协作方能够继续工作。</p></div></li></ol></section>
    <footer className="site-footer"><span>© 2026 JIN KEYI</span><span>URBAN SPACE &amp; STRATEGY RESEARCH</span></footer>
  </main>;
}
