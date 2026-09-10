import js from '@eslint/js';
import { defineConfig, globalIgnores } from 'eslint/config';
import globals from 'globals';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';

export default defineConfig(
  globalIgnores(['dist', 'src/routeTree.gen.ts']),
  {
    ...jsxA11y.flatConfigs.recommended,
    files: ['**/*.tsx'],
    settings: {
      'jsx-a11y': {
        // Only map components with stable native semantics; Radix asChild
        // composition and accessible names still need browser verification.
        components: { Input: 'input', Textarea: 'textarea' },
      },
    },
  },
  {
    extends: [js.configs.recommended, tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true, allowExportNames: ['Route', 'buttonVariants', 'badgeVariants'] },
      ],
    },
  },
  {
    files: ['src/routes/**/*.tsx'],
    // TanStack's Vite plugin handles route hot updates.
    rules: { 'react-refresh/only-export-components': 'off' },
  },
);
