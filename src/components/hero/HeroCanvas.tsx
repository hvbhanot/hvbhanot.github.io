import { useRef } from 'react';
import {
  useCanvasLifecycle,
  type CanvasColors,
} from '../../lib/canvas/useCanvasLifecycle';

export default function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useCanvasLifecycle(canvasRef, {
    autoplay: true,
    lockId: 'hero',
    draw: (ctx, t, colors, { w, h }) => {
      ctx.clearRect(0, 0, w, h);
      drawFourier(ctx, t, colors, w, h);
    },
  });

  return <canvas ref={canvasRef} className="math-dial hero-canvas" aria-hidden="true" />;
}

function drawFourier(
  ctx: CanvasRenderingContext2D,
  t: number,
  colors: CanvasColors,
  w: number,
  h: number,
) {
  const padX = Math.max(20, w * 0.06);
  const padY = Math.max(18, h * 0.16);
  const ink = colors.ink;
  const gd = colors.accents.gd;
  const math = colors.accents.math;
  const N = 1 + Math.floor((t * 0.7) % 14);
  const mid = h / 2;
  const amp = (h - padY * 2) * 0.42;
  const span = w - padX * 2;

  ctx.beginPath();
  ctx.moveTo(padX, mid);
  ctx.lineTo(padX + span, mid);
  ctx.strokeStyle = `rgba(${ink}, 0.18)`;
  ctx.lineWidth = 1;
  ctx.stroke();

  ctx.beginPath();
  ctx.setLineDash([5, 5]);
  for (let i = 0; i <= 240; i++) {
    const u = i / 240;
    const x = padX + u * span;
    const tt = -Math.PI + u * Math.PI * 2;
    const y = mid - (tt > 0 ? 1 : -1) * amp * 0.78;
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.strokeStyle = `rgba(${ink}, 0.28)`;
  ctx.lineWidth = 1.15;
  ctx.stroke();
  ctx.setLineDash([]);

  ctx.beginPath();
  for (let i = 0; i <= 480; i++) {
    const u = i / 480;
    const x = padX + u * span;
    const tt = -Math.PI + u * Math.PI * 2 + t * 0.18;
    let s = 0;
    for (let k = 1; k <= N; k++) {
      const n = 2 * k - 1;
      s += Math.sin(n * tt) / n;
    }
    const y = mid - s * amp;
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.strokeStyle = `rgba(${gd}, 0.92)`;
  ctx.lineWidth = 2;
  ctx.stroke();

  ctx.font = '500 11px "IBM Plex Mono", monospace';
  ctx.fillStyle = `rgba(${math}, 0.78)`;
  ctx.fillText(`N = ${N}`, padX, padY * 0.7);
}