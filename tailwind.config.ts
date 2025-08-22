import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class", // enables dark mode toggle via "class"
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#2563EB", // blue-600
          light: "#3B82F6", // blue-500
          dark: "#1E40AF", // blue-800
        },
      },
    },
  },
  plugins: [],
};
export default config;
