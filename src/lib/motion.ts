import { motion, AnimatePresence, type Variants, type Transition } from 'framer-motion';

const prefersReducedMotion =
  typeof window !== 'undefined'
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : true;

export const spring: Transition = prefersReducedMotion
  ? { duration: 0.01 }
  : { type: 'spring', stiffness: 260, damping: 24, mass: 0.8 };

export const fadeUp: Variants = prefersReducedMotion
  ? {
      hidden: { opacity: 1 },
      visible: { opacity: 1 },
    }
  : {
      hidden: { opacity: 0, y: 24 },
      visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
      },
    };

export const staggerContainer: Variants = prefersReducedMotion
  ? { hidden: {}, visible: {} }
  : {
      hidden: {},
      visible: {
        transition: { staggerChildren: 0.06, delayChildren: 0.04 },
      },
    };

export const cardHover = prefersReducedMotion
  ? {}
  : {
      whileHover: { y: -4, transition: { duration: 0.2 } },
      whileTap: { scale: 0.985 },
    };

export { motion, AnimatePresence };
export type { Variants, Transition };
