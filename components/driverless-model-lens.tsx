'use client';

/* oxlint-disable jsx-a11y/prefer-tag-over-role -- 交互分组使用 role=group 并配合 aria-label 提供语义 */

import { Fragment, useState } from 'react';
import type { ComponentType } from 'react';
import {
  DRIVERLESS_STATS,
  EVIDENCE_LABELS,
  MODEL_EVIDENCE,
  MODEL_LENSES,
  STORY_ENTRIES,
  VARIABLE_STORY,
  type EvidenceCode,
  type ModelLens,
  type ModelResult,
} from './driverless-data';
import { IconArrowDown, IconArrowUp, IconCapability, IconCompare, IconDiagnostics, IconGrid, IconHollow, IconInCar, IconIncident, IconOutside, IconTrust } from './driverless-icons';
import './driverless-redesign.css';

const EVIDENCE_CODES: EvidenceCode[] = ['Q2', 'X1', 'X2', 'X3', 'X4'];
const MATRIX_CODES: EvidenceCode[] = ['X1', 'X2', 'X3', 'X4'];

const RAIL_SHORT: Record<EvidenceCode, string> = { Q2: '能力', X1: '车外', X2: '车内', X3: '事故', X4: '认可' };

const VARIABLE_ICON: Record<EvidenceCode, ComponentType<{ size?: number; className?: string }>> = {
  Q2: IconCapability,
  X1: IconOutside,
  X2: IconInCar,
  X3: IconIncident,
  X4: IconTrust,
};

type Tone = 'positive' | 'negative' | 'muted';

function toneOf(result: ModelResult): Tone {
  if (!result.significant) return 'muted';
  return result.estimate > 0 ? 'positive' : 'negative';
}

function signSymbol(result: ModelResult) {
  return result.estimate > 0 ? '＋' : result.estimate < 0 ? '−' : '0';
}

function valueText(result: ModelResult) {
  const sign = result.estimate > 0 ? '+' : result.estimate < 0 ? '−' : '';
  return `${result.statistic} = ${sign}${Math.abs(result.estimate).toFixed(3)}`;
}

function DirectionGlyph({ result, size = 26 }: { result: ModelResult; size?: number }) {
  if (!result.significant) return <IconHollow size={size} />;
  return result.estimate > 0 ? <IconArrowUp size={size} /> : <IconArrowDown size={size} />;
}

function compareReading(a: ModelResult, b: ModelResult) {
  const signChanged = Math.sign(a.estimate) !== Math.sign(b.estimate);
  const sigChanged = a.significant !== b.significant;
  if (signChanged) return '与上一模型相比：方向发生变化。';
  if (sigChanged) return '与上一模型相比：方向未变，显著性发生变化。';
  return '与上一模型相比：方向与显著性保持一致。';
}

function modelName(lens: ModelLens) {
  return MODEL_LENSES.find((item) => item.id === lens)?.model ?? lens;
}

/* ---------- 左侧变量选择器 ---------- */
function VariableRail({ active, onSelect }: { active: EvidenceCode; onSelect: (code: EvidenceCode) => void }) {
  return <div className="mlens-rail" role="group" aria-label="研究变量选择器">
    {EVIDENCE_CODES.map((code) => {
      const Icon = VARIABLE_ICON[code];
      const result = MODEL_EVIDENCE[code].pls;
      return <button type="button" key={code} data-tone={toneOf(result)} data-active={active === code || undefined} aria-pressed={active === code} onClick={() => onSelect(code)}>
        <span className="mlens-rail__icon"><Icon size={20} /></span>
        <span className="mlens-rail__text"><b>{code}</b><small>{RAIL_SHORT[code]}</small></span>
      </button>;
    })}
  </div>;
}

/* ---------- 模型轨道（驾驶模式切换器） ---------- */
function ModelTrack({ active, onSelect }: { active: ModelLens; onSelect: (lens: ModelLens) => void }) {
  return <div className="mlens-track" role="group" aria-label="模型视角切换">
    {MODEL_LENSES.map((lens, index) => <Fragment key={lens.id}>
      {index > 0 && <span className="mlens-track__link" aria-hidden="true" />}
      <button type="button" data-active={active === lens.id || undefined} aria-pressed={active === lens.id} onClick={() => onSelect(lens.id)}>
        <b>{lens.step}</b>
        <span>{lens.model}</span>
        <small>{lens.question}</small>
      </button>
    </Fragment>)}
  </div>;
}

