/** @type {import('tailwindcss').Config} */

module.exports = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    scale: {
      101: "1.01",
    },
    extend: {
      colors: {
        primary: { light: "#f8f3e4", dark: "#484D56", main: "#ee3024" },
        background: {
          light: "#f8f3e4",
        },
        highlight: {
          dark: "#7E762F",
          light: "#ECFAC3",
        },
        secondary: {
          dark: "#63252a",
          light: "#b9d3e3",
          main: "#fad0c3",
        },
        action: "#80322a",
      },
      transitionProperty: {
        width: "width",
      },
    },
    backgroundImage: {
      "png-pattern": "url('/empty-bg.jpg')",
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
