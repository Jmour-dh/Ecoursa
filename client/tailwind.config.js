/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "violent-violet": {
          50: "#eaeeff",
          100: "#d9dfff",
          200: "#bbc4ff",
          300: "#939cff",
          400: "#6968ff",
          500: "#5545ff",
          600: "#4824ff",
          700: "#3f19e9",
          800: "#3318bb",
          900: "#2e1c93",
          950: "#1b1051",
        },
        'outer-space': {
          50: '#f4f7f7',
          100: '#e3e9ea',
          200: '#cad6d7',
          300: '#a6b9ba',
          400: '#799597',
          500: '#5e797c',
          600: '#516569',
          700: '#465558',
          800: '#3e4a4c',
          900: '#2d3436',
          950: '#22282a',
      },
      },
      fontFamily: {
        roboto: ["Roboto", "sans-serif"],
      },
    },
  },
  plugins: [],
};
