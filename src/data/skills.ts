export type SkillGroup = {
  category: string;
  caption: string;
  skills: string[];
};

export const skillGroups: SkillGroup[] = [
  {
    category: 'Languages',
    caption: 'Core languages for AI systems and tooling.',
    skills: ['Python', 'Go', 'C++', 'Bash', 'SQL'],
  },
  {
    category: 'AI & ML',
    caption: 'Modeling, fine-tuning, and multi-agent stack.',
    skills: [
      'PyTorch',
      'Hugging Face Transformers',
      'scikit-learn',
      'OpenCV',
      'LoRA / QLoRA fine-tuning',
      'GGUF quantization',
      'Multi-agent LLM systems',
    ],
  },
  {
    category: 'Systems & tooling',
    caption: 'Infrastructure, backends, and self-hosted inference.',
    skills: [
      'Linux / macOS / Windows',
      'Git',
      'Docker',
      'FastAPI',
      'REST APIs · JWT',
      'Ollama (self-hosted inference)',
    ],
  },
  {
    category: 'Scientific computing & statistics',
    caption: 'Inference, simulation, and reproducible experiments.',
    skills: [
      'Statistical inference',
      'Probability',
      'Simulation analysis',
      'Experiment automation',
      'pandas · NumPy · Matplotlib',
    ],
  },
];
