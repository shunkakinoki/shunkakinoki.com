module.exports = {
  "*.{js,ts,cjs,mjs,d.cts,d.mts,jsx,tsx,json,jsonc}": ["pnpm biome:cmd"],
  "package.json": [
    "pnpm run npm-package-json:lint",
    "pnpm run sort-package-json:fix",
    "pnpm run biome:cmd",
  ],
};
