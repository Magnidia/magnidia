import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)"],
        mono: ["var(--font-roboto-mono)"],
      },
      colors: {
        primary: "#57AFFF",
        darkBlue: "#1973C5",
        lightGrey: "#CCCCCC",
        lightBlue: "#C5DCF0",
      },
    },
  },
  plugins: [],
};
export default config;
