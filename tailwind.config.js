module.exports = {
  darkMode: "class",
  purge: ["src/**/*.tsx"],
  plugins: [
    require("@tailwindcss/aspect-ratio"),
    require("@tailwindcss/forms"),
    require("@tailwindcss/typography"),
  ],
};
