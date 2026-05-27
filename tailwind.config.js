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
        void: '#05070a',
        surface: '#0b0f17',
        card: '#0f141f',
        border: '#1f2a3f',
        ink: {
          DEFAULT: '#e8f0ff',
          soft: '#8a9ab0',
          faint: '#4a5a70',
          ghost: '#1f2a3f',
        },
        accent: '#00eaff',
        accent2: '#00b8ff',
        hud: '#00d4ff',
      },
    },
  },
  plugins: [],
};