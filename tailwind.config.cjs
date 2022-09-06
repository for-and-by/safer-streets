/** @type {import('tailwindcss').Config} */
const plugin = require("tailwindcss/plugin");
const colors = require("tailwindcss/colors");

module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        action: colors.blue,
        warning: colors.amber,
        danger: colors.red,
        error: colors.red,
        gray: colors.stone,
        base: colors.stone,
        brand: colors.emerald,
      },
      fontFamily: {
        sans: ["Inter", "Helvetica", "system-elements"],
      },
    },
  },
  plugins: [
    // Add custom variant classes
    require("@tailwindcss/typography"),
    plugin(({ addVariant }) => {
      addVariant("child", "& > *");
      addVariant("d-active", "&[data-active]");
    }),
  ],
};
