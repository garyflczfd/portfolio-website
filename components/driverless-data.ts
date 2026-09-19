export type EvidenceCode = 'Q2' | 'X1' | 'X2' | 'X3' | 'X4';
export type PrototypeId = 'outside' | 'in-car' | 'platform';
export type ModelLens = 'correlation' | 'singleOls' | 'jointOls' | 'pls';

export type ModelResult = {
  statistic: 'r' | 'B' | 'β';
  estimate: number;
  p: string;
  significant: boolean;
  context: string;
  reading: string;
  source: string;
  rSquared?: number;
  adjustedRSquared?: number;
  deltaRSquared?: number;
  fSquared?: number;
  vif?: number;
};

const sampleSize = 301;

export const EVIDENCE_LABELS: Record<EvidenceCode, string> = {
  Q2: '现实智驾经验分层',
  X1: '外部交互风险感知',
  X2: '车内黑箱与接管焦虑',
  X3: '事后责任认定及数据焦虑',
  X4: '信任构建有效性',
};

export const MODEL_LENSES: { id: ModelLens; step: string; question: string; model: string; coefficient: string }[] = [
  { id: 'correlation', step: '01', question: '单独是否同向变化？', model: 'Pearson 相关', coefficient: '相关系数 r' },
  { id: 'singleOls', step: '02', question: '加入基础控制后怎样？', model: '单维度 OLS', coefficient: '非标准化 B' },
  { id: 'jointOls', step: '03', question: '四个维度同时进入后？', model: '联合 OLS', coefficient: '非标准化 B' },
  { id: 'pls', step: '04', question: '潜变量结构路径怎样？', model: 'PLS-SEM', coefficient: '标准化 β' },
];

