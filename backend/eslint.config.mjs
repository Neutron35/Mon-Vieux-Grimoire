import globals from 'globals';
import pluginJs from '@eslint/js';
import pluginReact from 'eslint-plugin-react';
import prettier from 'eslint-plugin-prettier';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default [
  { files: ['**/*.{js,mjs,cjs,jsx}'] },
  { languageOptions: { globals: { ...globals.browser, ...globals.node } } },
  pluginJs.configs.recommended,
  pluginReact.configs.flat.recommended,
  ...compat.extends('airbnb-base', 'prettier', 'plugin:node/recommended'),
  {
    plugins: {
      prettier,
    },

    languageOptions: {
      globals: {},
    },

    rules: {
      'prettier/prettier': 'error',
      'no-unused-vars': 'error',
      'no-console': 'off',
      'no-underscore-dangle': 'off',
    },
  },
];