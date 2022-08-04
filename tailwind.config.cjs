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
        base: colors.slate,
        brand: colors.sky,
      },
      fontFamily: {
        sans: ["Inter", "Helvetica", "system-ui"],
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
