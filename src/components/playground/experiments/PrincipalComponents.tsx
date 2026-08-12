import { useMemo, useRef, useState } from 'react';
import { mulberry32, randn } from '../../../lib/rng';
import { useCanvasLifecycle } from '../../../lib/canvas/useCanvasLifecycle';

export default function PrincipalComponents() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [n, setN] = useState(80);
  const [rho, setRho] = useState(0.7);
  const [seed, setSeed] = useState(42);

  const { points, evecs, evals, summary } = useMemo(() => {
    const rng = mulberry32(seed);
    const r = Math.max(-0.95, Math.min(0.95, rho));
    const pts: [number, number][] = [];
    for (let i = 0; i < n; i++) {
      const z1 = randn(rng);
      const z2 = randn(rng);
      const x = z1;
      const y = r * z1 + Math.sqrt(1 - r * r) * z2;
      pts.push([x, y]);
    }
    // Sample covariance
    const mx = pts.reduce((s, p) => s + p[0], 0) / n;
    const my = pts.reduce((s, p) => s + p[1], 0) / n;
    let sxx = 0;
    let syy = 0;
    let sxy = 0;
    for (const [x, y] of pts) {
      sxx += (x - mx) ** 2;
      syy += (y - my) ** 2;
      sxy += (x - mx) * (y - my);
    }
    sxx /= n - 1;
    syy /= n - 1;
    sxy /= n - 1;
    // Eigen of [[sxx,sxy],[sxy,syy]]
    const tr = sxx + syy;
    const det = sxx * syy - sxy * sxy;
    const disc = Math.sqrt(Math.max(0, tr * tr - 4 * det));
    const l1 = (tr + disc) / 2;
    const l2 = (tr - disc) / 2;
    const v1 =
      Math.abs(sxy) > 1e-9
        ? normalize([sxy, l1 - sxx])
        : sxx >= syy
          ? [1, 0]
          : [0, 1];
    const v2 = normalize([-v1[1], v1[0]]);
    return {
      points: pts,
      evecs: [v1, v2] as [[number, number], [number, number]],
      evals: [l1, l2],
      summary: `ρ=${r.toFixed(2)}; λ₁=${l1.toFixed(3)}, λ₂=${l2.toFixed(3)}; n=${n}`,
    };
  }, [n, rho, seed]);

  useCanvasLifecycle(canvasRef, {
    autoplay: false,
    lockId: 'pca',
    deps: [points, evecs, evals],
    draw: (ctx, _t, colors, { w, h }) => {
      ctx.clearRect(0, 0, w, h);
      const pad = 24;
      const scale = Math.min(w, h) * 0.18;
      const cx = w / 2;
      const cy = h / 2;
      const sx = (x: number) => cx + x * scale;
      const sy = (y: number) => cy - y * scale;

      for (const [x, y] of points) {
        ctx.beginPath();
        ctx.arc(sx(x), sy(y), 2.2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${colors.ink}, 0.4)`;
        ctx.fill();
      }

      const colorsAxes = [colors.accents.prob, colors.accents.math];
      evecs.forEach((v, i) => {
        const len = Math.sqrt(Math.max(evals[i], 0)) * 2.2;
        ctx.beginPath();
        ctx.moveTo(sx(-v[0] * len), sy(-v[1] * len));
        ctx.lineTo(sx(v[0] * len), sy(v[1] * len));
        ctx.strokeStyle = `rgba(${colorsAxes[i]}, 0.9)`;
        ctx.lineWidth = 2;
        ctx.stroke();
      });

      ctx.strokeStyle = `rgba(${colors.ink}, 0.2)`;
      ctx.beginPath();
      ctx.moveTo(pad, cy);
      ctx.lineTo(w - pad, cy);
      ctx.moveTo(cx, pad);
      ctx.lineTo(cx, h - pad);
      ctx.stroke();
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
          ρ
          <input
            type="range"
            min={-0.9}
            max={0.9}
            step={0.05}
            value={rho}
            onChange={(e) => setRho(Number(e.target.value))}
          />
          <span>{rho.toFixed(2)}</span>
        </label>
        <label>
          n
          <input
            type="range"
            min={20}
            max={200}
            step={10}
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

function normalize(v: number[]): [number, number] {
  const n = Math.hypot(v[0], v[1]) || 1;
  return [v[0] / n, v[1] / n];
}
