/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", ...defaultTheme.fontFamily.sans],
      },
      colors: {
        carbon: {
          300: "#72767E",
          400: "#292C32",
          500: "#202227",
          600: "#1A1C20",
          700: "#131517",
        },
        marine: {
          500: "#175BCD",
          DEFAULT: "#175BCD",
        },
      },
    },
  },
  plugins: [],
};
