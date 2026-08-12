import { useMemo, useRef, useState } from 'react';
import { useCanvasLifecycle } from '../../../lib/canvas/useCanvasLifecycle';

const LABELS = ['a', 'b', 'c', 'd', 'e'];

export default function SoftmaxTemperature() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [temp, setTemp] = useState(1);
  const [logits, setLogits] = useState([1.2, 0.4, -0.3, 0.8, -0.6]);

  const { probs, summary } = useMemo(() => {
    const T = Math.max(0.05, temp);
    const scaled = logits.map((z) => z / T);
    const m = Math.max(...scaled);
    const exps = scaled.map((z) => Math.exp(z - m));
    const Z = exps.reduce((a, b) => a + b, 0);
    const p = exps.map((e) => e / Z);
    const ent = -p.reduce((s, pi) => s + (pi > 0 ? pi * Math.log(pi) : 0), 0);
    return {
      probs: p,
      summary: `T=${T.toFixed(2)}; max p=${Math.max(...p).toFixed(3)}; H=${ent.toFixed(3)} nats`,
    };
  }, [temp, logits]);

  useCanvasLifecycle(canvasRef, {
    autoplay: false,
    lockId: 'softmax',
    deps: [probs],
    draw: (ctx, _t, colors, { w, h }) => {
      ctx.clearRect(0, 0, w, h);
      const pad = 28;
      const barW = (w - pad * 2) / probs.length;
      const maxP = Math.max(...probs, 0.01);
      probs.forEach((p, i) => {
        const bh = ((h - pad * 2) * p) / maxP;
        const x = pad + i * barW;
        ctx.fillStyle = `rgba(${colors.accents.math}, 0.65)`;
        ctx.fillRect(x + 4, h - pad - bh, barW - 8, bh);
        ctx.fillStyle = `rgba(${colors.ink}, 0.55)`;
        ctx.font = '500 11px "IBM Plex Mono", monospace';
        ctx.textAlign = 'center';
        ctx.fillText(LABELS[i], x + barW / 2, h - pad + 14);
        ctx.fillText(p.toFixed(2), x + barW / 2, h - pad - bh - 6);
      });
    },
  });

  const bump = (i: number, d: number) => {
    setLogits((zs) => zs.map((z, j) => (j === i ? Math.max(-3, Math.min(3, z + d)) : z)));
  };

  return (
    <div className="play-panel">
      <div className="sr-only" aria-live="polite">
        {summary}
      </div>
      <canvas ref={canvasRef} className="play-canvas" aria-hidden="true" />
      <div className="play-controls">
        <label>
          T
          <input
            type="range"
            min={0.1}
            max={4}
            step={0.05}
            value={temp}
            onChange={(e) => setTemp(Number(e.target.value))}
          />
          <span>{temp.toFixed(2)}</span>
        </label>
        {LABELS.map((lab, i) => (
          <label key={lab}>
            z_{lab}
            <button type="button" onClick={() => bump(i, -0.2)} aria-label={`decrease ${lab}`}>
              −
            </button>
            <span>{logits[i].toFixed(1)}</span>
            <button type="button" onClick={() => bump(i, 0.2)} aria-label={`increase ${lab}`}>
              +
            </button>
          </label>
        ))}
      </div>
      <p className="play-summary">{summary}</p>
    </div>
  );
}
