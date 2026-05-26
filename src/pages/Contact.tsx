import Page from '../components/Page';
import { profile } from '../data/resume';

export default function Contact() {
  const channels = [
    { label: 'Email', value: profile.email, href: `mailto:${profile.email}`, hint: 'Best for research questions, collaborations, and questions from students.' },
    { label: 'GitHub', value: profile.githubLabel, href: profile.github, hint: 'Code, small tools, the occasional fork.' },
    { label: 'LinkedIn', value: profile.linkedinLabel, href: profile.linkedin, hint: 'For more formal correspondence and CV-shaped questions.' },
  ];

  return (
    <>
      <Page
        index="05"
        eyebrow="Ping"
        title={<>Correspondence,<br /><span className="text-accent">unsealed</span>.</>}
        lede={
          <>
            I read everything that arrives and reply to most of it. Research
            collaborations, small pieces of tooling, simulation work, and notes
            from other students are all welcome.
          </>
        }
        meta={[
          { label: 'Filed', value: 'Channels for correspondence' },
          { label: 'Location', value: profile.location },
          { label: 'Reply', value: 'Usually within a few days' },
        ]}
      />

      <section className="section">
        <div className="gutter-wide grid gap-10 lg:grid-cols-[1fr_2fr]">
          <aside>
            <div className="rounded-xl border border-[var(--border)] bg-[var(--surface-muted)] p-6">
              <p className="tag tag-accent mb-3">Address card</p>
              <h2 className="font-display text-[24px] font-bold leading-[1.1] tracking-tight text-ink">
                Harsh Vardhan<br />Bhanot
              </h2>
              <dl className="mt-5 space-y-2 text-[14px]">
                <div className="flex items-baseline gap-3">
                  <dt className="tag w-14 shrink-0 text-ink-faint">c/o</dt>
                  <dd className="text-ink-soft">{profile.university}</dd>
                </div>
                <div className="flex items-baseline gap-3">
                  <dt className="tag w-14 shrink-0 text-ink-faint">City</dt>
                  <dd className="text-ink-soft">{profile.location}</dd>
                </div>
                <div className="flex items-baseline gap-3">
                  <dt className="tag w-14 shrink-0 text-ink-faint">Term</dt>
                  <dd className="num text-ink-soft">{profile.graduation}</dd>
                </div>
              </dl>

              <p className="mt-5 text-[13px] leading-6 text-ink-faint">
                Drop a line. Letters travel well.
              </p>
            </div>
          </aside>

          <div>
            <ol className="grid gap-0">
              {channels.map((c, i) => (
                <li
                  key={c.label}
                  className="grid gap-2 py-5"
                  style={{
                    borderTop: '1px solid var(--border)',
                    borderBottom: i === channels.length - 1 ? '1px solid var(--border)' : 'none',
                  }}
                >
                  <div className="flex items-baseline justify-between gap-4">
                    <span className="tag tag-accent">{c.label}</span>
                    <span className="tag num">&sect; {String(i + 1).padStart(2, '0')}</span>
                  </div>
                  <a
                    href={c.href}
                    target={c.href.startsWith('mailto') ? undefined : '_blank'}
                    rel="noreferrer"
                    className="ink-link font-display text-[22px] font-semibold tracking-tight text-ink"
                  >
                    {c.value}
                  </a>
                  <p className="text-[13px] leading-6 text-ink-faint">{c.hint}</p>
                </li>
              ))}
            </ol>

            <a
              href={`mailto:${profile.email}`}
              className="pill pill-accent mt-8 inline-flex"
            >
              Write to me &rarr;
            </a>
          </div>
        </div>
      </section>
    </>
  );
}