export type SkillGroup = {
  category: string;
  caption: string;
  skills: string[];
};

export const skillGroups: SkillGroup[] = [
  {
    category: 'Programming',
    caption: 'Languages used routinely in research and systems work.',
    skills: ['Python', 'Go', 'C++', 'Bash', 'SQL'],
  },
  {
    category: 'Machine learning',
    caption: 'Stack for modelling, fine-tuning, and evaluation.',
    skills: [
      'PyTorch',
      'Hugging Face Transformers',
      'scikit-learn',
      'Parameter-efficient fine-tuning',
      'LoRA / adapters',
    ],
  },
  {
    category: 'Scientific computing',
    caption: 'For simulation, analysis, and reproducible experiments.',
    skills: [
      'SLiM',
      'NumPy',
      'pandas',
      'Jupyter',
      'Simulation analysis',
      'Experiment automation',
    ],
  },
  {
    category: 'Systems',
    caption: 'Day-to-day environment and infrastructure.',
    skills: ['Linux', 'macOS', 'Git', 'REST APIs', 'JSON', 'JWT'],
  },
];
