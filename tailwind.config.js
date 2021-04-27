const defaultTheme = require("tailwindcss/defaultTheme")

module.exports = {
  purge: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/screens/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: false,
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        sm: "2rem",
        lg: "4rem",
        xl: "5rem",
        "2xl": "6rem",
      },
    },
    extend: {
      fontFamily: {
        sans: ["Inter var", ...defaultTheme.fontFamily.sans],
      },
      colors: {
        "primary-btn": "#0069B4",
        "primary-btn-hover": "#003459",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
