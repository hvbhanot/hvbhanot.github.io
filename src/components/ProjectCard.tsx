import { ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';
import type { Project } from '../data/projects';
import GlowCard from './GlowCard';
import SkillBadge from './SkillBadge';
import { fadeUp } from './SectionHeader';

type ProjectCardProps = {
  project: Project;
  index?: number;
};

export default function ProjectCard({ project, index = 0 }: ProjectCardProps) {
  const Icon = project.icon;

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.42, ease: 'easeOut', delay: index * 0.04 }}
      variants={fadeUp}
    >
      <GlowCard className="project-card relative flex h-full flex-col p-6">
        <div className="mb-6 flex items-start justify-between gap-4">
          <span className="grid size-12 place-items-center rounded-lg border border-cyanCore/20 bg-cyanCore/10 text-cyanCore">
            <Icon size={23} />
          </span>
          {project.href ? (
            <a
              href={project.href}
              target="_blank"
              rel="noreferrer"
              className="grid size-10 place-items-center rounded-lg border border-white/10 bg-white/[0.04] text-ink-300 transition hover:border-cyanCore/40 hover:text-cyanCore"
              aria-label={`Open ${project.title}`}
            >
              <ArrowUpRight size={18} />
            </a>
          ) : null}
        </div>

        <p className="font-mono text-xs font-bold uppercase tracking-[0.16em] text-blueCore">{project.subtitle}</p>
        <h3 className="mt-3 font-display text-2xl font-bold leading-tight text-ink-50">{project.title}</h3>
        <p className="mt-4 text-sm leading-7 text-ink-300">{project.description}</p>

        <div className="mt-6">
          <p className="mb-3 font-mono text-[0.7rem] font-bold uppercase tracking-[0.16em] text-ink-400">Highlights</p>
          <ul className="space-y-2 text-sm text-ink-300">
            {project.highlights.map((item) => (
              <li key={item} className="flex gap-2">
                <span className="mt-2 size-1.5 shrink-0 rounded-full bg-cyanCore/70" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          {project.technologies.map((item) => (
            <SkillBadge key={item}>{item}</SkillBadge>
          ))}
        </div>
      </GlowCard>
    </motion.div>
  );
}