export const MODEL_EVIDENCE: Record<EvidenceCode, Record<ModelLens, ModelResult>> = {
  Q2: {
    correlation: { statistic: 'r', estimate: 0.695, p: 'p < .001', significant: true, context: 'Q2 单题有序编码与 Q24 的相关；仅作趋势参考。', reading: '车辆最高支持等级编码与托付意愿在样本内呈正相关。Q2 是类别分层，主解释仍回到四组构成与分组结果。', source: 'SmartPLS 构念得分相关矩阵' },
    singleOls: { statistic: 'B', estimate: 19.975, p: 'p < .001', significant: true, context: '控制 Q1 与 Q3；Q2 以 1–4 有序编码进入模型。', reading: '能力暴露等级编码较高者的 Q24 在样本内更高；该结果不代表使用时长导致信任提升。', source: '427问卷报告 · 表5', rSquared: 0.4858 },
    jointOls: { statistic: 'B', estimate: 19.886, p: 'p < .001', significant: true, context: 'Q1–Q3 与 X1–X4 同时进入。', reading: '在同时控制人口学变量和四个研究构念后，Q2 仍与 Q24 呈较强正向关联。', source: '427问卷报告 · 表5', rSquared: 0.5709, adjustedRSquared: 0.5606 },
    pls: { statistic: 'β', estimate: 0.691, p: 'p < .001', significant: true, context: '标准化直接路径；Q2 是直接预测变量，不是中介变量。', reading: 'Q2 是当前 PLS 模型中最强的正向样本内预测路径，但仍只代表现实能力暴露代理指标。', source: '427问卷报告 · 图1；SmartPLS 导出', rSquared: 0.5731, adjustedRSquared: 0.5629, fSquared: 1.0852, vif: 1.030 },
  },
  X1: {
    correlation: { statistic: 'r', estimate: -0.178, p: 'p = .0019', significant: true, context: 'X1 五题均值与 Q24 的 Pearson 相关。', reading: '不考虑其他构念时，外部交互风险感知越强，托付意愿越低。', source: '301 条记录复算；427问卷报告 · 表3' },
    singleOls: { statistic: 'B', estimate: -7.644, p: 'p < .001', significant: true, context: '控制 Q1–Q3；整体 R² 包含控制变量贡献。', reading: '单独加入 X1 后仍呈显著负向关系，但不能把整体 R² 全部归因于 X1。', source: '427问卷报告 · 表6', rSquared: 0.5243, deltaRSquared: 0.0385 },
    jointOls: { statistic: 'B', estimate: 1.569, p: 'p = .501', significant: false, context: 'Q1–Q3 与 X1–X4 同时进入。', reading: '与其他构念共同进入后，X1 的系数转为正向但未达到统计显著；不能解释为“促进信任”。', source: '301 条记录复算；427问卷报告 · 表5', rSquared: 0.5709, adjustedRSquared: 0.5606 },
    pls: { statistic: 'β', estimate: 0.029, p: 'p = .612', significant: false, context: '标准化直接路径；四个研究构念同时进入。', reading: 'X1 与 Q24 的总关联为负，但在同时模型中的独特路径接近零，未达到统计显著。', source: '427问卷报告 · 图1；SmartPLS 导出', rSquared: 0.5731, adjustedRSquared: 0.5629, fSquared: 0.0008, vif: 2.398 },
  },
  X2: {
    correlation: { statistic: 'r', estimate: -0.285, p: 'p < .001', significant: true, context: 'X2 五题均值与 Q24 的 Pearson 相关。', reading: '车内黑箱与接管焦虑越强，托付意愿越低。', source: '301 条记录复算；427问卷报告 · 表3' },
    singleOls: { statistic: 'B', estimate: -11.529, p: 'p < .001', significant: true, context: '控制 Q1–Q3；整体 R² 包含控制变量贡献。', reading: 'X2 单独加入控制模型后呈显著负向关系，也是四个单维度模型中绝对 B 最大的一项。', source: '427问卷报告 · 表6', rSquared: 0.5606, deltaRSquared: 0.0748 },
    jointOls: { statistic: 'B', estimate: -9.806, p: 'p < .001', significant: true, context: 'Q1–Q3 与 X1–X4 同时进入。', reading: '与其他构念同时进入后，X2 仍保留显著负向独立关联。', source: '301 条记录复算；427问卷报告 · 表5', rSquared: 0.5709, adjustedRSquared: 0.5606 },
    pls: { statistic: 'β', estimate: -0.235, p: 'p < .001', significant: true, context: '标准化直接路径；四个研究构念同时进入。', reading: 'PLS-SEM 中，X2 仍是最明确的负向独立路径，支持优先处理决策不可见与接管边界不清。', source: '427问卷报告 · 图1；SmartPLS 导出', rSquared: 0.5731, adjustedRSquared: 0.5629, fSquared: 0.0514, vif: 2.527 },
  },
  X3: {
    correlation: { statistic: 'r', estimate: -0.264, p: 'p < .001', significant: true, context: 'X3 五题均值与 Q24 的 Pearson 相关。', reading: '不考虑其他构念时，事后责任与数据焦虑越强，托付意愿越低。', source: '301 条记录复算；427问卷报告 · 表3' },
    singleOls: { statistic: 'B', estimate: -8.700, p: 'p < .001', significant: true, context: '控制 Q1–Q3；整体 R² 包含控制变量贡献。', reading: '单独加入 X3 后仍呈显著负向关系，但不能把整体 R² 全部归因于 X3。', source: '427问卷报告 · 表6', rSquared: 0.5282, deltaRSquared: 0.0424 },
    jointOls: { statistic: 'B', estimate: 0.350, p: 'p = .889', significant: false, context: 'Q1–Q3 与 X1–X4 同时进入。', reading: '与其他构念共同进入后，X3 的系数转为正向但未达到统计显著；不能据此写成正向作用。', source: '301 条记录复算；427问卷报告 · 表5', rSquared: 0.5709, adjustedRSquared: 0.5606 },
    pls: { statistic: 'β', estimate: 0.016, p: 'p = .775', significant: false, context: '标准化直接路径；四个研究构念同时进入。', reading: 'X3 与 Q24 的总关联为负，但在同时模型中的独特路径接近零，未达到统计显著。', source: '427问卷报告 · 图1；SmartPLS 导出', rSquared: 0.5731, adjustedRSquared: 0.5629, fSquared: 0.0003, vif: 2.450 },
  },
  X4: {
    correlation: { statistic: 'r', estimate: -0.215, p: 'p < .001', significant: true, context: 'X4 五题原始均值与 Q24 的 Pearson 相关。', reading: 'X4 原始分越高，代表机制认可度越低；其与托付意愿呈显著负相关。', source: '301 条记录复算；427问卷报告 · 表3' },
    singleOls: { statistic: 'B', estimate: -9.270, p: 'p < .001', significant: true, context: '控制 Q1–Q3；整体 R² 包含控制变量贡献。', reading: 'X4 单独加入控制模型后呈显著负向关系；这里沿用原始负向计分。', source: '427问卷报告 · 表6', rSquared: 0.5391, deltaRSquared: 0.0533 },
    jointOls: { statistic: 'B', estimate: -5.410, p: 'p = .010', significant: true, context: 'Q1–Q3 与 X1–X4 同时进入。', reading: '与其他构念同时进入后，X4 仍保留显著负向独立关联。', source: '301 条记录复算；427问卷报告 · 表5', rSquared: 0.5709, adjustedRSquared: 0.5606 },
    pls: { statistic: 'β', estimate: -0.136, p: 'p = .007', significant: true, context: '标准化直接路径；沿用 X4 原始负向计分。', reading: '机制越不被认可，托付意愿越低；不能把该负系数套用到反向换算后的“认可度”变量。', source: '427问卷报告 · 图1；SmartPLS 导出', rSquared: 0.5731, adjustedRSquared: 0.5629, fSquared: 0.0235, vif: 1.833 },
  },
};

