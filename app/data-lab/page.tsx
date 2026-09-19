import Link from 'next/link';
import { HuashuFlightStory } from '@/components/huashu-flight-story';

export default function DataLabPage() {
  return <main className="data-lab-page">
    <nav className="topbar"><Link className="wordmark" href="/">JKY<span>／</span>PORTFOLIO</Link><Link className="back-link" href="/">← 返回项目列表</Link></nav>
    <HuashuFlightStory />
    <footer className="case-footer"><Link href="/">← 返回首页</Link><span>JIN KEYI · DATA LAB / 01</span></footer>
  </main>;
}
