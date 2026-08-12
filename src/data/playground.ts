export type PlaygroundId =
  | 'sampling'
  | 'regression'
  | 'bayes'
  | 'gd'
  | 'pca'
  | 'softmax'
  | 'montecarlo';

export type PlaygroundConfig = {
  id: PlaygroundId;
  title: string;
  lede: string;
  equation: string;
  accent: 'prob' | 'gd' | 'proof' | 'math';
};

export const playgroundExperiments: PlaygroundConfig[] = [
  {
    id: 'sampling',
    title: 'Sampling distributions',
    lede: 'Pick a parent law (Gaussian, uniform, exponential). Resample means and watch concentration as n grows.',
    equation: '\\bar{X}_n = \\frac{1}{n}\\sum_{i=1}^{n} X_i',
    accent: 'prob',
  },
  {
    id: 'regression',
    title: 'Ordinary least squares',
    lede: 'Simulate y = β₀ + β₁x + ε, fit the normal equations, and watch R² move with noise level σ.',
    equation: '\\hat{\\beta} = (X^{\\top}X)^{-1}X^{\\top}y',
    accent: 'proof',
  },
  {
    id: 'bayes',
    title: 'Bayesian updating',
    lede: 'Conjugate Beta–Binomial: prior Beta(α, β), Bernoulli likelihood, closed-form posterior after each head or tail.',
    equation: 'p(\\theta \\mid D) \\propto p(D \\mid \\theta)\\,p(\\theta)',
    accent: 'math',
  },
  {
    id: 'gd',
    title: 'Gradient descent',
    lede: 'Discrete flow θₜ₊₁ = θₜ − η∇J on a quadratic bowl or Rosenbrock-lite valley. Step size η is the only hyperparameter.',
    equation: '\\theta_{t+1} = \\theta_t - \\eta \\nabla J(\\theta_t)',
    accent: 'gd',
  },
  {
    id: 'pca',
    title: 'Principal components',
    lede: '2D Gaussian cloud with adjustable correlation ρ. Draw Σ’s eigenvectors — the principal axes of the data.',
    equation: '\\Sigma v = \\lambda v',
    accent: 'prob',
  },
  {
    id: 'softmax',
    title: 'Softmax temperature',
    lede: 'Map logits z to a categorical distribution. Temperature T sharpens (T→0) or flattens (T→∞) the simplex.',
    equation: 'p_i = \\frac{e^{z_i/T}}{\\sum_j e^{z_j/T}}',
    accent: 'math',
  },
  {
    id: 'montecarlo',
    title: 'Monte Carlo π',
    lede: 'Throw uniform points in [−1,1]². The fraction inside the unit disk estimates π/4 — variance falls as 1/N.',
    equation: '\\hat{\\pi}_N = 4\\cdot\\frac{\\#\\{x_i^2+y_i^2\\le 1\\}}{N}',
    accent: 'gd',
  },
];
