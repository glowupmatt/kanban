import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      purple: {
        main: "#635FC7",
        hover: "#A8A4FF ",
      },
      black: {
        main: "#000112",
        dark: "#20212C",
      },
      grey: {
        darkest: "#2B2C37",
        dark: "#3E3F4E",
        medium: "#828FA3",
        light: "#E4EBFA",
        lightest: "#F4F7FD",
      },
      white: "#FFFFFF",
      red: {
        main: "#EA5555",
        hover: "#FF9898",
      },
    },
    extend: {
      fontFamily: {
        "Plus Jakarta Sans": ["Plus Jakarta Sans", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
