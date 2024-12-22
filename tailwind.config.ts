/* eslint-disable @typescript-eslint/no-require-imports */
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
        red: {
          200: "#1E0A0A",
          900: "#DE3E41",
        },
      },
    },
  },
  plugins: [require("tailwind-scrollbar")],
} satisfies Config;
