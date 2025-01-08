/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#2563eb',
          dark: '#1e40af'
        },
        secondary: {
          DEFAULT: '#4b5563',
          dark: '#374151'
        }
      }
    },
  },
  plugins: [],
}
