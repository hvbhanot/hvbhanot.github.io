import { useRef } from 'react';
import { useCanvasLifecycle } from '../lib/canvas/useCanvasLifecycle';

/** Decorative, deterministic pen marks. They never intercept the page controls. */
export default function Scribble({
  kind = 'tangle',
  className = '',
}: {
  kind?: 'tangle' | 'arrow' | 'underline' | 'star';
  className?: string;
}) {
  const ref = useRef<HTMLCanvasElement>(null);
  useCanvasLifecycle(ref, {
    deps: [kind],
    draw: (ctx, _time, colors, { w, h }) => {
      ctx.clearRect(0, 0, w, h);
      ctx.strokeStyle = `rgba(${colors.ink},.7)`;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.lineWidth = 1.25;
      const line = (points: number[][]) => {
        ctx.beginPath();
        points.forEach(([x, y], i) => {
          if (i === 0) ctx.moveTo(x * w, y * h);
          else ctx.lineTo(x * w, y * h);
        });
        ctx.stroke();
      };
      if (kind === 'tangle') {
        const points = Array.from({ length: 720 }, (_, i) => {
          const t = i / 719 * Math.PI * 19;
          const envelope = .65 + .2 * Math.sin(t * .17);
          return [
            .5 + envelope * (.33 * Math.sin(t * 1.13) + .12 * Math.cos(t * 3.7)),
            .5 + envelope * (.34 * Math.cos(t * 1.31) + .11 * Math.sin(t * 2.3)),
          ];
        });
        ctx.lineWidth = .85;
        line(points);
      } else if (kind === 'arrow') {
        ctx.beginPath();
        ctx.moveTo(w * .85, h * .1);
        ctx.bezierCurveTo(w * 1.02, h * .63, w * .31, h * .24, w * .14, h * .86);
        ctx.stroke();
        line([[.14, .86], [.13, .56]]);
        line([[.14, .86], [.42, .74]]);
      } else if (kind === 'underline') {
        line(Array.from({ length: 90 }, (_, i) => [
          .025 + i / 89 * .95,
          .35 + Math.sin(i * .11) * .1 + Math.sin(i * .63) * .025,
        ]));
        ctx.globalAlpha = .6;
        line(Array.from({ length: 70 }, (_, i) => [
          .08 + i / 69 * .84,
          .64 + Math.sin(i * .14 + 1) * .09,
        ]));
        ctx.globalAlpha = 1;
      } else {
        line([[.5, .05], [.57, .4], [.94, .24], [.66, .52], [.93, .76], [.57, .63], [.46, .97], [.4, .62], [.06, .77], [.3, .48], [.08, .23], [.42, .39], [.5, .05]]);
      }
    },
  });
  return <canvas ref={ref} className={`scribble-mark ${className}`} aria-hidden="true" />;
}
