import { useMemo, useRef, useState } from 'react';
import { mulberry32 } from '../../../lib/rng';
import { useCanvasLifecycle } from '../../../lib/canvas/useCanvasLifecycle';

function logGamma(z: number): number {
  // Lanczos approximation (g=7)
  const p = [
    0.99999999999980993, 676.5203681218851, -1259.1392167224028, 771.32342877765313,
    -176.61502916214059, 12.507343278686905, -0.13857109526572012, 9.9843696540785614e-6,
    1.5056327351493116e-7,
  ];
  if (z < 0.5) {
    return Math.log(Math.PI / Math.sin(Math.PI * z)) - logGamma(1 - z);
  }
  z -= 1;
  let x = p[0];
  for (let i = 1; i < p.length; i++) x += p[i] / (z + i);
  const t = z + 7.5;
  return 0.5 * Math.log(2 * Math.PI) + (z + 0.5) * Math.log(t) - t + Math.log(x);
}

function betaPdf(x: number, a: number, b: number): number {
  if (x <= 0 || x >= 1) return 0;
  const logB = logGamma(a) + logGamma(b) - logGamma(a + b);
  return Math.exp((a - 1) * Math.log(x) + (b - 1) * Math.log(1 - x) - logB);
}

export default function BayesianUpdate() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [alpha0, setAlpha0] = useState(2);
  const [beta0, setBeta0] = useState(2);
  const [heads, setHeads] = useState(0);
  const [tails, setTails] = useState(0);
  const [seed, setSeed] = useState(42);

  const alpha = Math.min(200, Math.max(0.05, alpha0 + heads));
  const beta = Math.min(200, Math.max(0.05, beta0 + tails));
  const mean = alpha / (alpha + beta);
  const summary = `Posterior Beta(${alpha.toFixed(2)}, ${beta.toFixed(2)}); mean=${mean.toFixed(3)}; H=${heads} T=${tails}`;

  const density = useMemo(() => {
    const pts: { x: number; y: number }[] = [];
    for (let i = 1; i < 200; i++) {
      const x = i / 200;
      pts.push({ x, y: betaPdf(x, alpha, beta) });
    }
    return pts;
  }, [alpha, beta]);

  useCanvasLifecycle(canvasRef, {
    autoplay: false,
    lockId: 'bayes',
    deps: [density],
    draw: (ctx, _t, colors, { w, h }) => {
      ctx.clearRect(0, 0, w, h);
      const pad = 28;
      const maxY = Math.max(...density.map((d) => d.y), 1e-6);
      ctx.beginPath();
      density.forEach((d, i) => {
        const x = pad + d.x * (w - pad * 2);
        const y = h - pad - (d.y / maxY) * (h - pad * 2);
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      });
      ctx.strokeStyle = `rgba(${colors.accents.math}, 0.9)`;
      ctx.lineWidth = 2;
      ctx.stroke();

      // Prior mean marker
      const mx = pad + mean * (w - pad * 2);
      ctx.beginPath();
      ctx.moveTo(mx, pad);
      ctx.lineTo(mx, h - pad);
      ctx.strokeStyle = `rgba(${colors.ink}, 0.25)`;
      ctx.stroke();
    },
  });

  const flip = (side: 'H' | 'T') => {
    if (side === 'H') setHeads((h) => h + 1);
    else setTails((t) => t + 1);
  };

  const autoFlip = () => {
    const rng = mulberry32(seed + heads + tails);
    if (rng() < 0.55) setHeads((h) => h + 1);
    else setTails((t) => t + 1);
  };

  return (
    <div className="play-panel">
      <div className="sr-only" aria-live="polite">
        {summary}
      </div>
      <canvas ref={canvasRef} className="play-canvas" aria-hidden="true" />
      <div className="play-controls">
        <label>
          α₀
          <input
            type="range"
            min={0.05}
            max={20}
            step={0.05}
            value={alpha0}
            onChange={(e) => setAlpha0(Number(e.target.value))}
          />
        </label>
        <label>
          β₀
          <input
            type="range"
            min={0.05}
            max={20}
            step={0.05}
            value={beta0}
            onChange={(e) => setBeta0(Number(e.target.value))}
          />
        </label>
        <button type="button" onClick={() => flip('H')}>
          Heads
        </button>
        <button type="button" onClick={() => flip('T')}>
          Tails
        </button>
        <button type="button" onClick={autoFlip}>
          Flip (seeded)
        </button>
        <button
          type="button"
          onClick={() => {
            setHeads(0);
            setTails(0);
            setSeed((s) => s + 1);
          }}
        >
          Reset
        </button>
      </div>
      <p className="play-summary">{summary}</p>
    </div>
  );
}
