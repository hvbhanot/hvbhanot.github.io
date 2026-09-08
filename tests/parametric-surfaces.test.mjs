import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';
import ts from 'typescript';

// Exercise the actual pure TypeScript geometry without requiring a browser.
const source = readFileSync(
  new URL('../src/lib/math/surfaces.ts', import.meta.url),
  'utf8',
);
const compiled = ts.transpileModule(source, {
  compilerOptions: {
    module: ts.ModuleKind.CommonJS,
    target: ts.ScriptTarget.ES2020,
  },
}).outputText;
const mathModule = { exports: {} };
vm.runInNewContext(compiled, {
  module: mathModule,
  exports: mathModule.exports,
});
const { surfacePoint } = mathModule.exports;
const close = (a, b) => assert.ok(Math.abs(a - b) < 1e-10, `${a} ≈ ${b}`);

test('torus samples satisfy its implicit surface equation across the radius range', () => {
  for (const r of [0.35, 0.8, 1.15]) {
    for (let i = 0; i <= 24; i++)
      for (let j = 0; j <= 12; j++) {
        const [x, y, z] = surfacePoint(
          'torus',
          (i * Math.PI) / 12,
          (j * Math.PI) / 6,
          r,
        );
        close((Math.hypot(x, y) - 2) ** 2 + z ** 2, r ** 2);
      }
  }
});

test('the Möbius seam reconnects with reversed transverse coordinates', () => {
  for (const r of [0.35, 0.8, 1.15])
    for (let j = 0; j <= 12; j++) {
      const v = (j * Math.PI) / 6;
      const start = surfacePoint('mobius', 0, v, r);
      const end = surfacePoint('mobius', 2 * Math.PI, 2 * Math.PI - v, r);
      start.forEach((coordinate, k) => close(coordinate, end[k]));
    }
});

test('the saddle passes through the origin and has opposite curvature on its axes', () => {
  for (const r of [0.35, 0.8, 1.15]) {
    close(Math.hypot(...surfacePoint('saddle', Math.PI, Math.PI, r)), 0);
    const xAxis = surfacePoint('saddle', 2 * Math.PI, Math.PI, r);
    const yAxis = surfacePoint('saddle', Math.PI, 2 * Math.PI, r);
    assert.ok(xAxis[2] > 0);
    assert.ok(yAxis[2] < 0);
    close(xAxis[2], -yAxis[2]);
  }
});
