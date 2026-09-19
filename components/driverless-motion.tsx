'use client';

import { useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';

/**
 * 数字滚动：进入视口时从 0 计到目标值。
 * - 初始渲染即为终值，无 JS / reduced-motion 下始终显示终值
 * - 仅在 IntersectionObserver 回调（异步）中触发动画
 */
export function CountUp({ value, decimals = 0, duration = 900 }: { value: number; decimals?: number; duration?: number }) {
  const [display, setDisplay] = useState(value);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;
    let raf = 0;
    let fired = false;
    const io = new IntersectionObserver((entries) => {
      if (fired || !entries[0]?.isIntersecting) return;
      fired = true;
      io.disconnect();
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      const t0 = performance.now();
      const tick = (now: number) => {
        const p = Math.min(1, (now - t0) / duration);
        const eased = 1 - (1 - p) ** 3;
        setDisplay(value * eased);
        if (p < 1) raf = requestAnimationFrame(tick);
        else setDisplay(value);
      };
      setDisplay(0);
      raf = requestAnimationFrame(tick);
    }, { threshold: 0.4 });
    io.observe(el);
    return () => { io.disconnect(); if (raf) cancelAnimationFrame(raf); };
  }, [value, duration]);

  return <span ref={ref}>{display.toFixed(decimals)}</span>;
}

/**
 * 滚动揭示：首次进入视口时淡入上移。
 * - 默认可见（不添加任何类时无动画），无 JS / reduced-motion 下不隐藏
 * - 仅在允许动效时通过 classList 命令式增强
 */
export function Reveal({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    el.classList.add('reveal-armed');
    const io = new IntersectionObserver((entries) => {
      if (!entries[0]?.isIntersecting) return;
      el.classList.add('reveal-in');
      io.disconnect();
    }, { threshold: 0.12 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return <div ref={ref} className={className ? `reveal-host ${className}` : 'reveal-host'}>{children}</div>;
}
