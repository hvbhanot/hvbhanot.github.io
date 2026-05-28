import { useEffect, useRef } from 'react';

type Node = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  /** generation counter; drives the occasional "mutation" event */
  clock: number;
  next: number;
  mut: boolean;
  pulse: number;
};

/**
 * A live "forward-time population" field: nodes drift, occasionally mutate
 * (flash vermilion), and link by hairlines into a phylogenetic-style network.
 * A direct visual nod to the SLiM evolutionary-simulation research.
 */
export default function GenerativeField({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const css = getComputedStyle(document.documentElement);
    const ink = css.getPropertyValue('--ink').trim() || '#1a1813';
    const accent = css.getPropertyValue('--accent').trim() || '#e0401d';
    const data = css.getPropertyValue('--data').trim() || '#1f6f6b';

    let w = 0;
    let h = 0;
    let nodes: Node[] = [];
    let raf = 0;
    const mouse = { x: -9999, y: -9999 };
    const LINK = 116;

    const rand = (a: number, b: number) => a + Math.random() * (b - a);

    const spawn = (): Node => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: rand(-0.22, 0.22),
      vy: rand(-0.22, 0.22),
      clock: 0,
      next: rand(120, 460),
      mut: Math.random() < 0.14,
      pulse: 0,
    });

    const init = () => {
      const count = Math.max(18, Math.min(70, Math.round((w * h) / 9200)));
      nodes = Array.from({ length: count }, spawn);
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      w = Math.max(1, rect.width);
      h = Math.max(1, rect.height);
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      init();
    };

    const hexToRgb = (hex: string) => {
      const m = hex.replace('#', '');
      const v = m.length === 3 ? m.split('').map((c) => c + c).join('') : m;
      const n = parseInt(v, 16);
      return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
    };
    const inkRgb = hexToRgb(ink);
    const accentRgb = hexToRgb(accent);
    const dataRgb = hexToRgb(data);
    const rgba = (c: number[], a: number) => `rgba(${c[0]},${c[1]},${c[2]},${a})`;

    const render = (animate: boolean) => {
      ctx.clearRect(0, 0, w, h);

      // links first
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d = Math.hypot(dx, dy);
          if (d < LINK) {
            const t = 1 - d / LINK;
            const active = a.mut || b.mut;
            ctx.strokeStyle = active
              ? rgba(accentRgb, 0.16 * t)
              : rgba(inkRgb, 0.12 * t);
            ctx.lineWidth = active ? 1 : 0.75;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      // nodes
      for (const n of nodes) {
        if (animate) {
          n.x += n.vx;
          n.y += n.vy;
          n.clock += 1;

          // gentle attraction toward cursor
          const dx = mouse.x - n.x;
          const dy = mouse.y - n.y;
          const md = Math.hypot(dx, dy);
          if (md < 170 && md > 0.5) {
            const f = (1 - md / 170) * 0.05;
            n.vx += (dx / md) * f;
            n.vy += (dy / md) * f;
          }

          // damp + clamp velocity
          n.vx *= 0.99;
          n.vy *= 0.99;
          const sp = Math.hypot(n.vx, n.vy);
          if (sp > 0.6) {
            n.vx = (n.vx / sp) * 0.6;
            n.vy = (n.vy / sp) * 0.6;
          }

          // wrap edges
          if (n.x < -10) n.x = w + 10;
          if (n.x > w + 10) n.x = -10;
          if (n.y < -10) n.y = h + 10;
          if (n.y > h + 10) n.y = -10;

          // mutation event
          if (n.clock > n.next) {
            n.clock = 0;
            n.next = rand(160, 520);
            n.mut = Math.random() < 0.5;
            n.pulse = 1;
          }
          if (n.pulse > 0) n.pulse = Math.max(0, n.pulse - 0.02);
        }

        if (n.mut) {
          // pulse ring
          if (n.pulse > 0) {
            ctx.beginPath();
            ctx.arc(n.x, n.y, 4 + (1 - n.pulse) * 12, 0, Math.PI * 2);
            ctx.strokeStyle = rgba(accentRgb, n.pulse * 0.4);
            ctx.lineWidth = 1;
            ctx.stroke();
          }
          ctx.beginPath();
          ctx.arc(n.x, n.y, 2.4, 0, Math.PI * 2);
          ctx.fillStyle = rgba(accentRgb, 0.95);
          ctx.fill();
        } else {
          ctx.beginPath();
          ctx.arc(n.x, n.y, 1.5, 0, Math.PI * 2);
          ctx.fillStyle = rgba(inkRgb, 0.5);
          ctx.fill();
        }
      }

      // a couple of "data" markers to add the secondary hue
      if (nodes.length > 4) {
        for (const idx of [1, Math.floor(nodes.length / 2)]) {
          const n = nodes[idx];
          if (n && !n.mut) {
            ctx.beginPath();
            ctx.arc(n.x, n.y, 2, 0, Math.PI * 2);
            ctx.fillStyle = rgba(dataRgb, 0.8);
            ctx.fill();
          }
        }
      }
    };

    const loop = () => {
      render(true);
      raf = requestAnimationFrame(loop);
    };

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    const onLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    if (reduce) {
      render(false);
    } else {
      canvas.addEventListener('mousemove', onMove);
      canvas.addEventListener('mouseleave', onLeave);
      raf = requestAnimationFrame(loop);
    }

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      canvas.removeEventListener('mousemove', onMove);
      canvas.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
}
