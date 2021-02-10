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
        source: "/how",
        destination: "/mission",
        permanent: true,
      },
      {
        source: "/resume",
        destination:
          "https://drive.google.com/file/d/1WORDhsxecjjhElXfXQw8lapxxaaFrKM8/view",
        permanent: true,
      },
      {
        source: "/what",
        destination: "/credits",
        permanent: true,
      },
      {
        source: "/when",
        destination: "/history",
        permanent: true,
      },
      {
        source: "/where",
        destination: "https://zen.ly/shunkakinoki",
        permanent: true,
      },
      {
        source: "/who",
        destination: "/about",
        permanent: true,
      },
      {
        source: "/why",
        destination: "/value",
        permanent: true,
      },
      {
        source: "/where",
        destination: "https://zen.ly/shunkakinoki",
        permanent: true,
      },
    ];
  },
});
