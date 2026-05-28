/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Bricolage Grotesque"', 'Georgia', 'serif'],
        body: ['"Spline Sans"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['"Spline Sans Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      transitionTimingFunction: {
        ease: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      colors: {
        // Light "lab paper" theme
        bg: '#f3efe6',
        elevated: '#ece7db',
        card: '#faf7f0',
        surface: '#ece7db',
        'surface-2': '#e4ded0',
        line: 'rgba(26, 24, 19, 0.15)',
        'line-strong': 'rgba(26, 24, 19, 0.30)',
        ink: {
          DEFAULT: '#1a1813',
          muted: '#545147',
          faint: '#8c897d',
        },
        accent: {
          DEFAULT: '#e0401d',
          bright: '#ff5a33',
        },
        data: '#1f6f6b',
      },
    },
  },
  plugins: [],
};
