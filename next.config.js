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
    esmExternals: true,
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
  images: {
    domains: ["pbs.twimg.com", "s3.us-west-2.amazonaws.com"],
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
      {
        source: "/schedule",
        destination: "/cal.html",
        permanent: true,
      },
      {
        source: "/cal",
        destination: "https://cal.com/shunkakinoki",
        permanent: true,
      },
      {
        source: "/zoom",
        destination:
          "https://zoom.us/j/8705240382?pwd=NVhWdHRocWZFbWxBcVByalNEL3YyUT09",
        permanent: true,
      },
    ];
  },
  trailingSlash: false,
  webpack5: true,
};

const plugins = [
  withBundleAnalyzer({
    enabled: process.env.NEXT_ANALYZE === "true",
  }),
  withTranslate,
];

module.exports = withPlugins(plugins, config);
