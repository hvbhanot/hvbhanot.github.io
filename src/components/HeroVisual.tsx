export default function HeroVisual() {
  const nodes = [
    { left: '18%', top: '28%', size: '10px' },
    { left: '34%', top: '18%', size: '8px' },
    { left: '58%', top: '24%', size: '12px' },
    { left: '74%', top: '40%', size: '9px' },
    { left: '24%', top: '66%', size: '8px' },
    { left: '50%', top: '72%', size: '10px' },
    { left: '78%', top: '70%', size: '7px' },
  ];

  return (
    <div className="relative min-h-[360px] overflow-hidden rounded-lg border border-white/10 bg-ink-950/45 shadow-glow-violet">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(32,243,255,0.20),transparent_26%),radial-gradient(circle_at_70%_24%,rgba(140,92,255,0.16),transparent_24%)]" />
      <div className="absolute inset-8 rounded-lg border border-cyanCore/12" />
      <div className="absolute left-1/2 top-1/2 size-44 -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyanCore/30 bg-cyanCore/10 shadow-[0_0_80px_rgba(32,243,255,0.18)]" />
      <div className="hero-orb absolute left-1/2 top-1/2 size-28 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-cyanCore/75 via-blueCore/35 to-violetCore/35" />

      <svg className="absolute inset-0 h-full w-full opacity-70" viewBox="0 0 480 360" aria-hidden="true">
        <defs>
          <linearGradient id="networkGradient" x1="0" x2="1">
            <stop offset="0%" stopColor="#20f3ff" stopOpacity="0.18" />
            <stop offset="52%" stopColor="#2f7dff" stopOpacity="0.36" />
            <stop offset="100%" stopColor="#8c5cff" stopOpacity="0.25" />
          </linearGradient>
        </defs>
        <path d="M76 102 L160 68 L278 86 L374 144 L240 238 L116 238 Z" fill="none" stroke="url(#networkGradient)" />
        <path d="M160 68 L240 238 L278 86 L116 238 L374 144 L76 102" fill="none" stroke="url(#networkGradient)" />
        <path d="M90 280 C160 216 320 310 396 226" fill="none" stroke="#20f3ff" strokeOpacity="0.26" />
        <path d="M112 68 C190 166 305 48 382 152" fill="none" stroke="#8c5cff" strokeOpacity="0.28" />
      </svg>

      {nodes.map((node, index) => (
        <span
          key={`${node.left}-${node.top}`}
          className="absolute rounded-full bg-cyanCore shadow-[0_0_22px_rgba(32,243,255,0.55)]"
          style={{
            left: node.left,
            top: node.top,
            width: node.size,
            height: node.size,
            animationDelay: `${index * 180}ms`,
          }}
        />
      ))}

      <div className="absolute bottom-5 left-5 right-5 grid gap-2 sm:grid-cols-3">
        {['Simulation', 'Fine-tuning', 'Reproducibility'].map((item) => (
          <div key={item} className="rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2 font-mono text-[0.68rem] font-bold uppercase tracking-wide text-ink-200">
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}