export const DRIVERLESS_STATS = {
  sampleSize,
  q24: {
    label: '向自动驾驶委托驾驶的意愿',
    range: '0–100',
    direction: '高分＝托付意愿更强',
    mean: 47.49,
    median: 49,
    standardDeviation: 30.51,
    bins: [
      { label: '0–9', count: 55 },
      { label: '10–19', count: 15 },
      { label: '20–29', count: 22 },
      { label: '30–39', count: 30 },
      { label: '40–49', count: 30 },
      { label: '50–59', count: 41 },
      { label: '60–69', count: 26 },
      { label: '70–79', count: 22 },
      { label: '80–89', count: 23 },
      { label: '90–100', count: 37 },
    ].map((bin) => ({ ...bin, percent: Number((bin.count / sampleSize * 100).toFixed(1)) })),
  },
  pls: {
    model: 'PLS-SEM',
    coefficient: '标准化路径系数 β',
    rSquared: 0.5731,
    adjustedRSquared: 0.5629,
    paths: [
      { code: 'Q2' as const, beta: 0.691, p: 'p < .001', significant: true, fSquared: 1.0852, label: '现实智驾经验分层', problem: '不同能力暴露人群需要分层引导。' },
      { code: 'X1' as const, beta: 0.029, p: 'p = .612', significant: false, fSquared: 0.0008, label: '外部交互风险感知', problem: '总关联为负，但同时模型中的独特路径接近零。' },
      { code: 'X2' as const, beta: -0.235, p: 'p < .001', significant: true, fSquared: 0.0514, label: '车内黑箱与接管焦虑', problem: '决策不可见与接管边界不清。' },
      { code: 'X3' as const, beta: 0.016, p: 'p = .775', significant: false, fSquared: 0.0003, label: '事后责任认定及数据焦虑', problem: '总关联为负，但同时模型中的独特路径接近零。' },
      { code: 'X4' as const, beta: -0.136, p: 'p = .007', significant: true, fSquared: 0.0235, label: '信任构建有效性', problem: '现有机制是否真正获得认可。' },
    ],
  },
  groups: [
    { id: 1, label: '无支持／仅基础定速巡航', short: '无支持／仅巡航', count: 72, coefficient: -6.348, p: 'p < .001', rSquared: 0.398, significant: true, implication: '优先说明能力边界、道路条件和首次使用时的接管预期。' },
    { id: 2, label: 'LCC／ACC', short: 'LCC／ACC', count: 125, coefficient: -5.234, p: 'p < .001', rSquared: 0.198, significant: true, implication: '从辅助驾驶的既有心智出发，解释系统如何看、如何决策、何时接管。' },
    { id: 3, label: '高速 NOA／NGP', short: '高速 NOA', count: 39, coefficient: -1.070, p: 'p = .230', rSquared: 0.039, significant: false, implication: '本样本中未达到统计显著；后续应补充高速场景与功能预期差异。' },
    { id: 4, label: '城市 NOA', short: '城市 NOA', count: 65, coefficient: -3.785, p: 'p = .006', rSquared: 0.114, significant: true, implication: '复杂城市环境仍需更明确的异常状态、决策解释与接管提示。' },
  ].map((group) => ({ ...group, percent: Number((group.count / sampleSize * 100).toFixed(1)) })),
  pc1: {
    name: '综合焦虑因子 PC1',
    eigenvalue: 2.888,
    explainedVariance: 0.72,
    loadings: { X1: 0.515, X2: 0.513, X3: 0.503, X4: 0.467 },
    regressionB: -4.800,
    p: 'p < .001',
    rSquared: 0.5569,
    deltaRSquared: 0.0711,
    meaning: 'X1–X4 均为正向载荷（0.467–0.515）；PC1 高分表示四个构念的原始高分综合水平更高，即风险／焦虑更强或机制认可度更低。',
    model: 'PCA 构建综合指标；分组 OLS 展示非标准化 B。',
  },
  logit: {
    outcome: 'Q24 以中位数 49 二分：高托付 152 人／低托付 149 人',
    coefficient: -0.581,
    oddsRatio: 0.559,
    p: 'p < .001',
    pseudoRSquared: 0.4307,
    note: 'OR 与 Pseudo R²只作为方向稳健性证据，不与 OLS／PLS 系数或 R²共用标尺。',
  },
  measurement: {
    constructs: {
      X1: { loading: '0.704–0.908', alpha: 0.874, compositeReliability: 0.908, ave: 0.665 },
      X2: { loading: '0.770–0.822', alpha: 0.859, compositeReliability: 0.897, ave: 0.635 },
      X3: { loading: '0.733–0.844', alpha: 0.861, compositeReliability: 0.899, ave: 0.640 },
      X4: { loading: '0.717–0.833', alpha: 0.858, compositeReliability: 0.897, ave: 0.635 },
    },
    maxHtmt: 0.852,
    maxHtmtPair: 'X2 ↔ X3',
    maxInnerVif: 2.527,
    srmr: 0.050,
    note: 'HTMT 最高值低于 .90，但略高于严格的 .85 参考线；因此表述为整体可接受、X2 与 X3 接近严格阈值。',
  },
  chow: {
    model: 'Chow 组间结构差异检验',
    comparison: '无支持／仅基础定速巡航 vs 高速 NOA／NGP',
    f: 470.780,
    p: 'p < .001',
    note: '该值比较截距与斜率组成的整体回归结构，不能单独证明焦虑斜率存在调节。',
  },
  interaction: {
    model: 'Q2 × PC1 交互项回归',
    coefficient: 1.041,
    p: 'p = .111',
    significant: false,
    note: '方向与“高等级组负斜率较弱”一致，但整体交互项未达到传统显著水平。',
  },
  sources: {
    aggregates: '自动驾驶1／422.csv 与 sem完全版本.xlsx 中一致的 301 条记录，仅用于复核聚合结果',
    tables: '427问卷报告.docx（相关、OLS、PCA、分组与稳健性统计表）',
    pls: 'sem完全版本.xlsx 与 427问卷报告内嵌 PLS 图（算法表提供 β、R²、f²与测量质量；图提供三位 p 值）',
  },
} as const;

