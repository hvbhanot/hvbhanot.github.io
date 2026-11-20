import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';
import ts from 'typescript';

const source = readFileSync(new URL('../src/lib/math/plots.ts', import.meta.url), 'utf8');
const compiled = ts.transpileModule(source, {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
}).outputText;
const mathModule = { exports: {} };
vm.runInNewContext(compiled, { module: mathModule, exports: mathModule.exports });
const { betaDensity, quadraticStep } = mathModule.exports;
const close = (a, b, tolerance = 1e-9) =>
  assert.ok(Math.abs(a - b) < tolerance, `${a} ≈ ${b}`);

test('the prior and posterior Beta densities integrate to one and shift the mean', () => {
  for (const [a, b] of [[2, 2], [8, 4]]) {
    let area = 0;
    const slices = 10_000;
    for (let i = 0; i < slices; i++) {
      const left = betaDensity(i / slices, a, b);
      const right = betaDensity((i + 1) / slices, a, b);
      area += ((left + right) / 2) / slices;
    }
    close(area, 1, 1e-6);
    close(betaDensity((a - 1) / (a + b - 2), a, b), Math.max(
      ...Array.from({ length: 999 }, (_, i) => betaDensity((i + 1) / 1000, a, b)),
    ), 1e-6);
  }
  assert.ok(betaDensity(2 / 3, 8, 4) > betaDensity(2 / 3, 2, 2));
});

test('quadratic steps follow the stated gradient and approach the origin', () => {
  let point = [-2.8, 1.4];
  for (let i = 0; i < 24; i++) {
    const [x, y] = point;
    const next = quadraticStep(x, y);
    close(next[0], x - 0.12 * 2 * x);
    close(next[1], y - 0.12 * 6 * y);
    assert.ok(next[0] ** 2 + 3 * next[1] ** 2 < x ** 2 + 3 * y ** 2);
    point = next;
  }
  assert.ok(Math.hypot(...point) < 0.01);
});
