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
    concurrentFeatures: false,
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
        source: "/checklist",
        destination:
          "https://shunkakinoki.notion.site/shunkakinoki/ccf0648ddaab42a38644f209e6cd641f",
        permanent: true,
      },
      {
        source: "/meeting",
        destination: "https://cal.com/shunkakinoki/meeting",
        permanent: true,
      },
      {
        source: "/news",
        destination:
          "https://shunkakinoki.notion.site/0d7baa7e42434b5ea9cc8f2f73fe6e8f",
        permanent: true,
      },
      {
        source: "/vote",
        destination: "https://vote.shunkakinoki.com",
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
  rewrites() {
    return [
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "app.shunkakinoki.com",
          },
        ],
        destination: "https://www.shunkakinoki.com/products",
      },
      {
        source: "/:slug",
        has: [
          {
            type: "host",
            value: "blog.shunkakinoki.com",
          },
        ],
        destination: "https://www.shunkakinoki.com/blog/:slug",
      },
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "docs.shunkakinoki.com",
          },
        ],
        destination: "https://www.shunkakinoki.com/about",
      },
    ]
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
