export type Project = {
  catalog: string;
  title: string;
  subtitle: string;
  year: string;
  status: 'active' | 'archived' | 'ongoing';
  description: string;
  highlights: string[];
  technologies: string[];
  href?: string;
};

export const projects: Project[] = [
  {
    catalog: '№ 001',
    title: 'TorchPilot',
    subtitle: 'LLM-driven AutoML for tabular PyTorch',
    year: '2026',
    status: 'ongoing',
    description:
      'Point it at a CSV and an Ollama Cloud model iteratively proposes architectures, hyperparameters, and preprocessing. TorchPilot trains each proposal, feeds the metrics plus a learning-curve diagnostic back to the LLM, and the model revises across rounds — best model wins, with a PDF report at the end.',
    highlights: [
      'LLM-in-the-loop search over architecture, hyperparameters, and preprocessing',
      'Trains each proposal, then feeds metrics + learning-curve diagnostics back to the model',
      'Generates a PDF report; saves and reloads the best trained model',
      'Runs against Ollama Cloud models',
    ],
    technologies: ['Python', 'PyTorch', 'Ollama', 'AutoML'],
    href: 'https://github.com/hvbhanot/TorchPilot',
  },
  {
    catalog: '№ 002',
    title: 'CTF-Agent',
    subtitle: 'Agentic LLM for autonomous CTF solving',
    year: '2026',
    status: 'active',
    description:
      'A multi-agent system that autonomously solves beginner-to-intermediate Capture-the-Flag challenges using structured ReAct reasoning, a large tool registry, persistent scratchpad memory, and verification loops — running fully locally via Ollama. Built as a COSC 6338 project at TAMU-CC.',
    highlights: [
      'Planner → Specialist → Verifier multi-agent orchestration',
      'ReAct reasoning with persistent scratchpad memory and verification loops',
      'Registry of 44 security tools (nmap, ffuf, pwntools, gdb, hashcat, …)',
      'Fully local inference via Ollama',
    ],
    technologies: ['Python', 'LLM agents', 'ReAct', 'Ollama'],
    href: 'https://github.com/hvbhanot/CTF-Agent',
  },
  {
    catalog: '№ 003',
    title: 'tuxtrainer',
    subtitle: 'Fine-tune small LLMs on your PDFs → Ollama',
    year: '2026',
    status: 'active',
    description:
      'A Colab-optimized pipeline that turns PDFs into a fine-tuned small LLM: extract and chunk, a master model picks hyperparameters, Unsloth runs QLoRA (~2× faster), and the result is converted to a single GGUF and pushed to the Ollama registry — then pullable on any device.',
    highlights: [
      'PDF → extract & chunk → hyperparameter selection → QLoRA → GGUF → Ollama',
      'Unsloth QLoRA for ~2× faster training on free Colab GPUs',
      'One-call GGUF export (merge adapter + dequantize + llama.cpp quantize)',
      'pip-installable; pull the model anywhere with `ollama pull`',
    ],
    technologies: ['Python', 'Unsloth', 'QLoRA', 'Ollama'],
    href: 'https://github.com/hvbhanot/tuxtrainer',
  },
  {
    catalog: '№ 004',
    title: 'Professor Tux',
    subtitle: 'FastAPI cybersecurity teaching assistant',
    year: '2026',
    status: 'active',
    description:
      'A FastAPI app that teaches cybersecurity through an LLM: a student chat UI, an admin panel for uploading lecture material, and Ollama-compatible backends. Guided Learning walks through topics step by step; Recall Mode is a constrained, hint-first mode for use during exams.',
    highlights: [
      'Student chat UI plus an admin panel with lecture upload/retrieval',
      'Guided Learning and constrained Recall (exam) modes',
      'File-driven teaching modes with lecture context',
      'Ollama-compatible model backends',
    ],
    technologies: ['Python', 'FastAPI', 'Ollama', 'RAG'],
    href: 'https://github.com/hvbhanot/ProfessorTux',
  },
  {
    catalog: '№ 005',
    title: 'AskAI',
    subtitle: 'Ask a generative model from your terminal',
    year: '2025',
    status: 'archived',
    description:
      'A lightweight terminal utility that pairs a Bash wrapper with a Python backend to query a generative AI model (Google Gemini) straight from the command line — one-command setup, with the API key stored in a local .env.',
    highlights: [
      'Single-command setup script for Debian-based Linux',
      'Bash front-end over a Python + Gemini backend',
      'Secure local API-key configuration',
    ],
    technologies: ['Bash', 'Python', 'Gemini API'],
    href: 'https://github.com/hvbhanot/askai',
  },
  {
    catalog: '№ 006',
    title: 'nnNode',
    subtitle: 'Multi-node neural net for Iris (PyTorch)',
    year: '2025',
    status: 'archived',
    description:
      'A custom PyTorch architecture where each layer holds several parallel processing nodes whose outputs are concatenated, applied to Iris classification — a hands-on study of how architecture shape affects learning.',
    highlights: [
      'Novel multi-node layers built from concatenated parallel sub-networks',
      'ReLU + dropout blocks with a softmax output',
      'End-to-end data prep, training, and evaluation',
    ],
    technologies: ['Python', 'PyTorch', 'NumPy'],
    href: 'https://github.com/hvbhanot/nnNode',
  },
  {
    catalog: '№ 007',
    title: 'Clutch-Call',
    subtitle: 'High-pressure decision modeling for sports',
    year: '2024',
    status: 'archived',
    description:
      'A collaborative ML project modeling decision-making in late-game, high-leverage sports scenarios. Built the data preprocessing, feature engineering, and model-evaluation pipeline alongside collaborators.',
    highlights: [
      'Cleaned and aligned event-level datasets',
      'Leverage- and context-aware feature engineering',
      'Shared evaluation pipeline across baseline models',
    ],
    technologies: ['Python', 'scikit-learn', 'pandas'],
    href: 'https://github.com/JustinSu11/clutch-call',
  },
  {
    catalog: '№ 008',
    title: 'Event REST API',
    subtitle: 'Go + Gin · JWT auth · SQLite',
    year: '2024',
    status: 'archived',
    description:
      'A RESTful event-registration API in Go and Gin: CRUD for events, user accounts, and sign-ups, with token-based JWT authentication and bcrypt password hashing over SQLite.',
    highlights: [
      'CRUD events plus user-registration endpoints',
      'JWT auth middleware and bcrypt password hashing',
      'Clean package layout — models / routes / middlewares / utils',
    ],
    technologies: ['Go', 'Gin', 'JWT', 'SQLite'],
    href: 'https://github.com/hvbhanot/RestAPI',
  },
  {
    catalog: '№ 009',
    title: 'Blockchain',
    subtitle: 'Proof-of-work chain in Python / Flask',
    year: '2024',
    status: 'archived',
    description:
      'A basic blockchain implementation: a genesis block, proof-of-work mining, chain validation, and a small Flask web interface to mine blocks, fetch the chain, and verify its integrity.',
    highlights: [
      'Proof-of-work mining from a genesis block',
      'Chain-integrity validation',
      'Flask endpoints for mine / chain / validate',
    ],
    technologies: ['Python', 'Flask'],
    href: 'https://github.com/hvbhanot/BlockChain',
  },
];
