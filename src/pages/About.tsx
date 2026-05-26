import Page from '../components/Page';
import Section from '../components/Section';
import { capabilities, identityFacts, profile, researchInterests } from '../data/resume';
import { skillGroups } from '../data/skills';

export default function About() {
  return (
    <>
      <Page
        index="01"
        eyebrow="Origin"
        title={<>About the<br /><span className="text-accent">researcher</span>.</>}
        lede={
          <>
            An undergraduate working at the intersection of computational
            genetics, machine learning, and the small, careful pipelines that
            keep a research project legible after the semester ends.
          </>
        }
        meta={[
          { label: 'Filed', value: 'Curriculum & disposition' },
          { label: 'Location', value: profile.location },
          { label: 'Standing', value: profile.degree + ' \u00b7 ' + profile.graduation },
        ]}
      />

      <section className="section">
        <div className="gutter-wide grid gap-10 lg:grid-cols-[1fr_2.4fr]">
          <aside className="space-y-5">
            <div className="flex items-baseline gap-2">
              <span className="tag tag-accent">&sect; 01.1</span>
              <span className="tag">Biographical</span>
            </div>
            <p className="text-[13px] leading-6 text-ink-faint">
              Written in the first person. Edited toward honesty rather than polish.
            </p>
          </aside>

          <div className="max-w-2xl">
            <p className="font-serif text-[20px] leading-[1.7] text-ink-soft">
              I am an undergraduate at Texas A&amp;M University&ndash;Corpus Christi,
              studying computer science with a minor in applied mathematics. I
              spend most of my hours in the research lab &mdash; modelling genetic
              evolution in SLiM, writing Python pipelines around the simulation
              output, and fine-tuning transformer models on a small corpus of
              research code so they can be useful as collaborators rather than
              ornaments.
            </p>
            <p className="mt-5 text-[17px] leading-[1.65] text-ink-soft">
              Before this, I interned at DataEssenceAI on ML models for market
              trend analysis, and I co-founded Islanders Research in AI to
              teach reproducible experimentation to other students on campus. I
              am drawn to the parts of research that usually go unwritten &mdash; the
              configuration that produced a figure, the seed for a run, the
              decision on the back of an envelope that started a project.
            </p>
            <p className="mt-5 text-[17px] leading-[1.65] text-ink-soft">
              The aim, in short: to build research tooling that does its job
              and then disappears, and to leave behind notebooks that still
              read clearly a year later.
            </p>
          </div>
        </div>
      </section>

      <Section
        index="&sect; 01.2"
        label="Identity"
        title={<>Standing, affiliation,<br/>and method.</>}
        caption="A short, structured account of who I am as a researcher and how I work."
      >
        <dl className="grid gap-0">
          {identityFacts.map((fact, i) => (
            <div
              key={fact.label}
              className="grid grid-cols-[140px_1fr] gap-6 py-4"
              style={{
                borderTop: '1px solid var(--border)',
                borderBottom: i === identityFacts.length - 1 ? '1px solid var(--border)' : 'none',
              }}
            >
              <dt className="tag tag-accent pt-1.5">{fact.label}</dt>
              <dd className="font-serif text-[17px] leading-[1.6] text-ink">{fact.detail}</dd>
            </div>
          ))}
        </dl>
      </Section>

      <Section
        index="&sect; 01.3"
        label="Capabilities"
        title={<>What I can be<br />asked to do.</>}
        caption="A partial inventory of practical skills, organised by what they enable rather than by tool."
      >
        <ul className="grid gap-0 sm:grid-cols-2">
          {capabilities.map((c, i) => (
            <li
              key={c.title}
              className="p-5"
              style={{
                borderTop: '1px solid var(--border)',
                borderLeft: i % 2 === 1 ? '1px solid var(--border)' : 'none',
                borderBottom: i >= capabilities.length - 2 ? '1px solid var(--border)' : 'none',
              }}
            >
              <div className="flex items-baseline justify-between">
                <h3 className="font-display text-[18px] font-semibold tracking-tight text-ink">{c.title}</h3>
                <span className="tag num">{String(i + 1).padStart(2, '0')}</span>
              </div>
              <p className="mt-1.5 text-[14px] leading-[1.55] text-ink-mid">{c.detail}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section
        index="&sect; 01.4"
        label="Toolkit"
        title={<>A compact<br />toolkit.</>}
        caption="Grouped by intent. Languages, modelling stack, scientific computing, and day-to-day systems."
      >
        <div className="grid gap-0 sm:grid-cols-2">
          {skillGroups.map((g, i) => (
            <div
              key={g.category}
              className="p-5"
              style={{
                borderTop: '1px solid var(--border)',
                borderLeft: i % 2 === 1 ? '1px solid var(--border)' : 'none',
                borderBottom: i >= skillGroups.length - 2 ? '1px solid var(--border)' : 'none',
              }}
            >
              <h3 className="font-display text-[22px] font-bold tracking-tight text-ink">{g.category}</h3>
              <p className="mt-1.5 max-w-md text-[13px] leading-6 text-ink-mid">{g.caption}</p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {g.skills.map((s) => (
                  <li key={s} className="chip">{s}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      <Section
        index="&sect; 01.5"
        label="Interests"
        title={<>Currently<br />reading & thinking about.</>}
        caption="A loose list, refreshed as the season's reading shifts."
      >
        <ul className="grid gap-x-4 gap-y-0 sm:grid-cols-2">
          {researchInterests.map((r, i) => (
            <li
              key={r}
              className="flex items-baseline justify-between py-3"
              style={{ borderBottom: '1px solid var(--border)' }}
            >
              <span className="font-serif text-[17px] text-ink">{r}</span>
              <span className="tag num">{String(i + 1).padStart(2, '0')}</span>
            </li>
          ))}
        </ul>
      </Section>
    </>
  );
}