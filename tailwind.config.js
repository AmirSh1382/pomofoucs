/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  darkMode: "class",
  theme: {
    extend: {
      backgroundColor: {
        "pomodoro": "rgb(217, 85, 80)",
        "shortBreak": "rgb(76, 145, 149)",
        "longBreak": "rgb(69, 124, 163)",
        "primary": "rgba(256,256,256,0.13)",
        "dark": "rgb(0,0,0)",
        "white": "#f7f7f7",
        "time-line": "rgba(0,0,0,0.15)",
        "active-timer": "rgba(0,0,0,0.15)"
      },
      colors: {
        "white": "#f5f5f5",
        "muted": "rgba(0,0,0,0.45)",
        "pomodoro": "rgb(217, 85, 80)",
        "shortBreak": "rgb(76, 145, 149)",
        "longBreak": "rgb(69, 124, 163)",
      },
      fontSize: {
        "header": "20px"
      },
      padding: {
        "small": "2px"
      }
    },
  },
  plugins: [],
}