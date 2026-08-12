import { useEffect, useRef } from 'react';

const RING_TEXT = 'AI AGENTS · STATISTICS · GENOMICS · ML SYSTEMS · ';

/**
 * The hero's mathematical instrument: protractor tick rings, a slowly
 * rotating ring of discipline labels, and a rose curve r = a·cos(kθ)
 * whose petal count k drifts over time. The animation loop pauses when
 * the canvas leaves the viewport.
 */
export default function MathDial() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const ink =
      getComputedStyle(document.documentElement).getPropertyValue('--ink-rgb').trim() ||
      '233, 230, 223';
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let raf = 0;
    let running = false;
    let w = 0;
    let h = 0;
    // Start mid-drift so the reduced-motion single frame shows a full rose.
    let t = 11.8;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      w = Math.max(1, rect.width);
      h = Math.max(1, rect.height);
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = () => {
      t += 0.0038;
      ctx.clearRect(0, 0, w, h);

      const cx = w / 2;
      const cy = h / 2;
      const R = Math.min(w, h) * 0.44;

      const ring = (radius: number, alpha: number, width = 1) => {
        ctx.beginPath();
        ctx.arc(cx, cy, radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(${ink}, ${alpha})`;
        ctx.lineWidth = width;
        ctx.stroke();
      };

      ring(R, 0.55);
      ring(R * 0.9, 0.2);
      ring(R * 0.66, 0.28);
      ring(R * 0.1, 0.24);

      // Protractor ticks on the outer ring; every tenth tick is major.
      const rot = t * 0.3;
      for (let i = 0; i < 120; i++) {
        const a = rot + (i / 120) * Math.PI * 2;
        const major = i % 10 === 0;
        const r0 = R * (major ? 0.945 : 0.972);
        ctx.beginPath();
        ctx.moveTo(cx + Math.cos(a) * r0, cy + Math.sin(a) * r0);
        ctx.lineTo(cx + Math.cos(a) * R, cy + Math.sin(a) * R);
        ctx.strokeStyle = `rgba(${ink}, ${major ? 0.62 : 0.3})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // Discipline labels set on a circle, counter-rotating.
      ctx.font = '500 11px "IBM Plex Mono", ui-monospace, monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      const chars = RING_TEXT.split('');
      const textRot = -t * 0.18;
      chars.forEach((ch, i) => {
        const a = textRot + (i / chars.length) * Math.PI * 2;
        ctx.save();
        ctx.translate(cx + Math.cos(a) * R * 0.78, cy + Math.sin(a) * R * 0.78);
        ctx.rotate(a + Math.PI / 2);
        ctx.fillStyle = `rgba(${ink}, 0.68)`;
        ctx.fillText(ch, 0, 0);
        ctx.restore();
      });

      // Rose curve r = a·cos(kθ) with k drifting through [1.6, 4.4].
      const k = 3 + 1.4 * Math.sin(t * 0.5);
      const a0 = R * 0.6;
      const spin = t * 0.12;
      ctx.beginPath();
      const STEPS = 1200;
      for (let i = 0; i <= STEPS; i++) {
        const th = (i / STEPS) * Math.PI * 8;
        const rad = a0 * Math.cos(k * th);
        const x = cx + Math.cos(th + spin) * rad;
        const y = cy + Math.sin(th + spin) * rad;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.strokeStyle = `rgba(${ink}, 0.62)`;
      ctx.lineWidth = 1.15;
      ctx.stroke();

      // Center mark.
      ctx.beginPath();
      ctx.arc(cx, cy, 2, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${ink}, 0.8)`;
      ctx.fill();

      if (running && !prefersReduced) raf = window.requestAnimationFrame(draw);
    };

    const start = () => {
      if (running) return;
      running = true;
      raf = window.requestAnimationFrame(draw);
    };

    const stop = () => {
      running = false;
      window.cancelAnimationFrame(raf);
    };

    resize();
    draw();
    // Redraw the static frame once the mono font is available.
    if ('fonts' in document) {
      document.fonts.ready.then(() => {
        if (!running) draw();
      });
    }

    const visibility = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !prefersReduced) start();
      else stop();
    });
    visibility.observe(canvas);

    const sizeObserver = new ResizeObserver(() => {
      resize();
      if (!running) draw();
    });
    sizeObserver.observe(canvas);

    return () => {
      stop();
      visibility.disconnect();
      sizeObserver.disconnect();
    };
  }, []);

  return <canvas ref={canvasRef} className="math-dial" aria-hidden="true" />;
}
