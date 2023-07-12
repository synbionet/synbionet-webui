/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {},
      colors: {
        // change initial colors to mitre colors
        indigo: {
          50: '#5791cf',
          100: '#4783c0',
          200: 'rgba(0, 91, 148, 0.3)',
          300: 'rgba(0, 91, 148, 0.5)',
          400: 'rgba(0, 91, 148, 0.6)',
          500: 'rgba(0, 91, 148, 0.8)',
          600: 'rgba(0, 91, 148, 1)',
        },
      },
    },
  },
  plugins: [],
}
