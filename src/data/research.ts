export type FocusArea = {
  title: string;
  desc: string;
  methods: string[];
  /** Optional KaTeX for lemma-style cards */
  tex?: string;
};

export const focusAreas: FocusArea[] = [
  {
    title: 'LLM agents & systems',
    desc: 'Multi-agent architectures as structured inference: ReAct traces, tool use, scratchpad memory, and verification loops — with local models so the experiment stays reproducible.',
    methods: ['Ollama', 'ReAct', 'Tool integration'],
    tex: '\\mathrm{act}_t \\sim \\pi(\\cdot \\mid s_t, \\mathcal{M})',
  },
  {
    title: 'AutoML & fine-tuning',
    desc: 'Search over architectures and adapters as model selection: propose θ, train, read learning curves, revise — LoRA/QLoRA as low-rank capacity knobs, not magic switches.',
    methods: ['PyTorch', 'Unsloth', 'LoRA / QLoRA'],
    tex: '\\Delta W = BA,\\; \\mathrm{rank}(B)=r',
  },
  {
    title: 'Statistical ML & evaluation',
    desc: 'First-principles estimators, honest loss surfaces, and audit trails — from NumPy primitives to experiment logs that survive handoffs and re-runs.',
    methods: ['NumPy', 'scikit-learn', 'Git audit trails'],
    tex: '\\hat{\\theta}_n = \\arg\\min_\\theta \\, \\widehat{\\mathcal{L}}_n(\\theta)',
  },
];

export const methodStatement = {
  heading: 'Specify the estimator before you optimize it',
  body: 'I care about the map from data to decision: likelihood or loss, the parameter path, the sampling variability, and the artifacts that let someone else reproduce the run.',
};

export const researchQuote =
  'A result without a reproducible experiment is an anecdote. A system without inspectable state is a black box. Prefer both to be measurable.';

/** Section identities — numbered like a paper, not corner decoration */
export const sectionEquations = {
  about: {
    tex: 'P(\\theta \\mid D) = \\frac{P(D \\mid \\theta)\\,P(\\theta)}{P(D)}',
    n: '1.1',
  },
  research: {
    tex: '\\mathcal{L}(\\theta) = \\mathbb{E}_{(x,y)\\sim \\mathcal{D}}\\,[\\ell(f_\\theta(x), y)]',
    n: '2.1',
  },
  stats: {
    tex: '\\sqrt{n}\\,(\\bar{X}_n - \\mu) \\xrightarrow{d} \\mathcal{N}(0,\\sigma^2)',
    n: '3.1',
  },
  contact: {
    tex: '\\mathrm{Corr}(X,Y) = \\frac{\\mathrm{Cov}(X,Y)}{\\sigma_X \\sigma_Y}',
    n: '4.1',
  },
};
