import { Github, Linkedin, Mail } from 'lucide-react';
import { motion, fadeUp, reveal } from '../lib/motion';
import SectionHead from '../components/SectionHead';
import { profile } from '../data/resume';

export default function About() {
  return (
    <motion.section id="about" className="section" {...reveal}>
      <div className="shell">
        <SectionHead
          index="01"
          label="cat ~/about.md"
          title={
            <>
              Building systems that keep <span className="ink-mark">science</span> honest
            </>
          }
          lede="Undergraduate researcher working where computational genetics, machine learning, and reproducible tooling meet — building infrastructure that keeps experiments readable after the first run."
        />

        <div className="mt-14 grid gap-px overflow-hidden border border-line-strong bg-line lg:grid-cols-[1.3fr_1fr]">
          <motion.div variants={fadeUp} className="bg-card p-7 md:p-10">
            <p className="max-w-[58ch] font-display text-[clamp(1.4rem,2.7vw,1.85rem)] font-medium leading-[1.32] tracking-[-0.02em] text-ink">
              I care about the trail from hypothesis to artifact — parameters, code, model
              behavior, and the notes that let someone else reproduce the run.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <a href={`mailto:${profile.email}`} className="btn-accent">
                <Mail size={15} />
                Get in touch
              </a>
              <a href={profile.github} target="_blank" rel="noreferrer" className="btn-ghost">
                <Github size={15} />
                GitHub
              </a>
              <a href={profile.linkedin} target="_blank" rel="noreferrer" className="btn-ghost">
                <Linkedin size={15} />
                LinkedIn
              </a>
            </div>
          </motion.div>

          <motion.div variants={fadeUp} className="bg-elevated p-7 md:p-10">
            <div className="spec-label">Education</div>
            <div className="mt-7 grid gap-7">
              <div>
                <div className="text-lg font-semibold text-ink">{profile.degree}</div>
                <p className="mt-1 text-sm text-ink-muted">Minor in {profile.minor}</p>
                <p className="mt-3 mono-meta normal-case">{profile.university}</p>
                <p className="mt-1 mono-meta">Expected {profile.graduation}</p>
              </div>
              <div className="border-t border-line pt-7">
                <div className="text-lg font-semibold text-ink">{profile.upcoming?.degree}</div>
                <p className="mt-1 text-sm text-ink-muted">{profile.upcoming?.institution}</p>
                <p className="mt-3 mono-meta">Starting {profile.upcoming?.start}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
