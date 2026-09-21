import { useRef } from 'react';
import { useCanvasLifecycle } from '../../lib/canvas/useCanvasLifecycle';
import { mulberry32 } from '../../lib/rng';

export type PlotKind =
  'network' | 'routing' | 'matrix' | 'loss' | 'tree' | 'waves';

/** Mathematical concept sketches, never represented as project benchmarks. */
export default function ProjectPlot({ kind }: { kind: PlotKind }) {
  const ref = useRef<HTMLCanvasElement | null>(null);
  useCanvasLifecycle(ref, {
    autoplay: false,
    deps: [kind],
    draw: (ctx, _t, colors, { w, h }) => {
      ctx.clearRect(0, 0, w, h);
      const blue = `rgb(${colors.accents.prob})`;
      const ink = `rgb(${colors.ink})`;
      const random = mulberry32(71);
      const cx = w / 2,
        cy = h / 2;
      const line = (
        ax: number,
        ay: number,
        bx: number,
        by: number,
        color = `rgba(${colors.ink},0.16)`,
      ) => {
        ctx.beginPath();
        ctx.moveTo(ax, ay);
        ctx.lineTo(bx, by);
        ctx.strokeStyle = color;
        ctx.lineWidth = 0.8;
        ctx.stroke();
      };
      const point = (x: number, y: number, radius = 3, color = blue) => {
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.fill();
      };
      ctx.font = '9px "IBM Plex Mono", monospace';
      ctx.fillStyle = `rgba(${colors.ink},.5)`;
      for (let x = 20; x < w; x += 22)
        for (let y = 18; y < h; y += 22) {
          ctx.fillStyle = `rgba(${colors.ink},.12)`;
          ctx.fillRect(x, y, 1, 1);
        }
      if (kind === 'network' || kind === 'tree' || kind === 'routing') {
        const sizes =
          kind === 'network'
            ? [3, 6, 6, 3]
            : kind === 'tree'
              ? [1, 3, 6, 3, 1]
              : [1, 5, 1];
        const nodes = sizes.map((size, layer) =>
          Array.from({ length: size }, (_, n) => ({
            x: w * 0.18 + (layer * w * 0.64) / (sizes.length - 1),
            y: cy + (n - (size - 1) / 2) * Math.min(27, h * 0.105),
          })),
        );
        nodes.forEach((layer, i) => {
          if (i > 0)
            nodes[i - 1].forEach((a) =>
              layer.forEach((b) => line(a.x, a.y, b.x, b.y)),
            );
        });
        nodes.forEach((layer) =>
          layer.forEach((p) =>
            point(p.x, p.y, kind === 'routing' ? 7 : 4, ink),
          ),
        );
        nodes.forEach((layer, i) => {
          const p = layer[Math.floor(layer.length / 2)];
          point(p.x, p.y, kind === 'routing' ? 7 : 4, blue);
          if (i > 0) {
            const a = nodes[i - 1][Math.floor(nodes[i - 1].length / 2)];
            line(a.x, a.y, p.x, p.y, blue);
          }
        });
        ctx.fillStyle = `rgba(${colors.ink},.5)`;
        ctx.fillText('INPUT', w * 0.18 - 15, h - 22);
        ctx.fillText(
          kind === 'tree' ? 'VERIFIED' : 'OUTPUT',
          w * 0.82 - 20,
          h - 22,
        );
      } else if (kind === 'matrix') {
        const cell = Math.min(w * 0.052, h * 0.096),
          count = 9;
        const left = cx - (count * cell) / 2,
          top = cy - (count * cell) / 2;
        for (let i = 0; i < count; i++)
          for (let j = 0; j < count; j++) {
            const value = Math.exp(-Math.abs(i - j) * 0.55);
            ctx.fillStyle = `rgba(${colors.accents.prob},${0.07 + value * 0.88})`;
            ctx.fillRect(left + i * cell, top + j * cell, cell - 3, cell - 3);
          }
        ctx.strokeStyle = ink;
        ctx.lineWidth = 1;
        for (const [x, sign] of [
          [left - 12, 1],
          [left + count * cell + 9, -1],
        ]) {
          ctx.beginPath();
          ctx.moveTo(x + sign * 6, top - 2);
          ctx.lineTo(x, top - 2);
          ctx.lineTo(x, top + count * cell - 2);
          ctx.lineTo(x + sign * 6, top + count * cell - 2);
          ctx.stroke();
        }
      } else if (kind === 'loss') {
        for (let n = 1; n < 11; n++) {
          ctx.beginPath();
          ctx.ellipse(
            cx,
            cy,
            n * w * 0.034,
            n * h * 0.03,
            -0.45,
            0,
            Math.PI * 2,
          );
          ctx.strokeStyle = `rgba(${colors.ink},.22)`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
        let x = w * 0.22,
          y = h * 0.23;
        for (let n = 0; n < 9; n++) {
          const nx = x + (cx - x) * 0.27;
          const ny = cy + (y - cy) * -0.62;
          line(x, y, nx, ny, blue);
          point(x, y, 2.7);
          x = nx;
          y = ny;
        }
        point(cx, cy, 5, ink);
      } else {
        for (let k = 0; k < 8; k++) {
          ctx.beginPath();
          for (let i = 0; i <= 160; i++) {
            const x = w * 0.1 + (i / 160) * w * 0.8;
            const y =
              cy +
              Math.sin((i / 160) * Math.PI * 4 + k * 0.35) * (h * 0.22 - k * 3);
            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }
          ctx.strokeStyle =
            k === 0 ? blue : `rgba(${colors.ink},${0.12 + random() * 0.18})`;
          ctx.lineWidth = k === 0 ? 1.5 : 0.8;
          ctx.stroke();
        }
      }
    },
  });
  return <canvas className="project-plot" ref={ref} aria-hidden="true" />;
}
