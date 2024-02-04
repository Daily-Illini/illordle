/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        correct: "#20aa57",
        exist: "#e5b22d",
        wrong: "#7a7a7a",
        "wrong-dark": "#363636",
        "zinc-550": "#63636b",
      },
      fontFamily: {
        "sans": "Montserrat",
      },
    },
  },
  darkMode: "class",
  plugins: [],
};
