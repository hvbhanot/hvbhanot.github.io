export type FocusArea = {
  title: string;
  desc: string;
  methods: string[];
};

export const focusAreas: FocusArea[] = [
  {
    title: 'Computational genetics',
    desc: 'Forward-time evolutionary simulations in SLiM for mutation dynamics, population fitness, and selection pressure at scale.',
    methods: ['SLiM 4', 'Python pipelines', 'Parameter sweeps'],
  },
  {
    title: 'AI for research code',
    desc: 'Transformer fine-tuning on curated scientific code so models can summarize, navigate, and reason about unfamiliar repositories.',
    methods: ['Hugging Face', 'LoRA adapters', 'Eval harnesses'],
  },
  {
    title: 'Reproducible tooling',
    desc: 'Parsers, artifact writers, sweep runners, and notebooks designed to survive handoffs and semester boundaries.',
    methods: ['pandas / NumPy', 'Jupyter', 'Git audit trails'],
  },
];

export const methodStatement = {
  heading: 'Make the experiment legible before optimizing it',
  body: 'I care about the trail from hypothesis to artifact: parameters, code, model behavior, outputs, and the notes that let someone else reproduce the run.',
};

export const researchQuote =
  'The goal is not just to get a result. The goal is to leave behind a system that makes the result inspectable, repeatable, and useful to the next person.';
