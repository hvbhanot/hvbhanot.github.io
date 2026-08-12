import { useMemo, useRef, useState } from 'react';
import { mulberry32, randn } from '../../../lib/rng';
import { useCanvasLifecycle } from '../../../lib/canvas/useCanvasLifecycle';

export default function LinearRegression() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [n, setN] = useState(40);
  const [sigma, setSigma] = useState(0.6);
  const [seed, setSeed] = useState(42);

  const { xs, ys, b0, b1, r2, summary, ok } = useMemo(() => {
    const nn = Math.max(2, n);
    const rng = mulberry32(seed);
    const xs: number[] = [];
    const ys: number[] = [];
    for (let i = 0; i < nn; i++) {
      const x = -2 + (4 * i) / (nn - 1 || 1) + (rng() - 0.5) * 0.1;
      const y = 1.5 * x + 0.5 + sigma * randn(rng);
      xs.push(x);
      ys.push(y);
    }
    const mx = xs.reduce((a, b) => a + b, 0) / nn;
    const my = ys.reduce((a, b) => a + b, 0) / nn;
    let sxx = 0;
    let sxy = 0;
    let syy = 0;
    for (let i = 0; i < nn; i++) {
      const dx = xs[i] - mx;
      const dy = ys[i] - my;
      sxx += dx * dx;
      sxy += dx * dy;
      syy += dy * dy;
    }
    if (sxx < 1e-12) {
      return {
        xs,
        ys,
        b0: 0,
        b1: 0,
        r2: 0,
        ok: false,
        summary: 'Degenerate design — cannot fit OLS.',
      };
    }
    const b1 = sxy / sxx;
    const b0 = my - b1 * mx;
    let ssRes = 0;
    for (let i = 0; i < nn; i++) {
      const pred = b0 + b1 * xs[i];
      ssRes += (ys[i] - pred) ** 2;
    }
    const r2 = syy > 0 ? 1 - ssRes / syy : 0;
    return {
      xs,
      ys,
      b0,
      b1,
      r2,
      ok: true,
      summary: `β̂₀=${b0.toFixed(3)}, β̂₁=${b1.toFixed(3)}, R²=${r2.toFixed(3)}; n=${nn}, σ=${sigma}`,
    };
  }, [n, sigma, seed]);

  useCanvasLifecycle(canvasRef, {
    autoplay: false,
    lockId: 'regression',
    deps: [xs, ys, b0, b1, ok],
    draw: (ctx, _t, colors, { w, h }) => {
      ctx.clearRect(0, 0, w, h);
      const pad = 28;
      const allX = [...xs, -2, 2];
      const allY = [...ys, -2, 4];
      const minX = Math.min(...allX);
      const maxX = Math.max(...allX);
      const minY = Math.min(...allY);
      const maxY = Math.max(...allY);
      const sx = (x: number) => pad + ((x - minX) / (maxX - minX || 1)) * (w - pad * 2);
      const sy = (y: number) => h - pad - ((y - minY) / (maxY - minY || 1)) * (h - pad * 2);

      for (let i = 0; i < xs.length; i++) {
        ctx.beginPath();
        ctx.arc(sx(xs[i]), sy(ys[i]), 3, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${colors.ink}, 0.45)`;
        ctx.fill();
      }

      if (ok) {
        ctx.beginPath();
        ctx.moveTo(sx(minX), sy(b0 + b1 * minX));
        ctx.lineTo(sx(maxX), sy(b0 + b1 * maxX));
        ctx.strokeStyle = `rgba(${colors.accents.proof}, 0.9)`;
        ctx.lineWidth = 2;
        ctx.stroke();
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
          n
          <input
            type="range"
            min={2}
            max={100}
            value={n}
            onChange={(e) => setN(Number(e.target.value))}
          />
          <span>{n}</span>
        </label>
        <label>
          σ
          <input
            type="range"
            min={0.1}
            max={2}
            step={0.1}
            value={sigma}
            onChange={(e) => setSigma(Number(e.target.value))}
          />
          <span>{sigma.toFixed(1)}</span>
        </label>
        <button type="button" onClick={() => setSeed((s) => s + 1)}>
          Reseed
        </button>
      </div>
      <p className="play-summary">{summary}</p>
    </div>
  );
}
