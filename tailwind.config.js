/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'Space Grotesk', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['Space Grotesk', 'Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'SFMono-Regular', 'Consolas', 'monospace'],
      },
      colors: {
        ink: {
          50: '#f7fbff',
          100: '#e8f0fb',
          200: '#b7c5d8',
          300: '#8e9db4',
          400: '#6f7b91',
          500: '#4d586e',
          600: '#30384d',
          700: '#1b2233',
          800: '#101626',
          900: '#070a14',
          950: '#03050d',
        },
        cyanCore: '#20f3ff',
        blueCore: '#2f7dff',
        violetCore: '#8c5cff',
      },
      boxShadow: {
        glow: '0 0 40px rgba(32, 243, 255, 0.16)',
        'glow-violet': '0 0 48px rgba(140, 92, 255, 0.18)',
      },
    },
  },
  plugins: [],
};