export const VARIABLES = [
  {
    code: 'X1' as const,
    name: '外部交互风险感知',
    items: 'Q4–Q8',
    meaning: '车辆在混合交通中的意图是否可见，外部风险是否可预判。',
    direction: '原始高分＝风险感知与怀疑更强',
    stage: '使用中',
    prototype: 'outside' as const,
    endpoint: '车外端',
    representative: '若系统无法提供超视距（V2X）盲区预警，您的焦虑感是？',
    product: '车外意图表达、V2X 状态广播',
    metric: '后续验证目标：意图识别正确率、首次理解时间、误解率',
  },
  {
    code: 'X2' as const,
    name: '车内黑箱与接管焦虑',
    items: 'Q9–Q13',
    meaning: '系统如何感知、为何行动、何时交还控制权是否清楚。',
    direction: '原始高分＝焦虑与拒绝程度更高',
    stage: '使用中',
    prototype: 'in-car' as const,
    endpoint: '车内端',
    representative: '系统突然变道或急刹且屏幕不给出意图解释时，对信任的破坏是？',
    product: '环境感知、决策解释、接管倒计时',
    metric: '后续验证目标：接管理解时间、状态识别率、错误接管率',
  },
  {
    code: 'X3' as const,
    name: '事后责任认定及数据焦虑',
    items: 'Q14–Q18',
    meaning: '事故数据能否对等获取、独立解释并支持责任追溯。',
    direction: '原始高分＝不公平感与数据焦虑更强',
    stage: '事故后',
    prototype: 'platform' as const,
    endpoint: '监管平台',
    representative: '个人无法获取与车企对等的底层技术证据时，您的焦虑是？',
    product: '事件时间线、数据存证、责任追溯',
    metric: '后续验证目标：证据完整率、调取时长、责任链可解释性',
  },
  {
    code: 'X4' as const,
    name: '信任构建有效性',
    items: 'Q19–Q23',
    meaning: '受访者对车内、车外和监管机制能否缓解担忧的评价。',
    direction: '原始高分＝认为机制更无效、认可度更低',
    stage: '跨阶段',
    prototype: 'in-car' as const,
    endpoint: '三端协同',
    representative: '问题指向：三端信任构建机制是否被认为有效、是否真正获得认可。',
    product: '检验三端机制是否真正获得用户认可',
    metric: '后续验证目标：机制认可度、跨端一致性、理解偏差',
  },
] as const;

