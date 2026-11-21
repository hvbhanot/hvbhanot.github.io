import { useId, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import type { PlotKind } from './ProjectPlot';

type DiagramProps = {
  kind: PlotKind;
  catalog: string;
  caption?: string;
  labels?: readonly string[];
};

const FEEDBACK_NOTES: Record<string, readonly string[]> = {
  '№ 014': [
    'Reasons over information gaps and plans date-stamped sub-queries.',
    'Dispatches sub-queries through Open WebUI’s configured search engine — no extra API keys.',
    'Selectively fetches candidate pages and extracts evidence snippets into context.',
    'Stops once evidence is sufficient and injects numbered citations for the selected model.',
  ],
  '№ 002': [
    'Ollama Cloud model proposes tabular architecture, hyperparameters, and preprocessing.',
    'Builds and fits the proposed PyTorch model on the supplied CSV dataset.',
    'Collects validation metrics and learning-curve diagnostics from the training run.',
    'Feeds diagnostics back to the LLM to revise the next proposal; retains the best model.',
  ],
  '№ 003': [
    'Planner decomposes the challenge and updates persistent scratchpad memory.',
    'Routes sub-tasks across a registry of 44 local security tools (nmap, gdb, pwntools…).',
    'Executes ReAct tool calls fully locally via Ollama with inspectable intermediate traces.',
    'Verifier checks candidate evidence and flags before completing or looping.',
  ],
  '№ 005': [
    'Captures the active browser viewport alongside the Open WebUI side panel.',
    'Vision model grounds interactive page elements directly from the screenshot.',
    'Performs targeted navigation, clicks, or on-page form automation.',
    'Re-observes the updated viewport to confirm the state transition.',
  ],
};

function FeedbackDiagram({
  catalog,
  labels,
  caption,
}: {
  catalog: string;
  labels?: readonly string[];
  caption?: string;
}) {
  const [step, setStep] = useState(0);
  const arrowId = useId();
  const arrowActiveId = useId();

  const rawLabels =
    labels && labels.length === 4
      ? labels
      : ['OBSERVE', 'SELECT', 'ACT', 'VERIFY'];
  const pretty = rawLabels.map(
    (item) => item.charAt(0) + item.slice(1).toLowerCase(),
  );
  const notes = FEEDBACK_NOTES[catalog] ?? [
    'Inspects current state and formulates the next step.',
    'Selects the appropriate tool or action candidate.',
    'Executes the chosen step with inspectable output.',
    'Verifies the resulting state before deciding to stop or iterate.',
  ];

  const nodes = [
    { x: 102, y: 48, label: pretty[0] },
    { x: 318, y: 48, label: pretty[1] },
    { x: 318, y: 142, label: pretty[2] },
    { x: 102, y: 142, label: pretty[3] },
  ];

  const edges = [
    { d: 'M 174 48 L 240 48', from: 0, dashed: false },
    { d: 'M 318 69 L 318 117', from: 1, dashed: false },
    { d: 'M 246 142 L 180 142', from: 2, dashed: false },
    { d: 'M 102 121 L 102 73', from: 3, dashed: true },
  ];

  return (
    <figure className="diagram-frame">
      <div className="diagram-header">
        <span className="diagram-kicker">
          {caption ?? 'Cyclic agent architecture'}
        </span>
        <button
          type="button"
          className="diagram-action"
          onClick={() => setStep((s) => (s + 1) % 4)}
          aria-label={`Advance cycle from ${pretty[step]} to ${pretty[(step + 1) % 4]}`}
        >
          <span>Step</span>
          <ArrowRight size={12} aria-hidden="true" />
        </button>
      </div>
      <div className="diagram-stage">
        <svg
          viewBox="0 0 420 190"
          className="diagram-svg"
          role="img"
          aria-label={`Interactive 4-step cycle: ${pretty.join(' to ')}. Current step: ${pretty[step]}.`}
        >
          <defs>
            <marker
              id={arrowId}
              viewBox="0 0 8 8"
              refX="6"
              refY="4"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path
                d="M 1 1.5 L 6.5 4 L 1 6.5"
                fill="none"
                stroke="var(--ink-muted)"
                strokeWidth="1.25"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </marker>
            <marker
              id={arrowActiveId}
              viewBox="0 0 8 8"
              refX="6"
              refY="4"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path
                d="M 1 1.5 L 6.5 4 L 1 6.5"
                fill="none"
                stroke="var(--accent)"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </marker>
          </defs>

          <text
            x="210"
            y="99"
            textAnchor="middle"
            className="svg-muted-label"
          >
            iterate until sufficient
          </text>

          {edges.map((edge) => {
            const active = edge.from === step;
            return (
              <path
                key={edge.from}
                d={edge.d}
                fill="none"
                stroke={active ? 'var(--accent)' : 'var(--rule-strong)'}
                strokeWidth={active ? 1.75 : 1.15}
                strokeDasharray={edge.dashed ? '4 4' : undefined}
                markerEnd={`url(#${active ? arrowActiveId : arrowId})`}
                className="svg-transition"
              />
            );
          })}

          {nodes.map((node, index) => {
            const active = index === step;
            return (
              <g
                key={node.label}
                role="button"
                tabIndex={0}
                aria-pressed={active}
                aria-label={`Step ${index + 1}: ${node.label}`}
                className="svg-node"
                onClick={() => setStep(index)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    setStep(index);
                  }
                }}
              >
                {active && (
                  <rect
                    x={node.x - 73}
                    y={node.y - 21}
                    width="146"
                    height="42"
                    rx="7"
                    fill="none"
                    stroke="var(--accent)"
                    strokeOpacity="0.28"
                    strokeWidth="1.2"
                  />
                )}
                <rect
                  x={node.x - 68}
                  y={node.y - 17}
                  width="136"
                  height="34"
                  rx="5"
                  fill={active ? 'var(--bg)' : 'var(--bg-elevated)'}
                  stroke={active ? 'var(--accent)' : 'var(--rule-strong)'}
                  strokeWidth={active ? 1.5 : 1}
                  className="svg-transition"
                />
                <text
                  x={node.x - 54}
                  y={node.y + 3.5}
                  className={active ? 'svg-index-active' : 'svg-index'}
                >
                  0{index + 1}
                </text>
                <text
                  x={node.x + 8}
                  y={node.y + 4}
                  textAnchor="middle"
                  className={active ? 'svg-node-text-active' : 'svg-node-text'}
                >
                  {node.label}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
      <figcaption className="diagram-caption">
        <span className="diagram-step-pill">
          0{step + 1} · {pretty[step]}
        </span>
        <span>{notes[step]}</span>
      </figcaption>
    </figure>
  );
}

function RoutingDiagram({ caption }: { caption?: string }) {
  const [route, setRoute] = useState<'cloud' | 'local'>('cloud');
  const arrowId = useId();
  const arrowActiveId = useId();
  const isCloud = route === 'cloud';

  return (
    <figure className="diagram-frame">
      <div className="diagram-header">
        <span className="diagram-kicker">
          {caption ?? 'Task → configured local or cloud model'}
        </span>
        <div
          className="diagram-toggle-group"
          role="group"
          aria-label="Simulate model route"
        >
          <button
            type="button"
            className={isCloud ? 'diagram-chip is-active' : 'diagram-chip'}
            aria-pressed={isCloud}
            onClick={() => setRoute('cloud')}
          >
            Cloud
          </button>
          <button
            type="button"
            className={!isCloud ? 'diagram-chip is-active' : 'diagram-chip'}
            aria-pressed={!isCloud}
            onClick={() => setRoute('local')}
          >
            Local
          </button>
        </div>
      </div>

      <div className="diagram-stage">
        <svg
          viewBox="0 0 420 190"
          className="diagram-svg"
          role="img"
          aria-label={`Model routing diagram currently routed via ${isCloud ? 'cloud OpenRouter endpoint' : 'local Ollama / vLLM endpoint'}.`}
        >
          <defs>
            <marker
              id={arrowId}
              viewBox="0 0 8 8"
              refX="6"
              refY="4"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path
                d="M 1 1.5 L 6.5 4 L 1 6.5"
                fill="none"
                stroke="var(--ink-muted)"
                strokeWidth="1.25"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </marker>
            <marker
              id={arrowActiveId}
              viewBox="0 0 8 8"
              refX="6"
              refY="4"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path
                d="M 1 1.5 L 6.5 4 L 1 6.5"
                fill="none"
                stroke="var(--accent)"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </marker>
          </defs>

          {/* Task -> Router */}
          <path
            d="M 76 95 L 106 95"
            fill="none"
            stroke="var(--accent)"
            strokeWidth="1.5"
            markerEnd={`url(#${arrowActiveId})`}
          />

          {/* Router -> Cloud */}
          <path
            d="M 170 95 C 192 95, 190 50, 212 50"
            fill="none"
            stroke={isCloud ? 'var(--accent)' : 'var(--rule-strong)'}
            strokeWidth={isCloud ? 1.75 : 1.1}
            strokeDasharray={isCloud ? undefined : '4 4'}
            markerEnd={`url(#${isCloud ? arrowActiveId : arrowId})`}
            className="svg-transition"
          />
          {/* Cloud -> Diff */}
          <path
            d="M 332 50 C 350 50, 348 95, 360 95"
            fill="none"
            stroke={isCloud ? 'var(--accent)' : 'var(--rule-strong)'}
            strokeWidth={isCloud ? 1.75 : 1.1}
            strokeDasharray={isCloud ? undefined : '4 4'}
            className="svg-transition"
          />

          {/* Router -> Local */}
          <path
            d="M 170 95 C 192 95, 190 140, 212 140"
            fill="none"
            stroke={!isCloud ? 'var(--accent)' : 'var(--rule-strong)'}
            strokeWidth={!isCloud ? 1.75 : 1.1}
            strokeDasharray={!isCloud ? undefined : '4 4'}
            markerEnd={`url(#${!isCloud ? arrowActiveId : arrowId})`}
            className="svg-transition"
          />
          {/* Local -> Diff */}
          <path
            d="M 332 140 C 350 140, 348 95, 360 95"
            fill="none"
            stroke={!isCloud ? 'var(--accent)' : 'var(--rule-strong)'}
            strokeWidth={!isCloud ? 1.75 : 1.1}
            strokeDasharray={!isCloud ? undefined : '4 4'}
            className="svg-transition"
          />

          {/* Task node */}
          <rect
            x="14"
            y="78"
            width="62"
            height="34"
            rx="5"
            fill="var(--bg)"
            stroke="var(--rule-strong)"
          />
          <text x="45" y="99" textAnchor="middle" className="svg-node-text">
            Task
          </text>

          {/* Router node */}
          <rect
            x="110"
            y="78"
            width="60"
            height="34"
            rx="5"
            fill="var(--bg)"
            stroke="var(--accent)"
            strokeWidth="1.25"
          />
          <text
            x="140"
            y="99"
            textAnchor="middle"
            className="svg-node-text-active"
          >
            route
          </text>

          {/* Cloud branch */}
          <g
            role="button"
            tabIndex={0}
            aria-pressed={isCloud}
            aria-label="Route to cloud models"
            className="svg-node"
            onClick={() => setRoute('cloud')}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setRoute('cloud');
              }
            }}
          >
            <rect
              x="216"
              y="32"
              width="116"
              height="36"
              rx="5"
              fill={isCloud ? 'var(--bg)' : 'var(--bg-elevated)'}
              stroke={isCloud ? 'var(--accent)' : 'var(--rule-strong)'}
              strokeWidth={isCloud ? 1.5 : 1}
              className="svg-transition"
            />
            <text
              x="274"
              y="48"
              textAnchor="middle"
              className={isCloud ? 'svg-node-text-active' : 'svg-node-text'}
            >
              Cloud API
            </text>
            <text x="274" y="61" textAnchor="middle" className="svg-sub-label">
              OpenRouter
            </text>
          </g>

          {/* Local branch */}
          <g
            role="button"
            tabIndex={0}
            aria-pressed={!isCloud}
            aria-label="Route to local models"
            className="svg-node"
            onClick={() => setRoute('local')}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setRoute('local');
              }
            }}
          >
            <rect
              x="216"
              y="122"
              width="116"
              height="36"
              rx="5"
              fill={!isCloud ? 'var(--bg)' : 'var(--bg-elevated)'}
              stroke={!isCloud ? 'var(--accent)' : 'var(--rule-strong)'}
              strokeWidth={!isCloud ? 1.5 : 1}
              className="svg-transition"
            />
            <text
              x="274"
              y="138"
              textAnchor="middle"
              className={!isCloud ? 'svg-node-text-active' : 'svg-node-text'}
            >
              Local endpoint
            </text>
            <text x="274" y="151" textAnchor="middle" className="svg-sub-label">
              Ollama · vLLM
            </text>
          </g>

          {/* Edit node */}
          <rect
            x="360"
            y="78"
            width="48"
            height="34"
            rx="5"
            fill="var(--bg)"
            stroke="var(--rule-strong)"
          />
          <text x="384" y="99" textAnchor="middle" className="svg-node-text">
            Edit
          </text>
        </svg>
      </div>

      <figcaption className="diagram-caption">
        <span className="diagram-step-pill">
          {isCloud ? 'Cloud-first' : 'Local fallback'}
        </span>
        <span>
          {isCloud
            ? 'Routes turns to configured cloud keys while keeping approval modes and @-file completion intact.'
            : 'Falls back seamlessly to local Ollama, LM Studio, llama.cpp, or vLLM endpoints without leaving the loop.'}
        </span>
      </figcaption>
    </figure>
  );
}

