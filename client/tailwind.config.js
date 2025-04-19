/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',  // Vite's index.html is in the root, not public
    './src/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        background: "#FAF7F2",
        accentBg: "#F5EFE6",
        primaryText: "#2F2F2F",
        mutedText: "#7D7C77",
        primaryAccent: "#A6C4A3",
        hoverAccent: "#89B58E",
        borderColor: "#DAD7D0"
      }
    },
  },
  plugins: [],
}