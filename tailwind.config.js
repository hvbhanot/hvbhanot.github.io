/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Fraunces"', 'Georgia', 'serif'],
        body: ['"Hanken Grotesk"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      transitionTimingFunction: {
        ease: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      colors: {
        bg: '#0b0c0e',
        elevated: '#0e0f12',
        surface: '#131519',
        'surface-2': '#171a1f',
        line: 'rgba(236, 238, 242, 0.09)',
        'line-strong': 'rgba(236, 238, 242, 0.17)',
        ink: {
          DEFAULT: '#edeef1',
          muted: '#9aa0a9',
          faint: '#61666f',
        },
        accent: {
          DEFAULT: '#e2a65a',
          bright: '#f0c084',
        },
      },
    },
  },
  plugins: [],
};
