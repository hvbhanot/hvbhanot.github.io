export type SurfaceKind = 'torus' | 'mobius' | 'saddle';
export type Point = [number, number, number];

export const surfaces: Record<
  SurfaceKind,
  { label: string; equation: string; note: string }
> = {
  torus: {
    label: 'Torus',
    equation: String.raw`\mathbf{r}(u,v)=((2+r\cos v)\cos u,\;(2+r\cos v)\sin u,\;r\sin v)`,
    note: 'Two independent circles. One continuous surface.',
  },
  mobius: {
    label: 'Möbius strip',
    equation: String.raw`\mathbf{r}(u,v)=((2+v\cos\frac{u}{2})\cos u,\;(2+v\cos\frac{u}{2})\sin u,\;v\sin\frac{u}{2})`,
    note: 'One boundary. One side. A half-twist changes everything.',
  },
  saddle: {
    label: 'Saddle surface',
    equation: String.raw`z=\frac{r}{2}(x^2-y^2)`,
    note: 'Positive in one direction. Negative in the other.',
  },
};

export function surfacePoint(
  kind: SurfaceKind,
  u: number,
  v: number,
  radius: number,
): Point {
  if (kind === 'mobius') {
    const width = (v / Math.PI - 1) * radius;
    return [
      (2 + width * Math.cos(u / 2)) * Math.cos(u),
      (2 + width * Math.cos(u / 2)) * Math.sin(u),
      width * Math.sin(u / 2),
    ];
  }
  if (kind === 'saddle') {
    const x = (u / Math.PI - 1) * 2;
    const y = (v / Math.PI - 1) * 2;
    return [x, y, radius * 0.5 * (x * x - y * y)];
  }
  return [
    (2 + radius * Math.cos(v)) * Math.cos(u),
    (2 + radius * Math.cos(v)) * Math.sin(u),
    radius * Math.sin(v),
  ];
}
