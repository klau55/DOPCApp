import js from '@eslint/js';
import globals from 'globals';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import reactRefreshPlugin from 'eslint-plugin-react-refresh';
import tsEslintPlugin from '@typescript-eslint/eslint-plugin';
import prettierPlugin from 'eslint-plugin-prettier';

export default [
  // ESLint Recommended Rules
  js.configs.recommended,

  // TypeScript Configuration
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: '@typescript-eslint/parser',
      ecmaVersion: 2020,
      sourceType: 'module',
      globals: {
        ...globals.browser,
      },
    },
    plugins: {
      '@typescript-eslint': tsEslintPlugin,
    },
    rules: {
      // Add TypeScript-specific rules here if needed
    },
  },

  // React Configuration
  {
    files: ['**/*.js', '**/*.jsx', '**/*.ts', '**/*.tsx'],
    languageOptions: {
      ecmaFeatures: {
        jsx: true,
      },
    },
    plugins: {
      react: reactPlugin,
      'react-hooks': reactHooksPlugin,
      'react-refresh': reactRefreshPlugin,
    },
    rules: {
      'react/react-in-jsx-scope': 'off', // React 17+ doesn't require React in scope
      'react-hooks/rules-of-hooks': 'error', // Enforces Rules of Hooks
      'react-hooks/exhaustive-deps': 'warn', // Checks effect dependencies
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ], // Limits React Refresh to component exports
    },
    settings: {
      react: {
        version: 'detect', // Automatically detect the React version
      },
    },
  },

  // Prettier Integration
  {
    files: ['**/*.{js,jsx,ts,tsx,json,css,md}'],
    plugins: {
      prettier: prettierPlugin,
    },
    rules: {
      'prettier/prettier': 'error', // Enforce Prettier formatting as ESLint errors
    },
  },

  // Ignore Patterns
  {
    ignores: ['dist'], // Exclude the 'dist' directory from linting
  },
];