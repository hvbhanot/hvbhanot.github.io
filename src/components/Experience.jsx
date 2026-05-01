import { motion } from 'framer-motion';
import SectionHeader, { fadeUp } from './SectionHeader.jsx';
import { experience } from '../data/portfolio.js';

export default function Experience() {
  return (
    <section id="experience" className="section-wrap border-t border-white/[0.08]">
      <div className="container-shell">
        <SectionHeader
          eyebrow="Experience / Research"
          title="Academic work and project practice with a systems bias."
          description="Concise by design: the portfolio emphasizes shipped artifacts, repeatable workflows, and the engineering decisions behind them."
        />

        <motion.div
          className="relative grid gap-5 lg:grid-cols-3"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          transition={{ staggerChildren: 0.08 }}
        >
          {experience.map((item) => {
            const Icon = item.icon;
            return (
              <motion.article key={item.title} className="glass-card p-6" variants={fadeUp}>
                <div className="mb-6 flex items-center justify-between gap-4">
                  <span className="font-mono text-xs font-semibold uppercase text-cyanCore">{item.period}</span>
                  <span className="grid size-10 place-items-center rounded-lg border border-white/10 bg-white/[0.04] text-ink-200">
                    <Icon size={19} />
                  </span>
                </div>
                <h3 className="font-display text-xl font-bold leading-tight text-ink-50">{item.title}</h3>
                <p className="mt-4 text-sm leading-7 text-ink-300">{item.detail}</p>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
