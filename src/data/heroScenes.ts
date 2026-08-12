export type HeroSceneId =
  | 'gradient-descent'
  | 'gaussian'
  | 'vector-field'
  | 'fourier'
  | 'neural-net'
  | 'rose';

export type HeroScene = {
  id: HeroSceneId;
  label: string;
  caption: string;
  tex: string;
};

export const heroScenes: HeroScene[] = [
  {
    id: 'gradient-descent',
    label: '∇ descent',
    caption: 'θₜ₊₁ = θₜ − η ∇J · loss landscape',
    tex: '\\theta_{t+1}=\\theta_t-\\eta\\nabla J(\\theta_t)',
  },
  {
    id: 'gaussian',
    label: '𝒩(μ,Σ)',
    caption: 'Multivariate Gaussian samples · covariance ellipses',
    tex: 'x \\sim \\mathcal{N}(\\mu,\\Sigma)',
  },
  {
    id: 'vector-field',
    label: 'Field',
    caption: 'v(x,y) = (−y, x) · circulatory flow',
    tex: '\\mathbf{v}(x,y)=(-y,\\,x)',
  },
  {
    id: 'fourier',
    label: 'Fourier',
    caption: 'Partial sum of a square wave · Gibbs phenomenon',
    tex: 'f_N(t)=\\sum_{k=1}^{N}\\frac{\\sin((2k-1)t)}{2k-1}',
  },
  {
    id: 'neural-net',
    label: 'Network',
    caption: 'Layer graph · adjacency of a small MLP',
    tex: 'h^{(\\ell)}=\\sigma(W^{(\\ell)}h^{(\\ell-1)}+b^{(\\ell)})',
  },
  {
    id: 'rose',
    label: 'Rose',
    caption: 'r = a cos(kθ) · polar rose with drifting k',
    tex: 'r=a\\cos(k\\theta)',
  },
];
