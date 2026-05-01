import { motion } from 'framer-motion';

export const fadeUp = {
  hidden: { opacity: 1, y: 24 },
  visible: { opacity: 1, y: 0 },
};

export default function SectionHeader({ eyebrow, title, description, align = 'left' }) {
  const centered = align === 'center';

  return (
    <motion.div
      className={centered ? 'mx-auto mb-12 max-w-3xl text-center' : 'mb-12 max-w-3xl'}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.55, ease: 'easeOut' }}
      variants={fadeUp}
    >
      <p className="mb-3 font-mono text-sm font-semibold uppercase text-cyanCore">{eyebrow}</p>
      <h2 className="font-display text-3xl font-bold leading-tight text-ink-50 sm:text-4xl">{title}</h2>
      {description ? <p className="mt-5 text-base leading-8 text-ink-300 sm:text-lg">{description}</p> : null}
    </motion.div>
  );
}
