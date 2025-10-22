import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import { defineConfig } from "eslint/config";
import eslintConfigPrettier from "eslint-config-prettier";

export default defineConfig([
  {
    ignores: [
      "node_modules/**",
      "dist/**",
      "reports/**",
      "artifacts/**",
      "eslint.config.mjs"
    ]},
    js.configs.recommended,
    ...tseslint.configs.recommended,

  {
    files: ["**/*.ts"],
    languageOptions: { 
      sourceType:"module",
      globals: { ...globals.browser, ...globals.node } 
    },
    rules:{
      'no-console':"off",
    }
  },
  eslintConfigPrettier
]);
