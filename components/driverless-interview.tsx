'use client';

/* oxlint-disable jsx-a11y/prefer-tag-over-role -- 立场光谱使用 role=group 并配合 aria-label 提供语义 */

import { useState } from 'react';
import {
  INTERVIEW_CONSENSUS,
  INTERVIEW_SOURCE,
  INTERVIEW_SPECTRUM,
  INTERVIEW_STANCES,
  TONGXIANG_ASOF,
  TONGXIANG_FACTS,
} from './driverless-data';
import './driverless-redesign.css';

export function DriverlessInterview() {
  const [activeId, setActiveId] = useState(INTERVIEW_STANCES[1].id);

  return <div className="interview">
    <div className="interview-spectrum" role="group" aria-label={`车企立场光谱：${INTERVIEW_SPECTRUM.left} 到 ${INTERVIEW_SPECTRUM.right}`}>
      <span className="interview-spectrum__end">{INTERVIEW_SPECTRUM.left}</span>
      <div className="interview-spectrum__axis">
        <i aria-hidden="true" />
        {INTERVIEW_STANCES.map((stance) => <button
          type="button"
          key={stance.id}
          className="interview-spectrum__dot"
          style={{ left: `${stance.weight}%` }}
          data-active={stance.id === activeId || undefined}
          aria-pressed={stance.id === activeId}
          aria-label={`${stance.org}：${stance.position}`}
          onClick={() => setActiveId(stance.id)}
          onFocus={() => setActiveId(stance.id)}
        ><b />{stance.org}</button>)}
      </div>
      <span className="interview-spectrum__end">{INTERVIEW_SPECTRUM.right}</span>
    </div>

    <div className="interview-grid">
      {INTERVIEW_STANCES.map((stance) => <article key={stance.id} className="interview-card" data-active={stance.id === activeId || undefined}>
        <button type="button" aria-pressed={stance.id === activeId} onClick={() => setActiveId(stance.id)} onFocus={() => setActiveId(stance.id)}>
          <span>{stance.org}</span>
          <strong>{stance.position}</strong>
        </button>
        <blockquote>{stance.quote}</blockquote>
        <small>{stance.role}</small>
      </article>)}
    </div>

    <blockquote className="interview-consensus">
      <p>{INTERVIEW_CONSENSUS.quote}</p>
      <footer><b>{INTERVIEW_CONSENSUS.speakers}</b><span>{INTERVIEW_CONSENSUS.note}</span></footer>
    </blockquote>

    <div className="interview-reality">
      <span className="interview-reality__label">现实参照 · 桐乡车路云平台</span>
      <ul>{TONGXIANG_FACTS.map((fact) => <li key={fact.label}><b>{fact.value}</b><span>{fact.label}</span></li>)}</ul>
      <p>{TONGXIANG_ASOF}；{INTERVIEW_SOURCE}</p>
    </div>
  </div>;
}
