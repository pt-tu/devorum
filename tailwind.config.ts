import type { Config } from 'tailwindcss'
const { nextui } = require('@nextui-org/react')
/** @type {import('tailwindcss').Config} */

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    fontFamily: {},
    extend: {
      colors: {
        transparent: 'transparent',
        white: '#FFFFFF',
        black: '#000000',
        dark: {
          0: 'rgb(var(--color-0) / <alpha-value>)',
          1: 'rgb(var(--color-1) / <alpha-value>)',
          2: 'rgb(var(--color-2) / <alpha-value>)',
          4: 'rgb(var(--color-4) / <alpha-value>)',
          5: 'rgb(var(--color-dark-5) / <alpha-value>)',
        },
        gray: {
          3: 'rgb(var(--color-gray-3) / <alpha-value>)',
          4: '#858EAD',
          5: 'rgb(var(--color-gray-5) / <alpha-value>)',
          6: 'rgb(var(--color-gray-6) / <alpha-value>)',
          bg: 'rgb(var(--color-gray-bg) / <alpha-value>)',
          border: '#EAEAEA',
          text: '#808080',
        },
        orange: {
          8: '#FF6934',
          bg: '#473E3B',
        },
        yellow: {
          8: '#EEA956',
          bg: '#5A4F43',
          1: '#F6F2EB',
          '1-dark': '#211b0f',
        },
        blue: {
          8: '#155ca2',
          primary: '#1682FD',
          bg: '#edf5fd',
        },
        green: {
          8: '#3ED6A4',
          bg: '#335248',
        },
        purple: {
          8: '#848DF9',
          bg: '#46475B',
        },
      },
      spacing: {},
      borderRadius: {},
    },
  },
  darkMode: 'class',
  plugins: [
    nextui(),
    // {
    //   themes: {
    //     "purple-dark": {
    //       extend: "dark", // <- inherit default values from dark theme
    //       colors: {
    //         dark: {
    //           0: "#020C16",
    //           1: "#1E252B",
    //           2: "#262D34",
    //           4: "#2C353D",
    //           5: "#A0AAB8",
    //         },
    //         gray: {
    //           3: "#97989D",
    //           4: "#858EAD",
    //           5: "#C5D0E6",
    //           6: "#F4F6F8",
    //           bg: "#F7F7F7",
    //         },
    //         orange: {
    //           8: "#FF6934",
    //           bg: "#473E3B",
    //         },
    //         yellow: {
    //           8: "#EEA956",
    //           bg: "#5A4F43",
    //           1: "#F6F2EB",
    //           "1-dark": "#211b0f",
    //         },
    //         blue: {
    //           8: "#5D95E8",
    //           bg: "#444F5F",
    //         },
    //         green: {
    //           8: "#3ED6A4",
    //           bg: "#335248",
    //         },
    //         purple: {
    //           8: "#848DF9",
    //           bg: "#46475B",
    //         },
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
    // },
  ],
}
export default config
