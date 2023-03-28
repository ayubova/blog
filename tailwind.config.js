/** @type {import('tailwindcss').Config} */

module.exports = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      sans: ["Roboto Serif", "ui-sans-serif", "system-ui"],
      heading: ["Montserrat", "Roboto Serif", "ui-sans-serif", "system-ui"],
    },
    extend: {
      colors: {
        primary: {
          light: "#f4f4e5",
          dark: "#2E1E43",
          main: "#2E1A47",
        },
        background: {
          light: "#f0e8d8",
          dark: "#2E1A47",
          pink: "#f8f5f9",
        },
        highlight: {
          dark: "#704f76",
          light: "#f3ebf5",
        },
        secondary: {
          mediumDark: "#cdc9b4",
          dark: "#76704f",
          main: "#dcb8cb",
          light: "#eddbe5",
        },
        action: "#a280a8",
      },
      transitionProperty: {
        width: "width",
      },
      scale: {
        101: "1.01",
      },
      minWidth: {
        "6xl": "72rem",
        sm: "24rem",
      },
    },
    backgroundImage: {
      "png-pattern": "url('/empty-bg.jpg')",
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
