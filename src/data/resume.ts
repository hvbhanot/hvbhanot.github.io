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
  bio: 'Undergraduate researcher working at the intersection of computational genetics, machine learning, and reproducible tooling. I build things that make research easier to audit, repeat, and explain.',
  tagline: 'Computational genetics · AI systems · Research tooling',
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
    period: '2025 – present',
    desc: 'Computational genetics and AI systems research. Forward-time evolutionary simulation in SLiM, Python analysis pipelines, and transformer fine-tuning for research-code understanding.',
    bullets: [
      'Model genetic evolution, mutation dynamics, and population fitness in SLiM',
      'Build Python pipelines that parse simulation outputs and track mutations',
      'Fine-tune transformer models with Hugging Face for code understanding',
      'Maintain reproducible logs, codebases, and research artifacts',
    ],
  },
  {
    title: 'AI & ML Intern',
    org: 'DataEssenceAI',
    period: 'May 2024 – Aug 2024',
    desc: 'Worked on PyTorch- and OpenCV-based ML models for market trend analysis.',
    bullets: [
      'Developed and evaluated ML models against held-out benchmarks',
      'Reduced training time by ~20% through pipeline optimizations',
      'Improved predictive accuracy by ~10% over prior baseline',
    ],
  },
  {
    title: 'Founder & Vice President',
    org: 'Islanders Research in AI',
    period: 'Jan 2023 – present',
    desc: 'Founded and led a student research organisation focused on AI and ML.',
    bullets: [
      'Organised workshops on machine learning fundamentals',
      'Taught reproducible experimentation as a practice',
      'Helped students find their way into AI research topics',
    ],
  },
];
