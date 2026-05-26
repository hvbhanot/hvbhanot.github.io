export type NavItem = {
  label: string;
  href: string;
  index: string;
};

export const profile = {
  name: 'Harsh Vardhan Bhanot',
  shortName: 'Harsh Bhanot',
  initials: 'HVB',
  role: 'Computer science student, undergraduate researcher, builder of reproducible research tooling.',
  university: 'Texas A&M University–Corpus Christi',
  degree: 'B.S. Computer Science',
  minor: 'Applied Mathematics (minor)',
  graduation: 'Expected May 2026',
  location: 'Corpus Christi, Texas',
  email: 'hvbhanot1@gmail.com',
  linkedin: 'https://linkedin.com/in/hvbhanot',
  linkedinLabel: 'linkedin.com/in/hvbhanot',
  github: 'https://github.com/hvbhanot',
  githubLabel: 'github.com/hvbhanot',
  tagline: 'AI systems · computational genetics · reproducible research tooling',
  motto: 'Research signal from a South Texas lab desk.',
};

export const navItems: NavItem[] = [
  { label: 'Signal', href: '/', index: '00' },
  { label: 'Origin', href: '/about', index: '01' },
  { label: 'Builds', href: '/work', index: '02' },
  { label: 'Notes', href: '/notes', index: '03' },
  { label: 'Record', href: '/experience', index: '04' },
  { label: 'Ping', href: '/contact', index: '05' },
  { label: 'Lab', href: '/lab', index: '06' },
];

// Hidden / utility routes — not shown in main nav.
export const adminRoute = { label: 'Admin', href: '/admin' };

export const researchInterests = [
  'Computational genetics',
  'Evolutionary simulation (SLiM)',
  'AI-assisted research workflows',
  'Transformer fine-tuning',
  'Domain-specific code understanding',
  'Experiment automation',
  'Reproducibility tooling',
];

export type IdentityFact = {
  label: string;
  detail: string;
};

export const identityFacts: IdentityFact[] = [
  {
    label: 'Standing',
    detail: 'Undergraduate, Computer Science (B.S.), with a minor in Applied Mathematics.',
  },
  {
    label: 'Affiliation',
    detail: 'Texas A&M University–Corpus Christi. Undergraduate Research Assistant.',
  },
  {
    label: 'Subjects',
    detail: 'Computational genetics, evolutionary simulation, AI systems, scientific computing.',
  },
  {
    label: 'Method',
    detail: 'Quiet pipelines. Reproducible artifacts. Notes you can come back to a year later.',
  },
];

export type Capability = {
  title: string;
  detail: string;
};

export const capabilities: Capability[] = [
  {
    title: 'SLiM simulation modelling',
    detail: 'Model evolution and population behaviour with forward-time genetic simulation frameworks.',
  },
  {
    title: 'Mutation dynamics',
    detail: 'Track mutation behaviour across generations and evaluate outcome patterns.',
  },
  {
    title: 'Population-level fitness',
    detail: 'Analyse simulated fitness changes and comparative dynamics across runs.',
  },
  {
    title: 'Python parsing pipelines',
    detail: 'Turn raw simulation output into structured artifacts ready for analysis.',
  },
  {
    title: 'Automated parameter sweeps',
    detail: 'Run controlled simulation variants and reconcile their outcomes systematically.',
  },
  {
    title: 'Comparative outcome analysis',
    detail: 'Summarise run-to-run differences in notebooks that survive the year.',
  },
  {
    title: 'Hugging Face fine-tuning',
    detail: 'Adapt transformer models for research-code understanding and summarisation.',
  },
  {
    title: 'LoRA / adapters',
    detail: 'Use parameter-efficient tuning where full model training is wasteful.',
  },
  {
    title: 'Structured experiment logs',
    detail: 'Preserve settings, outputs, and decisions so the work can be inspected later.',
  },
  {
    title: 'Version-controlled artifacts',
    detail: 'Keep codebases, logs, and figures traceable across iterations.',
  },
];
