import {
  BrainCircuit,
  Cpu,
  DatabaseZap,
  GitBranch,
  GraduationCap,
  Network,
  Radar,
  ShieldCheck,
  TerminalSquare,
} from 'lucide-react';

export const navItems = [
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
];

export const projects = [
  {
    title: 'Professor Tux',
    category: 'RAG tutoring system',
    description:
      'AI tutoring system with retrieval-augmented generation, FastAPI orchestration, Ollama inference, MiniLM embeddings, and ChromaDB-backed course memory.',
    stack: ['FastAPI', 'Ollama', 'MiniLM', 'ChromaDB'],
    icon: BrainCircuit,
    href: 'https://github.com/hvbhanot',
  },
  {
    title: 'LLM Council',
    category: 'Multi-model comparison',
    description:
      'A structured debate and comparison system where multiple Ollama Cloud models argue, critique, and converge on stronger answers.',
    stack: ['Ollama Cloud', 'FastAPI', 'React', 'Evaluation'],
    icon: Network,
    href: 'https://github.com/hvbhanot',
  },
  {
    title: 'Edge AI NAS',
    category: 'Hardware AI system',
    description:
      'Raspberry Pi 5 plus Hailo NPU based AI-powered NAS for local photo recognition, indexing, and private edge inference workflows.',
    stack: ['Raspberry Pi 5', 'Hailo NPU', 'Linux', 'Vision AI'],
    icon: DatabaseZap,
    href: 'https://github.com/hvbhanot',
  },
  {
    title: 'SLiM Code Generation Agent',
    category: 'Fine-tuned coding model',
    description:
      'Fine-tuned code generation model with an evaluation harness for SLiM/Eidos workflows, testable outputs, and reproducible model iteration.',
    stack: ['LoRA', 'PyTorch', 'Hugging Face', 'Eval Harness'],
    icon: TerminalSquare,
    href: 'https://github.com/hvbhanot',
  },
  {
    title: 'Cybersecurity Labs',
    category: 'Applied security practice',
    description:
      'CTF, OSINT, pentesting, packet analysis, and network reconnaissance projects built around practical workflows and repeatable notes.',
    stack: ['Nmap', 'Wireshark', 'OSINT', 'CTF'],
    icon: ShieldCheck,
    href: 'https://github.com/hvbhanot',
  },
];

export const skillGroups = [
  {
    title: 'AI and Machine Learning',
    icon: BrainCircuit,
    skills: ['PyTorch', 'Embeddings', 'RAG', 'LoRA', 'Hugging Face', 'Ollama'],
  },
  {
    title: 'Backend',
    icon: GitBranch,
    skills: ['FastAPI', 'Python', 'REST APIs', 'Docker'],
  },
  {
    title: 'Frontend',
    icon: Radar,
    skills: ['React', 'Tailwind CSS', 'JavaScript'],
  },
  {
    title: 'Cybersecurity',
    icon: ShieldCheck,
    skills: ['Nmap', 'Wireshark', 'OSINT', 'CTF workflows'],
  },
  {
    title: 'Edge Hardware',
    icon: Cpu,
    skills: ['Raspberry Pi', 'Jetson Orin Nano', 'Hailo NPU'],
  },
];

export const experience = [
  {
    period: 'Academic Focus',
    title: 'Computer science student with a cybersecurity track',
    detail:
      'Studying the foundations behind secure systems, networks, applied AI, and software engineering while turning coursework into working prototypes.',
    icon: GraduationCap,
  },
  {
    period: 'Current Build Direction',
    title: 'Local AI systems and edge deployment',
    detail:
      'Designing systems that combine LLMs, vector databases, embedded accelerators, and web interfaces without assuming every workload belongs in the cloud.',
    icon: Cpu,
  },
  {
    period: 'Research Practice',
    title: 'Evaluation-first model iteration',
    detail:
      'Building fine-tuning and evaluation loops around code generation, retrieval quality, hardware constraints, and reproducible deployment paths.',
    icon: BrainCircuit,
  },
];

export const contactLinks = [
  { label: 'Email', value: 'email@example.com', href: 'mailto:email@example.com' },
  { label: 'GitHub', value: 'github.com/hvbhanot', href: 'https://github.com/hvbhanot' },
  { label: 'LinkedIn', value: 'linkedin.com/in/placeholder', href: 'https://linkedin.com/in/placeholder' },
  { label: 'Portfolio', value: 'hvbhanot.pro', href: 'https://hvbhanot.pro' },
];
