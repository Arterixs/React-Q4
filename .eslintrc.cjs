const OFF = 0;
const WARN = 1;
const ERROR = 2;

module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'airbnb',
    'airbnb-typescript',
    'airbnb/hooks',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json'],
  },
  plugins: ['react-refresh', '@typescript-eslint'],
  rules: {
    'react-refresh/only-export-components': [WARN, { allowConstantExport: true }],
    'react/jsx-no-constructed-context-values': OFF,
    'react/jsx-props-no-spreading': [
      ERROR,
      {
        html: 'ignore',
      },
    ],
    'import/prefer-default-export': OFF,
    'react/function-component-definition': [
      'warn',
      {
        namedComponents: 'arrow-function',
      },
    ],
    '@typescript-eslint/no-unused-vars': WARN,
  },
}
