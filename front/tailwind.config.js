/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0077b6',
        'primary-lighter': '#00a8e8',
        'primary-darker': '#023e8a',
        dark: '#22223b',
        'dark-lighter': '#4a4e69',
        'dark-darker': '#1a1a2e',
        white: '#f9f7f3'
      }
    },
  },
  plugins: [],
}