/* ---------- 方向路径线 ---------- */
function DirectionPath({ code, active, onSelect }: { code: EvidenceCode; active: ModelLens; onSelect: (lens: ModelLens) => void }) {
  return <div className="mlens-path" key={`${code}-${active}`} role="group" aria-label={`${EVIDENCE_LABELS[code]} 在四种模型中的方向与显著性`}>
    {MODEL_LENSES.map((lens, index) => {
      const result = MODEL_EVIDENCE[code][lens.id];
      return <Fragment key={lens.id}>
        {index > 0 && <span className="mlens-path__link" data-tone={toneOf(result)} aria-hidden="true" />}
        <button type="button" className="mlens-path__node" data-tone={toneOf(result)} data-active={active === lens.id || undefined} aria-pressed={active === lens.id} onClick={() => onSelect(lens.id)}>
          <span>{lens.model}</span>
          <b>{signSymbol(result)}</b>
          <em>{result.significant ? '显著' : '未显著'}</em>
        </button>
      </Fragment>;
    })}
  </div>;
}

/* ---------- 主舞台 ---------- */
function LensStage({ code, lens, ghost, compact }: { code: EvidenceCode; lens: ModelLens; ghost?: { text: string; key: number } | null; compact?: boolean }) {
  const result = MODEL_EVIDENCE[code][lens];
  const tone = toneOf(result);
  return <article className="mlens-stage" data-tone={tone} data-compact={compact || undefined}>
    <header>
      <div><span>{modelName(lens)} · {code}</span><h3>{EVIDENCE_LABELS[code]}</h3></div>
      <b className="mlens-flag">{result.significant ? (result.estimate > 0 ? '显著正向' : '显著负向') : '本模型中未达到统计显著'}</b>
    </header>
    <div className="mlens-stage__value" key={`${code}-${lens}`}>
      <DirectionGlyph result={result} />
      <strong>{valueText(result)}</strong>
      {ghost && <span key={ghost.key} className="mlens-ghost" aria-hidden="true">{ghost.text}</span>}
    </div>
    <div className="mlens-stage__meta">
      <b>{result.p}</b>
      {result.rSquared !== undefined && <b>R² = {result.rSquared.toFixed(3)}</b>}
      {result.fSquared !== undefined && <b>f² = {result.fSquared < .001 ? result.fSquared.toFixed(4) : result.fSquared.toFixed(3)}</b>}
    </div>
    <p className="mlens-stage__reading" aria-live="polite">{result.reading}</p>
    {!compact && <dl className="mlens-stage__facts">
      <div><dt>模型回答</dt><dd>{MODEL_LENSES.find((item) => item.id === lens)?.question}</dd></div>
      <div><dt>计分与条件</dt><dd>{result.context}</dd></div>
      <div><dt>共线性</dt><dd>{result.vif === undefined ? '本视角不展示' : `内模型 VIF = ${result.vif.toFixed(3)}`}</dd></div>
      <div><dt>数据来源</dt><dd>{result.source}</dd></div>
    </dl>}
  </article>;
}

/* ---------- 动态解释 ---------- */
function DynamicExplanation({ code, prevLens, lens }: { code: EvidenceCode; prevLens: ModelLens | null; lens: ModelLens }) {
  const story = VARIABLE_STORY[code];
  const current = MODEL_EVIDENCE[code][lens];
  const previous = prevLens ? MODEL_EVIDENCE[code][prevLens] : null;
  return <aside className="mlens-explain" aria-live="polite">
    <header><span>动态解释</span><b data-tone={toneOf(current)}>{story.tag}</b></header>
    <div><h4>发生了什么变化</h4><p>{story.change}</p>{previous && <small>{compareReading(current, previous)}</small>}</div>
    <div><h4>为什么会变化</h4><p>{story.why}</p></div>
    <div><h4>对产品意味着什么</h4><p>{story.product}</p></div>
  </aside>;
}

