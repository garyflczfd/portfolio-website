'use client';

/* oxlint-disable next/no-img-element -- 案例图使用固定尺寸静态素材（与项目其他页面一致） */
import { useRef, useState } from 'react';
import './daidong-narrative.css';

const nodes = [
  {
    id: 'node-temple',
    number: '01',
    kind: 'TEMPLE NODE',
    mapLabel: '超果禅寺',
    title: '超果禅寺｜从参访场所到体验起点',
    text: '超果禅寺所在的山前聚落，是岱东文化资源串联的起点。寺庙与村道、山林和邻里日常相接，为参访、漫游与后续停留体验建立了空间基底。',
    comparison: [
      { label: '场景图', image: '/images/chaoguo-temple-scene-clean.webp', alt: '超果禅寺禅意场景图', caption: '场景图 / 禅意庭院氛围' },
    ],
  },
  {
    id: 'node-library',
    number: '02',
    kind: 'STUDY NODE',
    mapLabel: '梵音书院',
    title: '梵音书院｜把停留行为放进寺庙周边',
    text: '书院式停留单元置于寺庙周边，以阅读、休憩与文化体验承接参访后的时间，让文化锚点向日常可使用的公共场景延伸。',
    comparison: [
      { label: '节点表达', image: '/images/chaoguo-street-clean.webp', alt: '梵音书院节点效果图', caption: '节点效果图 / 梵音书院' },
    ],
  },
  {
    id: 'node-healing',
    number: '03',
    kind: 'HEALING NODE',
    mapLabel: '六感疗愈',
    title: '六感疗愈｜把节点接入可讨论的业态框架',
    text: '将文化、商业、旅游与居养组织为“六感疗愈”的场景系统，让空间不止于参观，也能承接慢游、体验与持续停留。',
    comparison: [
      { label: '场景图', image: '/images/chaoguo-healing-scene-clean.webp', alt: '六感疗愈场景图', caption: '场景图 / 六感疗愈' },
    ],
  },
] as const;

export function DaidongExplorer() {
  const [activeId, setActiveId] = useState<(typeof nodes)[number]['id']>('node-temple');
  const readerRef = useRef<HTMLElement>(null);
  const activeNode = nodes.find((node) => node.id === activeId) ?? nodes[0];
  const showNode = (id: (typeof nodes)[number]['id']) => {
    setActiveId(id);
    window.requestAnimationFrame(() => readerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }));
  };

  return <section className="daidong-narrative" aria-label="岱东案例叙事">
    <section className="daidong-vision" aria-labelledby="daidong-vision-title">
      <div className="daidong-section-head"><div><p className="section-kicker">01 / TARGET VISION</p><h2 id="daidong-vision-title">先让读者看见，<br /><em>项目想抵达哪里。</em></h2></div><p>以一张项目目标愿景图先建立终局画面，再回到目标、总图与节点。图中内容属于方案方向，不是实施或运营结果。</p></div>
      <figure className="daidong-vision-figure"><img src="/images/chaoguo-target-vision-clean.webp" alt="超果禅境疗愈原乡目标愿景图" /><figcaption><span>项目方向 / 目标愿景</span><b>超果禅境 · 疗愈原乡</b></figcaption></figure>
      <div className="daidong-goals" aria-label="团队策略目标">
        <article><b>01</b><h3>文化锚点</h3><p>以超果禅学与寺庙空间建立目的地识别，而非仅展示单一古迹。</p></article>
        <article><b>02</b><h3>体验路径</h3><p>把参访、停留、休憩与文化体验组织成可连续感知的场景。</p></article>
        <article><b>03</b><h3>业态框架</h3><p>以“文商旅居养”的团队设想承接后续节点与运营讨论。</p></article>
      </div>
    </section>

    <section className="daidong-masterplan" aria-labelledby="daidong-masterplan-title">
      <div className="daidong-section-head"><div><p className="section-kicker">02 / MASTER PLAN READING</p><h2 id="daidong-masterplan-title">再从总体空间，<br /><em>读到具体单元。</em></h2></div><p>以超果禅寺、梵音书院与六感疗愈三类空间单元，组织文化参访、日常停留与场景体验之间的关系。点击图上点位，展开对应的空间表达。</p></div>
      <figure className="daidong-masterplan-figure">
        <img src="/images/chaoguo-masterplan-study.webp" alt="超果禅寺及周边总体空间示意" />
        {nodes.map((node) => <button key={node.id} type="button" className={`daidong-hotspot hotspot-${node.id.replace('node-', '')} ${activeId === node.id ? 'is-active' : ''}`} onClick={() => showNode(node.id)} aria-pressed={activeId === node.id}><span>{node.number}</span><b>{node.mapLabel}</b><i>+</i></button>)}
        <figcaption><span>总体空间示意</span></figcaption>
      </figure>
    </section>

    <section ref={readerRef} className="daidong-node-reader" aria-labelledby="daidong-nodes-title" aria-live="polite">
      <div className="daidong-section-head"><div><p className="section-kicker">03 / ACTIVE NODE</p><h2 id="daidong-nodes-title">点位不是目录，<br /><em>而是场景的入口。</em></h2></div><p>每次只展开一个节点，让场地、空间表达与场景逻辑围绕同一个问题展开。</p></div>
      <article className="daidong-active-node">
        <div className="daidong-active-copy"><p className="section-kicker">{activeNode.number} / {activeNode.kind}</p><h3>{activeNode.title}</h3><p>{activeNode.text}</p></div>
        <div className="daidong-comparison" aria-label={`${activeNode.title}节点材料`}>
          {activeNode.comparison.map((item) => <figure key={item.label} className="daidong-comparison-card">
            <div className="comparison-label">{item.label}</div>
            {'image' in item && <img src={item.image} alt={item.alt} />}
            <figcaption>{item.caption}</figcaption>
          </figure>)}
        </div>
      </article>
    </section>

    <section className="daidong-continuity" aria-labelledby="daidong-continuity-title">
      <div className="daidong-section-head"><div><p className="section-kicker">04 / CONTINUOUS EXPERIENCE</p><h2 id="daidong-continuity-title">三个节点，<br /><em>一段连续体验。</em></h2></div><p>节点并非三张互不相干的方案图：它们依次承接文化参访、阅读停留与疗愈慢游。</p></div>
      <ol>
        {nodes.map((node) => <li key={node.id}><span>{node.number}</span><div><strong>{node.mapLabel}</strong><p>{node.number === '01' ? '文化参访起点：从寺庙与山前聚落进入项目的文化线索。' : node.number === '02' ? '阅读与停留：以书院式公共单元延长参访后的停留时间。' : '疗愈与慢游：把节点接入文化、商业、旅游与居养的场景框架。'}</p></div><button type="button" onClick={() => showNode(node.id)}>查看节点 ↗</button></li>)}
      </ol>
    </section>

    <section className="daidong-boundary" aria-label="岱东项目边界">
      <p className="section-kicker">05 / PROJECT BOUNDARY</p><p>本页呈现团队前期方案中的目标愿景、策略、总体空间组织与节点场景；均为项目方向或方案效果，不代表已落地、已运营或已产生实际效益。</p>
    </section>
  </section>;
}
