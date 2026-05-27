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
      hidden: { opacity: 0, y: 18 },
      visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.38, ease: [0.2, 0.95, 0.3, 1] },
      },
    };

export const staggerContainer: Variants = prefersReducedMotion
  ? { hidden: {}, visible: {} }
  : {
      hidden: {},
      visible: {
        transition: { staggerChildren: 0.045, delayChildren: 0.03 },
      },
    };

export const cardHover = prefersReducedMotion
  ? {}
  : {
      whileHover: { y: -3, transition: { duration: 0.14 } },
      whileTap: { scale: 0.98 },
    };

export { motion, AnimatePresence };
export type { Variants, Transition };
