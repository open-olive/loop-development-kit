module.exports = {
  env: {
    commonjs: true,
    es6: true,
    node: true,
  },
  parserOptions: {
    ecmaVersion: 9,
  },
  plugins: ['jsdoc', '@typescript-eslint'],
  parser: '@typescript-eslint/parser',
  extends: ['airbnb-base', 'plugin:@typescript-eslint/recommended', 'prettier'],
  rules: {
    'class-methods-use-this': 'off',
    'global-require': 'off',
    'linebreak-style': 0,
    'max-classes-per-file': 'off',
    'no-nested-ternary': 'off',
    'no-param-reassign': 'off',
    // http://eslint.org/docs/rules/no-restricted-syntax
    'no-restricted-syntax': [
      'error',
      {
        selector: 'ForInStatement',
        message:
          'for..in loops iterate over the entire prototype chain, which is virtually never what you want. Use Object.{keys,values,entries}, and iterate over the resulting array.',
      },
      {
        selector: 'LabeledStatement',
        message:
          'Labels are a form of GOTO; using them makes code confusing and hard to maintain and understand.',
      },
      {
        selector: 'WithStatement',
        message:
          '`with` is disallowed in strict mode because it makes code impossible to predict and optimize.',
      },
    ],
    'no-underscore-dangle': 'off',
    'no-console': ['off', { allow: ['warn', 'error'] }],
    'unicode-bom': 'off',
    'import/prefer-default-export': 'off', // Default exports are bad.
    'import/no-dynamic-require': 'off',
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
    'import/no-unresolved': [
      'error',
      {
        commonjs: true,
        caseSensitive: true,
        ignore: ['node-win32-automation'],
      },
    ],
    'jsdoc/check-alignment': 1, // Recommended
    'jsdoc/check-param-names': 1, // Recommended
    'jsdoc/check-tag-names': [
      1,
      {
        definedTags: ['internal'],
      },
    ], // Recommended
    'jsdoc/implements-on-classes': 1, // Recommended
    'jsdoc/newline-after-description': 1, // Recommended
    'jsdoc/require-jsdoc': 1, // Recommended
    'jsdoc/require-param': 1, // Recommended
    'jsdoc/require-param-description': 1, // Recommended
    'jsdoc/require-param-name': 1, // Recommended
    'jsdoc/require-returns-check': 1, // Recommended
    'jsdoc/require-returns-description': 1, // Recommended
  },
  overrides: [
    {
      rules: {
        'import/no-unresolved': ['off'],
        'import/extensions': ['off'],
      },
      files: ['**/*.ts'],
    },
    {
      rules: {
        '@typescript-eslint/no-var-requires': ['off'],
      },
      files: ['**/*.js'],
    },
    {
      rules: {
        // Explicit anys are fine in tests, especially when mocking.
        '@typescript-eslint/no-explicit-any': ['off'],
        // Test functions don't need documentation.
        'jsdoc/require-jsdoc': ['off'],
      },
      files: ['**/*.test.ts'],
    },
  ],
};
