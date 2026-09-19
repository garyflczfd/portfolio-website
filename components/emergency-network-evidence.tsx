'use client';

/* oxlint-disable next/no-img-element -- 案例图使用固定尺寸静态素材（与项目其他页面一致） */
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { EmergencyNetworkMap } from '@/components/emergency-network-map';
import './emergency-network-evidence.css';
import './emergency-network-evidence.map.css';

const steps = [
  { no: '01', title: '识别需求与既有保障', text: '将四类抗蛇毒血清储备医院、毒蛇出现记录与医院 POI 放在同一研究范围内；可在上方图层阅读器中独立叠加查看。' },
  { no: '02', title: '比较道路与空中路径', text: '以道路网络与空间距离计算不同运输方式的可达性，问题不是单纯“飞得更快”，而是哪些区域受既有道路服务约束。' },
  { no: '03', title: '筛选候选起飞点', text: '将高需求、道路保障较弱的医院作为重点对象，形成候选点而非直接给出运营站点。' },
  { no: '04', title: '增量最大覆盖选址', text: '在最大服务阻抗约束下，比较候选点带来的新增覆盖，得到模型推荐的起飞位置。' },
  { no: '05', title: '约束条件下规划航线', text: '将坡度、地形起伏、人口、土地利用、建筑高度与禁飞约束转成适飞性条件，再计算受约束的路径。' },
  { no: '06', title: '重新计算并验证', text: '回到距离与时间层面核验模型输出。它用于比较方案，而不是替代现场空域、气象与机构协同审核。' },
];

const weights = [
  { label: '建筑高度', value: 0.372 },
  { label: '人口密度', value: 0.249 },
  { label: '土地利用', value: 0.187 },
  { label: '地形起伏度', value: 0.119 },
  { label: '坡度', value: 0.073 },
];

export function EmergencyNetworkEvidence() {
  return <section className="emergency-evidence" aria-label="低空血清配送空间决策研究">
    <div className="emergency-intro">
      <div><p className="section-kicker">SPATIAL DECISION, NOT AN OPERATIONS MAP</p><h2>从“哪里需要”到<br /><em>“哪里可以飞”。</em></h2></div>
      <p>研究范围为杭州市主城区。页面把数据层、模型步骤与输出边界拆开呈现：模型推荐用于比较空间方案，并不代表已获批航线或已运行的配送网络。</p>
    </div>
    <Tabs defaultValue="path" className="emergency-tabs">
      <TabsList variant="line" className="emergency-tab-list" aria-label="低空血清配送研究阅读视角">
        <TabsTrigger value="path" className="emergency-trigger"><span>01</span>模型如何推演</TabsTrigger>
        <TabsTrigger value="suitability" className="emergency-trigger"><span>02</span>适飞性如何判断</TabsTrigger>
        <TabsTrigger value="output" className="emergency-trigger"><span>03</span>成果如何阅读</TabsTrigger>
      </TabsList>
      <TabsContent value="path" className="emergency-panel emergency-panel--path">
        <EmergencyNetworkMap />
        <div className="emergency-steps">
          <p className="section-kicker">MODEL PATH</p>
          <h3>每一步都在缩小<br />“可行”的含义。</h3>
          <ol>{steps.map((step) => <li key={step.no}><b>{step.no}</b><div><strong>{step.title}</strong><p>{step.text}</p></div></li>)}</ol>
        </div>
      </TabsContent>
      <TabsContent value="suitability" className="emergency-panel">
        <div className="suitability-card" aria-label="无人机适宜性评价指标权重">
          <div><p className="section-kicker">AHP WEIGHTS</p><h3>适飞性不是<br />单一距离问题。</h3></div>
          <div className="weight-list">{weights.map((weight) => <div className="weight-row" key={weight.label}><span>{weight.label}</span><i><b style={{ width: `${weight.value / 0.372 * 100}%` }} /></i><strong>{weight.value.toFixed(3)}</strong></div>)}</div>
          <p className="weight-note">模型以 AHP 组织六类适飞性条件，权重之和为 1。建筑高度权重最高；该权重体系属于研究设定，应在真实部署前结合空域规则与现场条件复核。</p>
        </div>
        <div className="emergency-copy"><p className="section-kicker">SCORING BOUNDARY</p><h3>适宜区，是模型中的通行条件，不是起飞许可。</h3><p>适宜性得分被划分为限制、低、较低、中、较高与高六档，再叠加禁飞条件与服务阻抗约束参与路径计算。它的作用是把复杂地表条件转成可比较的空间成本。</p><div className="emergency-note"><span>资料边界</span>研究使用静态空间数据，未纳入实时天气、临时空域限制、库存状态、调度能力或医院协作流程。</div></div>
      </TabsContent>
      <TabsContent value="output" className="emergency-panel">
        <figure className="route-figure"><img src="/images/serum-route-clean.webp" alt="杭州市主城区血清配送模型航线空间关系示意" /><figcaption>模型航线输出示意：以图中血清储备医院与路径关系，辅助比较空间覆盖与潜在配送方向。</figcaption></figure>
        <div className="emergency-copy"><p className="section-kicker">READING THE OUTPUT</p><h3>这是一张方案比较图，不是一张运行地图。</h3><p>输出综合了道路保障、潜在风险、候选起飞点与适飞性约束。它回答“在研究设定下，哪些方向值得优先进入下一轮评估”，不声称机构已采用、航线已获批或配送服务已发生。</p><div className="emergency-note"><span>下一步需要什么</span>若进入真实场景，需补足血清库存与调拨机制、起降场条件、飞行器性能、空域审批、应急流程及现场验证材料。</div></div>
      </TabsContent>
    </Tabs>
  </section>;
}
