import { motion, fadeUp, reveal } from '../lib/motion';
import SectionHead from '../components/SectionHead';
import { skillGroups } from '../data/skills';

export default function Toolkit() {
  return (
    <motion.section id="toolkit" className="section" {...reveal}>
      <div className="shell">
        <SectionHead
          index="05"
          label="Toolkit"
          title={
            <>
              From question to <span className="accent-italic">artifact</span>
            </>
          }
          lede="A practical mix of scientific computing, model experimentation, systems tooling, and collaboration workflows."
        />

        <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2">
          {skillGroups.map((group) => (
            <motion.article key={group.category} variants={fadeUp} className="bg-bg p-7 md:p-8">
              <h3 className="text-xl font-medium">{group.category}</h3>
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
