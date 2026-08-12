import { useMemo, useRef, useState } from 'react';
import { mulberry32, randn } from '../../../lib/rng';
import { useCanvasLifecycle } from '../../../lib/canvas/useCanvasLifecycle';

const BINS = 30;

type Dist = 'normal' | 'uniform' | 'exponential';

function sample(dist: Dist, rng: () => number): number {
  if (dist === 'uniform') return rng() * 2 - 1; // Unif(-1,1), mean 0
  if (dist === 'exponential') return -Math.log(1 - rng()) - 1; // Exp(1) centered to mean 0
  return randn(rng);
}

export default function SamplingDist() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [n, setN] = useState(30);
  const [reps, setReps] = useState(1000);
  const [seed, setSeed] = useState(42);
  const [dist, setDist] = useState<Dist>('normal');

  const { means, summary } = useMemo(() => {
    const rng = mulberry32(seed);
    const sampleMeans: number[] = [];
    for (let r = 0; r < reps; r++) {
      let s = 0;
      for (let i = 0; i < n; i++) s += sample(dist, rng);
      sampleMeans.push(s / n);
    }
    const mean = sampleMeans.reduce((a, b) => a + b, 0) / sampleMeans.length;
    const variance =
      sampleMeans.reduce((a, b) => a + (b - mean) ** 2, 0) / Math.max(1, sampleMeans.length - 1);
    const sd = Math.sqrt(variance);
    return {
      means: sampleMeans,
      summary: `Parent=${dist}; mean of means ≈ ${mean.toFixed(3)}; sd of means ≈ ${sd.toFixed(3)}; n=${n}; reps=${reps}`,
    };
  }, [n, reps, seed, dist]);

  useCanvasLifecycle(canvasRef, {
    autoplay: false,
    lockId: 'sampling',
    deps: [means],
    draw: (ctx, _t, colors, { w, h }) => {
      ctx.clearRect(0, 0, w, h);
      const pad = 28;
      const min = Math.min(...means);
      const max = Math.max(...means);
      const span = max - min || 1;
      const counts = new Array(BINS).fill(0);
      for (const m of means) {
        let b = Math.floor(((m - min) / span) * BINS);
        if (b >= BINS) b = BINS - 1;
        if (b < 0) b = 0;
        counts[b]++;
      }
      const maxC = Math.max(...counts, 1);
      const barW = (w - pad * 2) / BINS;
      for (let i = 0; i < BINS; i++) {
        const bh = ((h - pad * 2) * counts[i]) / maxC;
        ctx.fillStyle = `rgba(${colors.accents.prob}, 0.55)`;
        ctx.fillRect(pad + i * barW, h - pad - bh, Math.max(1, barW - 1), bh);
      }
      ctx.strokeStyle = `rgba(${colors.ink}, 0.25)`;
      ctx.beginPath();
      ctx.moveTo(pad, h - pad);
      ctx.lineTo(w - pad, h - pad);
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
          parent
          <select value={dist} onChange={(e) => setDist(e.target.value as Dist)}>
            <option value="normal">𝒩(0,1)</option>
            <option value="uniform">Unif(−1,1)</option>
            <option value="exponential">Exp(1)−1</option>
          </select>
        </label>
        <label>
          n
          <select value={n} onChange={(e) => setN(Number(e.target.value))}>
            {[5, 10, 30, 100].map((v) => (
              <option key={v} value={v}>
                {v}
              </option>
            ))}
          </select>
        </label>
        <label>
          reps
          <input
            type="range"
            min={200}
            max={2000}
            step={100}
            value={reps}
            onChange={(e) => setReps(Number(e.target.value))}
          />
          <span>{reps}</span>
        </label>
        <button type="button" onClick={() => setSeed((s) => s + 1)}>
          Reseed
        </button>
      </div>
      <p className="play-summary">{summary}</p>
    </div>
  );
}
