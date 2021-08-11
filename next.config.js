const withBundleAnalyzer = require("@next/bundle-analyzer");
const withPlugins = require("next-compose-plugins");
const withTranslate = require("next-translate");

/**
 * @type {import('next/dist/next-server/server/config').NextConfig}
 **/
const config = {
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
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback.fs = false;
      config.resolve.fallback.child_process = false;
    }
    return config;
  },
  trailingSlash: false,
};

const plugins = [
  withBundleAnalyzer({
    enabled: process.env.ANALYZE === "true",
  }),
  withTranslate,
];

module.exports = withPlugins(plugins, config);
