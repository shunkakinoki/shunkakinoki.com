module.exports = {
  experimental: {
    reactMode: "concurrent",
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
};
