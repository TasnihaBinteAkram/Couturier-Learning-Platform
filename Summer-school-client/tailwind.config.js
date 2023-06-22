/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode:"class",
  theme: {
    extend: {
      colors:{
        'ui-pink': '#F9858F',
        'ui-pink-dark': '#cc455e',
        'ui-purple': '#C680BD',
        'ui-purple-dark':'#c334b0',
        "primary": "#F9858F",
        "dark-mode":"#47303b"
      },
      
    },
  },
  daisyui: {
    themes: [
      {
        mytheme: {

          "primary": "#F9858F",
          "secondary": "#BB8506",
          "accent": "#EEFF25",
          "neutral": "#1F2937",
          "base-100": "#ffffff",
          "info": "#f2efee",
          "success": "#17968B",
          "warning": "#D1A054",
          "error": "#E8646D",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
}

