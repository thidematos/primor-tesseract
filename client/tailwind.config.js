/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        noto: "Noto Serif",
        montserrat: "Montserrat",
      },
      colors: {
        related: "#B16A53",
      },
      screens: {
        "3xl": "1920px",
      },
    },
  },
  plugins: [],
};
