import stylistic from "@stylistic/eslint-plugin";
import typescriptEslintParser from "@typescript-eslint/parser";
import * as astroParser from "astro-eslint-parser";
import eslintPluginAstro from "eslint-plugin-astro";
import importPlugin from "eslint-plugin-import-x";
import tseslint from "typescript-eslint";

export default [
  ...eslintPluginAstro.configs.recommended,
  ...tseslint.configs.recommended,
  
  {
    files: ["**/*.astro"],
    languageOptions: {
      parser: astroParser,
      parserOptions: {
        parser: typescriptEslintParser,
        extraFileExtensions: [".astro"],
      },
    },
  },
  {
    plugins: {
      "@stylistic": stylistic,
      "import-x": importPlugin,
    },
    settings: {
      "import-x/resolver": {
        typescript: {
          alwaysTryTypes: true,
        },
      },
    },
    rules: {
      "import-x/order": [
        "error",
        {
          groups: [
            "builtin",
            "external",
            "internal",
            ["parent", "sibling"],
            "index",
            "object",
            "type",
          ],
          "newlines-between": "always",
          pathGroupsExcludedImportTypes: ["builtin"],
          alphabetize: { order: "asc", caseInsensitive: true },
        },
      ],
      "@stylistic/indent": ["error", 2],
      "@stylistic/quotes": ["error", "double"],
      "@stylistic/semi": ["error", "always"],
    }
  },
  {
    ignores: ["dist", "node_modules", ".astro"]
  }
];