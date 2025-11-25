import eslint from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier';
import turboConfigModule from 'eslint-config-turbo/flat';
import globals from 'globals';
import tseslint from 'typescript-eslint';

/** @type {import('@typescript-eslint/utils').TSESLint.FlatConfig.ConfigFile} */
export default [
  {
    languageOptions: {
      globals: {
        ...globals.node
      }
    }
  },
  eslint.configs.recommended,
  ...tseslint.configs.strict,
  eslintConfigPrettier,
  ...turboConfigModule,
  {
    ignores: ['dist/**']
  },
  {
    rules: {
      'turbo/no-undeclared-env-vars': 'warn',
    }
  },
  {
    files: ['**/env.ts'],
    rules: {
      'no-restricted-properties': 'off',
      'no-restricted-imports': 'off'
    }
  }
];
