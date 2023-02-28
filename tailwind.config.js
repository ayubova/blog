/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary-dark": "#484D56",
        primary: "#fef2ea",
        highlight: {
          dark: "#ABA7A4",
          light: "#151517",
        },
        secondary: {
          dark: "#6D8270",
          light: "#b9d3e3",
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
