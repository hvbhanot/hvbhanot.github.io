/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Space Grotesk"', 'Inter', 'system-ui', 'sans-serif'],
        body: [
          '"Space Grotesk"',
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
        // Computational geometry — keep in sync with :root in src/index.css
        bg: {
          DEFAULT: '#08090c',
          raise: '#101217',
        },
        line: 'rgba(240, 242, 246, 0.15)',
        ink: {
          DEFAULT: '#f0f2f6',
          dim: '#a4aab7',
          faint: '#878e9e',
        },
        accent: {
          prob: '#668eff',
          gd: '#668eff',
          proof: '#86c7bd',
          math: '#bc9bfa',
        },
      },
    },
  },
  plugins: [],
};
