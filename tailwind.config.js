/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Manrope"', 'Inter', 'system-ui', 'sans-serif'],
        body: [
          '"Manrope"',
          'Inter',
          'system-ui',
          '-apple-system',
          'sans-serif',
        ],
        mono: [
          '"IBM Plex Mono"',
          'ui-monospace',
          'SFMono-Regular',
          'Menlo',
          'monospace',
        ],
      },
      transitionTimingFunction: {
        ease: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      colors: {
        // Graphite and emerald — keep in sync with :root in src/index.css
        bg: {
          DEFAULT: '#111513',
          raise: '#191f1c',
        },
        line: 'rgba(232, 241, 236, 0.15)',
        ink: {
          DEFAULT: '#e8f1ec',
          dim: '#a4b5ab',
          faint: '#8fa297',
        },
        accent: {
          prob: '#47d7a0',
          gd: '#47d7a0',
          proof: '#b1e1c3',
          math: '#6fc4bf',
        },
      },
    },
  },
  plugins: [],
};
