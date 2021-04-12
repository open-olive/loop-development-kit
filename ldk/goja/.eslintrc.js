module.exports = {
  env: {
    commonjs: true,
    es2021: true,
    node: true,
  },
  extends: [
    'airbnb-base',
    'plugin:@typescript-eslint/recommended', 'prettier'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    '@typescript-eslint',
  ],
  rules: {
    'class-methods-use-this': 'off',
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
    'import/prefer-default-export': 'off', // Default exports are bad.
    'lines-between-class-members': ["error", "always", { "exceptAfterSingleLine": true }],
  },
  overrides: [
    {
      rules: {
        'import/no-unresolved': ['off'],
        'import/extensions': ['off'],
      },
      files: ['**/*.ts'],
    }
  ],
};
