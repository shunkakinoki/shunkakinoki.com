const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");

module.exports = {
  core: {
    builder: "webpack5",
  },
  stories: ["../src/**/*.stories.tsx"],
  addons: [
    "@storybook/addon-essentials",
    "@storybook/addon-a11y",
    {
      name: "@storybook/addon-postcss",
      options: {
        postcssLoaderOptions: {
          implementation: require("postcss"),
        },
      },
    },
  ],
  reactOptions: {
    fastRefresh: true,
    strictMode: true,
  },
  webpackFinal: async config => {
    config.resolve.plugins = [new TsconfigPathsPlugin()];
    return config;
  },
};
