import type { Experiment } from '../data/lab';

const ink = '#1a1a2e';
const inkMid = '#7c7c9a';
const accent = '#6c5ce7';
const highlight = '#00d2d3';

function buildPath(points: number[], w: number, h: number, padX = 8, padY = 6) {
  if (points.length < 2) return '';
  const min = Math.min(...points);
  const max = Math.max(...points);
  const span = max - min || 1;
  const stepX = (w - padX * 2) / (points.length - 1);
  const xs = points.map((_, i) => padX + i * stepX);
  const ys = points.map((p) => padY + (1 - (p - min) / span) * (h - padY * 2));
  const path = xs.map((x, i) => (i === 0 ? `M ${x.toFixed(1)} ${ys[i].toFixed(1)}` : `L ${x.toFixed(1)} ${ys[i].toFixed(1)}`)).join(' ');
  return { path, xs, ys };
}

export default function Sketch({ sketch }: { sketch: Experiment['sketch'] }) {
  const W = 360;
  const H = 140;

  if (sketch.kind === 'line') {
    const built = buildPath(sketch.points, W, H, 32, 14);
    if (!built) return null;
    return (
      <svg viewBox={`0 0 ${W} ${H}`} className="block w-full">
        <line x1="28" y1="120" x2={W - 8} y2="120" stroke={ink} strokeWidth="0.7" opacity="0.2" />
        <line x1="28" y1="14" x2="28" y2="120" stroke={ink} strokeWidth="0.7" opacity="0.2" />
        {[0, 1, 2, 3, 4].map((i) => (
          <line key={i} x1="28" y1={14 + i * 26.5} x2={W - 8} y2={14 + i * 26.5} stroke={ink} strokeWidth="0.4" opacity="0.06" />
        ))}
        <path d={built.path} fill="none" stroke={accent} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        {built.xs.map((x, i) => (
          <circle key={i} cx={x} cy={built.ys[i]} r="1.8" fill={highlight} />
        ))}
        <text x="24" y="10" textAnchor="end" fontFamily="JetBrains Mono, monospace" fontSize="9" letterSpacing="0" fill={inkMid}>
          {sketch.ylabel}
        </text>
        <text x={W - 8} y={H - 4} textAnchor="end" fontFamily="JetBrains Mono, monospace" fontSize="9" letterSpacing="0" fill={inkMid}>
          {sketch.xlabel} &rarr;
        </text>
      </svg>
    );
  }

  if (sketch.kind === 'bars') {
    const max = Math.max(...sketch.values);
    const barW = (W - 64) / sketch.values.length;
    return (
      <svg viewBox={`0 0 ${W} ${H}`} className="block w-full">
        <line x1="40" y1="120" x2={W - 8} y2="120" stroke={ink} strokeWidth="0.7" opacity="0.2" />
        <line x1="40" y1="14" x2="40" y2="120" stroke={ink} strokeWidth="0.7" opacity="0.2" />
        {sketch.values.map((v, i) => {
          const h = (v / max) * 96;
          const x = 48 + i * barW;
          return (
            <g key={i}>
              <rect x={x} y={120 - h} width={barW - 6} height={h} fill={i === sketch.values.length - 1 ? accent : 'none'} stroke={ink} strokeWidth="0.8" opacity={i === sketch.values.length - 1 ? 0.55 : 0.25} rx="2" />
              <text
                x={x + (barW - 6) / 2}
                y={132}
                textAnchor="middle"
                fontFamily="JetBrains Mono, monospace"
                fontSize="8"
                letterSpacing="0"
                fill={inkMid}
              >
                {sketch.labels[i]}
              </text>
            </g>
          );
        })}
        <text x="36" y="10" textAnchor="end" fontFamily="JetBrains Mono, monospace" fontSize="9" letterSpacing="0" fill={inkMid}>
          {sketch.ylabel}
        </text>
      </svg>
    );
  }

  const cols = 6;
  const rows = Math.ceil(sketch.cells / cols);
  const cellW = (W - 64) / cols;
  const cellH = Math.min(20, (H - 32) / rows);
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="block w-full">
      <defs>
        <pattern id="hatch-sm" width="5" height="5" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <line x1="0" y1="0" x2="0" y2="5" stroke={ink} strokeWidth="0.6" opacity="0.4" />
        </pattern>
      </defs>
      {Array.from({ length: sketch.cells }).map((_, i) => {
        const col = i % cols;
        const row = Math.floor(i / cols);
        const x = 32 + col * cellW;
        const y = 14 + row * cellH;
        const filled = sketch.filled.includes(i);
        const half = sketch.halftone?.includes(i);
        return (
          <g key={i}>
            <rect
              x={x}
              y={y}
              width={cellW - 4}
              height={cellH - 4}
              fill={filled ? 'url(#hatch-sm)' : 'none'}
              stroke={ink}
              strokeWidth="0.7"
              opacity={filled ? 0.7 : 0.2}
              rx="2"
            />
            {half ? (
              <circle cx={x + (cellW - 4) / 2} cy={y + (cellH - 4) / 2} r="2" fill={highlight} />
            ) : null}
          </g>
        );
      })}
      <text x={W - 8} y={H - 4} textAnchor="end" fontFamily="JetBrains Mono, monospace" fontSize="9" letterSpacing="0" fill={inkMid}>
        {sketch.caption}
      </text>
    </svg>
  );
}