export const STRATEGIES = [
  {
    code: 'Q2' as const,
    name: '分层引导与能力边界',
    evidence: '现实智驾经验分层显示不同能力暴露人群需要不同的理解起点。',
    problem: '首次接触者容易把辅助驾驶、领航辅助与完全自动驾驶混为一谈。',
    mechanism: '按车辆最高支持等级提供能力边界、适用道路与首次使用训练。',
    prototype: '系统总览与使用前引导',
    metric: '待验证：边界理解率、首次任务完成率、错误能力预期率',
  },
  {
    code: 'X1' as const,
    name: '外部意图表达',
    evidence: 'X1 题项聚焦混合交通中的意图可见性与外部风险预判。',
    problem: '行人、骑行者和旁车难以判断自动驾驶车辆准备礼让、变道还是停车。',
    mechanism: '通过 eHMI、灯语和 V2X 状态广播补足车外沟通线索。',
    prototype: '车外端概念原型',
    metric: '待验证：意图识别正确率、首次理解时间、误解率',
  },
  {
    code: 'X2' as const,
    name: '车内决策与接管解释',
    evidence: 'X2 → Q24 的 PLS-SEM 标准化路径系数为 β = -0.235。',
    problem: '系统看见了什么、为何行动、何时交还控制权不够清楚。',
    mechanism: '并置环境感知、决策解释、异常状态和分阶段接管提醒。',
    prototype: '车内端概念原型',
    metric: '待验证：接管理解时间、状态识别率、错误接管率',
  },
  {
    code: 'X3' as const,
    name: '事故证据与责任追溯',
    evidence: 'X3 题项聚焦事故后数据获取、独立解释与责任认定焦虑。',
    problem: '事故后证据获取不对等，多源数据和责任流程难以被普通用户理解。',
    mechanism: '建立事件时间线、数据存证、调取权限与责任追溯流程。',
    prototype: '监管平台概念原型',
    metric: '待验证：证据完整率、调取时长、责任链可解释性',
  },
  {
    code: 'X4' as const,
    name: '三端机制认可度评估',
    evidence: 'X4 原始高分表示认为机制更无效、认可度更低；其对 Q24 的路径为 β = -0.136。',
    problem: '机制被提供不等于机制被理解或认可，需要同时评估车内、车外与监管端。',
    mechanism: '将 X4 作为三端方案的共同评估维度，比较理解度、认可度与跨端一致性。',
    prototype: '车内端、车外端与监管平台三端概念原型',
    metric: '待验证：机制认可度、跨端一致性、理解偏差',
  },
] as const;

