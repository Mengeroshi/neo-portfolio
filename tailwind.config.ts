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
          900: "#DE3E3E",
        },
        green: {
          200: "#0A1E0A",
          900: "#3EDE3E",
        },
        yellow: {
          200: "#1E1C0A",
          900: "#DED13E",
        },
      },
    },
  },
  plugins: [require("tailwind-scrollbar")],
} satisfies Config;