/* ---------- 完整结果（20 格矩阵） ---------- */
function ConvergenceMatrix({ onSelect }: { onSelect: (code: EvidenceCode, lens: ModelLens) => void }) {
  return <section className="convergence-matrix" aria-label="跨模型方向与显著性对照">
    <div className="convergence-matrix__head" aria-hidden="true"><span>研究构念</span>{MODEL_LENSES.map((lens) => <b key={lens.id}>{lens.model}</b>)}</div>
    {MATRIX_CODES.map((code) => <div className="convergence-row" key={code}>
      <div><strong>{code}</strong><span>{EVIDENCE_LABELS[code]}</span></div>
      {MODEL_LENSES.map((lens) => {
        const result = MODEL_EVIDENCE[code][lens.id];
        return <button
          type="button"
          key={lens.id}
          data-tone={toneOf(result)}
          onClick={() => onSelect(code, lens.id)}
          aria-label={`${code}，${lens.model}，${result.estimate > 0 ? '正向' : result.estimate < 0 ? '负向' : '零方向'}，${result.significant ? '达到统计显著' : '未达到统计显著'}`}
        ><em>{lens.model}</em><b>{signSymbol(result)}</b><span>{result.significant ? '显著' : '未显著'}</span></button>;
      })}
    </div>)}
  </section>;
}

export function MeasurementQuality({ activeEvidence }: { activeEvidence: EvidenceCode }) {
  const measurement = DRIVERLESS_STATS.measurement;
  const values = Object.values(measurement.constructs);
  const range = (pick: (value: typeof values[number]) => number) => {
    const nums = values.map(pick);
    return `${Math.min(...nums).toFixed(3)}–${Math.max(...nums).toFixed(3)}`;
  };
  const headline = `四维度 Cronbach α ${range((v) => v.alpha)} · 组合信度 CR ${range((v) => v.compositeReliability)} · AVE ${range((v) => v.ave)}；最高 HTMT ${measurement.maxHtmt.toFixed(3)}（${measurement.maxHtmtPair}）· SRMR ${measurement.srmr.toFixed(3)}。`;
  return <details className="measurement-quality">
    <summary>
      <span className="measurement-quality__icon"><IconDiagnostics size={22} /></span>
      <span className="measurement-quality__title">
        <em>RELIABILITY CHECK</em>
        <strong>测量质量与模型诊断</strong>
        <small>{headline}</small>
      </span>
      <b className="measurement-quality__toggle"><span className="when-closed">展开完整指标</span><span className="when-open">收起</span></b>
    </summary>
    <div className="measurement-quality__grid">
      {(Object.entries(measurement.constructs) as [Exclude<EvidenceCode, 'Q2'>, typeof measurement.constructs.X1][]).map(([code, values2]) => <article key={code} data-active={code === activeEvidence || undefined}>
        <header><strong>{code}</strong><span>{EVIDENCE_LABELS[code]}</span></header>
        <dl><div><dt>载荷范围</dt><dd>{values2.loading}</dd></div><div><dt>Cronbach α</dt><dd>{values2.alpha.toFixed(3)}</dd></div><div><dt>复合信度 CR</dt><dd>{values2.compositeReliability.toFixed(3)}</dd></div><div><dt>AVE</dt><dd>{values2.ave.toFixed(3)}</dd></div></dl>
      </article>)}
    </div>
    <div className="measurement-quality__diagnostics"><p><span>最高 HTMT</span><b>{measurement.maxHtmt.toFixed(3)}</b><small>{measurement.maxHtmtPair}</small></p><p><span>最高内模型 VIF</span><b>{measurement.maxInnerVif.toFixed(3)}</b><small>X2 → Q24</small></p><p><span>SRMR</span><b>{measurement.srmr.toFixed(3)}</b><small>算法导出拟合摘要</small></p></div>
    <p className="measurement-quality__note">{measurement.note} 当前 SmartPLS 工作簿不含 Bootstrap 置信区间，因此网页不补造 CI。</p>
  </details>;
}

