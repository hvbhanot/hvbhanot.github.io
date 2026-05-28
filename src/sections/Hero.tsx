import { ArrowDownRight, Download, Mail } from 'lucide-react';
import { motion, fadeUp, staggerContainer } from '../lib/motion';
import { profile } from '../data/resume';
import GenerativeField from '../components/GenerativeField';

export default function Hero() {
  const meta: Array<[string, string]> = [
    ['field', 'computational genetics'],
    ['host', profile.location],
    ['next', `${profile.upcoming?.degree}, ${profile.upcoming?.start}`],
  ];

  return (
    <section id="top" className="relative overflow-hidden">
      <div className="shell pb-20 pt-32 md:pb-28 md:pt-40">
        <motion.div variants={staggerContainer} initial="hidden" animate="visible">
          {/* Prompt strip */}
          <motion.div
            variants={fadeUp}
            className="flex flex-wrap items-center justify-between gap-3 border-b border-line pb-4"
          >
            <span className="font-mono text-xs text-ink-muted">
              <span className="text-accent">harsh@research</span>:~$ cat ./profile
            </span>
            <span className="status ongoing">available for research collaborations</span>
          </motion.div>

          <div className="mt-12 grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
            <div>
              <motion.p variants={fadeUp} className="font-mono text-sm text-ink-faint">
                <span className="text-ink-muted">&gt; role:</span> {profile.role}
              </motion.p>

              <motion.h1
                variants={fadeUp}
                className="mt-6 text-[clamp(2.6rem,8vw,5.6rem)] font-bold leading-[0.98] tracking-[-0.01em]"
              >
                Computational genetics, <span className="ink-mark">AI systems</span>, and
                reproducible research tooling
                <span className="cursor" aria-hidden="true" />
              </motion.h1>

              <motion.p variants={fadeUp} className="lede mt-8">
                {profile.bio}
              </motion.p>

              <motion.div variants={fadeUp} className="mt-10 flex flex-wrap items-center gap-3">
                <a href="#work" className="btn-accent">
                  ./selected_work
                  <ArrowDownRight size={16} />
                </a>
                <a href={`mailto:${profile.email}`} className="btn-ghost">
                  <Mail size={15} />
                  email
                </a>
                <a href="/Resume_Bhanot_HarshVardhan.pdf" download className="btn-ghost">
                  <Download size={15} />
                  resume
                </a>
              </motion.div>
            </div>

            {/* Live process graph — the generative evolution field */}
            <motion.figure variants={fadeUp} className="plate plate-ticked m-0">
              <div className="flex items-center justify-between border-b border-line px-4 py-2.5">
                <span className="fig-caption">proc · population.slim</span>
                <span className="fig-caption text-accent">● live</span>
              </div>
              <div className="relative aspect-[4/3] w-full">
                <GenerativeField className="absolute inset-0 h-full w-full" />
              </div>
              <figcaption className="flex items-center justify-between border-t border-line px-4 py-2.5">
                <span className="fig-caption">forward-time · mutation events</span>
                <span className="fig-caption">drag to perturb</span>
              </figcaption>
            </motion.figure>
          </div>

          {/* Spec / status output */}
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
