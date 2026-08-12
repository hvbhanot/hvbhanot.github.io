import lora from '../content/notes/lora-rank.md?raw';

export type NoteMeta = {
  slug: string;
  title: string;
  date: string;
  tags: string[];
  summary: string;
  teaserTex?: string;
  readingMinutes: number;
  raw: string;
};

export const notes: NoteMeta[] = [
  {
    slug: 'lora-rank',
    title: 'LoRA rank as a bias–variance dial',
    date: '2026-05-01',
    tags: ['fine-tuning', 'statistics'],
    summary: 'Treat rank r as a statistical capacity knob, not a magic hyperparameter.',
    teaserTex: '\\Delta W = BA',
    readingMinutes: 4,
    raw: lora,
  },
];
