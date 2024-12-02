/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        'custom': '0 2px 4px rgba(85, 85, 114, 0.549)',
      }
    },
  },
  plugins: [],
}