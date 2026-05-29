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
    category: 'ML & AI',
    caption: 'Modeling, fine-tuning, and evaluation stack.',
    skills: ['PyTorch', 'Hugging Face', 'scikit-learn', 'NumPy', 'LoRA / QLoRA fine-tuning'],
  },
  {
    category: 'LLM systems & agents',
    caption: 'Local inference, agent workflows, and training pipelines.',
    skills: ['Ollama', 'Unsloth', 'Agentic workflows (ReAct)', 'RAG', 'Reproducible experiments'],
  },
  {
    category: 'Systems & tools',
    caption: 'Backends, infrastructure, and collaboration.',
    skills: ['Linux / macOS / Windows', 'Git', 'FastAPI', 'REST APIs', 'JWT', 'JSON'],
  },
];
