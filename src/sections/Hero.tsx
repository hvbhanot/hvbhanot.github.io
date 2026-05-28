import { ArrowDownRight, Download, Mail } from 'lucide-react';
import { motion, fadeUp, staggerContainer } from '../lib/motion';
import { profile } from '../data/resume';
import GenerativeField from '../components/GenerativeField';

export default function Hero() {
  const meta: Array<[string, string]> = [
    ['Field', 'Computational genetics'],
    ['Based', profile.location],
    ['Next', `${profile.upcoming?.degree}, ${profile.upcoming?.start}`],
  ];

  return (
    <section id="top" className="relative overflow-hidden">
      <div className="shell pb-20 pt-32 md:pb-28 md:pt-40">
        <motion.div variants={staggerContainer} initial="hidden" animate="visible">
          {/* Specimen header strip */}
          <motion.div
            variants={fadeUp}
            className="flex flex-wrap items-center justify-between gap-3 border-b border-line pb-4"
          >
            <span className="mono-meta">Specimen N° HVB-2026</span>
            <span className="status ongoing">Available for research collaborations</span>
          </motion.div>

          <div className="mt-12 grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
            <div>
              <motion.p variants={fadeUp} className="spec-label">
                {profile.role}
              </motion.p>

              <motion.h1
                variants={fadeUp}
                className="mt-6 text-[clamp(2.7rem,8.4vw,6rem)] font-bold leading-[0.92] tracking-[-0.035em]"
              >
                Computational genetics, <span className="ink-mark">AI systems</span>, and
                reproducible research tooling.
              </motion.h1>

              <motion.p variants={fadeUp} className="lede mt-8">
                {profile.bio}
              </motion.p>

              <motion.div variants={fadeUp} className="mt-10 flex flex-wrap items-center gap-3">
                <a href="#work" className="btn-accent">
                  Selected work
                  <ArrowDownRight size={16} />
                </a>
                <a href={`mailto:${profile.email}`} className="btn-ghost">
                  <Mail size={15} />
                  Email
                </a>
                <a href="/Resume_Bhanot_HarshVardhan.pdf" download className="btn-ghost">
                  <Download size={15} />
                  Resume
                </a>
              </motion.div>
            </div>

            {/* Live specimen plate — the generative evolution field */}
            <motion.figure variants={fadeUp} className="plate plate-ticked m-0">
              <div className="flex items-center justify-between border-b border-line px-4 py-2.5">
                <span className="fig-caption">Fig. 01 — Forward-time population drift</span>
                <span className="fig-caption text-accent">live</span>
              </div>
              <div className="relative aspect-[4/3] w-full">
                <GenerativeField className="absolute inset-0 h-full w-full" />
              </div>
              <figcaption className="flex items-center justify-between border-t border-line px-4 py-2.5">
                <span className="fig-caption">SLiM · mutation events</span>
                <span className="fig-caption">drag cursor to perturb</span>
              </figcaption>
            </motion.figure>
          </div>

          {/* Datasheet meta row */}
          <motion.dl
            variants={fadeUp}
            className="mt-14 grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-3"
          >
            {meta.map(([label, value]) => (
              <div key={label} className="bg-bg px-5 py-5">
                <dt className="mono-meta">{label}</dt>
                <dd className="mt-2 text-[15px] font-medium leading-snug text-ink">{value}</dd>
              </div>
            ))}
          </motion.dl>
        </motion.div>
      </div>
    </section>
  );
}
