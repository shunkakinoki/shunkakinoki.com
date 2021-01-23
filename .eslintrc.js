module.exports = {
  root: true,
  env: {
    es6: true,
    browser: true,
    node: true,
  },
  ignorePatterns: ["**/node_modules/**/*", "**/.next/**/*"],
  extends: ["prettier", "plugin:prettier/recommended"],
  overrides: [
    {
      files: ["next-env.d.ts", "src/**/*.ts", "src/**/*.tsx"],
      parser: "@typescript-eslint/parser",
      parserOptions: {
        parserOptions: {
          ecmaVersion: 2021,
          sourceType: "module",
          ecmaFeatures: { jsx: true },
        },
        project: "tsconfig.json",
      },
      settings: {
        "import/resolver": {
          typescript: {},
        },
        react: {
          version: "detect",
        },
      },
      plugins: ["@typescript-eslint"],
      extends: [
        "plugin:@next/eslint-plugin-next/recommended",
        "plugin:@typescript-eslint/eslint-recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:@typescript-eslint/recommended-requiring-type-checking",
        "plugin:jsx-a11y/recommended",
        "plugin:import/errors",
        "plugin:import/typescript",
        "plugin:import/warnings",
        "plugin:prettier/recommended",
        "plugin:react/recommended",
        "plugin:react-hooks/recommended",
        "plugin:tailwind/recommended",
        "prettier/@typescript-eslint",
        "prettier",
        "prettier/react",
      ],
      rules: {
        "import/order": [
          "error",
          {
            alphabetize: {
              order: "asc",
              caseInsensitive: true,
            },
            pathGroups: [
              {
                pattern: "@/**",
                group: "internal",
                position: "after",
              },
            ],
            "newlines-between": "always-and-inside-groups",
          },
        ],
        "react/jsx-sort-props": [
          "error",
          {
            callbacksLast: true,
            shorthandFirst: true,
            shorthandLast: true,
            ignoreCase: true,
            noSortAlphabetically: true,
            reservedFirst: true,
          },
        ],
        "react/react-in-jsx-scope": 0,
        "react/self-closing-comp": 1,
        "sort-keys": [
          "error",
          "asc",
          { caseSensitive: true, natural: true, minKeys: 2 },
        ],
        "sort-vars": ["error", { ignoreCase: true }],
      },
    },
  ],
};
