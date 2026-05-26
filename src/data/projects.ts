export type Project = {
  catalog: string;
  title: string;
  subtitle: string;
  year: string;
  status: 'active' | 'archived' | 'ongoing';
  description: string;
  highlights: string[];
  technologies: string[];
  href?: string;
};

export const projects: Project[] = [
  {
    catalog: '№ 001.A',
    title: 'Transformer fine-tuning for research code',
    subtitle: 'Domain-specific code understanding',
    year: '2025',
    status: 'ongoing',
    description:
      'Fine-tuning transformer models on a small corpus of scientific code so that they can summarise, navigate, and reason about an unfamiliar research codebase without hallucinating its conventions.',
    highlights: [
      'Hugging Face training stack with adapter-style fine-tuning',
      'LoRA experiments on a curated research-code corpus',
      'Evaluation pipeline tracking exact-match, BLEU, and human review',
      'Reproducible runs, persisted with structured experiment logs',
    ],
    technologies: ['PyTorch', 'Hugging Face', 'LoRA / adapters', 'Python'],
  },
  {
    catalog: '№ 002.A',
    title: 'AI research workflow tools',
    subtitle: 'Simulation analysis & reproducibility',
    year: '2025',
    status: 'active',
    description:
      'A small set of Python tools sitting around SLiM evolutionary simulations: a parser for raw output, a sweep runner, comparative analysis notebooks, and an experiment log that survives the semester.',
    highlights: [
      'SLiM output parser and structured artifact writer',
      'Parameter sweep automation with reproducible seeds',
      'Mutation tracking across generations and configurations',
      'Notebooks that explain themselves a year later',
    ],
    technologies: ['Python', 'SLiM', 'pandas', 'NumPy'],
  },
  {
    catalog: '№ 003.A',
    title: 'Clutch-Call',
    subtitle: 'High-pressure decision modelling for sports',
    year: '2024',
    status: 'archived',
    description:
      'Collaborative machine learning project modelling decision-making in late-game, high-leverage sports scenarios. Built the data preprocessing, feature engineering, and model evaluation pipeline alongside two collaborators.',
    highlights: [
      'Cleaned and aligned multiple raw event-level datasets',
      'Designed leverage- and context-aware features',
      'Trained baselines and tracked them with a single evaluation pipeline',
    ],
    technologies: ['Python', 'scikit-learn', 'pandas'],
    href: 'https://github.com/JustinSu11/clutch-call',
  },
  {
    catalog: '№ 004.A',
    title: 'Neural network from scratch',
    subtitle: 'Iris classification, no frameworks',
    year: '2023',
    status: 'archived',
    description:
      'A multi-layer perceptron written from first principles in NumPy — forward pass, backpropagation, gradient descent. A small project written to keep the maths honest.',
    highlights: [
      'ReLU activations, softmax output',
      'Hand-written backpropagation',
      'Over 90% test accuracy on the Iris dataset',
    ],
    technologies: ['Python', 'NumPy'],
  },
];
