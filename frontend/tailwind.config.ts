import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#FBF4EE",
        canvas: "#FBF4EE",
        surface: "#FFFDFB",
        ink: "#2D221E",
        line: "#F0D4C8",
        accent: {
          DEFAULT: "#9B3F50",
          hover: "#7E3040",
          soft: "#FCEBE5",
        },
        primary: {
          DEFAULT: "#D85942",
          hover: "#C04530",
          light: "#FCEBE5",
        },
        secondary: {
          DEFAULT: "#E8A598",
          hover: "#D79183",
          light: "#FBF0ED",
        },
        rose: {
          terracotta: "#D85942",
          blush: "#F9DDD3",
          soft: "#F5C7B8",
        },
        dark: "#2D221E",
        muted: "#786660",
        danger: "#B63C47",
        success: "#27775A",
        warning: "#A86617",
        cream: "#F6EAE1",
      },
      fontFamily: {
        serif: ["var(--font-display)", "Playfair Display", "Georgia", "serif"],
        sans: ["var(--font-body)", "Be Vietnam Pro", "system-ui", "sans-serif"],
      },
      boxShadow: {
        soft: "0 18px 52px -36px rgba(84, 48, 31, 0.16)",
        float: "0 28px 76px -42px rgba(84, 48, 31, 0.22)",
        glass: "0 20px 60px -40px rgba(84, 48, 31, 0.18)",
        card: "0 14px 38px -28px rgba(84, 48, 31, 0.18)",
      },
      transitionTimingFunction: {
        editorial: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
