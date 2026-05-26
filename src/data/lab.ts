export type ExperimentStatus = 'running' | 'observing' | 'paused' | 'cooling';

export type Experiment = {
  id: string;
  title: string;
  hypothesis: string;
  status: ExperimentStatus;
  started: string;
  lastUpdate: string;
  tags: string[];
  // Inline "sketch" — a small chart drawn on the workbench.
  sketch:
    | { kind: 'line'; points: number[]; ylabel: string; xlabel: string }
    | { kind: 'bars'; values: number[]; labels: string[]; ylabel: string }
    | { kind: 'grid'; cells: number; filled: number[]; halftone?: number[]; caption: string };
};

export type Observation = {
  date: string;
  text: string;
  ref?: string;
};

export type ReadingItem = {
  title: string;
  author: string;
  kind: 'Book' | 'Paper' | 'Manual' | 'Notebook';
  status: 'reading' | 'returning to' | 'shelved';
  note?: string;
};

export const experiments: Experiment[] = [
  {
    id: 'EXP-014',
    title: 'Smaller models, harder corpora',
    hypothesis:
      'A 1.3B base + a properly-trained LoRA adapter will outperform a 7B base on our research-code summarisation eval, holding the corpus fixed.',
    status: 'running',
    started: '2026-04-22',
    lastUpdate: '2026-05-14',
    tags: ['Transformers', 'LoRA', 'Evaluation'],
    sketch: {
      kind: 'line',
      points: [62, 58, 53, 49, 46, 44, 42, 41.4, 41, 40.7, 40.6, 40.55],
      ylabel: 'val. loss',
      xlabel: 'epoch',
    },
  },
  {
    id: 'EXP-015',
    title: 'Sweep schema v3',
    hypothesis:
      'A flat JSON sweep manifest beats the YAML hierarchy for reproducibility: faster to write, easier to diff, harder to lose.',
    status: 'observing',
    started: '2026-03-30',
    lastUpdate: '2026-05-11',
    tags: ['Tooling', 'Reproducibility'],
    sketch: {
      kind: 'bars',
      values: [3.1, 4.4, 5.8, 6.2, 6.6, 7.0, 7.2],
      labels: ['v0', 'v1', 'v1.5', 'v2', 'v2.1', 'v2.5', 'v3'],
      ylabel: 'usable / run',
    },
  },
  {
    id: 'EXP-016',
    title: 'Mutation accumulation, balanced selection',
    hypothesis:
      'Under balancing selection, mid-frequency deleterious variants persist longer than the neutral expectation predicts — visible in 200-generation runs.',
    status: 'running',
    started: '2026-04-05',
    lastUpdate: '2026-05-13',
    tags: ['SLiM', 'Population genetics'],
    sketch: {
      kind: 'grid',
      cells: 24,
      filled: [2, 7, 8, 9, 13, 14, 19, 20, 23],
      halftone: [3, 12, 15, 17, 22],
      caption: 't = 120 gen.',
    },
  },
  {
    id: 'EXP-017',
    title: 'Failure modes of code-summarising models',
    hypothesis:
      'On numerical scientific code, current LMs hallucinate units more than they hallucinate logic. A small synthetic eval can isolate which.',
    status: 'cooling',
    started: '2026-02-18',
    lastUpdate: '2026-04-28',
    tags: ['Evaluation', 'LLMs', 'Scientific code'],
    sketch: {
      kind: 'bars',
      values: [38, 22, 14, 9, 6, 4],
      labels: ['unit', 'sign', 'shape', 'logic', 'name', 'other'],
      ylabel: '% of errors',
    },
  },
];

export const observations: Observation[] = [
  {
    date: '2026-05-14',
    text: 'EXP-014: LoRA rank 8 plateaus a hair below rank 16, but converges in roughly half the wall-time. Worth keeping as the default.',
    ref: 'EXP-014',
  },
  {
    date: '2026-05-12',
    text: 'Re-ran the v2.5 sweep schema on EXP-016 — every artefact reproduced bit-for-bit. The flat JSON manifest is winning quietly.',
    ref: 'EXP-015',
  },
  {
    date: '2026-05-09',
    text: 'EXP-016 shows a small but stable mid-frequency band around generation 80–140 across three seeds. Not yet sure whether it is selection or drift; checking with neutral controls.',
    ref: 'EXP-016',
  },
  {
    date: '2026-05-03',
    text: 'Eval set for EXP-017 grew by 40 items. The unit-hallucination rate barely moved — suggests the failure mode is robust, not idiosyncratic.',
    ref: 'EXP-017',
  },
  {
    date: '2026-04-28',
    text: 'A small but useful realisation: the notebook is most useful when its title is a sentence, not a noun phrase.',
  },
];

export const readingList: ReadingItem[] = [
  {
    title: 'Principles of Population Genetics',
    author: 'Hartl & Clark',
    kind: 'Book',
    status: 'reading',
    note: 'Working through chapter 5 — selection at multiple loci.',
  },
  {
    title: 'LoRA: Low-Rank Adaptation of Large Language Models',
    author: 'Hu et al., 2021',
    kind: 'Paper',
    status: 'returning to',
    note: 'Re-read for the rank-vs-capacity discussion (§4.2).',
  },
  {
    title: 'SLiM 4: Multispecies Eco-Evolutionary Modeling',
    author: 'Haller & Messer, 2023',
    kind: 'Paper',
    status: 'reading',
  },
  {
    title: 'The Craft of Research',
    author: 'Booth, Colomb, Williams',
    kind: 'Book',
    status: 'returning to',
    note: 'On the discipline of writing the question down before starting.',
  },
  {
    title: 'A field manual for experiment logs',
    author: 'self, ongoing',
    kind: 'Notebook',
    status: 'reading',
    note: 'My own. Edited every week.',
  },
];

export const statusLabel: Record<ExperimentStatus, string> = {
  running: 'Running',
  observing: 'Observing',
  paused: 'Paused',
  cooling: 'Cooling down',
};
