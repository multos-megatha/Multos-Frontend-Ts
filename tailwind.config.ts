/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  //                                    ↑ perhatiin ada ts di sini
  theme: {
    extend: {
      colors: {
        p1: '#2EF2FF',
        p2: '#3C52D9',
        // dst...
      }
    },
  },
  plugins: [],
}