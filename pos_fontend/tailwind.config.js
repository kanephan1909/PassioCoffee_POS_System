/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line no-undef
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", 
  ],
  theme: {
    extend: {
      colors: {
        passio: '#A6CE39',
      },
    },
  },
  plugins: [require('tailwind-scrollbar-hide')],
}
