/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Newsreader"', 'Georgia', 'serif'],
        body: [
          '"DM Sans"',
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
        // Paper and ink — keep in sync with :root in src/index.css
        bg: {
          DEFAULT: '#f7f5f0',
          raise: '#efede6',
        },
        line: 'rgba(36, 36, 32, 0.16)',
        ink: {
          DEFAULT: '#242420',
          dim: '#595950',
          faint: '#6f6c62',
        },
        accent: {
          prob: '#3f6178',
          gd: '#986044',
          proof: '#536854',
          math: '#5c6687',
        },
      },
    },
  },
  plugins: [],
};
