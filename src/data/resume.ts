import {
  Atom,
  Binary,
  BrainCircuit,
  Code2,
  Cpu,
  FlaskConical,
  GraduationCap,
  MapPin,
  Microscope,
  Network,
  Sigma,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export type NavItem = {
  label: string;
  href: string;
};

export type IdentityCard = {
  label: string;
  detail: string;
  icon: LucideIcon;
};

export type ResearchCapability = {
  title: string;
  detail: string;
  icon: LucideIcon;
};

export const profile = {
  name: 'Harsh Vardhan Bhanot',
  shortName: 'Harsh Bhanot',
  monogram: 'HVB',
  role: 'Computer Science student, AI/ML researcher, computational genetics researcher, and systems builder',
  university: 'Texas A&M University-Corpus Christi',
  degree: 'Bachelor of Science in Computer Science',
  minor: 'Applied Mathematics',
  graduation: 'Expected 2026',
  location: 'Corpus Christi, Texas',
  email: 'hvbhanot1@gmail.com',
  linkedin: 'https://linkedin.com/in/hvbhanot',
  linkedinLabel: 'linkedin.com/in/hvbhanot',
  github: 'https://github.com/hvbhanot',
  githubLabel: 'github.com/hvbhanot',
  tagline: 'AI systems, computational genetics, and reproducible research tooling.',
};

export const navItems: NavItem[] = [
  { label: 'About', href: '/about' },
  { label: 'Research', href: '/research' },
  { label: 'Projects', href: '/projects' },
  { label: 'Experience', href: '/experience' },
  { label: 'Contact', href: '/contact' },
];

export const identityCards: IdentityCard[] = [
  {
    label: 'Computer Science student',
    detail: 'B.S. Computer Science at Texas A&M University-Corpus Christi',
    icon: GraduationCap,
  },
  {
    label: 'Applied Mathematics minor',
    detail: 'Mathematical foundation for modeling, simulation, and ML',
    icon: Sigma,
  },
  {
    label: 'Undergraduate Research Assistant',
    detail: 'Computational genetics and AI systems research',
    icon: Microscope,
  },
  {
    label: 'AI/ML systems builder',
    detail: 'Research workflows, pipelines, and reproducible tooling',
    icon: BrainCircuit,
  },
];

export const researchInterests = [
  'Computational genetics',
  'Evolutionary simulation',
  'AI-assisted research workflows',
  'Transformer fine-tuning',
  'Domain-specific code understanding',
  'Experiment automation',
  'Reproducibility tooling',
];

export const researchCapabilities: ResearchCapability[] = [
  {
    title: 'SLiM simulation modeling',
    detail: 'Model genetic evolution and population-level behavior with evolutionary simulation frameworks.',
    icon: Atom,
  },
  {
    title: 'Mutation dynamics analysis',
    detail: 'Track mutation behavior across generations and evaluate outcome patterns.',
    icon: Network,
  },
  {
    title: 'Population-level fitness behavior',
    detail: 'Analyze simulated fitness changes and comparative dynamics across runs.',
    icon: FlaskConical,
  },
  {
    title: 'Python parsing pipelines',
    detail: 'Parse simulation outputs into structured artifacts for downstream analysis.',
    icon: Code2,
  },
  {
    title: 'Automated parameter sweeps',
    detail: 'Run controlled simulation variants to compare parameterized outcomes.',
    icon: Cpu,
  },
  {
    title: 'Comparative outcome analysis',
    detail: 'Summarize run-to-run differences with repeatable analysis notebooks and scripts.',
    icon: Binary,
  },
  {
    title: 'Hugging Face fine-tuning',
    detail: 'Fine-tune transformer-based models for research code understanding and summarization.',
    icon: BrainCircuit,
  },
  {
    title: 'LoRA/adapters',
    detail: 'Apply parameter-efficient tuning methods where full model training is unnecessary.',
    icon: Cpu,
  },
  {
    title: 'Structured experiment logs',
    detail: 'Preserve settings, outputs, and decisions so experiments can be inspected later.',
    icon: Code2,
  },
  {
    title: 'Version-controlled artifacts',
    detail: 'Keep codebases, logs, and research artifacts traceable across iterations.',
    icon: MapPin,
  },
];
