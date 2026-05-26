export type ExperienceItem = {
  catalog: string;
  title: string;
  organization: string;
  location?: string;
  period: string;
  description: string;
  bullets: string[];
};

export const experience: ExperienceItem[] = [
  {
    catalog: '№ 01',
    title: 'Undergraduate Research Assistant',
    organization: 'Texas A&M University–Corpus Christi',
    location: 'Corpus Christi, TX',
    period: '2025 — present',
    description:
      'Computational genetics and AI systems research. Forward-time evolutionary simulation, Python analysis pipelines, and transformer fine-tuning for research-code understanding.',
    bullets: [
      'Model genetic evolution, mutation dynamics, and population-level fitness behaviour in SLiM.',
      'Build Python pipelines that parse simulation outputs and track mutations across generations.',
      'Automate parameter sweeps and comparative outcome analysis.',
      'Fine-tune transformer models with Hugging Face for code understanding and research workflow support.',
      'Apply parameter-efficient methods (adapters, LoRA-style) where full training is wasteful.',
      'Maintain reproducible logs, codebases, and research artifacts.',
    ],
  },
  {
    catalog: '№ 02',
    title: 'AI & ML Intern',
    organization: 'DataEssenceAI',
    location: 'Houston, TX',
    period: 'May 2024 — Aug 2024',
    description: 'Worked on PyTorch- and OpenCV-based machine learning models for market trend analysis.',
    bullets: [
      'Developed and evaluated ML models against a held-out benchmark.',
      'Ran hyperparameter tuning across configurations.',
      'Reduced training time by ~20% through pipeline and data-loading improvements.',
      'Improved predictive accuracy by ~10% relative to the prior baseline.',
      'Collaborated with data-science and DevOps teams on testing and deployment pipelines.',
    ],
  },
  {
    catalog: '№ 03',
    title: 'Founder & Vice President',
    organization: 'Islanders Research in AI',
    location: 'TAMU-CC',
    period: 'Jan 2023 — present',
    description: 'Founded and led a student research organisation focused on AI and ML.',
    bullets: [
      'Organised workshops on machine learning fundamentals.',
      'Taught research tooling (Git, environments, notebooks, logging).',
      'Promoted reproducible experimentation as a habit, not a checklist.',
      'Helped students find their way into AI research topics.',
    ],
  },
];
