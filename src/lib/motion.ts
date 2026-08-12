import { motion, AnimatePresence, type Variants, type Transition } from 'framer-motion';

const prefersReducedMotion =
  typeof window !== 'undefined'
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : true;

export const reduced = prefersReducedMotion;

export const easeOut = [0.22, 1, 0.36, 1] as const;

export const spring: Transition = prefersReducedMotion
  ? { duration: 0.01 }
  : { type: 'spring', stiffness: 380, damping: 28, mass: 0.6 };

export const softSpring: Transition = prefersReducedMotion
  ? { duration: 0.01 }
  : { type: 'spring', stiffness: 260, damping: 24 };

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
        transition: { duration: 0.6, ease: easeOut },
      },
    };

export const fadeIn: Variants = prefersReducedMotion
  ? { hidden: { opacity: 1 }, visible: { opacity: 1 } }
  : {
      hidden: { opacity: 0 },
      visible: { opacity: 1, transition: { duration: 0.5, ease: easeOut } },
    };

export const scaleIn: Variants = prefersReducedMotion
  ? { hidden: { opacity: 1 }, visible: { opacity: 1 } }
  : {
      hidden: { opacity: 0, scale: 0.94 },
      visible: {
        opacity: 1,
        scale: 1,
        transition: { duration: 0.55, ease: easeOut },
      },
    };

export const slideInLeft: Variants = prefersReducedMotion
  ? { hidden: { opacity: 1 }, visible: { opacity: 1 } }
  : {
      hidden: { opacity: 0, x: -28 },
      visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.55, ease: easeOut },
      },
    };

export const slideInRight: Variants = prefersReducedMotion
  ? { hidden: { opacity: 1 }, visible: { opacity: 1 } }
  : {
      hidden: { opacity: 0, x: 28 },
      visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.55, ease: easeOut },
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

export const staggerFast: Variants = prefersReducedMotion
  ? { hidden: {}, visible: {} }
  : {
      hidden: {},
      visible: {
        transition: { staggerChildren: 0.045, delayChildren: 0.02 },
      },
    };

/** Props for a scroll-triggered staggered reveal of a section. */
export const reveal = {
  variants: staggerContainer,
  initial: 'hidden' as const,
  whileInView: 'visible' as const,
  viewport: { once: true, margin: '0px 0px -12% 0px' },
};

export const revealFast = {
  variants: staggerFast,
  initial: 'hidden' as const,
  whileInView: 'visible' as const,
  viewport: { once: true, margin: '0px 0px -10% 0px' },
};

/** Card hover lift (no 3D tilt under reduced motion). */
export const cardHover = prefersReducedMotion
  ? {}
  : {
      whileHover: {
        y: -4,
        transition: { duration: 0.25, ease: easeOut },
      },
      whileTap: { scale: 0.995 },
    };

export const cardTilt = prefersReducedMotion
  ? {}
  : {
      whileHover: {
        y: -6,
        rotateX: 2,
        rotateY: -2,
        transition: { duration: 0.28, ease: easeOut },
      },
    };

export const filterItem: Variants = prefersReducedMotion
  ? {
      hidden: { opacity: 1 },
      visible: { opacity: 1 },
      exit: { opacity: 1 },
    }
  : {
      hidden: { opacity: 0, y: 16, scale: 0.98 },
      visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { duration: 0.35, ease: easeOut },
      },
      exit: {
        opacity: 0,
        y: -8,
        scale: 0.98,
        transition: { duration: 0.2 },
      },
    };

export { motion, AnimatePresence };
export type { Variants, Transition };
