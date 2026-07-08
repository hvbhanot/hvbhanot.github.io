/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['Anton', 'Inter', 'system-ui', 'sans-serif'],
        body: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      transitionTimingFunction: {
        ease: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      colors: {
        // Monochrome instrument — keep in sync with :root variables in src/index.css
        bg: {
          DEFAULT: '#0b0b0a',
          raise: '#141412',
        },
        line: 'rgba(233, 230, 223, 0.14)',
        ink: {
          DEFAULT: '#e9e6df',
          dim: 'rgba(233, 230, 223, 0.62)',
          faint: 'rgba(233, 230, 223, 0.36)',
        },
      },
    },
  },
  plugins: [],
};
