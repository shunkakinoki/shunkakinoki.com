const withBundleAnalyzer = require("@next/bundle-analyzer");
const withPlugins = require("next-compose-plugins");
const withTranslate = require("next-translate");

/**
 * @type {import('next/dist/next-server/server/config').NextConfig}
 **/
const config = {
  cleanDistDir: true,
  experimental: {
    conformance: true,
    craCompat: false,
    cpus: 1,
    disableOptimizedLoading: false,
    externalDir: true,
    gzipSize: true,
    optimizeCss: true,
    optimizeFonts: true,
    optimizeImages: true,
    pageEnv: true,
    plugins: true,
    profiling: true,
    reactRoot: false,
    scriptLoader: true,
    scrollRestoration: true,
    sprFlushToDisk: true,
    stats: true,
    workerThreads: true,
  },
  future: {
    strictPostcssConfiguration: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  i18n: {
    locales: ["en", "ja", "zh"],
    defaultLocale: "en",
    localeDetection: true,
  },
  reactStrictMode: true,
  poweredByHeader: true,
  productionBrowserSourceMaps: true,
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
        destination: "/values",
        permanent: true,
      },
      {
        source: "/when",
        destination: "/history",
        permanent: true,
      },
      {
        source: "/who",
        destination: "/about",
        permanent: true,
      },
      {
        source: "/why",
        destination: "/cause",
        permanent: true,
      },
      {
        source: "/where",
        destination: "https://zen.ly/shunkakinoki",
        permanent: true,
      },
    ];
  },
  trailingSlash: false,
  webpack5: true,
};

const plugins = [
  withBundleAnalyzer({
    enabled: process.env.ANALYZE === "true",
  }),
  withTranslate,
];

module.exports = withPlugins(plugins, config);
