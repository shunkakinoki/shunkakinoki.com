const TerserPlugin = require("terser-webpack-plugin");

/**
 * @type {import('next/dist/next-server/server/config').NextConfig}
 **/
module.exports = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  webpack: (config, { dev, isServer }) => {
    if (isServer && !dev) {
      config.optimization = {
        minimize: true,
        minimizer: [
          new TerserPlugin({
            parallel: true,
            cache: true,
            terserOptions: {
              output: { comments: false },
              mangle: true,
              compress: true,
            },
            extractComments: false,
          }),
        ],
      };
    }
    return config;
  },

  trailingSlash: false,
};
