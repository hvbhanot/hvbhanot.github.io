export type SkillGroup = {
  category: string;
  skills: string[];
};

export const skillGroups: SkillGroup[] = [
  {
    category: 'Programming',
    skills: ['Python', 'Go', 'C++', 'Bash', 'SQL'],
  },
  {
    category: 'ML & AI',
    skills: ['PyTorch', 'Hugging Face', 'scikit-learn', 'Parameter-efficient fine-tuning', 'Transformer models', 'LoRA/adapters'],
  },
  {
    category: 'Scientific Computing',
    skills: ['Simulation analysis', 'Experiment automation', 'Reproducibility tooling', 'Research pipelines'],
  },
  {
    category: 'Systems',
    skills: ['Linux', 'macOS', 'Windows', 'Git', 'REST APIs', 'JWT', 'JSON'],
  },
];
