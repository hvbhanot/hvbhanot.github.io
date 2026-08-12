import { useEffect, useRef, type RefObject } from 'react';
import { acquireLock, releaseLock } from './animationLock';

export type CanvasColors = {
  ink: string;
  accents: Record<'prob' | 'gd' | 'proof' | 'math', string>;
};

export function readColors(): CanvasColors {
  const cs = getComputedStyle(document.documentElement);
  const rgb = (name: string, fb: string) => cs.getPropertyValue(name).trim() || fb;
  return {
    ink: rgb('--ink-rgb', '232, 232, 232'),
    accents: {
      prob: rgb('--accent-prob-rgb', '74, 163, 242'),
      gd: rgb('--accent-gd-rgb', '242, 153, 74'),
      proof: rgb('--accent-proof-rgb', '39, 174, 96'),
      math: rgb('--accent-math-rgb', '187, 134, 252'),
    },
  };
}

export type UseCanvasLifecycleOptions = {
  draw: (ctx: CanvasRenderingContext2D, t: number, colors: CanvasColors, size: { w: number; h: number }) => void;
  /** When true, request exclusive autoplay lock for continuous rAF */
  autoplay?: boolean;
  lockId?: string;
  deps?: unknown[];
};

/**
 * Shared canvas lifecycle: resize + DPR cap, IntersectionObserver pause,
 * theme recolor via `hvb-theme` / data-theme MutationObserver, reduced motion.
 */
export function useCanvasLifecycle(
  canvasRef: RefObject<HTMLCanvasElement | null>,
  options: UseCanvasLifecycleOptions,
): void {
  const { draw, autoplay = false, lockId = 'canvas', deps = [] } = options;
  const drawRef = useRef(draw);
  drawRef.current = draw;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let raf = 0;
    let running = false;
    let visible = false;
    let w = 0;
    let h = 0;
    let t = 0;
    let colors = readColors();

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      w = Math.max(1, rect.width);
      h = Math.max(1, rect.height);
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const paint = () => {
      drawRef.current(ctx, t, colors, { w, h });
    };

    const frame = () => {
      t += 0.016;
      paint();
      if (running && !prefersReduced) raf = window.requestAnimationFrame(frame);
    };

    const canAutoplay = () => {
      if (!autoplay) return true;
      return acquireLock(lockId);
    };

    const start = () => {
      if (running || prefersReduced || !visible) return;
      if (autoplay && !canAutoplay()) {
        paint();
        return;
      }
      running = true;
      raf = window.requestAnimationFrame(frame);
    };

    const stop = () => {
      running = false;
      window.cancelAnimationFrame(raf);
      if (autoplay) releaseLock(lockId);
    };

    const onTheme = () => {
      colors = readColors();
      paint();
    };

    resize();
    paint();

    const visibility = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting && entry.intersectionRatio >= (autoplay ? 0.5 : 0.01);
        if (visible && !prefersReduced) start();
        else {
          stop();
          if (visible) paint();
        }
      },
      { threshold: autoplay ? [0, 0.5, 1] : [0, 0.01, 1] },
    );
    visibility.observe(canvas);

    const sizeObserver = new ResizeObserver(() => {
      resize();
      if (!running) paint();
    });
    sizeObserver.observe(canvas);

    const themeObserver = new MutationObserver(onTheme);
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme', 'class'],
    });
    window.addEventListener('hvb-theme', onTheme);

    return () => {
      stop();
      visibility.disconnect();
      sizeObserver.disconnect();
      themeObserver.disconnect();
      window.removeEventListener('hvb-theme', onTheme);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [canvasRef, autoplay, lockId, ...deps]);
}
