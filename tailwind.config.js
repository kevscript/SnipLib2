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
          50: "#498dff",
          100: "#3f83f5",
          200: "#3579eb",
          300: "#2b6fe1",
          400: "#2165d7",
          500: "#175bcd",
          600: "#0d51c3",
          700: "#0347b9",
          800: "#003daf",
          900: "#0033a5",
          DEFAULT: "#175BCD",
        },
      },
    },
  },
  plugins: [],
};