function MatrixDiagram({ caption }: { caption?: string }) {
  const [decay, setDecay] = useState(0.45);
  const [selected, setSelected] = useState<[number, number]>([1, 3]);
  const sliderId = useId();
  const n = 7;
  const cell = 18;
  const gap = 2;
  const step = cell + gap;
  const left = 54;
  const top = 25;
  const total = n * step - gap;

  const val = (i: number, j: number) => Math.exp(-decay * Math.abs(i - j));
  const [si, sj] = selected;
  const selectedValue = val(si, sj);

  return (
    <figure className="diagram-frame">
      <div className="diagram-header">
        <span className="diagram-kicker">
          {caption ?? 'Illustrative covariance structure / NumPy'}
        </span>
        <label className="diagram-slider-label" htmlFor={sliderId}>
          <span>λ = {decay.toFixed(2)}</span>
          <input
            id={sliderId}
            type="range"
            min="0.15"
            max="1.10"
            step="0.05"
            value={decay}
            onChange={(e) => setDecay(Number(e.target.value))}
            aria-label="Covariance decay rate lambda"
          />
        </label>
      </div>

      <div className="diagram-stage">
        <svg
          viewBox="0 0 420 190"
          className="diagram-svg"
          role="img"
          aria-label={`Interactive 7 by 7 Toeplitz covariance matrix with decay ${decay.toFixed(2)}. Cell (${si + 1}, ${sj + 1}) equals ${selectedValue.toFixed(2)}.`}
        >
          {/* Left & right matrix brackets */}
          <path
            d={`M ${left - 6} ${top - 2} H ${left - 13} V ${top + total + 2} H ${left - 6}`}
            fill="none"
            stroke="var(--ink-secondary)"
            strokeWidth="1.2"
          />
          <path
            d={`M ${left + total + 6} ${top - 2} H ${left + total + 13} V ${top + total + 2} H ${left + total + 6}`}
            fill="none"
            stroke="var(--ink-secondary)"
            strokeWidth="1.2"
          />

          {/* 7x7 cells */}
          {Array.from({ length: n }, (_, i) =>
            Array.from({ length: n }, (_, j) => {
              const v = val(i, j);
              const isSelected = i === si && j === sj;
              return (
                <rect
                  key={`${i}-${j}`}
                  x={left + j * step}
                  y={top + i * step}
                  width={cell}
                  height={cell}
                  rx="2.5"
                  fill="var(--accent)"
                  fillOpacity={0.08 + v * 0.84}
                  stroke={isSelected ? 'var(--ink)' : 'transparent'}
                  strokeWidth={isSelected ? 1.5 : 0}
                  className="svg-cell"
                  onMouseEnter={() => setSelected([i, j])}
                  onClick={() => setSelected([i, j])}
                />
              );
            }),
          )}

          {/* Right-hand analytical readout */}
          <line
            x1="234"
            y1="26"
            x2="234"
            y2="164"
            stroke="var(--rule)"
            strokeWidth="1"
          />
          <text x="254" y="46" className="svg-muted-label">
            ENTRY INSPECTOR
          </text>
          <text x="254" y="72" className="svg-readout-big">
            Σ[{si + 1},{sj + 1}] = {selectedValue.toFixed(2)}
          </text>
          <text x="254" y="92" className="svg-sub-label">
            exp(−{decay.toFixed(2)} · |{si + 1} − {sj + 1}|)
          </text>

          {/* Row profile sparkbars */}
          <text x="254" y="118" className="svg-muted-label">
            ROW {si + 1} PROFILE
          </text>
          {Array.from({ length: n }, (_, j) => {
            const h = Math.max(3, val(si, j) * 32);
            const isCol = j === sj;
            return (
              <rect
                key={j}
                x={254 + j * 19}
                y={160 - h}
                width="13"
                height={h}
                rx="1.5"
                fill={isCol ? 'var(--accent-warm)' : 'var(--accent)'}
                fillOpacity={isCol ? 0.95 : 0.45}
                className="svg-transition"
              />
            );
          })}
        </svg>
      </div>

      <figcaption className="diagram-caption">
        <span className="diagram-step-pill">Σ[i,j]</span>
        <span>
          Hover cells or adjust λ — illustrating the numerical linear algebra and matrix primitives implemented from scratch in NumPy.
        </span>
      </figcaption>
    </figure>
  );
}

