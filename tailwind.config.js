/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      container: {
        center: true,
      },
      colors: {
        "light-green": "#00bfb2",
        "teal": "#028090",
        "dark-green": "#294643",
        "earie-black": "#191716",
        "white": "#FFF"
      }
    }     
  },
  plugins: [],
}

