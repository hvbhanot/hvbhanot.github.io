import { Suspense, lazy } from 'react';
import { ArrowRight, Cpu, ShieldCheck, TerminalSquare } from 'lucide-react';
import { motion } from 'framer-motion';
import { fadeUp } from './SectionHeader.jsx';

const HeroScene = lazy(() => import('./HeroScene.jsx'));

const stats = [
  { label: 'Focus', value: 'AI Systems' },
  { label: 'Security', value: 'CTF / OSINT / Labs' },
  { label: 'Edge', value: 'Pi / Jetson / Hailo' },
];

export default function Hero() {
  return (
    <section id="top" className="relative min-h-screen overflow-hidden pt-28">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyanCore/50 to-transparent" />
      <div className="container-shell grid min-h-[calc(100vh-7rem)] items-center gap-10 py-14 lg:grid-cols-[1.02fr_0.98fr]">
        <motion.div
          initial="hidden"
          animate="visible"
          transition={{ staggerChildren: 0.12 }}
          className="relative z-10 max-w-4xl"
        >
          <motion.div
            variants={fadeUp}
            className="mb-6 inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2 font-mono text-xs font-semibold uppercase text-cyanCore"
          >
            <TerminalSquare size={15} />
            AI Developer / Cybersecurity Student / Edge AI Builder
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="font-display text-5xl font-bold leading-[1.02] text-ink-50 sm:text-6xl lg:text-7xl"
          >
            Building AI Systems That Run Beyond the Cloud
          </motion.h1>

          <motion.p variants={fadeUp} className="mt-7 max-w-2xl text-lg leading-8 text-ink-200 sm:text-xl">
            AI, cybersecurity, edge computing, and full-stack systems built with practical engineering.
          </motion.p>

          <motion.div variants={fadeUp} className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a href="#projects" className="cyber-button cyber-button-primary">
              View Projects
              <ArrowRight size={18} />
            </a>
            <a href="#contact" className="cyber-button cyber-button-secondary">
              Contact Me
              <ArrowRight size={18} />
            </a>
          </motion.div>

          <motion.div variants={fadeUp} className="mt-10 grid gap-3 sm:grid-cols-3">
            {stats.map((stat) => (
              <div key={stat.label} className="glass-card px-4 py-4">
                <p className="font-mono text-xs font-semibold uppercase text-ink-400">{stat.label}</p>
                <p className="mt-1 text-sm font-bold text-ink-50">{stat.value}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.18 }}
          className="relative min-h-[420px] lg:min-h-[640px]"
          aria-hidden="true"
        >
          <div className="absolute inset-0 rounded-lg border border-cyanCore/10 bg-gradient-to-br from-white/[0.06] via-white/[0.02] to-violetCore/[0.05] shadow-glow-violet backdrop-blur-sm" />
          <div className="absolute inset-6 rounded-lg border border-white/[0.08]" />
          <Suspense fallback={<div className="absolute inset-0 bg-gradient-to-br from-cyanCore/[0.04] to-violetCore/[0.04]" />}>
            <HeroScene />
          </Suspense>
          <div className="pointer-events-none absolute bottom-6 left-6 right-6 grid gap-3 sm:grid-cols-3">
            <div className="glass-card flex items-center gap-3 px-3 py-3">
              <Cpu className="text-cyanCore" size={18} />
              <span className="text-xs font-semibold text-ink-200">Edge-first</span>
            </div>
            <div className="glass-card flex items-center gap-3 px-3 py-3">
              <ShieldCheck className="text-violetCore" size={18} />
              <span className="text-xs font-semibold text-ink-200">Security-aware</span>
            </div>
            <div className="glass-card flex items-center gap-3 px-3 py-3">
              <TerminalSquare className="text-blueCore" size={18} />
              <span className="text-xs font-semibold text-ink-200">System-built</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
