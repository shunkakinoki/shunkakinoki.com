const nextTranslate = require("next-translate");

module.exports = nextTranslate({
  experimental: {
    reactMode: "concurrent",
  },
  i18n: {
    locales: ["en", "ja", "zh"],
    defaultLocale: "en",
  },
  reactStrictMode: true,
  redirects() {
    return [
      {
        source: "/resume",
        destination:
          "https://drive.google.com/file/d/1WORDhsxecjjhElXfXQw8lapxxaaFrKM8/view",
        permanent: true,
      },
    ];
  },
});
