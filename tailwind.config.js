module.exports = {
  darkMode: "class",
  mode: "jit",
  purge: ["src/**/*.{js,ts,jsx,tsx}"],
  plugins: [
    require("@tailwindcss/aspect-ratio"),
    require("@tailwindcss/line-clamp"),
    require("@tailwindcss/forms"),
    require("@tailwindcss/typography"),
  ],
};
