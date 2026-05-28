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
              Three threads, one <span className="ink-mark">discipline</span>
            </>
          }
          lede="Work at the intersection of evolutionary simulation, transformer models for research code, and tooling that makes experimental results easier to explain."
        />

        <div className="mt-14 grid gap-px overflow-hidden border border-line-strong bg-line md:grid-cols-3">
          {focusAreas.map((area, i) => (
            <motion.article key={area.title} variants={fadeUp} className="group bg-card p-7 md:p-8">
              <div className="flex items-center justify-between">
                <span className="font-mono text-sm font-medium text-accent">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="h-2 w-2 rotate-45 bg-line-strong transition-colors group-hover:bg-accent" />
              </div>
              <h3 className="mt-6 text-2xl font-semibold leading-tight">{area.title}</h3>
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

        <motion.blockquote variants={fadeUp} className="plate plate-ticked mt-10 p-8 md:p-14">
          <span className="spec-label">Method</span>
          <p className="mt-6 max-w-[36ch] font-display text-[clamp(1.6rem,3.6vw,2.6rem)] font-medium leading-[1.18] tracking-[-0.02em] text-ink">
            “{researchQuote}”
          </p>
        </motion.blockquote>
      </div>
    </motion.section>
  );
}
