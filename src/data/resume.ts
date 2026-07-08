export type NavItem = {
  label: string;
  href: string;
};

export const profile = {
  name: 'Harsh Vardhan Bhanot',
  shortName: 'Harsh Bhanot',
  initials: 'HVB',
  role: 'AI systems — agents, fine-tuning, statistics',
  university: 'Texas A&M University – Corpus Christi',
  degree: 'B.S. Computer Science',
  concentration: 'Cyber Security / Infrastructure',
  minor: 'Applied Mathematics',
  graduation: 'Jul 2026',
  location: 'Corpus Christi, TX',
  coordinates: '27.8006° N, 97.3964° W',
  email: 'hvbhanot1@gmail.com',
  phone: '(361) 742-6865',
  linkedin: 'https://linkedin.com/in/hvbhanot',
  github: 'https://github.com/hvbhanot',
  tensortonic: '№ 42 worldwide on TensorTonic',
  certification: 'CFI FinTech Industry Professional (FTIP)',
  bio: 'Computer science graduate (TAMU-CC, 2026) heading into concurrent M.S. degrees in Statistics and Computer Science at Texas Tech. I build AI systems — LLM agents, fine-tuning pipelines, and research tooling — and hold them to the standard of a proof: reproducible, inspectable, and runnable by someone who is not me.',
  tagline: 'AI agents · fine-tuning · statistical research',
  upcoming: {
    degree: 'M.S. Statistics + M.S. Computer Science (concurrent)',
    institution: 'Texas Tech University',
    start: 'Fall 2026',
  },
};

export const navItems: NavItem[] = [
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Work', href: '#work' },
  { label: 'Toolkit', href: '#toolkit' },
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
    org: 'Texas A&M University – Corpus Christi · Computational Genetics & AI Systems',
    period: '2025 – Jul 2026',
    desc: 'AI systems research — fine-tuning, agent workflows, and reproducible tooling, applied to evolutionary-simulation data.',
    bullets: [
      'Fine-tune transformer-based code models with parameter-efficient methods (LoRA / QLoRA adapters) on domain-specific corpora',
      'Build Python pipelines that parse SLiM evolutionary-simulation outputs and track mutations across generations',
      'Design lightweight agent-based workflows that automate simulation parameter sweeps and comparative analysis',
      'Keep everything reproducible: version-controlled codebases with structured experiment logs',
    ],
  },
  {
    title: 'AI & ML Intern',
    org: 'DataEssenceAI · Houston, TX',
    period: 'May 2024 – Aug 2024',
    desc: 'Built and evaluated machine learning models for market-trend prediction with PyTorch and OpenCV.',
    bullets: [
      'Developed and evaluated ML models using PyTorch and OpenCV for market-trend prediction',
      'Tuned hyperparameters — cut training time by 20% and improved predictive accuracy by 10%',
      'Collaborated with data science and DevOps teams on testing and deployment pipelines',
    ],
  },
  {
    title: 'Hardware Support Intern',
    org: 'Texas A&M University – Corpus Christi · IT Department',
    period: 'Jan 2024 – Jul 2026',
    desc: 'Technical support for hardware and software issues serving 3,000+ students and faculty.',
    bullets: [
      'Provide hardware and software support across a 3,000+ person campus community',
      'Implemented a ticketing-workflow change that improved resolution times by 15%',
    ],
  },
  {
    title: 'Founder & Vice President',
    org: 'Islanders Research in AI',
    period: 'Jan 2023 – Jul 2026',
    desc: 'Founded and lead a 30+ member student research organization focused on AI and machine learning.',
    bullets: [
      'Organize workshops on ML fundamentals and reproducible experimentation',
      'Lead outreach and secured specialized computing resources for member research',
    ],
  },
];
