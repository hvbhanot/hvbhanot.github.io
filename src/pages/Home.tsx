import { Link } from 'react-router-dom';
import { ArrowRight, Activity, Users, Target, FolderOpen } from 'lucide-react';
import { profile } from '../data/resume';
import { projects } from '../data/projects';

export default function Home() {
  const activeProjects = projects.filter(p => p.status !== 'archived').slice(0, 3);
  const totalProjects = projects.length;

  return (
    <div className="space-y-8">
      {/* System Header */}
      <div>
        <div className="flex items-center gap-2 text-[#4a5a70] text-xs font-mono tracking-[0.2em] mb-2">
          <Activity size={14} /> LIVE SYSTEM STATUS
        </div>
        <h1 className="text-4xl md:text-5xl font-semibold tracking-[-0.02em]">
          Good morning, Commander.<br />
          <span className="text-[#00eaff]">All systems nominal.</span>
        </h1>
      </div>

      {/* Status Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Profile Summary */}
        <div className="border border-[#1f2a3f] bg-[#0b0f17] p-6 rounded-lg">
          <div className="text-[#4a5a70] text-xs tracking-[0.15em] mb-4">SUBJECT // PERSONNEL FILE</div>
          <div className="text-2xl font-medium tracking-tight mb-1">{profile.name}</div>
          <div className="text-[#8a9ab0] mb-4">{profile.role}</div>
          
          <div className="space-y-1 text-sm">
            <div className="flex justify-between border-b border-[#1f2a3f] pb-1">
              <span className="text-[#4a5a70]">AFFILIATION</span>
              <span>{profile.university.split('–')[0].trim()}</span>
            </div>
            <div className="flex justify-between border-b border-[#1f2a3f] pb-1">
              <span className="text-[#4a5a70]">CLEARANCE</span>
              <span>RESEARCHER — LEVEL 4</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#4a5a70]">LOCATION</span>
              <span>{profile.location}</span>
            </div>
          </div>
        </div>

        {/* Current Focus + Upcoming */}
        <div className="border border-[#1f2a3f] bg-[#0b0f17] p-6 rounded-lg md:col-span-2">
          <div className="flex items-center gap-2 text-[#4a5a70] text-xs tracking-[0.15em] mb-4">
            <Target size={14} /> CURRENT DIRECTIVE
          </div>
          <div className="text-lg leading-tight mb-4">
            Building reproducible systems at the intersection of computational genetics and machine learning for scientific discovery.
          </div>

          <div className="mt-6 pt-5 border-t border-[#1f2a3f]">
            <div className="text-[#4a5a70] text-xs tracking-[0.15em] mb-2">UPCOMING</div>
            <div className="font-medium">{profile.upcoming?.degree}</div>
            <div className="text-[#00eaff]">{profile.upcoming?.institution} · {profile.upcoming?.start}</div>
          </div>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "ACTIVE PROJECTS", value: activeProjects.length, icon: Activity },
          { label: "TOTAL ARCHIVE", value: totalProjects, icon: FolderOpen },
          { label: "YEARS RESEARCH", value: "4+", icon: Users },
          { label: "GRADUATION", value: profile.graduation, icon: Target },
        ].map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="border border-[#1f2a3f] bg-[#0b0f17] p-5 rounded-lg">
              <div className="flex items-center gap-2 text-[#4a5a70] text-xs mb-3">
                <Icon size={14} /> {stat.label}
              </div>
              <div className="text-4xl font-medium tracking-tighter text-[#00eaff]">{stat.value}</div>
            </div>
          );
        })}
      </div>

      {/* Active Projects */}
      <div>
        <div className="flex items-baseline justify-between mb-4">
          <div>
            <div className="text-xs tracking-[0.2em] text-[#4a5a70]">PRIORITY QUEUE</div>
            <div className="text-xl font-medium">Active Operations</div>
          </div>
          <Link to="/projects" className="text-sm text-[#00eaff] hover:underline flex items-center gap-1">
            VIEW ALL <ArrowRight size={14} />
          </Link>
        </div>

        <div className="border border-[#1f2a3f] divide-y divide-[#1f2a3f] rounded-lg overflow-hidden">
          {activeProjects.map((project, index) => (
            <Link 
              key={index} 
              to="/projects" 
              className="flex flex-col md:flex-row md:items-center justify-between px-5 py-4 hover:bg-[#0f141f] transition-colors group"
            >
              <div>
                <div className="font-medium tracking-tight group-hover:text-[#00eaff] transition-colors">{project.title}</div>
                <div className="text-sm text-[#8a9ab0]">{project.subtitle}</div>
              </div>
              <div className="mt-2 md:mt-0 flex items-center gap-3 text-xs">
                <span className="font-mono px-2 py-px border border-[#1f2a3f] rounded text-[#00eaff]">{project.catalog}</span>
                <span className={`px-2 py-px rounded text-xs uppercase tracking-wider ${
                  project.status === 'ongoing' ? 'bg-[#00eaff]/10 text-[#00eaff]' : 'bg-[#00b8ff]/10 text-[#00b8ff]'
                }`}>
                  {project.status}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Trajectory Panel - New Education Path */}
      <div className="border border-[#1f2a3f] bg-[#0b0f17] p-6 rounded-lg">
        <div className="flex items-center gap-2 text-[#4a5a70] text-xs tracking-[0.15em] mb-3">
          <Target size={14} /> TRAJECTORY
        </div>
        <div className="text-lg font-medium mb-1">Next Deployment</div>
        <div className="text-[#00eaff] text-xl">{profile.upcoming?.degree}</div>
        <div className="text-[#8a9ab0] mt-1">{profile.upcoming?.institution} • {profile.upcoming?.start}</div>
        <div className="mt-4 text-sm text-[#4a5a70]">
          Transitioning from undergraduate research at Texas A&M–Corpus Christi into advanced graduate work focused on statistics and computational methods.
        </div>
      </div>

      {/* Skills Snapshot + Quick Actions */}
      <div className="grid md:grid-cols-2 gap-4">
        <div className="border border-[#1f2a3f] bg-[#0b0f17] p-6 rounded-lg">
          <div className="text-[#4a5a70] text-xs tracking-[0.15em] mb-3">SKILLS SNAPSHOT</div>
          <div className="flex flex-wrap gap-2">
            {['Python', 'PyTorch', 'SLiM', 'Hugging Face', 'Reproducibility', 'C++', 'Go'].map(skill => (
              <span key={skill} className="chip">{skill}</span>
            ))}
          </div>
          <div className="mt-4 text-xs text-[#4a5a70]">
            Full skill matrix available in Personnel File.
          </div>
        </div>

        <div className="border border-[#1f2a3f] bg-[#0b0f17] p-6 rounded-lg">
          <div className="text-[#4a5a70] text-xs tracking-[0.15em] mb-3">QUICK ACCESS</div>
          <div className="flex flex-col gap-2 text-sm">
            <Link to="/research" className="hover:text-[#00eaff] transition-colors flex items-center gap-2">→ Explore Research Directives</Link>
            <Link to="/about" className="hover:text-[#00eaff] transition-colors flex items-center gap-2">→ Review Full Personnel Record</Link>
            <a href={`mailto:${profile.email}`} className="hover:text-[#00eaff] transition-colors flex items-center gap-2">→ Open Secure Comms Channel</a>
            <a href={profile.github} target="_blank" rel="noreferrer" className="hover:text-[#00eaff] transition-colors flex items-center gap-2">→ Access Code Archive</a>
          </div>
        </div>
      </div>
    </div>
  );
}
