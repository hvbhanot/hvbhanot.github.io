import { ArrowUpRight, Mail } from 'lucide-react';
import { motion } from 'framer-motion';
import SectionHeader, { fadeUp } from './SectionHeader.jsx';
import { contactLinks } from '../data/portfolio.js';

export default function Contact() {
  return (
    <section id="contact" className="section-wrap border-t border-white/[0.08]">
      <div className="container-shell">
        <div className="glass-card glow-line grid gap-8 p-6 sm:p-8 lg:grid-cols-[0.95fr_1.05fr] lg:p-10">
          <SectionHeader
            eyebrow="Contact"
            title="Open to serious AI, security, and edge systems conversations."
            description="Use these placeholders for now, then swap in the final addresses when the public links are ready."
          />

          <motion.div
            className="grid content-start gap-3"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            transition={{ staggerChildren: 0.07 }}
          >
            {contactLinks.map((link) => (
              <motion.a
                key={link.label}
                href={link.href}
                target={link.href.startsWith('http') ? '_blank' : undefined}
                rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="group flex items-center justify-between gap-4 rounded-lg border border-white/10 bg-white/[0.035] p-4 transition hover:border-cyanCore/40 hover:bg-cyanCore/[0.055]"
                variants={fadeUp}
              >
                <span>
                  <span className="block font-mono text-xs font-semibold uppercase text-ink-400">{link.label}</span>
                  <span className="mt-1 block break-all text-sm font-bold text-ink-50 sm:text-base">{link.value}</span>
                </span>
                <ArrowUpRight className="shrink-0 text-ink-400 transition group-hover:text-cyanCore" size={19} />
              </motion.a>
            ))}

            <motion.a href="mailto:email@example.com" className="cyber-button cyber-button-primary mt-4 w-full" variants={fadeUp}>
              <Mail size={18} />
              Contact Me
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
