export type SkillGroup = {
  category: string;
  caption: string;
  skills: string[];
};

export const skillGroups: SkillGroup[] = [
  {
    category: 'Languages',
    caption: 'Primary languages used in research and systems work.',
    skills: ['Python', 'Go', 'C++', 'Bash', 'SQL'],
  },
  {
    category: 'Machine Learning',
    caption: 'Modeling, fine-tuning, and evaluation stack.',
    skills: ['PyTorch', 'Hugging Face Transformers', 'scikit-learn', 'LoRA / adapters', 'Evaluation pipelines'],
  },
  {
    category: 'Scientific Computing',
    caption: 'Simulation, analysis, and experiment automation.',
    skills: ['SLiM', 'NumPy', 'pandas', 'Jupyter', 'Simulation analysis'],
  },
  {
    category: 'Infrastructure',
    caption: 'Day-to-day environment and collaboration tools.',
    skills: ['Linux', 'Git', 'GitHub', 'REST APIs', 'JSON'],
  },
];