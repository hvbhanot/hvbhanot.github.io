export type ExperienceItem = {
  title: string;
  organization: string;
  location?: string;
  period: string;
  description: string;
  bullets: string[];
};

export const experience: ExperienceItem[] = [
  {
    title: 'Undergraduate Research Assistant',
    organization: 'Texas A&M University-Corpus Christi',
    period: '2025 - Present',
    description:
      'Computational Genetics & AI Systems research using SLiM evolutionary simulations, Python analysis pipelines, agent-based workflows, and transformer fine-tuning for scientific computing and research support.',
    bullets: [
      'Model genetic evolution, mutation dynamics, and population-level fitness behavior using SLiM.',
      'Build Python pipelines to parse simulation outputs and track mutations across generations.',
      'Automate simulation parameter sweeps and comparative outcome analysis.',
      'Fine-tune transformer-based models using Hugging Face for code understanding and research workflow support.',
      'Apply parameter-efficient fine-tuning methods such as adapters and LoRA-style techniques.',
      'Maintain reproducible logs, codebases, and research artifacts.',
    ],
  },
  {
    title: 'AI & ML Intern',
    organization: 'DataEssenceAI',
    location: 'Houston, TX',
    period: 'May 2024 - Aug 2024',
    description: 'Worked on machine learning models using PyTorch and OpenCV for market trend analysis.',
    bullets: [
      'Developed and evaluated ML models.',
      'Performed hyperparameter tuning.',
      'Reduced training time by 20%.',
      'Improved predictive accuracy by 10%.',
      'Collaborated with data science and DevOps teams on testing and deployment pipelines.',
    ],
  },
  {
    title: 'Founder & Vice President',
    organization: 'Islanders Research in AI',
    period: 'Jan 2023 - Present',
    description: 'Founded and led a student research organization focused on AI and ML.',
    bullets: [
      'Organized workshops on ML fundamentals.',
      'Taught research tooling.',
      'Promoted reproducible experimentation.',
      'Helped students engage with AI research topics.',
    ],
  },
];
