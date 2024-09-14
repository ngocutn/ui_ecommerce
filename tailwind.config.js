import { Opacity } from "@mui/icons-material";
import { transform } from "framer-motion";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  important: "#root",
  theme: {
    screens: {
      sx: { max: "639px" },

      sm: { max: "767px" },
      // => @media (min-width: 640px and max-width: 767px) { ... }

      md: { max: "1023px" },
      // => @media (min-width: 768px and max-width: 1023px) { ... }

      lg: { max: "1280px" },
      // => @media (min-width: 1024px and max-width: 1279px) { ... }

      xl: { max: "1535px" },
      // => @media (min-width: 1280px and max-width: 1535px) { ... }

      "2xl": { min: "1536px" },
      // => @media (min-width: 1536px) { ... }
      //   "max-sm": { max: "767px" },
      //   "max-md": { max: "1023px" },
      "tablet-range": { min: "768px", max: "1023px" },
      "tablet-up": { min: "768px" },
      "desktop-up": { min: "1024px" },
      "in-lg": { min: "1024px", max: "1280px" },
      //   "max-xl": { max: "1535px" },
      "min-md": { min: "1024px" },
      "min-sm": { min: "768px" },
    },
    extend: {
      fontFamily: {
        sans: ["Geologica", "sans-serif"],
      },
      boxShadow: {
        card: "6px 6px 8px 2px rgba(0,0,0,0.75);",
      },
      colors: {
        // primary: "#F73F5D",
        // secondary: "#222222",
        bgGray: "#f2f6f9",
        background: "#f1eeef",
        borderActive: "#5a5869",
        textSecondary: "#545454",
        strokeColor: "#f2f2f2",
        buttonBg: "#353132",
      },
      keyframes: {
        slideInRight: {
          "0%": { transform: "translateX(100%)", Opacity: "0" },
          "100%": { transform: "translateX(0%)", Opacity: "1" },
        },
        slideOut: {
          "0%": { transform: "translateX(0)", opacity: "1" },
          "100%": { transform: "translateX(100%)", opacity: "0" },
        },
      },
      animation: {
        slideInRight: "slideInRight 0.5s linear",
        slideOut: "slideOut 0.5s ease-in",
      },
    },
  },
  // corePlugins: {
  //   preflight: false,
  // },
  plugins: [],
};
