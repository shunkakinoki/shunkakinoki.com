module.exports = {
  extends: "@shunkakinoki",
  settings: {
    "import/parsers": {
      "@typescript-eslint/parser": [".ts", ".tsx"],
    },
    "import/resolver": {
      typescript: {
        project: "tsconfig.json",
      },
    },
    react: {
      version: "detect",
    },
  },
};
