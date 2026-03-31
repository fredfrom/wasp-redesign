const path = require('path')

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    path.join(__dirname, './src/**/*.{js,jsx,ts,tsx}'),
    // Also scan from Wasp's web-app build perspective
    './src/**/*.{js,jsx,ts,tsx}',
    '../../../src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      colors: {
        wasp: {
          50: '#fefce8',
          100: '#fef9c3',
          200: '#fef08a',
          300: '#fde047',
          400: '#facc15',
          500: '#eab308',
          600: '#ca8a04',
        },
        surface: {
          0: '#09090b',
          1: '#0c0c0e',
          2: '#141416',
          3: '#1a1a1e',
          4: '#222226',
          5: '#2a2a2e',
        },
      },
    },
  },
  plugins: [],
}
