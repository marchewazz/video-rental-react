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
        padding: {
          DEFAULT: '1rem',
          sm: '2rem',
          lg: '4rem',
          xl: '5rem',
          '2xl': '6rem',
        },
      },
      colors: {
        "light-green": "#00bfb2",
        "teal": "#028090",
        "dark-green": "#294643",
        "earie-black": "#191716",
      }
    }     
  },
  // important: true,
  plugins: [],
}

