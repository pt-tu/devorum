import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      dark: {
        2: "#262D34",
        4: "#2C353D",
      },
      secondary: {
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
  plugins: [],
};
export default config
