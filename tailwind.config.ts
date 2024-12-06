import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    fontFamily: {
      sans: ["triakisFont"],
    },
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
