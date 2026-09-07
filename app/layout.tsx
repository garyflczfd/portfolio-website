import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = { title: '金科佚｜城市空间与策略研究', description: '金科佚的文商旅前期策划、城市更新与空间决策作品集。' };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="zh-CN"><body>{children}</body></html>; }
