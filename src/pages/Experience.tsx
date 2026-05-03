import GlowCard from '../components/GlowCard';
import PageHero from '../components/PageHero';
import SectionHeader from '../components/SectionHeader';
import SkillBadge from '../components/SkillBadge';
import Timeline from '../components/Timeline';
import { experience } from '../data/experience';
import { skillGroups } from '../data/skills';

export default function Experience() {
  return (
    <>
      <PageHero
        eyebrow="Experience"
        title="Research, ML engineering, and student AI leadership."
        description="Experience across computational genetics research, AI/ML internship work, and founding a student organization focused on AI and machine learning."
        meta={['2025 - Present research', 'PyTorch / OpenCV internship', 'AI organization leadership']}
      />

      <section className="section-wrap">
        <div className="container-shell">
          <SectionHeader
            eyebrow="Timeline"
            title="Work and research experience."
            description="A concise record of roles grounded in the provided resume."
            className="mb-10"
          />
          <Timeline items={experience} />
        </div>
      </section>

      <section className="section-wrap border-t border-white/[0.08]">
        <div className="container-shell">
          <SectionHeader
            eyebrow="Skills"
            title="Technical skill groups."
            description="Grouped around programming, AI/ML, scientific computing, and systems work."
            className="mb-10"
          />
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {skillGroups.map((group) => (
              <GlowCard key={group.category} className="p-5">
                <h3 className="font-display text-xl font-bold text-ink-50">{group.category}</h3>
                <div className="mt-5 flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <SkillBadge key={skill}>{skill}</SkillBadge>
                  ))}
                </div>
              </GlowCard>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
