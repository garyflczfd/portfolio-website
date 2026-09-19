'use client';

/* oxlint-disable next/no-img-element, jsx-a11y/prefer-tag-over-role -- 概念板弹层复用原生 img 与 dialog 语义 */

import { useState } from 'react';
import {
  EVIDENCE_LABELS,
  PROTOTYPES,
  STAGE_SCENARIOS,
  THREE_END_PORTS,
  X4_LAYER_NOTE,
  type EvidenceCode,
  type PortId,
} from './driverless-data';
import { IconCheck, IconHollow } from './driverless-icons';
import './driverless-redesign.css';

const STAGE_PRIMARY_PORT: Record<string, PortId> = { pre: 'inCar', drive: 'outside', takeover: 'inCar', incident: 'platform' };

function stageForEvidence(code: EvidenceCode) {
  if (code === 'Q2') return 'pre';
  if (code === 'X1') return 'drive';
  if (code === 'X2') return 'takeover';
  if (code === 'X3') return 'incident';
  return null;
}

export function DriverlessThreeEnd({ activeEvidence, onEvidenceChange }: { activeEvidence: EvidenceCode; onEvidenceChange: (code: EvidenceCode) => void }) {
  const [activePort, setActivePort] = useState<PortId>('inCar');
  const [board, setBoard] = useState<'in-car' | 'outside' | 'platform' | null>(null);

  const activeStage = stageForEvidence(activeEvidence) ?? 'takeover';
  const stage = STAGE_SCENARIOS.find((item) => item.id === activeStage) ?? STAGE_SCENARIOS[2];
  const primaryPort = STAGE_PRIMARY_PORT[stage.id] ?? 'inCar';
  const x4Active = activeEvidence === 'X4';
  const boardPrototype = board ? PROTOTYPES.find((item) => item.id === board) : null;


  return <div className="threeend">
    <ol className="threeend-timeline" aria-label="场景时间线">
      {STAGE_SCENARIOS.map((item, index) => <li key={item.id}>
        {index > 0 && <span className="threeend-timeline__link" aria-hidden="true" />}
        <button type="button" data-active={item.id === activeStage || undefined} aria-pressed={item.id === activeStage} onClick={() => onEvidenceChange(item.evidence)}>
          <b>{String(index + 1).padStart(2, '0')}</b>
          <span>{item.label}</span>
          <small>{item.evidence} · {EVIDENCE_LABELS[item.evidence]}</small>
        </button>
      </li>)}
    </ol>

    <div className="threeend-layout">
      <div className="threeend-system" data-primary={primaryPort}>
        <div className="threeend-links" aria-hidden="true">
          <span>{THREE_END_PORTS[0].link}</span>
          <i />
          <span>{THREE_END_PORTS[1].link}</span>
          <i />
          <span>{THREE_END_PORTS[2].link}</span>
        </div>
        <div className="threeend-ports" key={stage.id}>
          {THREE_END_PORTS.map((port) => {
            const isPrimary = port.id === primaryPort;
            return <article key={port.id} className="threeend-port" data-primary={isPrimary || undefined} data-open={port.id === activePort || undefined}>
              <button type="button" className="threeend-port__head" aria-pressed={port.id === activePort} onClick={() => setActivePort(port.id)}>
                <span>{isPrimary ? <IconCheck size={16} /> : <IconHollow size={16} />}</span>
                <strong>{port.title}</strong>
                <small>{isPrimary ? '本阶段主要变化' : '同步状态'}</small>
              </button>
              <p>{stage.ports[port.id]}</p>
            </article>;
          })}
        </div>
        <p className="threeend-layer" data-active={x4Active || undefined}><b>X4 跨阶段评价层</b>{X4_LAYER_NOTE.replace('X4 作为跨阶段评价层：', '')}</p>
      </div>

      <aside className="threeend-info">
        <div className="threeend-info__block">
          <span>当前研究证据</span>
          <b>{stage.evidence} · {EVIDENCE_LABELS[stage.evidence]}</b>
          <p>{stage.summary}</p>
        </div>
        <div className="threeend-info__block">
          <span>对应产品机制</span>
          <p>{stage.mechanism}</p>
        </div>
        <div className="threeend-info__block">
          <span>待验证指标</span>
          <p>{stage.metric}</p>
        </div>
        <button type="button" className="threeend-board" onClick={() => setBoard(stage.board)}>查看原始概念板 · {PROTOTYPES.find((item) => item.id === stage.board)?.title}</button>
      </aside>
    </div>

    <p className="threeend-mobile-hint">窄屏下：先选场景，再切换端口；未展开的两个端口会显示同步状态。</p>

    {/* oxlint-disable jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions -- 弹层：点击背景关闭；ESC 与关闭按钮提供键盘路径 */}
    {boardPrototype && (
      <div className="threeend-board-modal" role="dialog" aria-modal="true" aria-label={`${boardPrototype.title}原始概念板`} onClick={() => setBoard(null)} onKeyDown={(event) => { if (event.key === 'Escape') setBoard(null); }}>
        <button type="button" className="threeend-board-modal__close" onClick={() => setBoard(null)} aria-label="关闭">×</button>
        <figure onClick={(event) => event.stopPropagation()}>
          <img src={boardPrototype.image} srcSet={`${boardPrototype.image.replace('.webp', '-2x.webp')} 2x`} width={boardPrototype.width} height={boardPrototype.height} alt={`${boardPrototype.title} 原始概念板，界面数据为模拟演示`} />
          <figcaption>{boardPrototype.title}｜界面数据为模拟演示</figcaption>
        </figure>
      </div>
    )}
    {/* oxlint-enable jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions */}
  </div>;
}
