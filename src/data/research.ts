export type FocusArea = {
  title: string;
  desc: string;
  methods: string[];
};

export const focusAreas: FocusArea[] = [
  {
    title: 'LLM agents & systems',
    desc: 'Multi-agent architectures with ReAct reasoning, tool use, scratchpad memory, and verification loops — built to run locally on open models.',
    methods: ['Ollama', 'ReAct', 'Tool integration'],
  },
  {
    title: 'AutoML & fine-tuning',
    desc: 'LLM-in-the-loop model search and fine-tuning pipelines — proposing, training, and revising models, plus QLoRA/LoRA training that ships to a registry.',
    methods: ['PyTorch', 'Unsloth', 'LoRA / QLoRA'],
  },
  {
    title: 'ML engineering & reproducibility',
    desc: 'First-principles models, honest evaluation, and tooling — parsers, APIs, and experiment artifacts designed to survive handoffs and reruns.',
    methods: ['NumPy', 'FastAPI', 'Git audit trails'],
  },
];

export const methodStatement = {
  heading: 'Make the experiment legible before optimizing it',
  body: 'I care about the trail from idea to artifact: the model, the parameters, the behavior, the outputs, and the notes that let someone else reproduce the run.',
};

export const researchQuote =
  'The goal is not just to get a result. The goal is to leave behind a system that makes the result inspectable, repeatable, and useful to the next person.';
