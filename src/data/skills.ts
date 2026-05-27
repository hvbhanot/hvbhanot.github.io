export type SkillGroup = {
  category: string;
  caption: string;
  skills: string[];
};

export const skillGroups: SkillGroup[] = [
  {
    category: 'Programming Languages',
    caption: 'Core languages for research systems and tooling.',
    skills: ['Python', 'Go', 'C++', 'Bash', 'SQL'],
  },
  {
    category: 'ML & AI',
    caption: 'Modeling, fine-tuning, and evaluation stack.',
    skills: ['PyTorch', 'Hugging Face', 'scikit-learn', 'Parameter-efficient fine-tuning (LoRA/adapters)'],
  },
  {
    category: 'Scientific Computing',
    caption: 'Simulation, analysis, and experiment automation.',
    skills: ['SLiM', 'NumPy', 'pandas', 'Simulation analysis', 'Reproducibility tooling'],
  },
  {
    category: 'Systems & Tools',
    caption: 'Environment, collaboration, and infrastructure.',
    skills: ['Linux / macOS / Windows', 'Git', 'REST APIs', 'JWT', 'JSON'],
  },
];