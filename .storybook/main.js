const viteConfig = require("../vite.config");

module.exports = {
  core: {
    builder: "storybook-builder-vite",
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
  async viteFinal(config) {
    config.plugins = [...config.plugins, ...viteConfig.plugins];
    return {
      ...config,
      esbuild: {
        ...config.esbuild,
        jsxInject: `import React from 'react'`,
      },
      define: {
        ...config.define,
        global: "window",
        "process.env": {},
      },
    };
  },
};
