import { ArrowRight, Mail } from 'lucide-react';
import { motion } from 'framer-motion';
import Button from '../components/Button';
import ExperienceCard from '../components/ExperienceCard';
import GlowCard from '../components/GlowCard';
import HeroVisual from '../components/HeroVisual';
import ProjectCard from '../components/ProjectCard';
import SectionHeader, { fadeUp } from '../components/SectionHeader';
import SkillBadge from '../components/SkillBadge';
import { experience } from '../data/experience';
import { projects } from '../data/projects';
import { identityCards, profile, researchInterests } from '../data/resume';
import { skillGroups } from '../data/skills';

export default function Home() {
  return (
    <>
      <section className="relative min-h-screen overflow-hidden pt-28">
        <div className="container-shell grid min-h-[calc(100vh-7rem)] items-center gap-10 py-14 lg:grid-cols-[1.02fr_0.98fr]">
          <motion.div
            className="relative z-10 max-w-4xl"
            initial="hidden"
            animate="visible"
            transition={{ staggerChildren: 0.1 }}
          >
            <motion.p variants={fadeUp} className="mb-5 font-mono text-xs font-bold uppercase tracking-[0.18em] text-cyanCore">
              Computer Science / AI Research / Scientific Computing
            </motion.p>
            <motion.h1 variants={fadeUp} className="font-display text-5xl font-bold leading-[1.02] text-ink-50 sm:text-6xl lg:text-7xl">
              AI systems, computational genetics, and research tooling.
            </motion.h1>
            <motion.p variants={fadeUp} className="mt-7 max-w-2xl text-lg leading-8 text-ink-200 sm:text-xl">
              I build machine learning systems, simulation pipelines, and reproducible research tools for technical
              and scientific workflows.
            </motion.p>
            <motion.div variants={fadeUp} className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Button to="/research">
                View Research
                <ArrowRight size={18} />
              </Button>
              <Button to="/projects" variant="secondary">
                View Projects
                <ArrowRight size={18} />
              </Button>
              <Button to="/contact" variant="ghost">
                Contact Me
                <Mail size={18} />
              </Button>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.55, ease: 'easeOut', delay: 0.12 }}
          >
            <HeroVisual />
          </motion.div>
        </div>
      </section>

      <section className="section-wrap border-t border-white/[0.08]">
        <div className="container-shell grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {identityCards.map((card, index) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.label}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.42, ease: 'easeOut', delay: index * 0.04 }}
                variants={fadeUp}
              >
                <GlowCard className="h-full p-5">
                  <Icon className="mb-5 text-cyanCore" size={24} />
                  <h3 className="font-display text-lg font-bold text-ink-50">{card.label}</h3>
                  <p className="mt-3 text-sm leading-6 text-ink-400">{card.detail}</p>
                </GlowCard>
              </motion.div>
            );
          })}
        </div>
      </section>

      <section className="section-wrap border-t border-white/[0.08]">
        <div className="container-shell">
          <SectionHeader
            eyebrow="Research Focus"
            title="Machine learning systems for scientific workflows."
            description="Harsh works across computational genetics, simulation analysis, transformer fine-tuning, and reproducible tooling."
            className="mb-10"
          />
          <div className="flex flex-wrap gap-2">
            {researchInterests.map((interest) => (
              <SkillBadge key={interest}>{interest}</SkillBadge>
            ))}
          </div>
        </div>
      </section>

      <section className="section-wrap border-t border-white/[0.08]">
        <div className="container-shell">
          <SectionHeader
            eyebrow="Technical Skills"
            title="A compact toolkit for models, simulations, and systems."
            description="The skill set is intentionally practical: Python-heavy research work, ML tooling, scientific computing, and systems basics."
            className="mb-10"
          />
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {skillGroups.map((group) => (
              <GlowCard key={group.category} className="p-5">
                <h3 className="font-display text-xl font-bold text-ink-50">{group.category}</h3>
                <div className="mt-5 flex flex-wrap gap-2">
                  {group.skills.slice(0, 6).map((skill) => (
                    <SkillBadge key={skill}>{skill}</SkillBadge>
                  ))}
                </div>
              </GlowCard>
            ))}
          </div>
        </div>
      </section>

      <section className="section-wrap border-t border-white/[0.08]">
        <div className="container-shell">
          <div className="mb-10 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeader
              eyebrow="Featured Projects"
              title="Selected systems and research tools."
              description="A focused sample of machine learning, simulation, and research infrastructure work."
            />
            <Button to="/projects" variant="secondary" className="shrink-0">
              All Projects
              <ArrowRight size={17} />
            </Button>
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            {projects.slice(0, 2).map((project, index) => (
              <ProjectCard key={project.title} project={project} index={index} />
            ))}
          </div>
        </div>
      </section>

      <section className="section-wrap border-t border-white/[0.08]">
        <div className="container-shell">
          <div className="mb-10 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeader
              eyebrow="Experience Preview"
              title="Research, internships, and AI leadership."
              description="Experience is grounded in research work, ML model development, and student AI organization leadership."
            />
            <Button to="/experience" variant="secondary" className="shrink-0">
              Full Experience
              <ArrowRight size={17} />
            </Button>
          </div>
          <div className="grid gap-5 lg:grid-cols-3">
            {experience.map((item) => (
              <ExperienceCard key={`${item.title}-${item.period}`} item={item} compact />
            ))}
          </div>
        </div>
      </section>

      <section className="section-wrap border-t border-white/[0.08]">
        <div className="container-shell">
          <GlowCard glow className="grid gap-6 p-6 sm:p-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="font-mono text-xs font-bold uppercase tracking-[0.18em] text-cyanCore">Contact</p>
              <h2 className="mt-3 font-display text-3xl font-bold text-ink-50">Research collaboration or technical project?</h2>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-ink-300">
                Reach out for AI systems, computational genetics tooling, simulation pipelines, or research workflow conversations.
              </p>
            </div>
            <Button to="/contact">
              Contact {profile.shortName}
              <ArrowRight size={17} />
            </Button>
          </GlowCard>
        </div>
      </section>
    </>
  );
}
