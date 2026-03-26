/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        forest: {
          50:  '#f2f7f0',
          100: '#e0eedd',
          200: '#c2ddb9',
          300: '#95c48b',
          400: '#68a85e',
          500: '#4a8c3f',
          600: '#3a6b35',
          700: '#2d5229',
          800: '#264523',
          900: '#1e381c',
          950: '#0f1e0e',
        },
        wood: {
          100: '#f5ede0',
          200: '#e8d5b7',
          300: '#d4b483',
          400: '#c8a96e',
          500: '#b8924a',
        },
      },
      fontFamily: {
        serif: ['Georgia', 'Cambria', 'Times New Roman', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
