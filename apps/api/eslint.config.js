import { config } from "@malang-dev/eslint-config";

export default [
  ...config,
  {
    languageOptions: {
      parserOptions: {
        project: "tsconfig.json",
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
];
