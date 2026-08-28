import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#f0f9ff",
          500: "#0969da",
          600: "#0757ba",
          700: "#04478f",
        },
      },
    },
  },
  plugins: [],
};

export default config;
