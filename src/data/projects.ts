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
    title: 'Relay',
    subtitle: 'Local-first multi-model router',
    year: '2026',
    status: 'active',
    description:
      'A local-first model router: a local model plans and decomposes each request, subtasks run locally unless routing policy says a cloud model is genuinely needed, results are collected concurrently, and the local model synthesizes the final answer — with a browser UI and a one-command launcher.',
    highlights: [
      'Plan locally → route conservatively → synthesize locally',
      'Cloud models only for current-knowledge, cloud-only-capability, or low-confidence subtasks',
      'Concurrent subtask execution with a localhost browser UI',
      'pip-installable CLI (`relay serve`) over Ollama',
    ],
    technologies: ['Python', 'Ollama', 'LLM routing'],
    href: 'https://github.com/hvbhanot/Relay',
  },
  {
    catalog: '№ 002',
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
    catalog: '№ 003',
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
    title: 'OI Browser Agent',
    subtitle: 'Vision browser control for Open WebUI',
    year: '2026',
    status: 'active',
    description:
      'A Chrome extension that puts Open WebUI in the browser side panel and gives it vision-based control of the page: screenshot capture, screenshot-driven navigation, and on-page automation — paired with a companion Browser Agent tool published on the Open WebUI community.',
    highlights: [
      'Side-panel Open WebUI alongside whatever you are browsing',
      'Vision-based navigation from screenshots, Claude-for-Chrome style',
      'On-page automation (e.g. quiz solving: select answer, click next)',
      'Companion Browser Agent tool published on openwebui.com',
    ],
    technologies: ['JavaScript', 'Chrome extension', 'Open WebUI', 'Vision LLMs'],
    href: 'https://github.com/hvbhanot/OI-Browser-Agent',
  },
  {
    catalog: '№ 006',
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
    catalog: '№ 007',
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
    catalog: '№ 008',
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
    catalog: '№ 009',
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
    catalog: '№ 010',
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
