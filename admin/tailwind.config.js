/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#F43153",
        secondry: "#FFF9F3",
        cream: "#ffe7d2",
        ash: "#aaaaaa",
      },
      container: {
        center: true,
      },
    },
  },
  plugins: [],
};