export function RobustnessStrip() {
  return <div className="robustness-strip">
    <article><span>综合指标 · PCA / PC1</span><strong>解释四维度方差 {(DRIVERLESS_STATS.pc1.explainedVariance * 100).toFixed(1)}%</strong><p>载荷均为正；PC1 → Q24：B = {DRIVERLESS_STATS.pc1.regressionB.toFixed(3)}，{DRIVERLESS_STATS.pc1.p}，ΔR² = {DRIVERLESS_STATS.pc1.deltaRSquared.toFixed(3)}。</p></article>
    <article><span>结果稳健性 · Logit</span><strong>OR = {DRIVERLESS_STATS.logit.oddsRatio.toFixed(3)} · {DRIVERLESS_STATS.logit.p}</strong><p>{DRIVERLESS_STATS.logit.outcome}。{DRIVERLESS_STATS.logit.note}</p></article>
  </div>;
}

/* ---------- 主组件 ---------- */
export function DriverlessModelLens({ activeEvidence, onEvidenceChange }: { activeEvidence: EvidenceCode; onEvidenceChange: (code: EvidenceCode) => void }) {
  const [activeLens, setActiveLens] = useState<ModelLens>('jointOls');
  const [compareLens, setCompareLens] = useState<ModelLens | null>(null);
  const [prev, setPrev] = useState<{ code: EvidenceCode; lens: ModelLens; key: number } | null>(null);

  const markPrev = () => setPrev((current) => ({ code: activeEvidence, lens: activeLens, key: (current?.key ?? 0) + 1 }));

  const selectVariable = (code: EvidenceCode) => {
    markPrev();
    onEvidenceChange(code);
  };
  const selectLens = (lens: ModelLens) => {
    markPrev();
    setActiveLens(lens);
  };
  const runStory = (entry: typeof STORY_ENTRIES[number]) => {
    markPrev();
    onEvidenceChange(entry.evidence);
    setActiveLens(entry.lens);
  };
  const selectFromMatrix = (code: EvidenceCode, lens: ModelLens) => {
    markPrev();
    onEvidenceChange(code);
    setActiveLens(lens);
  };

  const prevLens = prev && prev.code === activeEvidence ? prev.lens : null;
  const ghost = prev && prev.code === activeEvidence ? { text: valueText(MODEL_EVIDENCE[prev.code][prev.lens]), key: prev.key } : null;

  return <div className="mlens">
    <div className="mlens-stories" role="group" aria-label="快捷故事入口">
      <span className="mlens-stories__label">快捷故事</span>
      {STORY_ENTRIES.map((entry) => <button type="button" key={entry.id} data-active={(entry.evidence === activeEvidence && entry.lens === activeLens) || undefined} aria-pressed={entry.evidence === activeEvidence && entry.lens === activeLens} onClick={() => runStory(entry)}>
        <b>{entry.label}</b><small>{entry.question}</small>
      </button>)}
    </div>

    <div className="mlens-grid">
      <VariableRail active={activeEvidence} onSelect={selectVariable} />

      <div className="mlens-main">
        <ModelTrack active={activeLens} onSelect={selectLens} />
        <div className="mlens-stage-row" data-compare={compareLens && compareLens !== activeLens ? true : undefined}>
          <LensStage code={activeEvidence} lens={activeLens} ghost={ghost} />
          {compareLens && compareLens !== activeLens && <LensStage code={activeEvidence} lens={compareLens} compact />}
        </div>
        <DirectionPath code={activeEvidence} active={activeLens} onSelect={selectLens} />
        <div className="mlens-actions">
          <button type="button" className="mlens-compare" data-active={compareLens ? true : undefined} aria-pressed={Boolean(compareLens)} onClick={() => setCompareLens(compareLens ? null : activeLens)}>
            <IconCompare size={18} />{compareLens ? '取消对比' : '对比两个模型'}
          </button>
        </div>
      </div>

      <DynamicExplanation code={activeEvidence} lens={activeLens} prevLens={prevLens} />
    </div>

    <details className="mlens-fullresult">
      <summary><IconGrid size={18} />查看完整结果 · 20 格矩阵<b>方向 / 显著性</b></summary>
      <p className="mlens-fullresult__note">矩阵只比较方向与显著性，不比较大小：β（PLS 标准化路径）、B（OLS 非标准化系数）、r（Pearson 相关）、R² 与 Chow 检验回答的是不同问题，不能放进同一把标尺排名。</p>
      <ConvergenceMatrix onSelect={selectFromMatrix} />
    </details>
  </div>;
}
