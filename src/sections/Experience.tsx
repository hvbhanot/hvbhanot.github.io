import { motion, fadeUp, reveal } from '../lib/motion';
import SectionHead from '../components/SectionHead';
import { experience } from '../data/resume';

export default function Experience() {
  return (
    <motion.section id="experience" className="section" {...reveal}>
      <div className="shell">
        <SectionHead
          index="03"
          label="Experience"
          title={
            <>
              From the bench to the <span className="accent-italic">build</span>
            </>
          }
        />

        <div className="mt-14 grid gap-0">
          {experience.map((item, i) => (
            <motion.article
              key={`${item.title}-${item.org}`}
              variants={fadeUp}
              className="grid gap-5 border-t border-line py-9 md:grid-cols-[200px_1fr] md:gap-12"
            >
              <div>
                <div className="font-mono text-xs text-accent">{String(i + 1).padStart(2, '0')}</div>
                <div className="mt-3 font-mono text-sm text-ink-muted">{item.period}</div>
              </div>
              <div>
                <h3 className="text-2xl font-medium">{item.title}</h3>
                <p className="mt-1 text-ink-muted">{item.org}</p>
                <p className="mt-5 max-w-[62ch] leading-7 text-ink/90">{item.desc}</p>
                <ul className="mt-5 grid max-w-[64ch] gap-2.5">
                  {item.bullets.map((bullet) => (
                    <li key={bullet} className="flex gap-3 text-[15px] leading-7 text-ink-muted">
                      <span className="mt-[11px] h-1 w-1 flex-none rounded-full bg-accent" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