export const PROTOTYPES = [
  {
    id: 'in-car' as const,
    title: '车内端',
    image: '/images/driverless/prototype-in-car.webp',
    width: 1400,
    height: 1050,
    concern: '系统看见了什么、为何行动、何时需要接管不够清楚。',
    response: '把环境感知、决策链和分阶段接管提示放到同一驾驶视野中。',
    evidence: '对应 X2；X4 用于检验这类机制是否真正获得认可。',
    related: ['X2', 'X4'] as EvidenceCode[],
    hotspots: [
      { id: 'environment', no: '01', label: '环境感知', x: 31, y: 47, detail: '同步呈现车辆、行人、障碍物与道路风险。', related: ['X2', 'X4'] as EvidenceCode[] },
      { id: 'decision', no: '02', label: '决策解释', x: 56, y: 42, detail: '把感知—预测—决策—规划—控制的关系显性化。', related: ['X2', 'X4'] as EvidenceCode[] },
      { id: 'takeover', no: '03', label: '接管倒计时', x: 82, y: 29, detail: '用分阶段提示代替最后时刻的突发接管。', related: ['X2', 'X4'] as EvidenceCode[] },
    ],
  },
  {
    id: 'outside' as const,
    title: '车外端',
    image: '/images/driverless/prototype-outside.webp',
    width: 1400,
    height: 1050,
    concern: '行人、骑行者和旁车难以读取无人车的状态与行动意图。',
    response: '用 eHMI、灯语和 V2X 广播补足混合交通中的沟通线索。',
    evidence: '对应 X1；X4 用于检验机制认可度。',
    related: ['X1', 'X4'] as EvidenceCode[],
    hotspots: [
      { id: 'intent', no: '01', label: '意图表达', x: 52, y: 47, detail: '通过车身显示和灯语表达礼让、变道与停车状态。', related: ['X1', 'X4'] as EvidenceCode[] },
      { id: 'broadcast', no: '02', label: 'V2X 状态广播', x: 69, y: 73, detail: '向周边交通参与者广播智驾等级与运行状态。', related: ['X1', 'X4'] as EvidenceCode[] },
    ],
  },
  {
    id: 'platform' as const,
    title: '监管平台',
    image: '/images/driverless/prototype-platform.webp',
    width: 1400,
    height: 1050,
    concern: '事故后证据获取不对等，数据解释与责任认定缺少中立路径。',
    response: '用事件时间线、多源证据链、权限管理和责任流程支撑追溯。',
    evidence: '对应 X3；X4 用于检验三端机制的整体认可度。',
    related: ['X3', 'X4'] as EvidenceCode[],
    hotspots: [
      { id: 'timeline', no: '01', label: '事件时间线', x: 17, y: 50, detail: '把预警、接管、人工干预和碰撞节点按时间组织。', related: ['X3', 'X4'] as EvidenceCode[] },
      { id: 'evidence', no: '02', label: '数据存证', x: 55, y: 55, detail: '汇集车端、路侧、平台与第三方认证记录。', related: ['X3', 'X4'] as EvidenceCode[] },
      { id: 'liability', no: '03', label: '责任追溯', x: 82, y: 52, detail: '呈现调取权限、证据链与责任认定协作状态。', related: ['X3', 'X4'] as EvidenceCode[] },
    ],
  },
] as const;

export const RESEARCH_STEPS = ['问题界定', '问卷设计', '量表构建', '信效度检验', '相关／OLS', 'PLS-SEM／PCA', '分组与稳健性检验', '产品机制转译'];

/* =========================================================
   模型透镜（MODEL LENS）与三端联动（THREE-END STAGE）新增数据
   仅新增叙事与场景数据，不修改上述任何统计数值。
   ========================================================= */

