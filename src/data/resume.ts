export type NavItem = {
  label: string;
  href: string;
};

export const profile = {
  name: 'Harsh Vardhan Bhanot',
  shortName: 'Harsh Bhanot',
  initials: 'HV',
  role: 'Builder — AI systems & LLM tooling',
  university: 'Texas A&M University – Corpus Christi',
  degree: 'B.S. Computer Science',
  minor: 'Applied Mathematics',
  graduation: '2026',
  location: 'Corpus Christi, TX',
  email: 'hvbhanot1@gmail.com',
  linkedin: 'https://linkedin.com/in/hvbhanot',
  github: 'https://github.com/hvbhanot',
  phone: '(361) 742-6865',
  bio: 'Computer science undergrad and builder focused on AI systems — LLM agents, AutoML, and fine-tuning tooling. I turn research ideas into reproducible software that other people can actually run.',
  tagline: 'AI systems · LLM tooling · ML engineering',
  upcoming: {
    degree: 'M.S. Statistics & Computer Science',
    institution: 'Texas Tech University',
    start: 'Fall 2026',
  },
};

export const navItems: NavItem[] = [
  { label: 'About', href: '#about' },
  { label: 'Focus', href: '#focus' },
  { label: 'Work', href: '#work' },
  { label: 'Contact', href: '#contact' },
];

export type Experience = {
  title: string;
  org: string;
  period: string;
  desc: string;
  bullets: string[];
};

export const experience: Experience[] = [
  {
    title: 'Undergraduate Research Assistant',
    org: 'Texas A&M University – Corpus Christi',
    period: '2025 – Present',
    desc: 'AI systems research — fine-tuning, agent workflows, and reproducible tooling, applied to evolutionary-simulation data.',
    bullets: [
      'Fine-tune transformer models with Hugging Face (LoRA / adapter methods) for code understanding and experiment summarization',
      'Design agent-based workflows that automate parameter sweeps and comparative outcome analysis',
      'Build Python analysis pipelines and reproducible artifacts — structured logs, versioned code, repeatable runs',
      'Apply the above to SLiM evolutionary simulations: mutation dynamics and population-level behavior',
    ],
  },
  {
    title: 'AI & ML Intern',
    org: 'DataEssenceAI',
    period: 'May 2024 – Aug 2024',
    desc: 'Built and evaluated machine learning models for market trend analysis with PyTorch and OpenCV.',
    bullets: [
      'Developed and evaluated ML models using PyTorch and OpenCV for market trend analysis',
      'Tuned hyperparameters — cut training time by 20% and improved predictive accuracy by 10%',
      'Collaborated with data science and DevOps teams on testing and deployment pipelines',
    ],
  },
  {
    title: 'Founder & Vice President',
    org: 'Islanders Research in AI',
    period: 'Jan 2023 – Present',
    desc: 'Founded and led a student research organization focused on artificial intelligence and machine learning.',
    bullets: [
      'Organized workshops on ML fundamentals, research tooling, and reproducible experimentation',
      'Mentored undergraduates on getting started in AI/ML research',
    ],
  },
];
