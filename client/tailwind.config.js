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
      },
      fontFamily: {
        roboto: ["Roboto", "sans-serif"],
      },
    },
  },
  plugins: [],
};
