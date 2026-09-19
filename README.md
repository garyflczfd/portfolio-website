# 金科佚 · 求职作品集网站

以真实项目材料呈现空间分析、GIS、数据研究、策略判断与方案表达的个人求职作品集。

公开案例：

1. 岱东镇超果禅寺及周边片区 —— 文旅场景策划 / 空间叙事
2. 自动驾驶信任机制研究 —— 量化研究 / 产品策略（项目获 WUPENICITY 2026 一等奖，第二作者）
3. 低空血清应急配送网络 —— GIS 空间决策研究
4. 桦树无人机遥感影测 —— 乡村空间 / 遥感影测

## 技术栈

- React 19 / Vinext（Vite 构建的 Next 兼容框架）/ TypeScript
- pnpm 管理依赖，oxlint 检查，静态导出（`output: export`，全路由预渲染）

## 本地开发

要求 Node.js ≥ 22.13：

```bash
pnpm install
pnpm dev      # 本地预览 http://localhost:3000
pnpm build    # 构建并预渲染全部路由
pnpm lint     # oxlint 检查
```

## 目录结构

- `app/` —— 路由与页面（首页 / 项目索引 / 案例详情 / 方法 / 关于 / data-lab）
- `components/` —— 案例组件（`driverless-*` 为自动驾驶案例页）、通用 UI（`components/ui`）
- `lib/portfolio.ts` —— 项目的唯一索引（slug、封面、阶段、可公开性）
- `public/images/` —— 全部为 webp（新闻截图、概念板等）；社交分享图在 `public/og/`

## 部署提示

- 静态导出，可直接部署到 Cloudflare Pages
- **上线前**把 `app/layout.tsx` 中的 `metadataBase` 设为真实域名，否则社交分享图（og:image）会指向 localhost

## 内容声明

- 页面只呈现可公开、可回看的项目材料；方案类内容明确标注"项目方向 / 未实施"，研究类内容区分模型结果与实际运营
- 自动驾驶案例：第二作者，独立完成问卷设计与全部统计建模，主责量化分析；研究证据重组、网页信息架构与交互可视化由本人设计实现
