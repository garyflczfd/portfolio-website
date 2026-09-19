'use client';

import { useEffect, useState } from 'react';
import { HuashuDemSurface } from '@/components/huashu-dem-surface';

const stages = [
  { id: 'field', no: '01', tag: 'FIELD / 起点', title: '先走进场地，\n再开始判断。', body: '桦树不是一张等待被填色的底图。影测从现场开始：先看见地形、建筑、道路与公共空间真实共存的方式。', note: '点击飞行器，启动影测叙事。', action: '启动采集' },
  { id: 'capture', no: '02', tag: 'UAV / 采集', title: '把视线抬高，\n把现场留下。', body: '无人机遥感影测让零散的现场观察获得连续的空间视角。这里展示的是从飞行采样进入后续处理的过程，而非一张“科技感背景”。', note: '采集范围正在形成。', action: '查看影像重建' },
  { id: 'rebuild', no: '03', tag: 'RECONSTRUCTION / 重建', title: '影像、地表、\n等高线开始对齐。', body: '正射影像用于读空间关系；高程与等高线用于读起伏与可达性。数据只有进入同一坐标下，才会成为能支撑判断的证据。', note: '切换至地形阅读。', action: '展开地形' },
  { id: 'terrain', no: '04', tag: 'TERRAIN / 阅读', title: '不是“有数据”，\n而是读出关系。', body: '地形、既有建筑、道路与公共空间被放在同一个阅读界面中。它们共同决定哪些地方需要保护、修补、连接或被重新使用。', note: '地形是判断的底板，不是附图。', action: '查看策略落点' },
  { id: 'strategy', no: '05', tag: 'STRATEGY / 落点', title: '让判断，\n进入具体节点。', body: '总体结构与公共空间节点不再是脱离现场的效果图。它们回应已有场地、生态修复与使用路径，并把策略转化为可以被讨论的空间动作。', note: '点击节点，进入方案场景。', action: '进入规划场景' },
  { id: 'future', no: '06', tag: 'SCENARIO / 方案效果', title: '数据最后要抵达的，\n是人的场景。', body: '这里呈现的是规划方案效果，而非已建成实景：从数据判断到公共空间的可感知体验，才是一次空间策划完整的终点。', note: '规划后的场景。', action: '回到现场' },
] as const;

type StageId = (typeof stages)[number]['id'];

export function HuashuFlightStory() {
  const [stage, setStage] = useState<StageId>('field');
  const [launched, setLaunched] = useState(false);
  const index = stages.findIndex((item) => item.id === stage);
  const current = stages[index];

  useEffect(() => {
    if (!launched) return;
    const timer = window.setTimeout(() => setStage('capture'), 1100);
    return () => window.clearTimeout(timer);
  }, [launched]);

  const advance = () => {
    if (stage === 'field') {
      setLaunched(true);
      return;
    }
    setStage(stages[(index + 1) % stages.length].id);
  };

  return <section className={`flight-story stage-${stage}`} aria-label="桦树无人机影测与规划场景互动展示">
    <header className="flight-intro">
      <p className="case-number">DATA<br />01</p>
      <div>
        <p className="section-kicker">HUASHU VILLAGE · UAV PHOTOGRAMMETRY / SPATIAL STORY</p>
        <h2>现场 → 采集 → 重建 →<br /><em>地形阅读 → 策略 → 场景。</em></h2>
        <p>这不是一张孤立的 DEM 图。用桦树的无人机遥感影测成果，沿着“现场—数据—判断—方案”的路径，打开一份空间策划如何形成。</p>
      </div>
    </header>

    <div className="flight-shell">
      <div className="flight-rail" aria-label="叙事阶段">
        {stages.map((item, itemIndex) => <button key={item.id} type="button" aria-current={item.id === stage ? 'step' : undefined} className={item.id === stage ? 'is-active' : ''} onClick={() => { setLaunched(false); setStage(item.id); }}><span>{item.no}</span><i>{itemIndex < index ? '—' : '○'}</i></button>)}
      </div>

      <div className="flight-stage" aria-live="polite">
        <div className="flight-image image-field" />
        <div className="flight-image image-space" />
        <div className="flight-scan-lines" />
        <div className="flight-contours"><i /><i /><i /><i /></div>
        <div className="flight-grid"><i /><i /><i /><i /><i /></div>
        <HuashuDemSurface />
        <div className="flight-points" aria-hidden="true">{Array.from({ length: 54 }, (_, item) => <i key={item} style={{ left: `${(item * 37) % 88 + 5}%`, top: `${(item * 23) % 82 + 7}%` }} />)}</div>
        <div className="flight-node node-a">01 <span>入口</span></div>
        <div className="flight-node node-b">02 <span>公共空间</span></div>
        <div className="flight-node node-c">03 <span>生态界面</span></div>
        <button type="button" className="flight-drone" onClick={advance} aria-label={current.action}><span>✦</span><i /><b>{stage === 'field' ? 'CLICK TO FLY' : current.action}</b></button>
        <div className="flight-stamp"><span>HUASHU / 2025</span><b>{current.tag}</b></div>
      </div>

      <aside className="flight-copy">
        <p className="flight-count">{current.no} / 04</p>
        <p className="section-kicker">{current.tag}</p>
        <h2>{current.title.split('\n').map((line) => <span key={line}>{line}</span>)}</h2>
        <p>{current.body}</p>
        <div className="flight-note"><span>NOW</span>{current.note}</div>
        <button type="button" className="flight-next" onClick={advance}>{current.action} <i>↗</i></button>
      </aside>
    </div>

    <section className="flight-boundary">
      <p><span>材料</span>桦树调研、地形、等高线、总体与公共空间设计成果。</p>
      <p><span>呈现</span>网页仅使用适合公开浏览的图像与抽样视觉，不公开完整源数据。</p>
      <p><span>说明</span>最后一幕为方案效果，不表述为已经建成或运营成果。</p>
    </section>
  </section>;
}
