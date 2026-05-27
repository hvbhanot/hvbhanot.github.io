export type NavItem = {
  label: string;
  href: string;
};

export const profile = {
  name: 'Harsh Vardhan Bhanot',
  shortName: 'Harsh Bhanot',
  initials: 'HV',
  role: 'Undergraduate Researcher & Builder',
  university: 'Texas A&M University – Corpus Christi',
  degree: 'B.S. Computer Science',
  minor: 'Applied Mathematics',
  graduation: 'May 2026',
  location: 'Corpus Christi, TX',
  email: 'hvbhanot1@gmail.com',
  linkedin: 'https://linkedin.com/in/hvbhanot',
  github: 'https://github.com/hvbhanot',
  phone: '(361) 742-6865',
  bio: 'Undergraduate researcher working at the intersection of computational genetics, machine learning, and reproducible tooling. Building systems that make research easier to audit, repeat, and explain.',
  tagline: 'Computational genetics · AI systems · Research tooling',
  upcoming: {
    degree: 'M.S. Statistics & Computer Science',
    institution: 'Texas Tech University',
    start: 'Fall 2026',
  },
};

export const navItems: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Projects', href: '/projects' },
  { label: 'Research', href: '/research' },
  { label: 'Contact', href: '/contact' },
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
    desc: 'Computational genetics and AI systems research using SLiM evolutionary simulation frameworks.',
    bullets: [
      'Model genetic evolution, mutation dynamics, and population-level fitness behavior in SLiM',
      'Develop Python-based analysis pipelines to parse SLiM outputs and track mutations across generations',
      'Design lightweight agent-based workflows to automate simulation parameter sweeps',
      'Fine-tune transformer models with Hugging Face using parameter-efficient methods (LoRA/adapters) for code understanding',
      'Maintain structured experiment logs, version-controlled codebases, and reproducible research artifacts',
    ],
  },
  {
    title: 'AI & ML Intern',
    org: 'DataEssenceAI',
    period: 'May 2024 – Aug 2024',
    desc: 'Developed machine learning models for market trend analysis using PyTorch and OpenCV.',
    bullets: [
      'Developed and evaluated ML models using PyTorch and OpenCV for market trend analysis',
      'Performed hyperparameter tuning, reducing training time by 20% and improving predictive accuracy by 10%',
      'Collaborated with data science and DevOps teams to support testing and deployment pipelines',
    ],
  },
  {
    title: 'Founder & Vice President',
    org: 'Islanders Research in AI',
    period: 'Jan 2023 – Present',
    desc: 'Founded and led a student research organization focused on artificial intelligence and machine learning.',
    bullets: [
      'Organized workshops on ML fundamentals, research tooling, and reproducible experimentation',
      'Taught reproducible experimentation practices to undergraduate researchers',
      'Helped students find their way into AI research topics',
    ],
  },
];
