import type { ComponentType } from 'react';
import {
  Archive,
  ArrowDown,
  ArrowUp,
  BookOpen,
  Boxes,
  Calculator,
  ChartLine,
  Check,
  CircleDashed,
  ClipboardList,
  Columns2,
  EyeOff,
  FileClock,
  Gauge,
  Grid2x2,
  Layers,
  RadioTower,
  Route,
  ScanEye,
  ScrollText,
  ShieldCheck,
  Target,
  TrendingUp,
  TriangleAlert,
  Users,
  type LucideProps,
} from 'lucide-react';

/*
 * 图标来源：Lucide（lucide-react，ISC 许可）
 * - 线性风格、24×24 viewBox、currentColor 单色、strokeWidth 1.75
 * - 组件名保持不变，便于后续按 D9 用 iconfont.cn 图标无缝替换
 * 清单：IconCapability=Layers｜IconOutside=RadioTower｜IconInCar=ScanEye
 *      IconIncident=FileClock｜IconTrust=ShieldCheck｜IconCompare=Columns2
 *      IconGrid=Grid2x2｜IconArrowUp/Down｜IconHollow=CircleDashed
 *      IconDiagnostics=Gauge｜IconCheck=Check｜IconLayers=Layers
 *      第四轮新增：IconTarget｜IconRoute｜IconChartLine｜IconUsers｜IconArchive
 *      IconClipboardList｜IconCalculator｜IconBoxes｜IconTrendingUp
 *      IconTriangleAlert｜IconEyeOff｜IconBookOpen｜IconScrollText
 */

type IconProps = { size?: number; className?: string };

function make(Icon: ComponentType<LucideProps>, name: string) {
  function Wrapped({ size = 22, className }: IconProps) {
    return <Icon size={size} className={className} strokeWidth={1.75} aria-hidden />;
  }
  Wrapped.displayName = name;
  return Wrapped;
}

export const IconCapability = make(Layers, 'IconCapability');
export const IconOutside = make(RadioTower, 'IconOutside');
export const IconInCar = make(ScanEye, 'IconInCar');
export const IconIncident = make(FileClock, 'IconIncident');
export const IconTrust = make(ShieldCheck, 'IconTrust');
export const IconCompare = make(Columns2, 'IconCompare');
export const IconGrid = make(Grid2x2, 'IconGrid');
export const IconArrowUp = make(ArrowUp, 'IconArrowUp');
export const IconArrowDown = make(ArrowDown, 'IconArrowDown');
export const IconHollow = make(CircleDashed, 'IconHollow');
export const IconDiagnostics = make(Gauge, 'IconDiagnostics');
export const IconCheck = make(Check, 'IconCheck');
export const IconLayers = make(Layers, 'IconLayers');
export const IconTarget = make(Target, 'IconTarget');
export const IconRoute = make(Route, 'IconRoute');
export const IconChartLine = make(ChartLine, 'IconChartLine');
export const IconUsers = make(Users, 'IconUsers');
export const IconArchive = make(Archive, 'IconArchive');
export const IconClipboardList = make(ClipboardList, 'IconClipboardList');
export const IconCalculator = make(Calculator, 'IconCalculator');
export const IconBoxes = make(Boxes, 'IconBoxes');
export const IconTrendingUp = make(TrendingUp, 'IconTrendingUp');
export const IconTriangleAlert = make(TriangleAlert, 'IconTriangleAlert');
export const IconEyeOff = make(EyeOff, 'IconEyeOff');
export const IconBookOpen = make(BookOpen, 'IconBookOpen');
export const IconScrollText = make(ScrollText, 'IconScrollText');
