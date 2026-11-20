export type SurfaceKind = 'torus' | 'mobius' | 'saddle';
export type Point = [number, number, number];

export const surfaces: Record<
  SurfaceKind,
  {
    label: string;
    equation: string;
    alt: string;
    domain: string;
    domainAlt: string;
    parameter: string;
    symbol: string;
    note: string;
  }
> = {
  torus: {
    label: 'Torus',
    equation: String.raw`\mathbf{r}(u,v)=((2+r\cos v)\cos u,\;(2+r\cos v)\sin u,\;r\sin v)`,
    alt: 'Parametric torus with major radius 2 and minor radius r.',
    domain: String.raw`u,v\in[0,2\pi),\quad 0<r<R=2`,
    domainAlt: 'u and v range from 0 to 2 pi; r is between 0 and the major radius 2.',
    parameter: 'Minor radius',
    symbol: 'r',
    note: 'Two independent circles. One continuous surface.',
  },
  mobius: {
    label: 'Möbius strip',
    equation: String.raw`\mathbf{r}(u,v)=((2+v\cos\frac{u}{2})\cos u,\;(2+v\cos\frac{u}{2})\sin u,\;v\sin\frac{u}{2})`,
    alt: 'Parametric Möbius strip with centerline radius 2 and half-width w.',
    domain: String.raw`u\in[0,2\pi),\quad v\in[-w,w]`,
    domainAlt: 'u ranges from 0 to 2 pi; v ranges from minus w to w.',
    parameter: 'Half-width',
    symbol: 'w',
    note: 'One boundary. One side. A half-twist changes everything.',
  },
  saddle: {
    label: 'Saddle surface',
    equation: String.raw`z=\frac{a}{2}(x^2-y^2)`,
    alt: 'Saddle surface z equals a over 2 times x squared minus y squared.',
    domain: String.raw`x,y\in[-2,2]`,
    domainAlt: 'x and y both range from minus 2 to 2.',
    parameter: 'Coefficient',
    symbol: 'a',
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
