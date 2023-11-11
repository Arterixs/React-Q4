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
    'plugin:react/jsx-runtime',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'prettier',
  ],
  plugins: ['react-refresh', '@typescript-eslint', 'simple-import-sort'],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json'],
  },
  settings: {
    'import/resolver': {
      typescript: {},
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
  rules: {
    "react/destructuring-assignment": OFF,
    "react-hooks/exhaustive-deps": OFF,
    "react/no-array-index-key": OFF,
    'jsx-quotes': [ERROR, 'prefer-double'],
    'react-refresh/only-export-components': [WARN, { allowConstantExport: true }],
    'react/jsx-no-constructed-context-values': OFF,
    "no-console": [WARN, { allow: ["error"] }],
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
    'simple-import-sort/imports': [
      ERROR,
      {
        groups: [
          ['^react', '^@?\\w'],
          ['^(@|components)(/.*|$)'],
          ['^\\u0000'],
          ['^\\.\\.(?!/?$)', '^\\.\\./?$'],
          ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
          ['^.+\\.?(css)$'],
        ],
      },
    ],
    "import/no-extraneous-dependencies": [
      ERROR,
      {
        "devDependencies": [
            "**/setup-test.ts",
            "test.{ts,tsx,js,jsx}",
            "test-*.{ts,tsx,js,jsx}",
            "**/*{.,_}{test,spec}.{ts,tsx,js,jsx}",
            "**/jest.config.{ts,js}",
            "**/jest.setup.{ts,js}",
            "**/*.stories.*",
            "**/.storybook/**/*.*"
        ]
      }
    ]
  },
};
