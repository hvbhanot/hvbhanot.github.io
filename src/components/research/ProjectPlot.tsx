import { useRef } from 'react';
import { useCanvasLifecycle } from '../../lib/canvas/useCanvasLifecycle';
import { betaDensity, quadraticStep } from '../../lib/math/plots';

export type PlotKind =
  'routing' | 'constraint' | 'parallel' | 'matrix' | 'loss' | 'inference' | 'feedback';

/** Mathematical concept sketches, never represented as project benchmarks. */
export default function ProjectPlot({ kind, labels }: { kind: PlotKind; labels?: readonly string[] }) {
  const ref = useRef<HTMLCanvasElement | null>(null);
  useCanvasLifecycle(ref, {
    autoplay: false,
    deps: [kind, labels],
    draw: (ctx, _t, colors, { w, h }) => {
      ctx.clearRect(0, 0, w, h);
      const blue = `rgb(${colors.accents.prob})`;
      const ink = `rgb(${colors.ink})`;
      const cx = w / 2,
        cy = h / 2;
      const line = (
        ax: number,
        ay: number,
        bx: number,
        by: number,
        color = `rgba(${colors.ink},0.55)`,
      ) => {
        ctx.beginPath();
        ctx.moveTo(ax, ay);
        ctx.lineTo(bx, by);
        ctx.strokeStyle = color;
        ctx.lineWidth = 1;
        ctx.lineCap = 'round';
        ctx.stroke();
      };
      const point = (x: number, y: number, radius = 3, color = blue) => {
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.fill();
      };
      ctx.font = '10px "IBM Plex Mono", monospace';
      ctx.fillStyle = `rgba(${colors.ink},.5)`;
      if (kind === 'routing') {
        const input = { x: w * 0.15, y: cy };
        const output = { x: w * 0.85, y: cy };
        const routes = [
          { x: cx, y: h * 0.32, label: 'LOCAL' },
          { x: cx, y: h * 0.68, label: 'CLOUD' },
        ];
        routes.forEach((route, i) => {
          line(input.x, input.y, route.x, route.y, i === 0 ? blue : undefined);
          line(route.x, route.y, output.x, output.y, i === 0 ? blue : undefined);
          point(route.x, route.y, 6, i === 0 ? blue : ink);
        });
        point(input.x, input.y, 5, ink);
        point(output.x, output.y, 5, ink);
        if (w > 180) {
          ctx.fillStyle = `rgb(${colors.ink})`;
          ctx.textAlign = 'center';
          routes.forEach(route => ctx.fillText(route.label, route.x, route.y - 13));
          ctx.fillText('TASK', input.x, cy + 25);
          ctx.fillText('MODEL', output.x, cy + 25);
          ctx.textAlign = 'left';
        }
      } else if (kind === 'constraint') {
        const inputs = [
          { x: w * 0.15, y: h * 0.3, label: 'LECTURE' },
          { x: w * 0.15, y: h * 0.7, label: 'MODE' },
        ];
        const filter = { x: cx, y: cy };
        const output = { x: w * 0.85, y: cy };
        inputs.forEach(input => {
          line(input.x, input.y, filter.x, filter.y, blue);
          point(input.x, input.y, 5, ink);
        });
        line(filter.x, filter.y, output.x, output.y, blue);
        point(filter.x, filter.y, 7, blue);
        point(output.x, output.y, 5, ink);
        if (w > 180) {
          ctx.fillStyle = `rgb(${colors.ink})`;
          ctx.textAlign = 'center';
          inputs.forEach(input => ctx.fillText(input.label, input.x, input.y - 14));
          ctx.fillText('CONSTRAIN', filter.x, cy - 17);
          ctx.fillText('RESPONSE', output.x, cy + 25);
          ctx.textAlign = 'left';
        }
      } else if (kind === 'parallel') {
        const input = { x: w * 0.12, y: cy };
        const output = { x: w * 0.88, y: cy };
        const subnets = [0.25, 0.5, 0.75].map(y => ({ x: w * 0.46, y: h * y }));
        subnets.forEach((node, i) => {
          line(input.x, input.y, node.x, node.y);
          line(node.x, node.y, w * 0.72, node.y, blue);
          point(node.x, node.y, 7, i === 1 ? blue : ink);
          if (w > 180) {
            ctx.fillStyle = `rgb(${colors.ink})`;
            ctx.textAlign = 'center';
            ctx.fillText(['φ1', 'φ2', 'φk'][i], node.x, node.y - 15);
          }
        });
        point(input.x, input.y, 5, ink);
        line(w * 0.72, h * 0.22, w * 0.72, h * 0.78, ink);
        line(w * 0.72, cy, output.x, output.y, blue);
        point(output.x, output.y, 5, ink);
        if (w > 180) {
          ctx.fillStyle = `rgb(${colors.ink})`;
          ctx.textAlign = 'center';
          ctx.fillText('INPUT', input.x, cy + 25);
          ctx.fillText('CONCAT', w * 0.72, h * 0.9);
          ctx.fillText('h', output.x, cy - 15);
          ctx.textAlign = 'left';
        }
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
        const sx = w * 0.13;
        const sy = h * 0.18;
        const plot = (x: number, y: number): [number, number] => [cx + x * sx, cy - y * sy];
        line(cx - 3.3 * sx, cy, cx + 3.3 * sx, cy, `rgba(${colors.ink},.55)`);
        line(cx, cy - 2.1 * sy, cx, cy + 2.1 * sy, `rgba(${colors.ink},.55)`);
        for (const level of [0.5, 1.5, 3, 5, 8, 12]) {
          ctx.beginPath();
          ctx.ellipse(cx, cy, Math.sqrt(level) * sx, Math.sqrt(level / 3) * sy, 0, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(${colors.ink},.55)`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
        let x = -2.8;
        let y = 1.4;
        for (let n = 0; n < 10; n++) {
          const [px, py] = plot(x, y);
          point(px, py, 3);
          const [nx, ny] = quadraticStep(x, y);
          line(px, py, ...plot(nx, ny), blue);
          x = nx;
          y = ny;
        }
        point(cx, cy, 4, ink);
        if (w > 180) {
          ctx.fillStyle = `rgb(${colors.ink})`;
          ctx.fillText('x', cx + 3.25 * sx, cy - 9);
          ctx.fillText('y', cx + 9, cy - 1.95 * sy);
        }
      } else if (kind === 'inference') {
        const left = w * 0.1;
        const right = w * 0.92;
        const base = h * 0.82;
        const compact = w < 380;
        const top = h * (compact ? 0.3 : 0.2);
        line(left, top, left, base, `rgba(${colors.ink},.55)`);
        line(left, base, right, base, `rgba(${colors.ink},.55)`);
        const series = [
          { a: 2, b: 2, label: 'Beta(2, 2) prior', color: `rgba(${colors.ink},.55)` },
          { a: 8, b: 4, label: 'Beta(8, 4) posterior', color: blue },
        ];
        const maxDensity = Math.max(...series.map(({ a, b }) => betaDensity((a - 1) / (a + b - 2), a, b)));
        const densityScale = (base - top) / (maxDensity * 1.12);
        series.forEach(({ a, b, label, color }, index) => {
          ctx.beginPath();
          for (let i = 0; i <= 160; i++) {
            const theta = i / 160;
            const px = left + theta * (right - left);
            const py = base - betaDensity(theta, a, b) * densityScale;
            if (i === 0) ctx.moveTo(px, py);
            else ctx.lineTo(px, py);
          }
          ctx.strokeStyle = color;
          ctx.lineWidth = 2;
          ctx.stroke();
          const lx = compact ? left : left + index * w * 0.36;
          const ly = compact ? h * 0.06 + index * 18 : h * 0.08;
          line(lx, ly, lx + 20, ly, color);
          ctx.fillStyle = `rgb(${colors.ink})`;
          ctx.fillText(label, lx + 27, ly + 3);
        });
        const peakY = base - maxDensity * densityScale;
        line(left - 5, peakY, left + 5, peakY, `rgba(${colors.ink},.55)`);
        ctx.fillStyle = `rgb(${colors.ink})`;
        ctx.textAlign = 'right';
        ctx.fillText(maxDensity.toFixed(1), left - 9, peakY + 3);
        ctx.textAlign = 'left';
        ctx.fillText('θ', right - 4, base + 18);
        ctx.fillText('density', left, top - 10);
      } else {
        const nodeLabels = labels?.length === 4
          ? labels
          : ['OBSERVE', 'SELECT TOOL', 'ACT', 'VERIFY'];
        const nodes = [
          { x: w * 0.2, y: h * 0.25 },
          { x: w * 0.78, y: h * 0.25 },
          { x: w * 0.78, y: h * 0.68 },
          { x: w * 0.2, y: h * 0.68 },
        ].map((node, i) => ({ ...node, label: nodeLabels[i] }));
        nodes.forEach((node, i) => {
          const next = nodes[(i + 1) % nodes.length];
          line(node.x, node.y, next.x, next.y, blue);
          const angle = Math.atan2(next.y - node.y, next.x - node.x);
          const tipX = node.x + (next.x - node.x) * 0.78;
          const tipY = node.y + (next.y - node.y) * 0.78;
          for (const side of [-1, 1])
            line(tipX, tipY, tipX - 8 * Math.cos(angle + side * 0.45), tipY - 8 * Math.sin(angle + side * 0.45), blue);
          point(node.x, node.y, 5, i === 0 ? blue : ink);
        });
        if (w > 180) {
          ctx.fillStyle = `rgb(${colors.ink})`;
          ctx.textAlign = 'center';
          nodes.forEach((node, i) => ctx.fillText(node.label, node.x, node.y + (i < 2 ? -16 : 23)));
          ctx.textAlign = 'left';
        }
      }
    },
  });
  return <canvas className="project-plot" ref={ref} aria-hidden="true" />;
}
