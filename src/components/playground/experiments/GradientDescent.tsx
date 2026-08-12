import { useEffect, useRef, useState } from 'react';
import { mulberry32 } from '../../../lib/rng';
import { acquireLock, releaseLock } from '../../../lib/canvas/animationLock';
import { readColors } from '../../../lib/canvas/useCanvasLifecycle';

type LossKind = 'quadratic' | 'rosenbrock-lite';

function grad(loss: LossKind, x: number, y: number): [number, number] {
  if (loss === 'quadratic') return [2 * x, 6 * y];
  // Rosenbrock-lite: (1-x)^2 + 25(y-x^2)^2
  const gx = -2 * (1 - x) - 100 * x * (y - x * x);
  const gy = 50 * (y - x * x);
  return [gx, gy];
}

function J(loss: LossKind, x: number, y: number): number {
  if (loss === 'quadratic') return x * x + 3 * y * y;
  return (1 - x) ** 2 + 25 * (y - x * x) ** 2;
}

export default function GradientDescent() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [loss, setLoss] = useState<LossKind>('quadratic');
  const [eta, setEta] = useState(0.05);
  const [seed, setSeed] = useState(42);
  const [playing, setPlaying] = useState(false);
  const [pos, setPos] = useState(() => ({ x: 0.9, y: 0.7, t: 0 }));
  const trailRef = useRef<[number, number][]>([[0.9, 0.7]]);

  const summary = `step ${pos.t}; θ=(${pos.x.toFixed(3)}, ${pos.y.toFixed(3)}); J=${J(loss, pos.x, pos.y).toFixed(4)}; η=${eta}`;

  useEffect(() => {
    trailRef.current = [[pos.x, pos.y]];
    // reset trail when loss/seed changes — pos reset handled separately
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loss, seed]);

  useEffect(() => {
    if (!playing) return;
    const id = 'gd-playground';
    let raf = 0;
    let alive = true;

    const tick = () => {
      if (!alive) return;
      if (!acquireLock(id)) {
        raf = window.requestAnimationFrame(tick);
        return;
      }
      setPos((p) => {
        const [gx, gy] = grad(loss, p.x, p.y);
        const nx = p.x - eta * gx;
        const ny = p.y - eta * gy;
        trailRef.current = [...trailRef.current.slice(-80), [nx, ny]];
        return { x: nx, y: ny, t: p.t + 1 };
      });
      raf = window.requestAnimationFrame(tick);
    };
    raf = window.requestAnimationFrame(tick);
    return () => {
      alive = false;
      cancelAnimationFrame(raf);
      releaseLock(id);
    };
  }, [playing, loss, eta]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const paint = () => {
      const colors = readColors();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      const w = Math.max(1, rect.width);
      const h = Math.max(1, rect.height);
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);

      const pad = 20;
      const mapX = (x: number) => pad + ((x + 1.5) / 3) * (w - pad * 2);
      const mapY = (y: number) => h - pad - ((y + 1.5) / 3) * (h - pad * 2);

      // Contours
      for (let level = 1; level <= 8; level++) {
        ctx.beginPath();
        let first = true;
        for (let i = 0; i <= 120; i++) {
          const a = (i / 120) * Math.PI * 2;
          const r = 0.15 * level;
          let x = r * Math.cos(a);
          let y = r * Math.sin(a) / Math.sqrt(3);
          if (loss === 'rosenbrock-lite') {
            x = -1 + (i / 120) * 2.2;
            y = x * x + (level - 4) * 0.08;
          }
          const px = mapX(x);
          const py = mapY(y);
          if (first) {
            ctx.moveTo(px, py);
            first = false;
          } else ctx.lineTo(px, py);
        }
        if (loss === 'quadratic') ctx.closePath();
        ctx.strokeStyle = `rgba(${colors.ink}, 0.12)`;
        ctx.stroke();
      }

      const trail = trailRef.current;
      ctx.beginPath();
      trail.forEach(([x, y], i) => {
        const px = mapX(x);
        const py = mapY(y);
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      });
      ctx.strokeStyle = `rgba(${colors.accents.gd}, 0.9)`;
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(mapX(pos.x), mapY(pos.y), 4, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${colors.accents.gd}, 1)`;
      ctx.fill();
    };

    paint();
    const ro = new ResizeObserver(paint);
    ro.observe(canvas);
    window.addEventListener('hvb-theme', paint);
    return () => {
      ro.disconnect();
      window.removeEventListener('hvb-theme', paint);
    };
  }, [pos, loss]);

  const reseed = () => {
    const rng = mulberry32(seed + 1);
    setSeed((s) => s + 1);
    const x = -1 + 2 * rng();
    const y = -1 + 2 * rng();
    setPos({ x, y, t: 0 });
    trailRef.current = [[x, y]];
    setPlaying(false);
  };

  return (
    <div className="play-panel">
      <div className="sr-only" aria-live="polite">
        {summary}
      </div>
      <canvas ref={canvasRef} className="play-canvas" aria-hidden="true" />
      <div className="play-controls">
        <label>
          loss
          <select value={loss} onChange={(e) => setLoss(e.target.value as LossKind)}>
            <option value="quadratic">quadratic</option>
            <option value="rosenbrock-lite">rosenbrock-lite</option>
          </select>
        </label>
        <label>
          η
          <input
            type="range"
            min={0.0001}
            max={0.2}
            step={0.0001}
            value={eta}
            onChange={(e) => setEta(Number(e.target.value))}
          />
          <span>{eta.toFixed(4)}</span>
        </label>
        <button type="button" onClick={() => setPlaying((p) => !p)}>
          {playing ? 'Pause' : 'Play'}
        </button>
        <button type="button" onClick={reseed}>
          Random start
        </button>
      </div>
      <p className="play-summary">{summary}</p>
    </div>
  );
}
