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
          light: "#f7f7f6",
          dark: "#1e1314",
          main: "#1e1314",
        },
        background: {
          light: "#f0e8d8",
          dark: "#1e1314",
          pink: "#f8f5f9",
        },
        highlight: {
          dark: "#523237",
          light: "#f3ebf5",
        },
        secondary: {
          mediumDark: "#D3D0CA",
          dark: "#8E8F89",
          main: "#CFB3B1",
          light: "#DBCCC9",
        },
        action: "#8a545c",
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
      saturate: {
        20:	".20"
      }
    },
    backgroundImage: {
      "png-pattern": "url('/empty-bg.jpg')",
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
