/** @type {import('tailwindcss').Config} */
export default {
  mode: 'jit',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./index.html"
  ],
  // variants: {
  //   extend: {
  //     fontWeight: ["responsive", "hover", "focus"],
  //     opacity: ["hover"],
  //     borderColor: ["hover", "focus"],
  //     margin: ["first", "last"],
  //     backgroundColor: ["odd", "even"],
  //     scale: ["hover", "active", "group-hover"],
  //   },
  // },
  theme: {
    extend: {
      colors: {
        "dark-gray": "#262626",
        "dark-gray-hover": "#3a3a3a",
        "gray-border": "#c1bab2",
        "light-text": "#d4d3b6"
      }
    },
  },
  plugins: [],
}