import { motion } from 'framer-motion';

type SectionHeaderProps = {
  eyebrow: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  className?: string;
};

export const fadeUp = {
  hidden: { opacity: 1, y: 18 },
  visible: { opacity: 1, y: 0 },
};

export default function SectionHeader({
  eyebrow,
  title,
  description,
  align = 'left',
  className = '',
}: SectionHeaderProps) {
  const centered = align === 'center';

  return (
    <motion.div
      className={`${centered ? 'mx-auto text-center' : ''} max-w-3xl ${className}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
      variants={fadeUp}
    >
      <p className="mb-3 font-mono text-xs font-bold uppercase tracking-[0.18em] text-cyanCore">{eyebrow}</p>
      <h2 className="font-display text-3xl font-bold leading-tight text-ink-50 sm:text-4xl">{title}</h2>
      {description ? <p className="mt-5 text-base leading-8 text-ink-300 sm:text-lg">{description}</p> : null}
    </motion.div>
  );
}
