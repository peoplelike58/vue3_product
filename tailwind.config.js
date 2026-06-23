/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,ts}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#eef2ff',
          100: '#e0e7ff',
          200: '#c7d2fe',
          400: '#818cf8',
          500: '#6366f1',
          600: '#4f46e5',
          700: '#4338ca',
        },
      },
      boxShadow: {
        card: '0 10px 40px -12px rgba(79, 70, 229, 0.18)',
      },
      fontFamily: {
        sans: ['"Noto Sans TC"', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