export type PortId = 'outside' | 'inCar' | 'platform';

export const VARIABLE_STORY: Record<EvidenceCode, { tag: string; change: string; why: string; product: string }> = {
  Q2: {
    tag: '稳定证据',
    change: '从相关到 PLS，Q2 始终是最强的正向关联。',
    why: 'Q2 是类别分层（能力暴露代理），不参与四个焦虑构念的共享方差，所以换模型后方向与显著性都稳定。',
    product: '按车辆最高支持等级做分层引导与能力边界说明。',
  },
  X1: {
    tag: '方向变化',
    change: '在相关与单维度 OLS 中为显著负向；进入联合 OLS 与 PLS 后转为未达到显著。',
    why: 'X1 与其他焦虑构念共享方差；四个构念同时进入后，其独特解释被 X2、X4 吸收。',
    product: '车外意图表达仍要做，但不能只靠它证明信任提升。',
  },
  X2: {
    tag: '稳定证据',
    change: '四种模型中始终保持显著负向，是联合模型里最明确的负向独立路径。',
    why: '决策不可见与接管边界不清更接近用户的直接使用体验，独立于其他构念仍能解释意愿下降。',
    product: '优先做环境感知、决策解释与接管倒计时。',
  },
  X3: {
    tag: '方向变化',
    change: '简单关系中显著负向；与其他构念共同进入后不再显著。',
    why: 'X3 与 X2 高度相关（HTMT 接近严格阈值），独特方差被 X2 吸收。',
    product: '事后数据治理重要，但需与车内交互一起评估。',
  },
  X4: {
    tag: '机制评价',
    change: '在联合 OLS 与 PLS 中仍保留显著负向独立关联。',
    why: 'X4 测量"机制是否被认可"，与其他焦虑维度之间的独立方差较多。',
    product: '把 X4 作为三端方案的共同评估维度。',
  },
};

export const STORY_ENTRIES: { id: string; label: string; question: string; evidence: EvidenceCode; lens: ModelLens }[] = [
  { id: 'stable', label: '稳定证据', question: 'X2 为什么始终重要？', evidence: 'X2', lens: 'pls' },
  { id: 'shift', label: '方向变化', question: 'X1 为什么进入联合模型后不再显著？', evidence: 'X1', lens: 'jointOls' },
  { id: 'mechanism', label: '机制评价', question: 'X4 为什么仍保留独立关联？', evidence: 'X4', lens: 'pls' },
];

export const THREE_END_PORTS: { id: PortId; title: string; short: string; link: string }[] = [
  { id: 'outside', title: '车外端', short: '车外', link: '状态与意图' },
  { id: 'inCar', title: '车内端', short: '车内', link: '事件与证据' },
  { id: 'platform', title: '监管平台', short: '监管', link: '责任与追溯' },
];

