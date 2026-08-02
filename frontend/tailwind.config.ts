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
        background: "#F1F2EE",
        canvas: "#F1F2EE",
        surface: "#FCFCF9",
        ink: "#151815",
        line: "#D9DDD6",
        accent: {
          DEFAULT: "#3159C9",
          hover: "#2446A4",
          soft: "#E8ECF9",
        },
        primary: {
          DEFAULT: "#3159C9",
          hover: "#2446A4",
          light: "#E8ECF9",
        },
        secondary: {
          DEFAULT: "#3159C9",
          hover: "#2446A4",
          light: "#E8ECF9",
        },
        dark: "#151815",
        muted: "#686D67",
        danger: "#B63C47",
        success: "#27775A",
        warning: "#A86617",
        cream: "#E8EAE5",
      },
      fontFamily: {
        serif: ["var(--font-display)", "Georgia", "serif"],
        sans: ["var(--font-body)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        soft: "0 18px 50px -28px rgba(38, 48, 66, 0.28)",
        float: "0 24px 70px -34px rgba(38, 48, 66, 0.34)",
        glass: "0 20px 60px -36px rgba(38, 48, 66, 0.32)",
      },
      transitionTimingFunction: {
        editorial: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
