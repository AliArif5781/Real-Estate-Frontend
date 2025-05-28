/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      colors: {
        "light-gray": "#bfc0c0",
        "light-brown": "#60463b",
        "light-brown-100": "#7D6B5A",
        "light-pink": "#FCF6F3",
      },
    },
  },
  plugins: [],
};