export const STAGE_SCENARIOS: {
  id: string;
  label: string;
  evidence: EvidenceCode;
  summary: string;
  ports: Record<PortId, string>;
  mechanism: string;
  metric: string;
  board: 'in-car' | 'outside' | 'platform';
}[] = [
  {
    id: 'pre',
    label: '使用前',
    evidence: 'Q2',
    summary: '分层引导与能力边界',
    ports: {
      outside: '静态状态下不广播意图；对外重点是统一标识，让旁车知道这是智驾车辆。',
      inCar: '首次使用引导：说明当前车辆支持的能力等级、适用道路与接管责任。',
      platform: '登记车辆能力等级与适配路段，为后续运营监管建立基础档案。',
    },
    mechanism: '按车辆最高支持等级提供能力边界、适用道路与首次使用训练。',
    metric: '边界理解率 · 首次任务完成率 · 错误能力预期率',
    board: 'in-car',
  },
  {
    id: 'drive',
    label: '正常行驶',
    evidence: 'X1',
    summary: '车外意图表达与状态同步',
    ports: {
      outside: 'eHMI 灯语与 V2X 状态广播，向行人与旁车表达礼让、变道、停靠意图。',
      inCar: '同步显示系统当前感知与行驶状态，让驾驶者与系统保持同一认知。',
      platform: '汇聚多车与路侧数据，补充超视距路况与风险预警。',
    },
    mechanism: '通过 eHMI、灯语和 V2X 状态广播补足车外沟通线索。',
    metric: '意图识别正确率 · 首次理解时间 · 误解率',
    board: 'outside',
  },
  {
    id: 'takeover',
    label: '异常接管',
    evidence: 'X2',
    summary: '决策解释与接管倒计时',
    ports: {
      outside: '车辆减速或靠边时持续对外表达状态，避免旁车误判。',
      inCar: '并置环境感知、决策解释与分阶段接管提醒，避免最后时刻的突发接管。',
      platform: '监测异常事件并记录接管前后状态，为复盘提供数据。',
    },
    mechanism: '并置环境感知、决策解释、异常状态和分阶段接管提醒。',
    metric: '接管理解时间 · 状态识别率 · 错误接管率',
    board: 'in-car',
  },
  {
    id: 'incident',
    label: '事故后',
    evidence: 'X3',
    summary: '事件时间线与责任追溯',
    ports: {
      outside: '记录周边交通参与者与路侧感知数据，还原事故场景。',
      inCar: '车端数据记录系统（DSSAD）保存接管与碰撞前后的原始数据。',
      platform: '事件时间线、多源证据链、调取权限与责任追溯流程。',
    },
    mechanism: '建立事件时间线、数据存证、调取权限与责任追溯流程。',
    metric: '证据完整率 · 调取时长 · 责任链可解释性',
    board: 'platform',
  },
];

export const X4_LAYER_NOTE = 'X4 作为跨阶段评价层：无论哪个阶段、哪个端口，都要评估机制是否被理解、被认可。';

/* =========================================================
   多方立场（访谈层）：内容逐句取自《4.15访谈汇总》原始文档
   来源文件：G:\大学\...\调研报告\访谈\4.15访谈汇总看这个就好.docx
   ========================================================= */

export const INTERVIEW_SPECTRUM = { left: '单车智能', right: '系统协同' };

export const INTERVIEW_STANCES: {
  id: string;
  org: string;
  role: string;
  position: string;
  quote: string;
  weight: number;
}[] = [
  {
    id: 'youjia',
    org: '佑驾（智能驾驶系统生产基地）',
    role: '生产基地总经理',
    position: '普及最终依靠单车智能',
    quote: '自动驾驶的决策权与最终的安全责任归属不可能交由路侧承担……实现自动驾驶的普及最终必然依靠单车智能。',
    weight: 8,
  },
  {
    id: 'mogo',
    org: '蘑菇车联',
    role: '运营总监',
    position: '技术是根本，盲区需协同兜底',
    quote: '如果存在盲区，自驾系统应试图调用车路协同的数据，若没有车路协同的数据，则应该采取降速行驶或靠边停车等人工介入。',
    weight: 52,
  },
  {
    id: 'zeekr',
    org: '极氪 / 领克（吉利控股）',
    role: '销售公司总经理',
    position: '单车智能 + 车路云协同（双轨）',
    quote: '我们认同“单车智能是基础，但并非万能”……坚持“单车智能+车路云协同”双轨路线。',
    weight: 88,
  },
];

export const INTERVIEW_CONSENSUS = {
  quote: '车路云平台并非单车智能的锦上添花，而是未来高阶自动驾驶必不可少的安全底座与能力基石。',
  speakers: '桐乡车路云云控中心技术负责人 · 桐乡市公安局交通管理大队',
  note: '平台与交警在“车路云是高阶自动驾驶的安全底座”上形成共识。',
};

export const TONGXIANG_FACTS: { label: string; value: string }[] = [
  { label: '平台累计运行里程', value: '超 35 万公里' },
  { label: '自动驾驶时长', value: '4.7 万小时' },
  { label: '无人小巴单车里程', value: '超 1100 公里' },
];

export const TONGXIANG_ASOF = '截至 2026-03-20';

export const INTERVIEW_SOURCE = '访谈来源：《4.15访谈汇总》（桐乡车路云平台、佑驾、蘑菇车联、极氪）';


