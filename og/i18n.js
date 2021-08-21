module.exports = {
  defaultLocale: "en",
  locales: ["en", "ja", "zh"],
  pages: {
    "*": ["_error", "common", "form"],
    "/": ["landing"],
    "/about": ["about"],
  },
  loadLocaleFrom: (lang, ns) => {
    return import(`../locales/${lang}/${ns}.json`).then(m => {
      return m.default;
    });
  },
};
