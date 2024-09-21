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
      "tablet-up": { min: "768px", max: "1039px" },
      "desktop-up": { min: "1024px", max: "1139px" },
      "in-lg": { min: "1024px", max: "1279px" },
      "in-xl": { min: "1280px" },
      //   "max-xl": { max: "1535px" },
      "min-md": { min: "1024px" },
      "min-sm": { min: "768px" },
    },
    extend: {
      fontFamily: {
        sans: ["Geologica", "sans-serif"],
      },
      boxShadow: {
        card: "0 0 11px rgba(33,33,33,.2)",
        primary: "rgba(17, 12, 46, 0.15) 0px 48px 100px 0px",
      },
      colors: {
        // primary: "#F73F5D",
        // secondary: "#222222",
        // bgGray: "#f2f6f9",
        bgGray: "#f1eeef",
        background: "#f1eeef",
        borderActive: "#5a5869",
        textSecondary: "#545454",
        strokeColor: "#f2f2f2",
        buttonBg: "#353132",
      },
      keyframes: {
        slideInRight: {
          "0%": { transform: "translateX(60%)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
        slideOut: {
          "0%": { transform: "translateX(0)", opacity: "1" },
          "100%": { transform: "translateX(100%)", opacity: "0" },
        },
      },
      animation: {
        slideInRight: "slideInRight 0.2s ease-out",
        slideOut: "slideOut 0.5s ease-in",
      },
    },
  },
  // corePlugins: {
  //   preflight: false,
  // },
  plugins: [],
};
