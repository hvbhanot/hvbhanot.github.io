import { useMemo, useRef, useState } from 'react';
import { useCanvasLifecycle } from '../../lib/canvas/useCanvasLifecycle';

import {
  surfacePoint,
  surfaces,
  type SurfaceKind,
  type Point,
} from '../../lib/math/surfaces';
export { surfaces, type SurfaceKind } from '../../lib/math/surfaces';

export default function HeroCanvas({
  kind = 'torus',
  radius = 0.8,
  playing = true,
}: {
  kind?: SurfaceKind;
  radius?: number;
  playing?: boolean;
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rotationRef = useRef({ x: 0.87, z: -0.5 });
  const dragRef = useRef<{ x: number; y: number } | null>(null);
  const lastFrameRef = useRef<number | null>(null);
  const [revision, setRevision] = useState(0);
  const paths = useMemo(() => {
    const result: Point[][] = [];
    const tau = Math.PI * 2;
    for (let i = 0; i <= 42; i++) {
      const path: Point[] = [];
      for (let j = 0; j <= 92; j++)
        path.push(surfacePoint(kind, (tau * j) / 92, (tau * i) / 42, radius));
      result.push(path);
    }
    for (let i = 0; i <= 64; i++) {
      const path: Point[] = [];
      for (let j = 0; j <= 38; j++)
        path.push(surfacePoint(kind, (tau * i) / 64, (tau * j) / 38, radius));
      result.push(path);
    }
    return result;
  }, [kind, radius]);

  useCanvasLifecycle(canvasRef, {
    autoplay: playing,
    lockId: 'hero-surface',
    deps: [paths, playing, revision],
    draw: (ctx, _t, colors, { w, h }) => {
      const now = performance.now();
      if (playing && !dragRef.current && lastFrameRef.current !== null)
        rotationRef.current.z +=
          Math.min((now - lastFrameRef.current) / 1000, 0.04) * 0.12;
      lastFrameRef.current = playing ? now : null;
      ctx.clearRect(0, 0, w, h);
      const scale = Math.min(w * 0.15, h * 0.19);
      const cx = w * 0.52;
      const cy = h * 0.5;
      const { x: tilt, z: angle } = rotationRef.current;
      const project = ([x, y, z]: Point) => {
        const rx = x * Math.cos(angle) - y * Math.sin(angle);
        const ry = x * Math.sin(angle) + y * Math.cos(angle);
        const yy = ry * Math.cos(tilt) - z * Math.sin(tilt);
        const zz = ry * Math.sin(tilt) + z * Math.cos(tilt);
        const perspective = 9 / (9 + zz);
        return {
          x: cx + rx * scale * perspective,
          y: cy + yy * scale * perspective,
          depth: zz,
        };
      };
      const line = (points: Point[], color: string, width = 0.65) => {
        ctx.beginPath();
        points.forEach((point, i) => {
          const p = project(point);
          if (i === 0) ctx.moveTo(p.x, p.y);
          else ctx.lineTo(p.x, p.y);
        });
        ctx.strokeStyle = color;
        ctx.lineWidth = width;
        ctx.stroke();
      };
      // A true coordinate plane establishes the object's orientation.
      for (let i = -4; i <= 4; i++) {
        line(
          [
            [-4, i, -1.6],
            [4, i, -1.6],
          ],
          `rgba(${colors.ink},0.045)`,
        );
        line(
          [
            [i, -4, -1.6],
            [i, 4, -1.6],
          ],
          `rgba(${colors.ink},0.045)`,
        );
      }
      const axisEnds: Point[] = [
        [3.8, 0, 0],
        [0, 3.8, 0],
        [0, 0, 2.8],
      ];
      axisEnds.forEach((end, i) => {
        ctx.setLineDash([2, 5]);
        line([[0, 0, 0], end], `rgba(${colors.ink},0.25)`);
        ctx.setLineDash([]);
        const p = project(end);
        ctx.font = '10px "IBM Plex Mono", monospace';
        ctx.fillStyle = `rgba(${colors.ink},0.55)`;
        ctx.fillText(['x', 'y', 'z'][i], p.x + 6, p.y - 7);
      });
      paths.forEach((path, i) => {
        const depth =
          path.reduce((sum, point) => sum + project(point).depth, 0) /
          path.length;
        const alpha = Math.max(0.16, Math.min(0.75, 0.48 - depth * 0.085));
        line(
          path,
          `rgba(${colors.accents.prob},${alpha})`,
          i % 7 === 0 ? 1 : 0.6,
        );
      });
      const origin = project([0, 0, 0]);
      ctx.fillStyle = `rgba(${colors.ink},0.7)`;
      ctx.fillRect(origin.x - 2, origin.y - 2, 4, 4);
    },
  });

  return (
    <canvas
      ref={canvasRef}
      className="hero-canvas"
      role="img"
      aria-label={`Rotatable wireframe ${surfaces[kind].label}. Drag or use arrow keys to rotate.`}
      tabIndex={0}
      onPointerDown={(event) => {
        if (event.button !== 0) return;
        dragRef.current = { x: event.clientX, y: event.clientY };
        event.currentTarget.setPointerCapture(event.pointerId);
      }}
      onPointerMove={(event) => {
        const drag = dragRef.current;
        if (!drag) return;
        rotationRef.current.z += (event.clientX - drag.x) * 0.006;
        rotationRef.current.x = Math.max(
          -1.4,
          Math.min(
            1.4,
            rotationRef.current.x + (event.clientY - drag.y) * 0.006,
          ),
        );
        dragRef.current = { x: event.clientX, y: event.clientY };
        setRevision((n) => n + 1);
      }}
      onPointerUp={() => {
        dragRef.current = null;
      }}
      onPointerCancel={() => {
        dragRef.current = null;
      }}
      onLostPointerCapture={() => {
        dragRef.current = null;
      }}
      onKeyDown={(event) => {
        if (
          !['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Home'].includes(
            event.key,
          )
        )
          return;
        event.preventDefault();
        if (event.key === 'Home') rotationRef.current = { x: 0.87, z: -0.5 };
        else if (event.key === 'ArrowLeft') rotationRef.current.z -= 0.12;
        else if (event.key === 'ArrowRight') rotationRef.current.z += 0.12;
        else
          rotationRef.current.x = Math.max(
            -1.4,
            Math.min(
              1.4,
              rotationRef.current.x +
                (event.key === 'ArrowDown' ? 0.12 : -0.12),
            ),
          );
        setRevision((n) => n + 1);
      }}
    />
  );
}
