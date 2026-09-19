'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const stages = [
  { value: 'site', label: '场地证据', number: '01', title: '先看场地，而不是先填业态。', text: '老街、窑山、民艺资源与居民生活构成了不同的使用条件。这里将放入踏勘照片、入口关系、坡度与现状使用记录，用来解释后续判断从何而来。', note: '待填素材：实勘照片 · 现状图 · 资源与使用者标注' },
  { value: 'team', label: '项目回应', number: '02', title: '团队方案如何回应这些条件。', text: '保留原项目的定位、功能与空间策略，并明确标注为团队方案。后续用一张总览图和一条主要轴线说明回应关系，避免把整套 PPT 缩成无法阅读的图片。', note: '待填素材：原项目总图 · 功能框架 · 团队方案摘要' },
  { value: 'personal', label: '图件与表达', number: '03', title: '让总体与节点的关系可被阅读。', text: '后续选取一段主要轴线或关键节点，依次呈现现场理解、整体与节点建模、汇报图细化。页面将说明图件材料的来源与方案边界，而不以个人职责列表代替项目叙事。', note: '待填素材：模型过程 · 节点对比 · 汇报图件' },
  { value: 'study', label: '策划深化', number: '04', title: '把空间方案补成可验证的文旅判断。', text: '作品集阶段将新增客群、竞品、产品—空间关系与轻量试运行指标；它们会被清楚标注为后续深化，不会冒充为实习时已完成的商业成果。', note: '待填素材：客群旅程 · 竞品表 · 产品卡 · 验证指标' },
];

export function PingyaoExplorer() {
  return <section className="explorer-section">
    <div className="explorer-head"><div><p className="section-kicker">PROJECT STRUCTURE</p><h2>从场地理解到<br />可验证的策划。</h2></div><p>项目材料会按这四层进入网页。读者可以快速浏览，也可以顺着证据链深入查看。</p></div>
    <Tabs defaultValue="site" className="pingyao-tabs">
      <TabsList variant="line" className="explorer-tabs-list" aria-label="瓶窑案例内容分段">
        {stages.map((stage) => <TabsTrigger value={stage.value} key={stage.value} className="explorer-trigger"><span>{stage.number}</span>{stage.label}</TabsTrigger>)}
      </TabsList>
      {stages.map((stage) => <TabsContent value={stage.value} key={stage.value} className="explorer-panel">
        <div className={`explorer-art stage-${stage.value}`} aria-hidden="true"><b>{stage.number}</b><i /><i /><i /><i /></div>
        <div className="explorer-copy"><p className="section-kicker">{stage.label}</p><h3>{stage.title}</h3><p>{stage.text}</p><div className="material-note"><span>素材位置</span>{stage.note}</div></div>
      </TabsContent>)}
    </Tabs>
  </section>;
}
