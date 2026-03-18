/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./components/**/*.html",
    "./pages/**/*.html",
    "./js/**/*.js"
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        fraunces: ['Fraunces', 'serif'],
        outfit: ['Outfit', 'sans-serif']
      },
      colors: {
        plum: "#6B3F5E",
        cream: "#F5EFE6",
        rose: "#D4A5A5",
        gold: "#C9A96E",
        ink: "#1a0f17",
        "dark-bg": "#0D0A0E",
        "dark-surface": "#1A1220"
      },
    },
  },
  plugins: [],
};

