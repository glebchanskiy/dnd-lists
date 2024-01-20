/** @type {import('tailwindcss').Config} */
export default {
  mode: 'jit',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./index.html"
  ],
  variants: {
    extend: {
      fontWeight: ["responsive", "hover", "focus"],
      opacity: ["hover"],
      borderColor: ["hover", "focus"],
      margin: ["first", "last"],
      backgroundColor: ["odd", "even"],
      scale: ["hover", "active", "group-hover"],
    },
  },
  theme: {
    extend: {},
  },
  plugins: [],
}