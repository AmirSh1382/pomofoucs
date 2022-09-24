/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        "red" : "rgba(255,0,0,0.3)",
        "green": "rgba(0,255,0,0.23)"
      },
      boxShadow: {
        "xl": "0 0 30px 5px rgba(256,256,256, 0.4)" 
      }
    },
    fontFamily: {
      'airal': ["Arial", "Helvetica", "sans-serif"]
    },
  },
  plugins: [],
}
