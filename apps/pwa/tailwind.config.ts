import { Config } from "tailwindcss";
import colors from "tailwindcss/colors";
import typography from "@tailwindcss/typography";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx}"],
  theme: {
    data: {
      visible: 'visible~="true"',
      error: 'error~="true"',
      expanded: "expanded~=true",
      dragging: "dragging~=true",
      "align-center": 'align="center"',
      "align-top": 'align="top"',
    },
    extend: {
      colors: {
        action: colors.blue,
        warning: colors.amber,
        danger: colors.red,
        error: colors.red,
        gray: colors.stone,
        base: colors.stone,
        brand: colors.emerald,
        beige: {
          DEFAULT: "#FFFCF2",
        },
      },
      fontFamily: {
        sans: ["Inter", "Helvetica", "system-elements"],
      },
    },
  },
  plugins: [
    // Add custom variant classes
    typography,
  ],
};

export default config;
