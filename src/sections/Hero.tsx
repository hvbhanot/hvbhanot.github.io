import { ArrowDownRight, Download, Mail } from 'lucide-react';
import { motion, fadeUp, staggerContainer } from '../lib/motion';
import { profile } from '../data/resume';

export default function Hero() {
  const meta: Array<[string, string]> = [
    ['Role', profile.role],
    ['Based in', profile.location],
    ['Next', `${profile.upcoming?.degree} · ${profile.upcoming?.start}`],
  ];

  return (
    <section id="top" className="relative overflow-hidden">
      <div className="shell pb-20 pt-36 md:pb-28 md:pt-44">
        <motion.div variants={staggerContainer} initial="hidden" animate="visible">
          <motion.div variants={fadeUp} className="status ongoing">
            Available for research collaborations
          </motion.div>

          <motion.p
            variants={fadeUp}
            className="mt-8 font-mono text-xs uppercase tracking-[0.18em] text-ink-faint"
          >
            {profile.name}
          </motion.p>

          <motion.h1
            variants={fadeUp}
            className="mt-5 max-w-[16ch] text-[clamp(2.6rem,8vw,5.5rem)] font-medium leading-[0.98]"
          >
            Computational genetics, <span className="accent-italic">AI systems</span>, and
            reproducible research tooling.
          </motion.h1>

          <motion.p variants={fadeUp} className="lede mt-9">
            {profile.bio}
          </motion.p>

          <motion.div variants={fadeUp} className="mt-10 flex flex-wrap items-center gap-3">
            <a href="#work" className="btn-accent">
              View selected work
              <ArrowDownRight size={17} />
            </a>
            <a href={`mailto:${profile.email}`} className="btn-ghost">
              <Mail size={16} />
              Email
            </a>
            <a href="/Resume_Bhanot_HarshVardhan.pdf" download className="btn-ghost">
              <Download size={16} />
              Resume
            </a>
          </motion.div>

          <motion.dl
            variants={fadeUp}
            className="mt-16 grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-3"
          >
            {meta.map(([label, value]) => (
              <div key={label} className="bg-bg px-5 py-5">
                <dt className="font-mono text-[11px] uppercase tracking-[0.12em] text-ink-faint">
                  {label}
                </dt>
                <dd className="mt-2 text-[15px] font-medium leading-snug text-ink">{value}</dd>
              </div>
            ))}
          </motion.dl>
        </motion.div>
      </div>
    </section>
  );
}
