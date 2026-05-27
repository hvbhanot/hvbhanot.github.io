import { Link } from 'react-router-dom';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { profile } from '../data/resume';
import { projects } from '../data/projects';

export default function Home() {
  const featured = projects.filter(p => p.status !== 'archived').slice(0, 3);

  return (
    <div className="pt-16">
      {/* Strong JARVIS-style Hero */}
      <section className="relative min-h-[88vh] flex items-center overflow-hidden border-b border-[#1f2a3f]">
        {/* Subtle HUD grid */}
        <div className="absolute inset-0 bg-grid-subtle pointer-events-none" aria-hidden />

        <div className="absolute inset-0 pointer-events-none" aria-hidden>
          <div className="absolute top-1/4 -right-16 w-[520px] h-[520px] rounded-full"
               style={{ background: 'radial-gradient(circle, rgba(0,234,255,0.07) 0%, transparent 70%)' }} />
          <div className="absolute bottom-1/4 -left-20 w-[380px] h-[380px] rounded-full"
               style={{ background: 'radial-gradient(circle, rgba(0,184,255,0.05) 0%, transparent 72%)' }} />
        </div>

        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <div className="mb-6">
            <span className="inline-block px-4 py-1 text-xs tracking-[0.2em] border border-[#1f2a3f] text-[#4a5a70]">
              HVB.SIGNAL — {new Date().getFullYear()}
            </span>
          </div>

          <h1 className="text-6xl md:text-7xl font-semibold tracking-[-0.04em] leading-none">
            Harsh Vardhan<br />
            <span className="bg-gradient-to-r from-[#00eaff] via-[#4dc4ff] to-[#00b8ff] bg-clip-text text-transparent">
              Bhanot
            </span>
          </h1>

          <p className="mt-6 max-w-xl text-lg text-[#8a9ab0]">
            {profile.bio}
          </p>

          <div className="mt-5 flex flex-wrap gap-2">
            {profile.tagline.split(' · ').map((t, i) => (
              <span key={i} className="chip">{t}</span>
            ))}
          </div>

          <div className="mt-8 flex items-center gap-4">
            <Link to="/projects" className="btn btn-primary group">
              View projects <ArrowRight size={16} className="group-hover:translate-x-0.5 transition" />
            </Link>
            <Link to="/about" className="btn btn-ghost">Learn more</Link>
          </div>
        </div>

        {/* Subtle location badge */}
        <div className="absolute bottom-10 right-6 hidden lg:block text-xs font-mono tracking-widest text-[#4a5a70]">
          {profile.location} • ONLINE
        </div>
      </section>

      {/* Upcoming Education Highlight */}
      <section className="max-w-4xl mx-auto px-6 pt-16 pb-8">
        <div className="text-xs tracking-[0.2em] text-[#4a5a70] mb-2">NEXT CHAPTER</div>
        <div className="text-3xl font-semibold tracking-tight">
          {profile.upcoming?.degree}
        </div>
        <div className="text-xl text-[#00eaff] mt-1">{profile.upcoming?.institution} — {profile.upcoming?.start}</div>
        <p className="mt-4 max-w-md text-[#8a9ab0]">
          Advancing into graduate studies focused on statistics and computational methods.
        </p>
      </section>

      {/* Selected Work */}
      <section className="max-w-5xl mx-auto px-6 py-12 border-t border-[#1f2a3f]">
        <div className="flex items-end justify-between mb-8">
          <div>
            <div className="text-xs tracking-[0.2em] text-[#4a5a70]">SELECTED WORK</div>
            <h2 className="text-3xl font-semibold tracking-tight">Things I’ve built</h2>
          </div>
          <Link to="/projects" className="text-sm text-[#00eaff] hover:underline flex items-center gap-1">
            View full archive <ArrowRight size={15} />
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {featured.map((p, i) => (
            <Link 
              key={i} 
              to="/projects" 
              className="group block border border-[#1f2a3f] bg-[#0b0f17] p-6 rounded-xl hover:border-[#00eaff]/40 transition-colors"
            >
              <div className="flex justify-between items-start">
                <span className="text-xs font-mono text-[#00eaff]">{p.catalog}</span>
                <span className={`text-[10px] px-2 py-0.5 rounded tracking-wider ${
                  p.status === 'ongoing' ? 'bg-[#00eaff]/10 text-[#00eaff]' : 'bg-[#00b8ff]/10 text-[#00b8ff]'
                }`}>{p.status}</span>
              </div>
              <h3 className="mt-4 text-xl font-semibold tracking-tight group-hover:text-[#00eaff] transition-colors">
                {p.title}
              </h3>
              <p className="text-sm text-[#8a9ab0] mt-1">{p.subtitle}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Quick CTA */}
      <section className="max-w-4xl mx-auto px-6 py-16 text-center border-t border-[#1f2a3f]">
        <p className="text-lg text-[#8a9ab0]">Open to research collaborations and interesting problems.</p>
        <div className="mt-6">
          <Link to="/contact" className="btn btn-primary px-8">Start a conversation</Link>
        </div>
      </section>
    </div>
  );
}
