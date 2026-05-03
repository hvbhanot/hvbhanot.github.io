import { motion } from 'framer-motion';
import type { ExperienceItem } from '../data/experience';
import GlowCard from './GlowCard';
import { fadeUp } from './SectionHeader';

type ExperienceCardProps = {
  item: ExperienceItem;
  compact?: boolean;
};

export default function ExperienceCard({ item, compact = false }: ExperienceCardProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.42, ease: 'easeOut' }}
      variants={fadeUp}
    >
      <GlowCard className="p-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="font-mono text-xs font-bold uppercase tracking-[0.16em] text-cyanCore">{item.period}</p>
            <h3 className="mt-3 font-display text-2xl font-bold leading-tight text-ink-50">{item.title}</h3>
            <p className="mt-2 font-semibold text-ink-200">
              {item.organization}
              {item.location ? <span className="text-ink-400"> / {item.location}</span> : null}
            </p>
          </div>
        </div>
        <p className="mt-5 text-sm leading-7 text-ink-300">{item.description}</p>
        {!compact ? (
          <ul className="mt-5 space-y-2 text-sm text-ink-300">
            {item.bullets.map((bullet) => (
              <li key={bullet} className="flex gap-2">
                <span className="mt-2 size-1.5 shrink-0 rounded-full bg-violetCore/80" />
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
        ) : null}
      </GlowCard>
    </motion.div>
  );
}