function ConstraintDiagram({ caption }: { caption?: string }) {
  const [mode, setMode] = useState<'guided' | 'recall'>('guided');
  const arrowId = useId();
  const isGuided = mode === 'guided';

  return (
    <figure className="diagram-frame">
      <div className="diagram-header">
        <span className="diagram-kicker">
          {caption ?? 'Lecture context + mode → constrained response'}
        </span>
        <div
          className="diagram-toggle-group"
          role="group"
          aria-label="Select teaching mode"
        >
          <button
            type="button"
            className={isGuided ? 'diagram-chip is-active' : 'diagram-chip'}
            aria-pressed={isGuided}
            onClick={() => setMode('guided')}
          >
            Guided
          </button>
          <button
            type="button"
            className={!isGuided ? 'diagram-chip is-active' : 'diagram-chip'}
            aria-pressed={!isGuided}
            onClick={() => setMode('recall')}
          >
            Recall
          </button>
        </div>
      </div>

      <div className="diagram-stage">
        <svg
          viewBox="0 0 420 190"
          className="diagram-svg"
          role="img"
          aria-label={`Constraint policy diagram in ${isGuided ? 'Guided Learning' : 'constrained Recall exam'} mode.`}
        >
          <defs>
            <marker
              id={arrowId}
              viewBox="0 0 8 8"
              refX="6"
              refY="4"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path
                d="M 1 1.5 L 6.5 4 L 1 6.5"
                fill="none"
                stroke="var(--accent)"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </marker>
          </defs>

          {/* Inputs -> Policy Gate */}
          <path
            d="M 126 56 C 148 56, 148 86, 168 86"
            fill="none"
            stroke="var(--accent)"
            strokeWidth="1.4"
            markerEnd={`url(#${arrowId})`}
          />
          <path
            d="M 126 134 C 148 134, 148 104, 168 104"
            fill="none"
            stroke={isGuided ? 'var(--accent)' : 'var(--accent-warm)'}
            strokeWidth="1.4"
            markerEnd={`url(#${arrowId})`}
            className="svg-transition"
          />

          {/* Policy Gate -> Response */}
          <path
            d="M 268 95 L 302 95"
            fill="none"
            stroke={isGuided ? 'var(--accent)' : 'var(--accent-warm)'}
            strokeWidth="1.6"
            strokeDasharray={isGuided ? undefined : '4 3'}
            markerEnd={`url(#${arrowId})`}
            className="svg-transition"
          />

          {/* Input 1 */}
          <rect
            x="16"
            y="38"
            width="110"
            height="36"
            rx="5"
            fill="var(--bg)"
            stroke="var(--rule-strong)"
          />
          <text x="71" y="54" textAnchor="middle" className="svg-node-text">
            Lecture RAG
          </text>
          <text x="71" y="67" textAnchor="middle" className="svg-sub-label">
            admin uploads
          </text>

          {/* Input 2 */}
          <rect
            x="16"
            y="116"
            width="110"
            height="36"
            rx="5"
            fill="var(--bg)"
            stroke={isGuided ? 'var(--accent)' : 'var(--accent-warm)'}
            strokeWidth="1.25"
            className="svg-transition"
          />
          <text x="71" y="132" textAnchor="middle" className="svg-node-text">
            Mode policy
          </text>
          <text x="71" y="145" textAnchor="middle" className="svg-sub-label">
            {isGuided ? 'guided study' : 'exam recall'}
          </text>

          {/* Policy Gate */}
          <rect
            x="172"
            y="60"
            width="96"
            height="70"
            rx="6"
            fill="var(--bg)"
            stroke={isGuided ? 'var(--accent)' : 'var(--accent-warm)'}
            strokeWidth="1.5"
            className="svg-transition"
          />
          <text
            x="220"
            y="84"
            textAnchor="middle"
            className="svg-node-text-active"
          >
            Policy gate
          </text>
          {/* Visual constraint aperture */}
          <line
            x1="188"
            y1="106"
            x2={isGuided ? 202 : 213}
            y2="106"
            stroke={isGuided ? 'var(--accent)' : 'var(--accent-warm)'}
            strokeWidth="2.5"
            strokeLinecap="round"
            className="svg-transition"
          />
          <line
            x1={isGuided ? 238 : 227}
            y1="106"
            x2="252"
            y2="106"
            stroke={isGuided ? 'var(--accent)' : 'var(--accent-warm)'}
            strokeWidth="2.5"
            strokeLinecap="round"
            className="svg-transition"
          />
          <text x="220" y="121" textAnchor="middle" className="svg-sub-label">
            {isGuided ? 'open aperture' : 'hint-constrained'}
          </text>

          {/* Output */}
          <rect
            x="306"
            y="74"
            width="100"
            height="42"
            rx="5"
            fill="var(--bg)"
            stroke={isGuided ? 'var(--accent)' : 'var(--accent-warm)'}
            strokeWidth="1.25"
            className="svg-transition"
          />
          <text x="356" y="93" textAnchor="middle" className="svg-node-text">
            {isGuided ? 'Walkthrough' : 'Hint only'}
          </text>
          <text x="356" y="106" textAnchor="middle" className="svg-sub-label">
            {isGuided ? 'step by step' : 'answer withheld'}
          </text>
        </svg>
      </div>

      <figcaption className="diagram-caption">
        <span className="diagram-step-pill">
          {isGuided ? 'Guided Learning' : 'Recall Mode'}
        </span>
        <span>
          {isGuided
            ? 'Walks through cybersecurity concepts step by step grounded in uploaded course lectures.'
            : 'Narrows generation to constrained hints so students can practice without unrestricted exam answers.'}
        </span>
      </figcaption>
    </figure>
  );
}

