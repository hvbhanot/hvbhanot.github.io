import { ExternalLink } from 'lucide-react';
import { profile, experience } from '../data/resume';
import { skillGroups } from '../data/skills';

export default function About() {
  return (
    <div className="space-y-12">
      {/* Header */}
      <div>
        <div className="text-xs tracking-[0.2em] text-[#4a5a70] mb-1">ABOUT</div>
        <h1 className="text-4xl font-semibold tracking-[-0.02em]">{profile.name}</h1>
        <p className="text-[#8a9ab0] mt-3 max-w-2xl">
          Undergraduate researcher working at the intersection of computational genetics, machine learning, and reproducible tooling.
        </p>
        <div className="flex gap-3 mt-5">
          <a href={`mailto:${profile.email}`} className="btn btn-primary">Say hello</a>
          <a href={profile.linkedin} target="_blank" rel="noreferrer" className="btn btn-ghost">LinkedIn <ExternalLink size={14}/></a>
          <a href={profile.github} target="_blank" rel="noreferrer" className="btn btn-ghost">GitHub <ExternalLink size={14}/></a>
        </div>
      </div>

      {/* Education */}
      <div className="border border-[#1f2a3f] bg-[#0b0f17] rounded-lg p-6">
        <div className="text-xs tracking-[0.2em] text-[#4a5a70] mb-4">EDUCATION</div>
        
        <div className="mb-6">
          <div className="font-medium">{profile.degree}, Minor in {profile.minor}</div>
          <div className="text-[#00eaff]">{profile.university}</div>
          <div className="text-sm text-[#8a9ab0]">Expected {profile.graduation}</div>
        </div>

        <div className="pt-5 border-t border-[#1f2a3f]">
          <div className="font-medium">{profile.upcoming?.degree}</div>
          <div className="text-[#00eaff]">{profile.upcoming?.institution}</div>
          <div className="text-sm text-[#8a9ab0]">{profile.upcoming?.start}</div>
        </div>
      </div>

      {/* Experience */}
      <div>
        <div className="text-xs tracking-[0.2em] text-[#4a5a70] mb-4">EXPERIENCE</div>
        <div className="space-y-8">
          {experience.map((exp, i) => (
            <div key={i} className="border-l-2 border-[#1f2a3f] pl-6">
              <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-1">
                <div>
                  <div className="font-medium tracking-tight">{exp.title}</div>
                  <div className="text-[#8a9ab0] text-sm">{exp.org}</div>
                </div>
                <div className="text-xs text-[#4a5a70] font-mono tracking-wider">{exp.period}</div>
              </div>
              <p className="mt-3 text-sm text-[#e8f0ff]">{exp.desc}</p>
              <ul className="mt-3 space-y-1.5 text-sm">
                {exp.bullets.map((b, idx) => (
                  <li key={idx} className="pl-4 text-[#8a9ab0] border-l border-[#1f2a3f]">— {b}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Skills */}
      <div>
        <div className="text-xs tracking-[0.2em] text-[#4a5a70] mb-4">TECHNICAL SKILLS</div>
        <div className="grid md:grid-cols-2 gap-4">
          {skillGroups.map((group, i) => (
            <div key={i} className="border border-[#1f2a3f] bg-[#0b0f17] p-5 rounded-lg">
              <div className="font-medium mb-1">{group.category}</div>
              <p className="text-xs text-[#8a9ab0] mb-3">{group.caption}</p>
              <div className="flex flex-wrap gap-2">
                {group.skills.map(skill => (
                  <span key={skill} className="chip">{skill}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
