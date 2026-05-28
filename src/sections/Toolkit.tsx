import { motion, fadeUp, reveal } from '../lib/motion';
import SectionHead from '../components/SectionHead';
import { skillGroups } from '../data/skills';

export default function Toolkit() {
  return (
    <motion.section id="toolkit" className="section" {...reveal}>
      <div className="shell">
        <SectionHead
          index="05"
          label="Apparatus"
          title={
            <>
              From question to <span className="ink-mark">artifact</span>
            </>
          }
          lede="A practical mix of scientific computing, model experimentation, systems tooling, and collaboration workflows."
        />

        <div className="mt-14 grid gap-px overflow-hidden border border-line-strong bg-line sm:grid-cols-2">
          {skillGroups.map((group, i) => (
            <motion.article key={group.category} variants={fadeUp} className="bg-card p-7 md:p-9">
              <div className="flex items-baseline justify-between">
                <h3 className="text-xl font-semibold">{group.category}</h3>
                <span className="mono-meta">{String(i + 1).padStart(2, '0')}</span>
              </div>
              <p className="mt-2 text-sm leading-6 text-ink-muted">{group.caption}</p>
              <div className="mt-6 flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <span key={skill} className="chip">
                    {skill}
                  </span>
                ))}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
