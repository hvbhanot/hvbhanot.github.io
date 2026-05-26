/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Inter"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        serif: ['"Fraunces"', 'Georgia', 'serif'],
        sans: ['"Inter"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'SFMono-Regular', 'Consolas', 'monospace'],
      },
      colors: {
        surface: {
          DEFAULT: '#ffffff',
          muted: '#f8f9fa',
          raised: '#f1f3f5',
        },
        ink: {
          DEFAULT: '#1a1a2e',
          soft: '#4a4a6a',
          mid: '#7c7c9a',
          faint: '#b0b0c4',
        },
        accent: {
          DEFAULT: '#6c5ce7',
          light: '#a29bfe',
          dark: '#5241d0',
        },
        highlight: {
          DEFAULT: '#00d2d3',
          soft: '#c8f6f6',
        },
      },
      letterSpacing: {
        tightest: '-0.02em',
      },
    },
  },
  plugins: [],
};