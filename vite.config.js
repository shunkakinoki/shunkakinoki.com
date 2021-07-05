const defineConfig = require("vite").defineConfig;
const tsconfigPaths = require("vite-tsconfig-paths").default;

const viteConfig = defineConfig({
  plugins: [tsconfigPaths()],
});

module.exports = viteConfig;
