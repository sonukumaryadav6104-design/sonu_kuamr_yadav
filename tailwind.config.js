/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: { sans: ["Space Grotesk", "system-ui", "sans-serif"] },
      colors: {
        bg: "#0b0b10",
        card: "#14141c",
        line: "#25252f",
        mut: "#9a98a8",
        acc: "#8b6dff",
        acc2: "#ff6b97",
      },
    },
  },
  plugins: [],
};
