import { motion, AnimatePresence, type Variants, type Transition } from 'framer-motion';

const prefersReducedMotion =
  typeof window !== 'undefined'
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : true;

export const spring: Transition = prefersReducedMotion
  ? { duration: 0.01 }
  : { type: 'spring', stiffness: 380, damping: 28, mass: 0.6 };

export const fadeUp: Variants = prefersReducedMotion
  ? {
      hidden: { opacity: 1 },
      visible: { opacity: 1 },
    }
  : {
      hidden: { opacity: 0, y: 22 },
      visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
      },
    };

export const staggerContainer: Variants = prefersReducedMotion
  ? { hidden: {}, visible: {} }
  : {
      hidden: {},
      visible: {
        transition: { staggerChildren: 0.08, delayChildren: 0.04 },
      },
    };

/** Props for a scroll-triggered staggered reveal of a section. */
export const reveal = {
  variants: staggerContainer,
  initial: 'hidden' as const,
  whileInView: 'visible' as const,
  viewport: { once: true, margin: '0px 0px -12% 0px' },
};

export { motion, AnimatePresence };
export type { Variants, Transition };
