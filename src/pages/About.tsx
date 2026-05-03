import GlowCard from '../components/GlowCard';
import PageHero from '../components/PageHero';
import SectionHeader from '../components/SectionHeader';
import SkillBadge from '../components/SkillBadge';
import { profile, researchInterests } from '../data/resume';

export default function About() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title="A computer science student building credible research systems."
        description="Harsh is pursuing a Bachelor of Science in Computer Science with a minor in Applied Mathematics at Texas A&M University-Corpus Christi. His work focuses on AI systems, machine learning, computational genetics, scientific computing, and reproducible research pipelines."
        meta={[profile.degree, profile.minor, profile.graduation, profile.location]}
      />

      <section className="section-wrap">
        <div className="container-shell grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <GlowCard glow className="p-6 sm:p-8">
            <SectionHeader
              eyebrow="Professional Bio"
              title="Research-oriented engineering with practical systems habits."
              description="Harsh works at the intersection of artificial intelligence, machine learning systems, computational genetics, scientific computing, and reproducible research tooling."
              className="mb-7"
            />
            <p className="text-base leading-8 text-ink-300">
              His work is centered on building tools that make scientific workflows easier to run, inspect, and repeat.
              That includes simulation pipelines, Python analysis workflows, transformer fine-tuning experiments, and
              infrastructure that preserves logs and artifacts across iterations.
            </p>
            <p className="mt-5 text-base leading-8 text-ink-300">
              The through-line is practical credibility: models should be evaluated, experiments should be traceable,
              and research code should be understandable by the next person who has to run it.
            </p>
          </GlowCard>

          <div className="grid gap-5">
            <GlowCard className="p-6">
              <p className="font-mono text-xs font-bold uppercase tracking-[0.16em] text-cyanCore">Academic Background</p>
              <dl className="mt-5 space-y-4 text-sm">
                <div>
                  <dt className="text-ink-500">University</dt>
                  <dd className="font-semibold text-ink-100">{profile.university}</dd>
                </div>
                <div>
                  <dt className="text-ink-500">Degree</dt>
                  <dd className="font-semibold text-ink-100">{profile.degree}</dd>
                </div>
                <div>
                  <dt className="text-ink-500">Minor</dt>
                  <dd className="font-semibold text-ink-100">{profile.minor}</dd>
                </div>
                <div>
                  <dt className="text-ink-500">Graduation</dt>
                  <dd className="font-semibold text-ink-100">{profile.graduation}</dd>
                </div>
              </dl>
            </GlowCard>

            <GlowCard className="p-6">
              <p className="font-mono text-xs font-bold uppercase tracking-[0.16em] text-cyanCore">Research Interests</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {researchInterests.map((interest) => (
                  <SkillBadge key={interest}>{interest}</SkillBadge>
                ))}
              </div>
            </GlowCard>
          </div>
        </div>
      </section>

      <section className="section-wrap border-t border-white/[0.08]">
        <div className="container-shell">
          <GlowCard className="p-6 sm:p-8">
            <SectionHeader
              eyebrow="Technical Philosophy"
              title="Build research tooling that can be rerun, reviewed, and extended."
              description="The website intentionally avoids inflated claims. The focus is on disciplined engineering around experiments: inputs, scripts, logs, outputs, and evaluations that remain understandable after the initial build."
            />
          </GlowCard>
        </div>
      </section>
    </>
  );
}
