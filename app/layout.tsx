import type { Metadata } from 'next';
import './globals.css';
import './final-polish.css';

export const metadata: Metadata = {
  title: '金科佚｜空间策略与数据研究作品集',
  description: '以真实项目材料呈现空间分析、GIS、数据研究、策略判断与方案表达。',
  icons: { icon: '/favicon.svg' },
  openGraph: {
    type: 'website',
    title: '金科佚｜空间策略与数据研究作品集',
    description: '以真实项目材料呈现空间分析、GIS、数据研究、策略判断与方案表达。',
    images: [{ url: '/og/og-default.jpg', width: 1200, height: 630, alt: '金科佚作品集' }],
  },
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="zh-CN"><body>{children}</body></html>; }
