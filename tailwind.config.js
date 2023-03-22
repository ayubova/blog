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
    fontFamily: {
      sans: ["Roboto Serif", "ui-sans-serif", "system-ui"],
      heading: ["Montserrat", "Roboto Serif", "ui-sans-serif", "system-ui"],
    },
    extend: {
      colors: {
        primary: {
          light: "#f0e8d8",
          dark: "#2E1A47",
          main: "#C63527 ",
        },
        background: {
          light: "#f0e8d8",
          dark: "#2E1A47",
        },
        highlight: {
          dark: "#784283",
          light: "#f3ebf5",
        },
        secondary: {
          dark: "#614F25",
          main: "#D0A1BA",
          light: "#eddbe5",
        },
        action: "#784283",
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
