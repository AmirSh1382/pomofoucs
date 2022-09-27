/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  darkMode: "class",
  theme: {
    extend: {
      backgroundColor: {
        "secondary": "rgba(256,256,256,0.2)",
        "primary": "rgb(217, 85, 80)",        
        "dark": "rgb(0,0,0)",
        "white": "#f7f7f7"
      },
      colors: {
        "white": "#f4f4f4",
        "muted": "rgba(0,0,0,0.45)"
      },
    },
    fontFamily: {
      'airal': ["Arial", "Helvetica", "sans-serif"]
    },
  },
  plugins: [],
}