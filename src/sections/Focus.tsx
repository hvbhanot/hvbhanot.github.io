import { motion, fadeUp, reveal } from '../lib/motion';
import SectionHead from '../components/SectionHead';
import { focusAreas, researchQuote } from '../data/research';

export default function Focus() {
  return (
    <motion.section id="focus" className="section" {...reveal}>
      <div className="shell">
        <SectionHead
          index="02"
          label="Research focus"
          title={
            <>
              Three threads, one <span className="accent-italic">discipline</span>
            </>
          }
          lede="Work at the intersection of evolutionary simulation, transformer models for research code, and tooling that makes experimental results easier to explain."
        />

        <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-3">
          {focusAreas.map((area, i) => (
            <motion.article key={area.title} variants={fadeUp} className="bg-bg p-7 md:p-8">
              <span className="font-mono text-sm text-accent">0{i + 1}</span>
              <h3 className="mt-6 text-2xl font-medium">{area.title}</h3>
              <p className="mt-4 text-[15px] leading-7 text-ink-muted">{area.desc}</p>
              <div className="mt-6 flex flex-wrap gap-2">
                {area.methods.map((method) => (
                  <span key={method} className="chip">
                    {method}
                  </span>
                ))}
              </div>
            </motion.article>
          ))}
        </div>

        <motion.blockquote
          variants={fadeUp}
          className="mt-5 panel p-8 md:p-12"
        >
          <p className="max-w-[40ch] font-display text-[clamp(1.5rem,3.4vw,2.4rem)] font-normal italic leading-[1.4] text-ink">
            “{researchQuote}”
          </p>
        </motion.blockquote>
      </div>
    </motion.section>
  );
}
