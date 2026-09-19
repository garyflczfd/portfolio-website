'use client';

import { useEffect, useRef } from 'react';

const columns = 44;
const rows = 22;
const elevationSample = 'LzAzMicWDQoKCwwMDgwEAAUJBAEEDxsxSl1bSjkvNEZcbWpbWF5cW2RtfI4wKy0xKx8VDggGBgUGBwQDCAsFAgcSHzdRXVM8Ky09U2VoWUtLUlFOVWBygDMqJyosKB4UCwcEAgIEBAQJCwUCCRYkPVNRPiojMktjb2NNQkJGS0hIU2ZuNSwmJissJRsSDQgDAQECBQgKBQMMHCxETz8oHSY/W3F1XUQ4NzxCQD5FUVY1LSgnKCkoJB4YEAcCAAEFBwcEAwwdLkJELhsbLkxlc2xSOi8uMDQ0NTc+RTcyLywmIyYqLCcaDAUDBAUHBwUECRUiMC8eFyE4U2NgUj8uKCcmKSsuMjtHNTU1MichICUuMSMPBwkMDQ0MCwkIDBIaHBcbLkZXVkU2KiMhISMlKC41P04sLzQxJh0YGiIrJhQOEhgaGhscGBALCg4SGCdBV1hGMSIdHB4iJyktNTpASyQmLCofFxISFR0fGRcdIyYnLjMuIRMMCg0bNFFfUDYjGhgaICo0NzhAQ0JGICAhHBYTERAQEhUWGR0hIyo3Q0IyHhIKCxs3UVI6JRsXGCAsPEtMSE5RS0cdGRYUFBMTEA8ODhASFBYWHyw6RTwjFAoJFCc0LB4YFhklNklca2pgYWVeURoWFBUWGBYSEBAPDhAQDw4SGyczKxYLCAgNFRcUEhIWIjdOYHGAhXt1enhpGhcXGBobGBQTExISExMQDg4QGSMdDgcIDRMVEhAPERgoQE9bboWTj4qNj4MbGhkbHh4aFxcXFxYXFxUUEg8RFRMKCRAdJCIaEg8SGSc4Q1JqhJicnqOlmB0dHB0gIR4dHx8dHBsbHCEeFBAQDw4RITg/OSgYERMYIiw3TGeBlaGuvL6tIiQhHyImJSosKiknJSIpNTAfFhMTFh84VFhLMRoSFBkfJzJGXnWNpb3S1MArLSYiJisvNzs7OjkxLDZIQi4hGhohL01iXEcsGRMUGR8mMD9SaoetzuTk0DQzKiUpLzhETlFPSjw0Q1VOOisiJTBBWGBPNyQYExUZHyk2RFZvkLna8O/gOzUsKi0yQFNhZ19TQDlMX1lGODE4R1RhWEEuIhkTFBkgLkFWbIWkxuHy9u49NC8xMzdJYHJ1aFI+P1RsbFpNTlhlbGpXPi8lGxQVGiIySGWEn7vS4ejv9z40NTs/Q1NsfHxpTz9FW3iBdmxweoKCd2RLOy4fFxccJDRKaY6wytbX1N30Qj1GTlRdaXiEfmpRSFNsipiVk5OUlo+EeGhVPygcGh4oOE5pjK7Av7a4yuE=';

function decodeHeights() {
  const raw = atob(elevationSample);
  return Uint8Array.from(raw, (character) => character.charCodeAt(0));
}

export function HuashuDemSurface() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rotationRef = useRef(-0.36);
  const elevationRef = useRef(1);
  const dragRef = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');
    if (!canvas || !context) return;
    const heights = decodeHeights();
    let frame = 0;
    const draw = () => {
      const bounds = canvas.getBoundingClientRect();
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.max(1, Math.round(bounds.width * ratio));
      canvas.height = Math.max(1, Math.round(bounds.height * ratio));
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      context.clearRect(0, 0, bounds.width, bounds.height);
      context.fillStyle = '#b7d0c4';
      context.fillRect(0, 0, bounds.width, bounds.height);
      const scale = Math.min(bounds.width / 46, bounds.height / 21) * 1.08;
      const cosine = Math.cos(rotationRef.current);
      const sine = Math.sin(rotationRef.current);
      const project = (x: number, y: number, height: number) => {
        const horizontal = x - columns / 2;
        const vertical = y - rows / 2;
        return {
          x: bounds.width / 2 + (horizontal * cosine - vertical * sine) * scale,
          y: bounds.height * .65 + (horizontal * sine + vertical * cosine) * scale * .43 - height / 255 * scale * 5.2 * elevationRef.current,
        };
      };
      const cells: { x: number; y: number; depth: number }[] = [];
      for (let y = 0; y < rows - 1; y += 1) for (let x = 0; x < columns - 1; x += 1) cells.push({ x, y, depth: y * cosine + x * sine });
      cells.sort((a, b) => a.depth - b.depth);
      context.lineWidth = .45;
      cells.forEach(({ x, y }) => {
        const a = heights[y * columns + x];
        const b = heights[y * columns + x + 1];
        const c = heights[(y + 1) * columns + x + 1];
        const d = heights[(y + 1) * columns + x];
        const mean = (a + b + c + d) / 4;
        const p1 = project(x, y, a); const p2 = project(x + 1, y, b); const p3 = project(x + 1, y + 1, c); const p4 = project(x, y + 1, d);
        context.beginPath(); context.moveTo(p1.x, p1.y); context.lineTo(p2.x, p2.y); context.lineTo(p3.x, p3.y); context.lineTo(p4.x, p4.y); context.closePath();
        context.fillStyle = `hsl(${166 - mean * .24} ${25 + mean * .13}% ${81 - mean * .27}%)`;
        context.fill(); context.strokeStyle = 'rgba(18,65,57,.23)'; context.stroke();
      });
      context.fillStyle = 'rgba(18,65,57,.85)'; context.font = '700 10px "Microsoft YaHei", "微软雅黑", Arial, sans-serif'; context.fillText('拖拽旋转 / DEM 55—334m', 18, 27);
      context.fillStyle = 'rgba(18,65,57,.65)'; context.font = '10px "Microsoft YaHei", "微软雅黑", Arial, sans-serif'; context.fillText('桦树 / 44 × 22 网页抽样', 18, bounds.height - 18);
      frame = 0;
    };
    const requestDraw = () => { if (!frame) frame = window.requestAnimationFrame(draw); };
    const resizeObserver = new ResizeObserver(requestDraw); resizeObserver.observe(canvas); requestDraw();
    const onMove = (event: PointerEvent) => {
      if (!dragRef.current) return;
      rotationRef.current += (event.clientX - dragRef.current.x) * .012;
      elevationRef.current = Math.max(.6, Math.min(1.55, elevationRef.current - (event.clientY - dragRef.current.y) * .007));
      dragRef.current = { x: event.clientX, y: event.clientY }; requestDraw();
    };
    const onUp = () => { dragRef.current = null; };
    canvas.addEventListener('pointermove', onMove); window.addEventListener('pointerup', onUp);
    return () => { resizeObserver.disconnect(); canvas.removeEventListener('pointermove', onMove); window.removeEventListener('pointerup', onUp); if (frame) window.cancelAnimationFrame(frame); };
  }, []);

  return <div className="dem-surface"><canvas ref={canvasRef} onPointerDown={(event) => { dragRef.current = { x: event.clientX, y: event.clientY }; event.currentTarget.setPointerCapture(event.pointerId); }} aria-label="可拖拽旋转的桦树 DEM 三维地形" /></div>;
}
