import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      colors: {
        blue: {
          200: "#0a141e",
          900: "#3ECFDE",
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
