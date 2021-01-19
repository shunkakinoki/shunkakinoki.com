module.exports = {
  darkMode: "class",
  purge: ["src/**/*.{js,ts,jsx,tsx}"],
  plugins: [
    require("@tailwindcss/aspect-ratio"),
    require("@tailwindcss/forms"),
    require("@tailwindcss/typography"),
  ],
};
