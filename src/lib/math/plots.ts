function factorial(n: number): number {
  let result = 1;
  for (let i = 2; i <= n; i++) result *= i;
  return result;
}

/** Beta density for the integer shapes used by the inference figure (a, b > 1). */
export function betaDensity(x: number, a: number, b: number): number {
  if (!Number.isInteger(a) || !Number.isInteger(b) || a <= 1 || b <= 1)
    throw new Error('This figure supports integer Beta shapes greater than 1.');
  if (x <= 0 || x >= 1) return 0;
  const beta = (factorial(a - 1) * factorial(b - 1)) / factorial(a + b - 1);
  return (x ** (a - 1) * (1 - x) ** (b - 1)) / beta;
}

/** One gradient step for J(x, y) = x² + 3y². */
export function quadraticStep(
  x: number,
  y: number,
  learningRate = 0.12,
): [number, number] {
  return [x * (1 - 2 * learningRate), y * (1 - 6 * learningRate)];
}