function ParallelDiagram({ caption }: { caption?: string }) {
  const [branch, setBranch] = useState<number | null>(null);
  const arrowId = useId();
  const arrowActiveId = useId();

  const branches = [
    { y: 42, label: 'φ₁(x)', sub: 'ReLU · drop' },
    { y: 95, label: 'φ₂(x)', sub: 'ReLU · drop' },
    { y: 148, label: 'φ₃(x)', sub: 'ReLU · drop' },
  ];

  return (
    <figure className="diagram-frame">
      <div className="diagram-header">
        <span className="diagram-kicker">
          {caption ?? 'Parallel subnetworks → concatenated representation'}
        </span>
        <div
          className="diagram-toggle-group"
          role="group"
          aria-label="Inspect parallel subnetwork"
        >
          <button
            type="button"
            className={branch === null ? 'diagram-chip is-active' : 'diagram-chip'}
            aria-pressed={branch === null}
            onClick={() => setBranch(null)}
          >
            All
          </button>
          {['φ₁', 'φ₂', 'φ₃'].map((name, idx) => (
            <button
              key={name}
              type="button"
              className={branch === idx ? 'diagram-chip is-active' : 'diagram-chip'}
              aria-pressed={branch === idx}
              onClick={() => setBranch(branch === idx ? null : idx)}
            >
              {name}
            </button>
          ))}
        </div>
      </div>

      <div className="diagram-stage">
        <svg
          viewBox="0 0 420 190"
          className="diagram-svg"
          role="img"
          aria-label="Parallel multi-node neural layer diagram combining three subnetworks via concatenation."
        >
          <defs>
            <marker
              id={arrowId}
              viewBox="0 0 8 8"
              refX="6"
              refY="4"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path
                d="M 1 1.5 L 6.5 4 L 1 6.5"
                fill="none"
                stroke="var(--ink-muted)"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </marker>
            <marker
              id={arrowActiveId}
              viewBox="0 0 8 8"
              refX="6"
              refY="4"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path
                d="M 1 1.5 L 6.5 4 L 1 6.5"
                fill="none"
                stroke="var(--accent)"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </marker>
          </defs>

          {branches.map((b, idx) => {
            const active = branch === null || branch === idx;
            return (
              <g key={b.label}>
                <path
                  d={`M 62 95 C 88 95, 92 ${b.y}, 118 ${b.y}`}
                  fill="none"
                  stroke={active ? 'var(--accent)' : 'var(--rule)'}
                  strokeWidth={active ? 1.5 : 1}
                  markerEnd={`url(#${active ? arrowActiveId : arrowId})`}
                  className="svg-transition"
                />
                <path
                  d={`M 218 ${b.y} L 264 ${b.y}`}
                  fill="none"
                  stroke={active ? 'var(--accent)' : 'var(--rule)'}
                  strokeWidth={active ? 1.5 : 1}
                  markerEnd={`url(#${active ? arrowActiveId : arrowId})`}
                  className="svg-transition"
                />
              </g>
            );
          })}

          {/* Concat -> Softmax */}
          <path
            d="M 300 95 L 332 95"
            fill="none"
            stroke="var(--accent)"
            strokeWidth="1.5"
            markerEnd={`url(#${arrowActiveId})`}
          />

          {/* Input x */}
          <rect
            x="18"
            y="78"
            width="44"
            height="34"
            rx="5"
            fill="var(--bg)"
            stroke="var(--rule-strong)"
          />
          <text x="40" y="99" textAnchor="middle" className="svg-node-text">
            x
          </text>

          {/* Subnetworks */}
          {branches.map((b, idx) => {
            const active = branch === null || branch === idx;
            return (
              <g
                key={b.label}
                role="button"
                tabIndex={0}
                aria-pressed={branch === idx}
                aria-label={`Inspect subnetwork ${b.label}`}
                className="svg-node"
                onClick={() => setBranch(branch === idx ? null : idx)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setBranch(branch === idx ? null : idx);
                  }
                }}
              >
                <rect
                  x="122"
                  y={b.y - 17}
                  width="96"
                  height="34"
                  rx="5"
                  fill={active ? 'var(--bg)' : 'var(--bg-elevated)'}
                  stroke={active ? 'var(--accent)' : 'var(--rule-strong)'}
                  strokeWidth={active ? 1.4 : 1}
                  className="svg-transition"
                />
                <text
                  x="170"
                  y={b.y - 1}
                  textAnchor="middle"
                  className={active ? 'svg-node-text-active' : 'svg-node-text'}
                >
                  {b.label}
                </text>
                <text x="170" y={b.y + 11} textAnchor="middle" className="svg-sub-label">
                  {b.sub}
                </text>
              </g>
            );
          })}

          {/* Concat block subdivided into 3 slices */}
          {[0, 1, 2].map((idx) => {
            const active = branch === null || branch === idx;
            return (
              <rect
                key={idx}
                x="268"
                y={26 + idx * 46}
                width="32"
                height="44"
                rx="3"
                fill="var(--accent)"
                fillOpacity={active ? 0.22 : 0.05}
                stroke={active ? 'var(--accent)' : 'var(--rule-strong)'}
                strokeWidth={active ? 1.3 : 0.9}
                className="svg-transition"
              />
            );
          })}
          <text x="284" y="178" textAnchor="middle" className="svg-sub-label">
            concat [‖]
          </text>

          {/* Output Softmax */}
          <rect
            x="336"
            y="78"
            width="68"
            height="34"
            rx="5"
            fill="var(--bg)"
            stroke="var(--rule-strong)"
          />
          <text x="370" y="99" textAnchor="middle" className="svg-node-text">
            Softmax
          </text>
        </svg>
      </div>

      <figcaption className="diagram-caption">
        <span className="diagram-step-pill">
          {branch === null ? 'All nodes' : `Node φ${branch + 1}`}
        </span>
        <span>
          {branch === null
            ? 'Parallel sub-networks transform the same input independently before concatenating into representation h.'
            : `Sub-network φ${branch + 1} contributes its dedicated feature slice inside the concatenated layer output h.`}
        </span>
      </figcaption>
    </figure>
  );
}

export default function InteractiveDiagram({
  kind,
  catalog,
  caption,
  labels,
}: DiagramProps) {
  if (kind === 'routing') return <RoutingDiagram caption={caption} />;
  if (kind === 'matrix') return <MatrixDiagram caption={caption} />;
  if (kind === 'constraint') return <ConstraintDiagram caption={caption} />;
  if (kind === 'parallel') return <ParallelDiagram caption={caption} />;
  return <FeedbackDiagram catalog={catalog} labels={labels} caption={caption} />;
}
