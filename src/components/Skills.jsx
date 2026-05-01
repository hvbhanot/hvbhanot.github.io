import { motion } from 'framer-motion';
import SectionHeader, { fadeUp } from './SectionHeader.jsx';
import { skillGroups } from '../data/portfolio.js';

export default function Skills() {
  return (
    <section id="skills" className="section-wrap border-t border-white/[0.08]">
      <div className="container-shell">
        <SectionHeader
          eyebrow="Skills"
          title="A toolkit shaped around local AI, secure systems, and clean product surfaces."
          description="Grouped by the way the work actually gets built: model layer, backend layer, interface layer, security workflow, and edge hardware."
        />

        <motion.div
          className="grid gap-5 md:grid-cols-2 xl:grid-cols-5"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          transition={{ staggerChildren: 0.07 }}
        >
          {skillGroups.map((group) => {
            const Icon = group.icon;
            return (
              <motion.div key={group.title} className="glass-card p-5" variants={fadeUp}>
                <div className="mb-5 flex items-center gap-3">
                  <span className="grid size-10 place-items-center rounded-lg border border-violetCore/25 bg-violetCore/10 text-violetCore">
                    <Icon size={19} />
                  </span>
                  <h3 className="font-display text-lg font-bold leading-tight text-ink-50">{group.title}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <span key={skill} className="skill-chip px-3 py-2 text-xs font-semibold">
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
