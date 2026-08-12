/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"STIX Two Text"', 'Libertinus Serif', 'Georgia', 'serif'],
        body: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      transitionTimingFunction: {
        ease: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      colors: {
        // Living research notebook — keep in sync with :root in src/index.css
        bg: {
          DEFAULT: '#0B0C10',
          raise: '#15161A',
        },
        line: 'rgba(232, 232, 232, 0.12)',
        ink: {
          DEFAULT: '#E8E8E8',
          dim: '#8B8D93',
          faint: 'rgba(232, 232, 232, 0.36)',
        },
        accent: {
          prob: '#4AA3F2',
          gd: '#F2994A',
          proof: '#27AE60',
          math: '#BB86FC',
        },
      },
    },
  },
  plugins: [],
};
