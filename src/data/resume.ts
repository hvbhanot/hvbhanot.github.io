export type NavItem = {
  label: string;
  href: string;
};

export const profile = {
  name: 'Harsh Vardhan Bhanot',
  shortName: 'Harsh Bhanot',
  initials: 'HVB',
  role: 'AI systems built on mathematics',
  university: 'Texas A&M University – Corpus Christi',
  degree: 'B.S. Computer Science',
  concentration: 'Cyber Security / Infrastructure',
  minor: 'Applied Mathematics',
  graduation: 'Jul 2026',
  location: 'Lubbock, TX',
  coordinates: '33.5779° N, 101.8552° W',
  email: 'hvbhanot1@gmail.com',
  phone: '(361) 742-6865',
  linkedin: 'https://linkedin.com/in/hvbhanot',
  github: 'https://github.com/hvbhanot',
  openwebui: 'https://openwebui.com/u/hvbhanot',
  tensortonic: '№ 42 worldwide on TensorTonic',
  bio: 'Dual M.S. student in Statistics and Computer Science at Texas Tech University (Lubbock). B.S. Computer Science from Texas A&M University–Corpus Christi (2026). I treat models as statistical objects — likelihoods, estimators, and optimization paths — then ship them as systems: agents, fine-tuning loops, and tooling that another person can re-run without faith.',
  tagline: 'AI Systems Built on Mathematics.',
  subline:
    'Dual M.S. · Statistics & Computer Science · Texas Tech · TensorTonic Rank 42 · Open WebUI top 0.8%',
  /** Current graduate program (primary academic status). */
  masters: {
    degree: 'M.S. Statistics + M.S. Computer Science (concurrent)',
    institution: 'Texas Tech University',
    period: '2026 – present',
    status: 'In progress',
  },
};

export const navItems: NavItem[] = [
  { label: 'About', href: '#about' },
  { label: 'Research', href: '#research' },
  { label: 'Stats', href: '#stats' },
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
      'Fine-tuned transformer-based code models with parameter-efficient methods (LoRA / QLoRA adapters) on domain-specific corpora',
      'Built Python pipelines that parse SLiM evolutionary-simulation outputs and track mutations across generations',
      'Designed lightweight agent-based workflows that automate simulation parameter sweeps and comparative analysis',
      'Kept everything reproducible: version-controlled codebases with structured experiment logs',
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
      'Provided hardware and software support across a 3,000+ person campus community',
      'Implemented a ticketing-workflow change that improved resolution times by 15%',
    ],
  },
  {
    title: 'Founder & Vice President',
    org: 'Islanders Research in AI',
    period: 'Jan 2023 – Jul 2026',
    desc: 'Founded and led a 30+ member student research organization focused on AI and machine learning.',
    bullets: [
      'Organized workshops on ML fundamentals and reproducible experimentation',
      'Led outreach and secured specialized computing resources for member research',
    ],
  },
];

export type CitationMetric = {
  label: string;
  value: string;
  href?: string;
  featured?: boolean;
};

export const citationMetrics: CitationMetric[] = [
  {
    label: 'Open WebUI',
    value: '1,415 downloads · top 0.8%',
    href: 'https://openwebui.com/u/hvbhanot',
    featured: true,
  },
  { label: 'TensorTonic', value: '№ 42 worldwide' },
  { label: 'Program', value: 'Dual M.S. · Texas Tech' },
];

/** Community standing — treated as a checkable result, not a social link. */
export const openWebuiResult = {
  n: '1.5',
  title: 'Open WebUI',
  href: 'https://openwebui.com/u/hvbhanot',
  handle: '@hvbhanot',
  rank: '0.8%',
  rankLabel: 'contribution rank',
  lede:
    'Functions and tools published to a 470k-member self-hosted AI community — Deep Research, OI Browser Agent, and the rest of the @hvbhanot catalog.',
  stats: [
    { value: '1,415', label: 'downloads' },
    { value: '15', label: 'contributions' },
    { value: '8', label: 'published works' },
    { value: '38', label: 'points · top 4%' },
  ],
};
