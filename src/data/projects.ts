import { Activity, BrainCircuit, ChartNoAxesCombined, FlaskConical } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export type Project = {
  title: string;
  subtitle: string;
  description: string;
  highlights: string[];
  technologies: string[];
  href?: string;
  icon: LucideIcon;
};

export const projects: Project[] = [
  {
    title: 'Clutch-Call',
    subtitle: 'Sports Analytics & Prediction System',
    description:
      'Collaborative machine learning project analyzing high-pressure decision-making scenarios in sports.',
    highlights: ['Data preprocessing', 'Feature engineering', 'Model evaluation pipelines', 'Sports analytics and prediction'],
    technologies: ['Machine learning', 'Data pipelines', 'Sports analytics'],
    href: 'https://github.com/JustinSu11/clutch-call',
    icon: ChartNoAxesCombined,
  },
  {
    title: 'Neural Network from Scratch',
    subtitle: 'Iris Classification',
    description:
      'Implemented a multi-layer neural network using NumPy without deep learning frameworks.',
    highlights: ['ReLU activations', 'Softmax outputs', 'Gradient descent', 'Over 90% test accuracy'],
    technologies: ['Python', 'NumPy', 'Neural networks'],
    icon: BrainCircuit,
  },
  {
    title: 'AI Research Workflow Tools',
    subtitle: 'Simulation Analysis & Reproducibility',
    description:
      'Research tooling around simulation analysis, experiment automation, logs, and reproducible pipelines.',
    highlights: ['SLiM output parsing', 'Mutation tracking', 'Parameter sweep automation', 'Structured logs'],
    technologies: ['Python', 'SLiM', 'Research pipelines'],
    icon: FlaskConical,
  },
  {
    title: 'Transformer Fine-Tuning for Research Code',
    subtitle: 'Domain-Specific Code Understanding',
    description:
      'Fine-tuning transformer-based models for code understanding, experiment summarization, and research workflow support.',
    highlights: [
      'Hugging Face',
      'Parameter-efficient fine-tuning',
      'Adapter / LoRA-style methods',
      'Domain-specific code corpora',
    ],
    technologies: ['Transformers', 'Hugging Face', 'LoRA/adapters'],
    icon: Activity,
  },
];
