import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import GenerativeField from './GenerativeField';
import { profile, experience } from '../data/resume';
import { projects, type Project } from '../data/projects';
import { skillGroups } from '../data/skills';
import { focusAreas, researchQuote, methodStatement } from '../data/research';

type Line = { id: number; node: ReactNode };

const PROMPT = (
  <>
    <span className="text-accent">harsh@research</span>
    <span className="text-ink-muted">:</span>
    <span className="text-data">~</span>
    <span className="text-ink-muted">$ </span>
  </>
);

const reduceMotion =
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------- small presentational helpers ---------- */

function Row({ k, v }: { k: string; v: ReactNode }) {
  return (
    <div className="term-kv">
      <span className="text-ink-faint">{k.padEnd(12, '·')}</span>
      <span>{v}</span>
    </div>
  );
}

function Heading({ children }: { children: ReactNode }) {
  return <div className="term-heading">{children}</div>;
}

function ChipRow({ items }: { items: string[] }) {
  return (
    <div className="mt-1 flex flex-wrap gap-x-3 gap-y-1">
      {items.map((s) => (
        <span key={s} className="text-ink-muted">
          <span className="text-accent">·</span> {s}
        </span>
      ))}
    </div>
  );
}

export default function Terminal() {
  const [lines, setLines] = useState<Line[]>([]);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [histIdx, setHistIdx] = useState(-1);
  const [now, setNow] = useState(() => new Date());

  const idRef = useRef(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const endRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const mk = useCallback((node: ReactNode): Line => ({ id: idRef.current++, node }), []);
  const push = useCallback(
    (node: ReactNode | ReactNode[]) => {
      const arr = Array.isArray(node) ? node : [node];
      setLines((prev) => [...prev, ...arr.map(mk)]);
    },
    [mk],
  );

  const openLink = useCallback((url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  }, []);

  /* command runner declared via ref so commands can call it (run/clear) */
  const runRef = useRef<(raw: string, echo?: boolean) => void>(() => {});

  const Chip = useCallback(
    ({ cmd, label }: { cmd: string; label?: string }) => (
      <button type="button" className="cmd-chip" onClick={() => runRef.current(cmd)}>
        {label ?? cmd}
      </button>
    ),
    [],
  );

  const Link = useCallback(
    ({ href, children }: { href: string; children: ReactNode }) => (
      <a
        href={href}
        target={href.startsWith('mailto:') ? undefined : '_blank'}
        rel="noreferrer"
        className="term-link"
      >
        {children}
      </a>
    ),
    [],
  );

  const findProject = (arg: string): Project | undefined => {
    if (!arg) return undefined;
    const n = parseInt(arg, 10);
    if (!Number.isNaN(n) && n >= 1 && n <= projects.length) return projects[n - 1];
    const q = arg.toLowerCase();
    return projects.find(
      (p) => p.title.toLowerCase().includes(q) || p.catalog.toLowerCase().includes(q),
    );
  };

  const projectDetail = (p: Project): ReactNode => (
    <div className="term-out">
      <div>
        <span className="text-accent">{p.catalog}</span>{' '}
        <span className="text-ink-bright font-semibold">{p.title}</span>{' '}
        <span className="text-ink-faint">[{p.status}]</span>
      </div>
      <div className="text-ink-faint">{p.subtitle} · {p.year}</div>
      <p className="mt-2 max-w-[72ch] text-ink-muted">{p.description}</p>
      <div className="mt-2">
        <span className="text-ink-faint">highlights/</span>
        {p.highlights.map((h) => (
          <div key={h} className="text-ink-muted">
            <span className="text-accent">+</span> {h}
          </div>
        ))}
      </div>
      <div className="mt-2">
        <span className="text-ink-faint">stack: </span>
        <span className="text-ink-muted">{p.technologies.join('  ·  ')}</span>
      </div>
      {p.href ? (
        <div className="mt-2">
          <Link href={p.href}>→ view source ({p.href.replace('https://', '')})</Link>
        </div>
      ) : (
        <div className="mt-2 text-ink-faint">// research artifact — no public repository</div>
      )}
    </div>
  );

  /* ---------- command registry ---------- */
  const commands = useMemo(() => {
    const reg: Record<
      string,
      { desc: string; hidden?: boolean; run: (args: string[]) => ReactNode | ReactNode[] | void }
    > = {};

    reg.help = {
      desc: 'list available commands',
      run: () => (
        <div className="term-out">
          <div className="text-ink-muted">available commands — click or type:</div>
          <div className="mt-2 grid gap-1">
            {[
              ['projects', 'selected work · then `open <n>`'],
              ['now', "what I'm building right now"],
              ['focus', 'focus areas'],
              ['experience', 'work history'],
              ['skills', 'toolkit'],
              ['about', 'short bio'],
              ['education', 'degrees'],
              ['contact', 'how to reach me'],
              ['graph', 'live process graph'],
              ['resume', 'download résumé (pdf)'],
              ['clear', 'clear the screen'],
            ].map(([c, d]) => (
              <div key={c} className="flex flex-wrap items-baseline gap-3">
                <Chip cmd={c} />
                <span className="text-ink-faint">{d}</span>
              </div>
            ))}
          </div>
          <div className="mt-2 text-ink-faint">
            shortcuts: <span className="text-ink-muted">↑/↓</span> history ·{' '}
            <span className="text-ink-muted">tab</span> autocomplete ·{' '}
            <span className="text-ink-muted">ls</span> view filesystem
          </div>
        </div>
      ),
    };

    reg.ls = {
      desc: 'list files',
      run: () => (
        <div className="term-out font-mono">
          <div className="grid grid-cols-2 gap-x-8 gap-y-0.5 sm:grid-cols-3">
            {[
              'about.md',
              'focus/',
              'experience.log',
              'projects/',
              'skills.txt',
              'education.md',
              'contact.card',
              'resume.pdf',
              'now.md',
            ].map((f) => (
              <span
                key={f}
                className={f.endsWith('/') ? 'text-accent' : 'text-ink-muted'}
              >
                {f}
              </span>
            ))}
          </div>
          <div className="mt-2 text-ink-faint">
            hint: try <Chip cmd="cat about.md" /> or <Chip cmd="projects" />
          </div>
        </div>
      ),
    };

    reg.about = {
      desc: 'about me',
      run: () => (
        <div className="term-out">
          <Heading>{profile.name}</Heading>
          <div className="text-ink-faint">{profile.role}</div>
          <p className="mt-2 max-w-[74ch] text-ink-muted">{profile.bio}</p>
          <p className="mt-2 max-w-[74ch] text-ink">
            <span className="text-ink-faint">{'>'} </span>
            {methodStatement.body}
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            <Chip cmd="focus" />
            <Chip cmd="projects" />
            <Chip cmd="contact" />
          </div>
        </div>
      ),
    };
    reg.whoami = { desc: 'short bio', hidden: true, run: () => reg.about.run([]) };

    reg.now = {
      desc: 'what I am building now',
      run: () => (
        <div className="term-out">
          <Heading>now.md — currently building</Heading>
          <div className="text-ink-muted">
            <span className="text-accent">+</span> <span className="text-ink-bright">TorchPilot</span>{' '}
            — LLM-driven AutoML for tabular PyTorch
          </div>
          <div className="text-ink-muted">
            <span className="text-accent">+</span> <span className="text-ink-bright">CTF-Agent</span>{' '}
            — multi-agent LLM that solves CTF challenges autonomously
          </div>
          <div className="text-ink-muted">
            <span className="text-accent">+</span> <span className="text-ink-bright">tuxtrainer</span>{' '}
            — PDF → fine-tuned small LLM → Ollama, in one pipeline
          </div>
          <div className="mt-2 text-ink-faint">
            focus: agentic systems · local LLM tooling · reproducible ML. run{' '}
            <Chip cmd="projects" /> for the full archive.
          </div>
        </div>
      ),
    };

    reg.focus = {
      desc: 'research focus',
      run: () => (
        <div className="term-out">
          <Heading>research focus — 3 threads, one discipline</Heading>
          {focusAreas.map((f, i) => (
            <div key={f.title} className="mt-3">
              <div>
                <span className="text-accent">{String(i + 1).padStart(2, '0')}</span>{' '}
                <span className="text-ink-bright font-semibold">{f.title}</span>
              </div>
              <p className="max-w-[74ch] text-ink-muted">{f.desc}</p>
              <ChipRow items={f.methods} />
            </div>
          ))}
          <p className="mt-3 max-w-[70ch] text-ink">
            <span className="text-ink-faint">"</span>
            {researchQuote}
            <span className="text-ink-faint">"</span>
          </p>
        </div>
      ),
    };
    reg.research = { desc: 'research focus', hidden: true, run: () => reg.focus.run([]) };

    reg.experience = {
      desc: 'work history',
      run: () => (
        <div className="term-out">
          <Heading>experience.log</Heading>
          {experience.map((e, i) => (
            <div key={`${e.title}-${i}`} className="mt-3">
              <div className="flex flex-wrap items-baseline gap-x-3">
                <span className="text-accent">{e.period}</span>
                <span className="text-ink-bright font-semibold">{e.title}</span>
                <span className="text-ink-faint">@ {e.org}</span>
              </div>
              <p className="max-w-[74ch] text-ink-muted">{e.desc}</p>
              {e.bullets.map((b) => (
                <div key={b} className="max-w-[74ch] text-ink-muted">
                  <span className="text-accent">+</span> {b}
                </div>
              ))}
            </div>
          ))}
        </div>
      ),
    };

    reg.projects = {
      desc: 'list projects',
      run: () => (
        <div className="term-out">
          <Heading>~/projects — {projects.length} entries</Heading>
          {projects.map((p, i) => (
            <button
              key={p.catalog}
              type="button"
              className="term-row"
              onClick={() => runRef.current(`open ${i + 1}`)}
            >
              <span className="text-ink-faint">{String(i + 1).padStart(2, '0')}</span>
              <span className="text-accent">{p.catalog}</span>
              <span className="text-ink-bright">{p.title}</span>
              <span className="text-ink-faint">[{p.status}]</span>
            </button>
          ))}
          <div className="mt-2 text-ink-faint">
            run <Chip cmd="open 1" /> … to expand an entry
          </div>
        </div>
      ),
    };
    reg.work = { desc: 'list projects', hidden: true, run: () => reg.projects.run([]) };

    reg.open = {
      desc: 'open a project: open <n|name>',
      run: (args) => {
        const p = findProject(args[0]);
        if (!p)
          return (
            <div className="term-out text-ink-muted">
              usage: <span className="text-accent">open &lt;n&gt;</span> — try <Chip cmd="projects" />
            </div>
          );
        return projectDetail(p);
      },
    };

    reg.skills = {
      desc: 'toolkit',
      run: () => (
        <div className="term-out">
          <Heading>skills.txt</Heading>
          {skillGroups.map((g) => (
            <div key={g.category} className="mt-2">
              <div className="text-ink-bright">{g.category}</div>
              <ChipRow items={g.skills} />
            </div>
          ))}
        </div>
      ),
    };
    reg.toolkit = { desc: 'toolkit', hidden: true, run: () => reg.skills.run([]) };

    reg.education = {
      desc: 'education',
      run: () => (
        <div className="term-out">
          <Heading>education.md</Heading>
          <Row k="degree" v={`${profile.degree}`} />
          <Row k="minor" v={profile.minor} />
          <Row k="school" v={profile.university} />
          <Row k="expected" v={profile.graduation} />
          <div className="mt-2" />
          <Row k="next" v={profile.upcoming?.degree} />
          <Row k="institution" v={profile.upcoming?.institution} />
          <Row k="starts" v={profile.upcoming?.start} />
        </div>
      ),
    };

    reg.contact = {
      desc: 'contact info',
      run: () => (
        <div className="term-out">
          <Heading>contact.card</Heading>
          <Row k="email" v={<Link href={`mailto:${profile.email}`}>{profile.email}</Link>} />
          <Row
            k="github"
            v={<Link href={profile.github}>{profile.github.replace('https://', '')}</Link>}
          />
          <Row
            k="linkedin"
            v={<Link href={profile.linkedin}>{profile.linkedin.replace('https://', '')}</Link>}
          />
          <Row k="location" v={`${profile.location} · open to remote`} />
          <div className="mt-2 flex flex-wrap gap-2">
            <Chip cmd="email" />
            <Chip cmd="resume" />
          </div>
        </div>
      ),
    };

    reg.graph = {
      desc: 'live evolution simulation',
      run: () => (
        <div className="term-out">
          <div className="text-ink-faint">proc · search-space.live — agents exploring</div>
          <div className="mt-1 plate plate-ticked">
            <div className="relative h-64 w-full max-w-[640px]">
              <GenerativeField className="absolute inset-0 h-full w-full" />
            </div>
          </div>
          <div className="mt-1 text-ink-faint">drag your cursor over the field to perturb it</div>
        </div>
      ),
    };
    reg.sim = { desc: 'live simulation', hidden: true, run: () => reg.graph.run([]) };
    reg.top = { desc: 'process graph', hidden: true, run: () => reg.graph.run([]) };

    reg.email = {
      desc: 'compose email',
      run: () => {
        openLink(`mailto:${profile.email}`);
        return <div className="term-out text-ink-muted">opening mail client → {profile.email}</div>;
      },
    };
    reg.github = {
      desc: 'open github',
      run: () => {
        openLink(profile.github);
        return <div className="term-out text-ink-muted">opening {profile.github} …</div>;
      },
    };
    reg.linkedin = {
      desc: 'open linkedin',
      run: () => {
        openLink(profile.linkedin);
        return <div className="term-out text-ink-muted">opening {profile.linkedin} …</div>;
      },
    };
    reg.resume = {
      desc: 'download résumé',
      run: () => {
        openLink('/Resume_Bhanot_HarshVardhan.pdf');
        return <div className="term-out text-ink-muted">fetching resume.pdf …</div>;
      },
    };

    reg.cat = {
      desc: 'cat <file>',
      run: (args) => {
        const f = (args[0] || '').replace(/^\.?\//, '');
        const map: Record<string, string> = {
          'about.md': 'about',
          'experience.log': 'experience',
          'skills.txt': 'skills',
          'education.md': 'education',
          'contact.card': 'contact',
          'now.md': 'now',
        };
        if (f === 'resume.pdf') return reg.resume.run([]);
        if (map[f]) return reg[map[f]].run([]);
        if (f.startsWith('focus')) return reg.focus.run([]);
        if (f.startsWith('projects')) return reg.projects.run([]);
        return (
          <div className="term-out text-ink-muted">
            cat: {args[0] || ''}: no such file — try <Chip cmd="ls" />
          </div>
        );
      },
    };

    reg.echo = { desc: 'echo text', hidden: true, run: (a) => <div className="term-out">{a.join(' ')}</div> };
    reg.date = {
      desc: 'print date',
      hidden: true,
      run: () => <div className="term-out text-ink-muted">{new Date().toString()}</div>,
    };
    reg.banner = { desc: 'reprint banner', hidden: true, run: () => <Banner /> };
    reg.sudo = {
      desc: 'superuser',
      hidden: true,
      run: () => (
        <div className="term-out text-ink-muted">
          harsh is not in the sudoers file. this incident will be reported. 🙂
        </div>
      ),
    };
    reg.exit = {
      desc: 'exit',
      hidden: true,
      run: () => (
        <div className="term-out text-ink-muted">there is no exit. you live here now. (try `clear`)</div>
      ),
    };

    return reg;
  }, [Chip, Link, openLink]);

  const commandNames = useMemo(() => Object.keys(commands), [commands]);

  /* ---------- execute ---------- */
  const run = useCallback(
    (raw: string, echo = true) => {
      const trimmed = raw.trim();
      if (echo) {
        push(
          <div className="term-line">
            <span className="prompt">{PROMPT}</span>
            <span className="text-ink-bright">{raw}</span>
          </div>,
        );
      }
      if (!trimmed) return;

      const [name, ...args] = trimmed.split(/\s+/);
      const cmd = commands[name.toLowerCase()];

      if (name.toLowerCase() === 'clear') {
        setLines([]);
        return;
      }
      if (!cmd) {
        push(
          <div className="term-out text-ink-muted">
            command not found: <span className="text-accent">{name}</span> — type{' '}
            <Chip cmd="help" />
          </div>,
        );
        return;
      }
      const out = cmd.run(args);
      if (out) push(out);
    },
    [commands, push, Chip],
  );
  runRef.current = run;

  /* ---------- boot sequence ---------- */
  useEffect(() => {
    const boot: ReactNode[] = [
      <div className="text-ink-faint">booting research environment …</div>,
      <div>
        <span className="text-accent">[ ok ]</span>{' '}
        <span className="text-ink-muted">mounted /home/harsh</span>
      </div>,
      <div>
        <span className="text-accent">[ ok ]</span>{' '}
        <span className="text-ink-muted">loaded profile.json</span>
      </div>,
      <div>
        <span className="text-accent">[ ok ]</span>{' '}
        <span className="text-ink-muted">connected to TAMUCC research net</span>
      </div>,
      <div>
        <span className="text-accent">[ ok ]</span>{' '}
        <span className="text-ink-muted">inference runtime ready · ollama</span>
      </div>,
      <div className="h-2" />,
      <Banner />,
      <div className="mt-2 text-ink-muted">
        type <Chip cmd="help" /> for all commands — or jump in:{' '}
        <Chip cmd="projects" /> <Chip cmd="now" /> <Chip cmd="open 1" />.
      </div>,
    ];

    if (reduceMotion) {
      setLines(boot.map(mk));
      return;
    }
    let i = 0;
    let timer: number;
    const step = () => {
      setLines((prev) => [...prev, mk(boot[i])]);
      i += 1;
      if (i < boot.length) {
        timer = window.setTimeout(step, i <= 5 ? 200 : 320);
      }
    };
    timer = window.setTimeout(step, 250);
    return () => window.clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* clock */
  useEffect(() => {
    const t = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(t);
  }, []);

  /* keep latest line / prompt in view after each command */
  const scrollToEnd = useCallback(() => {
    requestAnimationFrame(() => {
      endRef.current?.scrollIntoView({ block: 'end', behavior: reduceMotion ? 'auto' : 'smooth' });
    });
  }, []);
  useEffect(() => {
    scrollToEnd();
  }, [lines, scrollToEnd]);

  /* ---------- input handlers ---------- */
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const value = input;
    run(value);
    if (value.trim()) setHistory((h) => [...h, value.trim()]);
    setHistIdx(-1);
    setInput('');
    scrollToEnd();
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (!history.length) return;
      const next = histIdx === -1 ? history.length - 1 : Math.max(0, histIdx - 1);
      setHistIdx(next);
      setInput(history[next]);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (histIdx === -1) return;
      const next = histIdx + 1;
      if (next >= history.length) {
        setHistIdx(-1);
        setInput('');
      } else {
        setHistIdx(next);
        setInput(history[next]);
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const frag = input.trim().toLowerCase();
      if (!frag) return;
      const match = commandNames.filter((c) => !commands[c].hidden && c.startsWith(frag));
      if (match.length === 1) setInput(match[0] + ' ');
      else if (match.length > 1) push(<div className="term-out text-ink-faint">{match.join('   ')}</div>);
    } else if (e.key === 'l' && e.ctrlKey) {
      e.preventDefault();
      setLines([]);
    }
  };

  const focusInput = (e: React.MouseEvent) => {
    const tag = (e.target as HTMLElement).tagName;
    if (tag === 'A' || tag === 'BUTTON') return;
    if (window.getSelection()?.toString()) return;
    inputRef.current?.focus();
  };

  const clock = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });

  return (
    <div className="term-wrap" onMouseUp={focusInput}>
      <div className="term-shell">
        {/* window titlebar */}
        <div className="term-bar">
          <div className="flex items-center gap-2">
            <span className="term-dot" />
            <span className="term-dot term-dot-dim" />
            <span className="term-dot term-dot-faint" />
            <span className="ml-2 text-ink-muted">harsh@research: ~/portfolio</span>
          </div>
          <div className="hidden items-center gap-4 text-ink-faint sm:flex">
            <span>80×24</span>
            <span className="text-accent">●</span>
            <span>{clock}</span>
          </div>
        </div>

        {/* scrollback — spacer keeps the prompt anchored to the bottom */}
        <div ref={scrollRef} className="term-body" role="log" aria-live="polite">
          <div className="term-spacer" aria-hidden="true" />
          {lines.map((l) => (
            <div key={l.id}>{l.node}</div>
          ))}

          {/* input line */}
          <form onSubmit={onSubmit} className="input-row" autoComplete="off">
            <span className="prompt">{PROMPT}</span>
            <span className="input-field">
              <span className="typed">{input}</span>
              <span className="cursor" aria-hidden="true" />
              <input
                ref={inputRef}
                className="ghost-input"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={onKeyDown}
                aria-label="terminal input"
                autoFocus
                autoCapitalize="off"
                autoCorrect="off"
                spellCheck={false}
              />
            </span>
          </form>
          <div ref={endRef} />
        </div>
      </div>
    </div>
  );
}

/* ---------- ASCII-art banner (figlet "HVB"; String.raw keeps backslashes) ---------- */
function Banner() {
  const art = [
    String.raw` _   _  __     __ ____  `,
    String.raw`| | | | \ \   / /| __ ) `,
    String.raw`| |_| |  \ \ / / |  _ \ `,
    String.raw`|  _  |   \ V /  | |_) |`,
    String.raw`|_| |_|    \_/   |____/ `,
  ].join('\n');
  return (
    <div className="term-banner-wrap">
      <pre className="term-banner" aria-hidden="true">
        {art}
      </pre>
      <div className="term-banner-sub">
        harsh vardhan bhanot — <span className="text-ink-muted">llm agents · automl · ml engineering</span>
      </div>
    </div>
  );
}
