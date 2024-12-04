/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      borderRadius: { xl4: "2rem", xl5: "2.5rem", xl6: "3rem" },
      keyframes: {
        blink: {
          "0%, 100%": { opacity: 1 },
          "50%": { opacity: 0 },
        },
      },
      animation: {
        "blink-delay": "blink 4s infinite 2s",
      },
    },
  },
  plugins: [],
};
