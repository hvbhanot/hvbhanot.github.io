import { motion } from 'framer-motion';
import { fadeUp } from './SectionHeader';

type PageHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
  meta?: string[];
};

export default function PageHero({ eyebrow, title, description, meta = [] }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden border-b border-white/[0.08] pt-32">
      <div className="container-shell pb-16 pt-10 sm:pb-20">
        <motion.div
          className="max-w-4xl"
          initial="hidden"
          animate="visible"
          transition={{ staggerChildren: 0.08 }}
        >
          <motion.p variants={fadeUp} className="mb-4 font-mono text-xs font-bold uppercase tracking-[0.18em] text-cyanCore">
            {eyebrow}
          </motion.p>
          <motion.h1 variants={fadeUp} className="font-display text-4xl font-bold leading-tight text-ink-50 sm:text-5xl lg:text-6xl">
            {title}
          </motion.h1>
          <motion.p variants={fadeUp} className="mt-6 max-w-3xl text-lg leading-8 text-ink-300">
            {description}
          </motion.p>
          {meta.length ? (
            <motion.div variants={fadeUp} className="mt-8 flex flex-wrap gap-2">
              {meta.map((item) => (
                <span key={item} className="skill-chip px-3 py-2 text-xs font-bold uppercase tracking-wide">
                  {item}
                </span>
              ))}
            </motion.div>
          ) : null}
        </motion.div>
      </div>
    </section>
  );
}
