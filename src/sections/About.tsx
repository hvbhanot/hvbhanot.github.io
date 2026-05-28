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
          label="About"
          title={
            <>
              Building systems that keep <span className="accent-italic">science</span> honest
            </>
          }
          lede="Undergraduate researcher working where computational genetics, machine learning, and reproducible tooling meet — building infrastructure that keeps experiments readable after the first run."
        />

        <div className="mt-14 grid gap-5 lg:grid-cols-[1.3fr_1fr]">
          <motion.div variants={fadeUp} className="panel p-7 md:p-9">
            <p className="max-w-[58ch] font-display text-[clamp(1.3rem,2.6vw,1.7rem)] font-normal leading-[1.5] text-ink">
              I care about the trail from hypothesis to artifact — parameters, code, model
              behavior, and the notes that let someone else reproduce the run.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <a href={`mailto:${profile.email}`} className="btn-accent">
                <Mail size={16} />
                Get in touch
              </a>
              <a href={profile.github} target="_blank" rel="noreferrer" className="btn-ghost">
                <Github size={16} />
                GitHub
              </a>
              <a href={profile.linkedin} target="_blank" rel="noreferrer" className="btn-ghost">
                <Linkedin size={16} />
                LinkedIn
              </a>
            </div>
          </motion.div>

          <motion.div variants={fadeUp} className="panel-quiet p-7 md:p-9">
            <div className="label">Education</div>
            <div className="mt-7 grid gap-7">
              <div>
                <div className="text-lg font-medium text-ink">{profile.degree}</div>
                <p className="mt-1 text-sm text-ink-muted">Minor in {profile.minor}</p>
                <p className="mt-3 font-mono text-xs text-ink-faint">{profile.university}</p>
                <p className="mt-1 font-mono text-xs text-ink-faint">
                  Expected {profile.graduation}
                </p>
              </div>
              <div className="border-t border-line pt-7">
                <div className="text-lg font-medium text-ink">{profile.upcoming?.degree}</div>
                <p className="mt-1 text-sm text-ink-muted">{profile.upcoming?.institution}</p>
                <p className="mt-3 font-mono text-xs text-ink-faint">
                  Starting {profile.upcoming?.start}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
