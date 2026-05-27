/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Syne"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        body: ['"DM Sans"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'SFMono-Regular', 'Consolas', 'monospace'],
      },
      letterSpacing: {
        widest: '0.15em',
      },
      transitionTimingFunction: {
        'signal': 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      colors: {
        void: '#080810',
        surface: '#0f0f1a',
        card: '#14141f',
        border: '#1e1e2e',
        ink: {
          DEFAULT: '#ededf0',
          soft: '#8888a0',
          faint: '#44445a',
          ghost: '#2a2a3a',
        },
        accent: '#ff4d1c',
        accent2: '#00e5c0',
        warm: '#ffa552',
      },
    },
  },
  plugins: [],
};