/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        correct: "#20AA57",
        exist: "#E5B22D",
        wrong: "#989898",
      },
      fontFamily: {
        "sans": "Montserrat",
      },
    },
  },
  plugins: [],
};
