import Page from '../components/Page';
import { experience } from '../data/experience';

export default function Experience() {
  return (
    <>
      <Page
        index="04"
        eyebrow="Record"
        title={<>The<br /><span className="text-accent">record</span>.</>}
        lede={
          <>
            A chronological account of research, internships, and the
            student organisation I founded. Each entry includes the work
            actually done rather than the title alone.
          </>
        }
        meta={[
          { label: 'Filed', value: 'Curriculum vit&aelig;' },
          { label: 'Entries', value: String(experience.length) },
          { label: 'Span', value: '2023 \u2014 present' },
        ]}
      />

      <section className="section">
        <div className="gutter-wide">
          <ol className="grid gap-0">
            {experience.map((e) => (
              <li
                key={`${e.title}-${e.period}`}
                className="grid gap-6 py-8 lg:grid-cols-[140px_1.2fr_2fr]"
                style={{ borderTop: '1px solid var(--border)' }}
              >
                <div className="flex flex-row items-baseline gap-3 lg:flex-col lg:items-start lg:gap-2">
                  <span className="tag tag-accent num">{e.catalog}</span>
                  <span className="tag num">{e.period}</span>
                  {e.location ? <span className="tag">{e.location}</span> : null}
                </div>

                <div>
                  <h2 className="font-display text-[24px] font-bold leading-[1.12] tracking-tight text-ink">
                    {e.title}
                  </h2>
                  <p className="mt-1.5 text-[14px] italic text-ink-mid">{e.organization}</p>
                  <p className="mt-4 max-w-md text-[14px] leading-[1.6] text-ink-soft">
                    {e.description}
                  </p>
                </div>

                <ul className="space-y-2 text-[14px] leading-[1.55] text-ink">
                  {e.bullets.map((b) => (
                    <li key={b} className="flex items-baseline gap-3">
                      <span className="text-accent">&mdash;</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
          <div
            className="mt-1"
            style={{
              borderTop: '2px solid var(--border-strong)',
              borderBottom: '2px solid var(--border)',
              height: '5px',
            }}
          />
        </div>
      </section>
    </>
  );
}