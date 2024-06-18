import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,css,md,mdx,html,json,scss}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "#012970",
        primaryLighter: "#4154F1"
      }
    },
  },
  plugins: [],
};

export default config;
