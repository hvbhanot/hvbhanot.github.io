// Notes are authored in Markdown. The /admin page edits this same shape
// and exports a ready-to-paste TypeScript block.

export type Note = {
  slug: string;
  catalog: string;
  kind: 'Essay' | 'Field note' | 'Log' | 'Margin note';
  title: string;
  subtitle?: string;
  date: string; // ISO yyyy-mm-dd
  place: string;
  reading: string; // e.g. '6 min'
  excerpt: string;
  tags: string[];
  body: string; // Markdown
};

export const notes: Note[] = [
  {
    slug: 'notebooks-that-survive-the-semester',
    catalog: '№ 01.A',
    kind: 'Essay',
    title: 'Notebooks that survive the semester',
    subtitle: 'On writing research code that you can still read in November.',
    date: '2026-04-08',
    place: 'Corpus Christi, TX',
    reading: '7 min',
    excerpt:
      'A research notebook is not a script and not a paper. It is closer to a letter you send to yourself, three months from now, after the experiment has gone cold.',
    tags: ['Research practice', 'Reproducibility', 'Tooling'],
    body: `A research notebook is not a script and not a paper. It is closer to a letter you send to yourself, three months from now, after the experiment has gone cold and the reason you ran it has faded into the background of a busier week. The notebook is the part of the project that has to survive the semester.

Most of the notebooks I have inherited — including the ones I wrote myself — fail this test. They are full of cells in non-executable order, magic numbers that meant something to someone in October, and plots whose titles say nothing about the simulation that produced them. Re-running them is a small archaeology project.

## A short discipline

I have settled on a small discipline. Every notebook starts with a labelled block — date, simulation tag, the question the run is asking, and the seed. Every figure is saved out to a folder named after the run, alongside the parameters that produced it. Every notebook ends with one or two sentences in plain English about what the figures actually show.

- A header block: what, why, when, and which seed.
- A configuration cell that prints itself before anything runs.
- A figure cell that saves to disk under the run's name.
- A closing paragraph that reads like a margin note in a textbook.

None of this is novel. It is, in fact, the kind of thing every research methods seminar mentions and every working researcher quietly skips. The discipline is in doing it the same way, twice in a row, for two boring runs in a row. Once it becomes a habit the notebook stops being a private artefact and starts being something a collaborator can read.

## The test

The test I use is simple. Pick a notebook from three months ago, open it cold, and try to explain the result to someone who has never seen the project. If the notebook does the explaining for me, it has survived.`,
  },
  {
    slug: 'fine-tuning-small',
    catalog: '№ 02.A',
    kind: 'Field note',
    title: 'Fine-tuning small, on purpose',
    subtitle: 'Why a 1B-parameter base model and an adapter often beat fine-tuning anything bigger.',
    date: '2026-02-26',
    place: 'TAMU-CC research lab',
    reading: '5 min',
    excerpt:
      'The temptation, when you have a domain corpus, is to reach for the biggest model you can fit. The temptation is wrong almost all of the time.',
    tags: ['Transformers', 'LoRA', 'Fine-tuning'],
    body: `The temptation, when you have a domain corpus, is to reach for the biggest model you can fit. The temptation is wrong almost all of the time. A small base model with a properly-trained adapter will, in my experience, beat a large model that has been told nothing about your domain — and you can iterate on it in an afternoon instead of a week.

In a recent round of fine-tuning on a curated research-code corpus, the 7B base I started with was overkill. I dropped to a 1.3B variant with a LoRA adapter and the evaluation numbers improved, not because the smaller model is more capable, but because I could run twenty configurations in the time it took to run two. The bottleneck in domain fine-tuning is rarely model capacity; it is iteration speed.

## Things I check before training

- Is the corpus actually clean? Two hours here saves a week later.
- Does the evaluation set test the thing I claim to care about?
- Will I be able to compare this run to last week's run without remembering anything?
- Have I written down, in a sentence, what I expect to happen?

The last one is the most important. If I cannot predict the run, I am not running an experiment; I am taking a sample.`,
  },
  {
    slug: 'slim-as-a-microscope',
    catalog: '№ 03.A',
    kind: 'Field note',
    title: 'SLiM as a microscope',
    subtitle: 'On forward-time simulation as a research instrument, not a black box.',
    date: '2025-12-14',
    place: 'Corpus Christi, TX',
    reading: '6 min',
    excerpt:
      'A simulation is only useful as an instrument when you can describe, in one sentence, what makes a run interesting.',
    tags: ['Computational genetics', 'SLiM', 'Simulation'],
    body: `A simulation is only useful as an instrument when you can describe, in one sentence, what makes a run interesting. SLiM is a microscope. The hard part is not the simulation itself; the hard part is deciding what to look at, and then setting up the run so the interesting thing actually shows up in the output.

My current workflow looks like this. I draft a hypothesis on paper. I write the SLiM recipe and the parser together, so the output is already in the shape I want before the run is finished. I run the smallest sweep that can falsify the hypothesis. Only then do I scale up.

> Treat the simulation as if you have to defend every parameter to a stranger.
>
> — A note pinned above my desk.

The discipline pays off most when a run produces a result that surprises me. Without the small, controlled sweep behind it, the surprise is just noise; with it, the surprise is the beginning of a question.`,
  },
  {
    slug: 'on-the-quiet-pipeline',
    catalog: '№ 04.A',
    kind: 'Margin note',
    title: 'On the quiet pipeline',
    subtitle: 'A short piece on the kind of tooling I want to write.',
    date: '2025-10-30',
    place: 'A quiet office, late evening',
    reading: '3 min',
    excerpt:
      'I have come to admire the kind of research pipeline that does its job and then disappears.',
    tags: ['Tooling', 'Aesthetics of research'],
    body: `I have come to admire the kind of research pipeline that does its job and then disappears. It logs what it should, fails clearly when it should, and refuses to be clever. It is the opposite of a dashboard.

There is a kind of tooling — usually built quickly, often by someone in a hurry — that announces itself. It has progress bars in places they are not needed and clever abstractions where a script would do. It produces logs that read like advertisements.

The pipelines I aspire to write are quieter. They write one line per stage. They name their artifacts in a way you can read. They do not try to be the project — they only carry it.`,
  },
];

export function getNote(slug: string): Note | undefined {
  // First check user drafts in localStorage (so admin previews "go live" without a publish step locally).
  if (typeof window !== 'undefined') {
    try {
      const raw = window.localStorage.getItem('hvb.notes.local');
      if (raw) {
        const local = JSON.parse(raw) as Note[];
        const found = local.find((n) => n.slug === slug);
        if (found) return found;
      }
    } catch { /* ignore */ }
  }
  return notes.find((note) => note.slug === slug);
}

export function getAllNotes(): Note[] {
  // Merge published + local-only (admin-saved) drafts, deduped by slug, sorted by date desc.
  if (typeof window === 'undefined') return notes;
  try {
    const raw = window.localStorage.getItem('hvb.notes.local');
    if (!raw) return notes;
    const local = JSON.parse(raw) as Note[];
    const map = new Map<string, Note>();
    for (const n of notes) map.set(n.slug, n);
    for (const n of local) map.set(n.slug, n);
    return Array.from(map.values()).sort((a, b) => (a.date < b.date ? 1 : -1));
  } catch {
    return notes;
  }
}
