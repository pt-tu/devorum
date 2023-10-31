import type { Config } from "tailwindcss";
const { nextui } = require("@nextui-org/react");
/** @type {import('tailwindcss').Config} */

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      transparent: "transparent",
      white: "#FFFFFF",
      black: "#000000",
      dark: {
        0: "rgb(var(--color-0) / <alpha-value>)",
        1: "rgb(var(--color-1) / <alpha-value>)",
        2: "rgb(var(--color-2) / <alpha-value>)",
        4: "rgb(var(--color-4) / <alpha-value>)",
      },
      gray: {
        3: "#97989D",
        4: "#858EAD",
        5: "#C5D0E6",
        6: "#F4F6F8",
        bg: "#F7F7F7",
      },
      orange: {
        8: "#FF6934",
        bg: "#473E3B",
      },
      yellow: {
        8: "#EEA956",
        bg: "#5A4F43",
        1: "#F6F2EB",
        "1-dark": "#211b0f",
      },
      blue: {
        8: "#5D95E8",
        bg: "#444F5F",
      },
      green: {
        8: "#3ED6A4",
        bg: "#335248",
      },
      purple: {
        8: "#848DF9",
        bg: "#46475B",
      },
    },
    fontFamily: {},
    extend: {
      spacing: {},
      borderRadius: {},
    },
  },
  darkMode: "class",
  plugins: [
    nextui(),
    // {
    //   themes: {
    //     "purple-dark": {
    //       extend: "dark", // <- inherit default values from dark theme
    //       colors: {
    //         background: "#0D001A",
    //         foreground: "#ffffff",
    //         primary: {
    //           50: "#3B096C",
    //           100: "#520F83",
    //           200: "#7318A2",
    //           300: "#9823C2",
    //           400: "#c031e2",
    //           500: "#DD62ED",
    //           600: "#F182F6",
    //           700: "#FCADF9",
    //           800: "#FDD5F9",
    //           900: "#FEECFE",
    //           DEFAULT: "#DD62ED",
    //           foreground: "#ffffff",
    //         },
    //         focus: "#F182F6",
    //       },
    //       layout: {
    //         disabledOpacity: "0.3",
    //         radius: {
    //           small: "4px",
    //           medium: "6px",
    //           large: "8px",
    //         },
    //         borderWidth: {
    //           small: "1px",
    //           medium: "2px",
    //           large: "3px",
    //         },
    //       },
    //     },
    //   },
    // }
  ],
};
export default config;
