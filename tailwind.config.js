/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "main-light": "#C7D1F4",
        "main-dark": "#7786D2",
      }
    },
  },
  plugins: [],
};
