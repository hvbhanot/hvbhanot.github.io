import { useMemo, useRef, useState } from 'react';
import { mulberry32 } from '../../../lib/rng';
import { useCanvasLifecycle } from '../../../lib/canvas/useCanvasLifecycle';

export default function MonteCarloPi() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [n, setN] = useState(400);
  const [seed, setSeed] = useState(42);

  const { points, estimate, summary } = useMemo(() => {
    const rng = mulberry32(seed);
    const pts: { x: number; y: number; inside: boolean }[] = [];
    let inside = 0;
    for (let i = 0; i < n; i++) {
      const x = rng() * 2 - 1;
      const y = rng() * 2 - 1;
      const hit = x * x + y * y <= 1;
      if (hit) inside++;
      pts.push({ x, y, inside: hit });
    }
    const pi = (4 * inside) / n;
    const err = Math.abs(pi - Math.PI);
    return {
      points: pts,
      estimate: pi,
      summary: `N=${n}; π̂=${pi.toFixed(4)}; |π̂−π|=${err.toFixed(4)}; hits=${inside}`,
    };
  }, [n, seed]);

  useCanvasLifecycle(canvasRef, {
    autoplay: false,
    lockId: 'montecarlo',
    deps: [points, estimate],
    draw: (ctx, _t, colors, { w, h }) => {
      ctx.clearRect(0, 0, w, h);
      const size = Math.min(w, h) - 32;
      const ox = (w - size) / 2;
      const oy = (h - size) / 2;
      const map = (v: number) => ((v + 1) / 2) * size;

      // Square
      ctx.strokeStyle = `rgba(${colors.ink}, 0.25)`;
      ctx.strokeRect(ox, oy, size, size);
      // Circle
      ctx.beginPath();
      ctx.arc(ox + size / 2, oy + size / 2, size / 2, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(${colors.accents.gd}, 0.55)`;
      ctx.stroke();

      for (const p of points) {
        ctx.beginPath();
        ctx.arc(ox + map(p.x), oy + map(p.y), 1.8, 0, Math.PI * 2);
        ctx.fillStyle = p.inside
          ? `rgba(${colors.accents.proof}, 0.7)`
          : `rgba(${colors.ink}, 0.25)`;
        ctx.fill();
      }
    },
  });

  return (
    <div className="play-panel">
      <div className="sr-only" aria-live="polite">
        {summary}
      </div>
      <canvas ref={canvasRef} className="play-canvas" aria-hidden="true" />
      <div className="play-controls">
        <label>
          N
          <input
            type="range"
            min={50}
            max={2000}
            step={50}
            value={n}
            onChange={(e) => setN(Number(e.target.value))}
          />
          <span>{n}</span>
        </label>
        <button type="button" onClick={() => setSeed((s) => s + 1)}>
          Reseed
        </button>
      </div>
      <p className="play-summary">{summary}</p>
    </div>
  );
}
