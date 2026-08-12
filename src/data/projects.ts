export type ProjectMetric = {
  label: string;
  value: string;
  tone?: 'success' | 'neutral' | 'warn';
};

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
  tags?: string[];
  abstract?: string;
  abstractTex?: string;
  problem?: string;
  method?: string;
  result?: string;
  metrics?: ProjectMetric[];
  featured?: boolean;
};

export function isFeatured(p: Project): boolean {
  if (p.featured === false) return false;
  if (p.featured === true) return true;
  return p.status !== 'archived';
}

export const projects: Project[] = [
  {
    catalog: '№ 001',
    title: 'Relay',
    subtitle: 'Terminal coding agent across local & cloud models',
    year: '2026',
    status: 'active',
    tags: ['agents', 'systems'],
    abstract:
      'A terminal coding agent that reads code, edits, runs tests, and routes work to the best configured model — cloud when available, local (Ollama / LM Studio / llama.cpp / vLLM) otherwise.',
    abstractTex:
      '\\mathrm{route}(\\mathrm{task}) \\rightarrow \\mathrm{model}^{\\star} \\in \\{\\mathrm{local},\\mathrm{cloud}\\}',
    problem:
      'Coding agents that only run on one cloud API are expensive, offline-hostile, and hard to reproduce. Switching models mid-session should not require abandoning the agent loop.',
    method:
      'Interactive CLI (`relay`) with tool use, approval modes, workspace file completion, shell passthrough, and session resume. Routes to OpenRouter-class cloud keys when present and falls back to local endpoints; still works with a purely local model.',
    result:
      'A pip-installable coding agent with model/status toolbars, command palette, and inspectable turns — published as Relay / relay-cli on GitHub.',
    description:
      'A coding agent that orchestrates local and cloud models from the terminal: explores with tools, proposes edits, and asks before writing — on the best model you have configured.',
    highlights: [
      'Cloud-first with local fallback (Ollama, LM Studio, llama.cpp, vLLM)',
      'Interactive sessions, one-shot prompts, and session resume',
      'Command palette, @-file completion, and !shell passthrough',
      'Approval modes and per-turn model / token footers',
    ],
    technologies: ['Python', 'CLI', 'Ollama', 'OpenRouter', 'LLM agents'],
    metrics: [
      { label: 'interface', value: 'terminal', tone: 'neutral' },
      { label: 'routing', value: 'local ↔ cloud', tone: 'neutral' },
    ],
    href: 'https://github.com/hvbhanot/Relay',
  },
  {
    catalog: '№ 011',
    title: 'TensorTonic Solutions',
    subtitle: 'Verified ML primitives from first principles',
    year: '2026',
    status: 'active',
    featured: true,
    tags: ['statistics', 'deep-learning'],
    abstract:
      'A growing library of verified TensorTonic problem solutions — losses, optimizers, linear algebra, and classical ML — implemented carefully in NumPy/Python.',
    abstractTex: '\\mathrm{rank}_{\\mathrm{TT}} = 42',
    problem:
      'Interview- and research-grade ML requires re-deriving core operations (batch norm, focal loss, PCA, KL, attention masks) without treating frameworks as oracles.',
    method:
      'Implement each TensorTonic problem against its numerical contract: stable logs, zero-vector edge cases, closed-form regressions, pooling, activations, and schedulers. Solutions are tracked in a public repo with a live verified badge.',
    result:
      'Public solution set supporting worldwide rank № 42 on TensorTonic — a reproducible trail of first-principles implementations.',
    description:
      'Verified machine learning implementations completed on TensorTonic: angle between vectors, batch norm, focal loss, causal masking, covariance, PCA, gradient descent, and dozens more primitives.',
    highlights: [
      'Verified solutions across linear algebra, losses, and training primitives',
      'NumPy-first implementations with numerical stability in mind',
      'Public badge + problem index linked to TensorTonic',
      'Supports rank № 42 worldwide',
    ],
    technologies: ['Python', 'NumPy', 'ML fundamentals'],
    metrics: [
      { label: 'rank', value: '№ 42', tone: 'success' },
      { label: 'platform', value: 'TensorTonic', tone: 'neutral' },
    ],
    href: 'https://github.com/hvbhanot/TensorTonic-Solutions',
  },
  {
    catalog: '№ 002',
    title: 'TorchPilot',
    subtitle: 'LLM-driven AutoML for tabular PyTorch',
    year: '2026',
    status: 'ongoing',
    tags: ['automl', 'deep-learning'],
    abstract:
      'Point it at a CSV and an Ollama Cloud model iteratively proposes architectures, hyperparameters, and preprocessing — train, diagnose, revise.',
    abstractTex: '\\theta^{\\star} = \\arg\\min_{\\theta} \\mathcal{L}(\\theta; \\mathcal{D})',
    problem:
      'Tabular AutoML still requires architecture and hyperparameter search that is tedious to run by hand and hard to keep reproducible across experiments.',
    method:
      'An LLM proposes architectures, hyperparameters, and preprocessing; each proposal is trained; metrics and learning-curve diagnostics feed the next revision. Best model and a PDF report are saved.',
    result:
      'An LLM-in-the-loop tabular AutoML loop over Ollama Cloud with report generation and model reload — work in progress.',
    description:
      'Point it at a CSV and an Ollama Cloud model iteratively proposes architectures, hyperparameters, and preprocessing. TorchPilot trains each proposal, feeds the metrics plus a learning-curve diagnostic back to the LLM, and the model revises across rounds — best model wins, with a PDF report at the end.',
    highlights: [
      'LLM-in-the-loop search over architecture, hyperparameters, and preprocessing',
      'Trains each proposal, then feeds metrics + learning-curve diagnostics back to the model',
      'Generates a PDF report; saves and reloads the best trained model',
      'Runs against Ollama Cloud models',
    ],
    technologies: ['Python', 'PyTorch', 'Ollama', 'AutoML'],
    metrics: [
      { label: 'status', value: 'ongoing', tone: 'warn' },
      { label: 'stack', value: 'PyTorch + LLM', tone: 'neutral' },
    ],
    href: 'https://github.com/hvbhanot/TorchPilot',
  },
  {
    catalog: '№ 003',
    title: 'CTF-Agent',
    subtitle: 'Agentic LLM for autonomous CTF solving',
    year: '2026',
    status: 'active',
    tags: ['agents', 'security'],
    abstract:
      'A multi-agent CTF solver using ReAct reasoning, a 44-tool registry, persistent scratchpad memory, and verification loops — fully local via Ollama (COSC 6338).',
    abstractTex: '\\mathrm{Planner} \\rightarrow \\mathrm{Specialist} \\rightarrow \\mathrm{Verifier}',
    problem:
      'Beginner-to-intermediate CTF challenges require tool use, memory, and verification. Single-shot LLM answers fail on multi-step exploit chains and cannot call nmap, gdb, or hashcat coherently without structure.',
    method:
      'Planner → Specialist → Verifier orchestration with ReAct traces, a persistent scratchpad, and a registry of 44 security tools (nmap, ffuf, pwntools, gdb, hashcat, …). Inference stays local on Ollama for reproducible lab use.',
    result:
      'An autonomous multi-agent system that solves beginner-to-intermediate CTFs with inspectable traces and local-only inference — submitted as a COSC 6338 project at TAMU-CC.',
    description:
      'A multi-agent system that autonomously solves beginner-to-intermediate Capture-the-Flag challenges using structured ReAct reasoning, a large tool registry, persistent scratchpad memory, and verification loops — running fully locally via Ollama. Built as a COSC 6338 project at TAMU-CC.',
    highlights: [
      'Planner → Specialist → Verifier multi-agent orchestration',
      'ReAct reasoning with persistent scratchpad memory and verification loops',
      'Registry of 44 security tools (nmap, ffuf, pwntools, gdb, hashcat, …)',
      'Fully local inference via Ollama',
    ],
    technologies: ['Python', 'LLM agents', 'ReAct', 'Ollama'],
    metrics: [
      { label: 'tools', value: '44', tone: 'neutral' },
      { label: 'inference', value: 'local (Ollama)', tone: 'neutral' },
    ],
    href: 'https://github.com/hvbhanot/CTF-Agent',
  },
  {
    catalog: '№ 004',
    title: 'Professor Tux',
    subtitle: 'FastAPI cybersecurity teaching assistant',
    year: '2026',
    status: 'active',
    tags: ['teaching', 'systems'],
    abstract:
      'A FastAPI teaching assistant with Guided Learning and constrained Recall Mode over lecture-uploaded RAG context.',
    abstractTex: '\\pi(\\mathrm{hint}\\mid \\mathrm{lecture},\\,\\mathrm{mode})',
    problem:
      'Cybersecurity courses need practice modes that teach step-by-step without turning into unrestricted exam assistance.',
    method:
      'Student chat UI, admin lecture upload/retrieval, Guided Learning walks, and constrained Recall (hint-first) for exam-adjacent use. Ollama-compatible backends.',
    result:
      'A deployable teaching assistant that separates learning from exam modes while keeping lecture context under admin control.',
    description:
      'A FastAPI app that teaches cybersecurity through an LLM: a student chat UI, an admin panel for uploading lecture material, and Ollama-compatible backends. Guided Learning walks through topics step by step; Recall Mode is a constrained, hint-first mode for use during exams.',
    highlights: [
      'Student chat UI plus an admin panel with lecture upload/retrieval',
      'Guided Learning and constrained Recall (exam) modes',
      'File-driven teaching modes with lecture context',
      'Ollama-compatible model backends',
    ],
    technologies: ['Python', 'FastAPI', 'Ollama', 'RAG'],
    metrics: [
      { label: 'modes', value: 'guided + recall', tone: 'neutral' },
    ],
    href: 'https://github.com/hvbhanot/ProfessorTux',
  },
  {
    catalog: '№ 005',
    title: 'OI Browser Agent',
    subtitle: 'Vision browser control for Open WebUI',
    year: '2026',
    status: 'active',
    tags: ['agents', 'vision'],
    abstract:
      'Chrome extension pairing Open WebUI side panel with screenshot-driven navigation and on-page automation.',
    abstractTex: 'a_t = \\pi(s_t),\\quad s_t = \\mathrm{screenshot}_t',
    problem:
      'Browser agents need grounded visual state; chat-only agents cannot see the page they claim to control.',
    method:
      'Side-panel Open WebUI, screenshot capture, vision-based navigation, and companion Browser Agent tool on the Open WebUI community.',
    result:
      'A vision-capable browser agent loop for everyday browsing tasks, published as extension + community tool.',
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
    tags: ['systems'],
    abstract: 'Bash + Python CLI for Gemini with local .env key storage.',
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
    status: 'active',
    featured: true,
    tags: ['deep-learning', 'statistics'],
    abstract:
      'Custom multi-node layers whose parallel sub-networks are concatenated — applied to Iris classification as an architecture study.',
    abstractTex: 'h = [\\phi_1(x)\\,\\|\\,\\phi_2(x)\\,\\|\\,\\ldots\\,\\|\\,\\phi_k(x)]',
    problem:
      'How does layer shape — parallel processing nodes whose outputs are concatenated — affect learning on a small classical dataset?',
    method:
      'PyTorch multi-node layers with ReLU + dropout blocks and a softmax head; full prep, train, and evaluation pipeline on Iris.',
    result:
      'A hands-on study of architecture shape vs. learning dynamics on a well-known benchmark — inspectable end-to-end code.',
    description:
      'A custom PyTorch architecture where each layer holds several parallel processing nodes whose outputs are concatenated, applied to Iris classification — a hands-on study of how architecture shape affects learning.',
    highlights: [
      'Novel multi-node layers built from concatenated parallel sub-networks',
      'ReLU + dropout blocks with a softmax output',
      'End-to-end data prep, training, and evaluation',
    ],
    technologies: ['Python', 'PyTorch', 'NumPy'],
    metrics: [
      { label: 'dataset', value: 'Iris', tone: 'neutral' },
      { label: 'framework', value: 'PyTorch', tone: 'neutral' },
    ],
    href: 'https://github.com/hvbhanot/nnNode',
  },
  {
    catalog: '№ 008',
    title: 'Clutch-Call',
    subtitle: 'High-pressure decision modeling for sports',
    year: '2024',
    status: 'archived',
    tags: ['statistics'],
    abstract: 'Collaborative ML pipeline for late-game sports decision contexts.',
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
    catalog: '№ 012',
    title: 'EPL Match Predictor',
    subtitle: 'FastAPI soccer match prediction service',
    year: '2025',
    status: 'archived',
    tags: ['statistics', 'systems'],
    abstract:
      'FastAPI service for EPL match predictions with football-data.org ingestion, training endpoint, and team-alias lookup.',
    description:
      'An EPL match predictor API: loads a cached model, exposes /predict and /upcoming, and supports retraining from football-data.org with team aliases for common club names.',
    highlights: [
      'FastAPI endpoints for health, predict, upcoming, and retrain',
      'football-data.org integration with season filters',
      'Team alias resolution (e.g. spurs → Tottenham)',
    ],
    technologies: ['Python', 'FastAPI', 'scikit-learn'],
    href: 'https://github.com/hvbhanot/api_soccer',
  },
  {
    catalog: '№ 013',
    title: 'FNN',
    subtitle: 'Educational feedforward neural network',
    year: '2025',
    status: 'archived',
    tags: ['deep-learning'],
    abstract:
      'A simple, from-scratch feedforward network in Python/Jupyter — layers and activations kept explicit for learning.',
    description:
      'A simple feedforward neural network implementation in Python, built to make layer composition and activation choices easy to inspect.',
    highlights: [
      'Clear layer + activation composition',
      'Educational notebook-first layout',
      'Flexible architecture for small experiments',
    ],
    technologies: ['Python', 'Jupyter', 'NumPy'],
    href: 'https://github.com/hvbhanot/FNN',
  },
  {
    catalog: '№ 009',
    title: 'Event REST API',
    subtitle: 'Go + Gin · JWT auth · SQLite',
    year: '2024',
    status: 'archived',
    tags: ['systems'],
    abstract: 'REST event-registration API with JWT and bcrypt over SQLite.',
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
    tags: ['systems'],
    abstract: 'Genesis block, PoW mining, chain validation, and Flask endpoints.',
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

export const researchTags = [
  'agents',
  'automl',
  'systems',
  'vision',
  'teaching',
  'statistics',
  'security',
  'deep-learning',
] as const;
