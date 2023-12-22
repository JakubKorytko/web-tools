module.exports = {
  env: {
    es2021: true,
    node: true,
  },
  extends: [
    'airbnb-base',
  ],
  parser: '@babel/eslint-parser',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  rules: {
    'no-console': 'off',
    'sort-imports':
        [
          'error',
          {
            ignoreCase: true,
            ignoreDeclarationSort: true,
          },
        ],
    'import/order': ['error', {
      groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index', 'object', 'type'],
      pathGroups: [
        {
          pattern: 'src/**',
          group: 'internal',
          position: 'after',
        },
      ],
      'newlines-between': 'always',
    }],
  },
  settings: {
    'import/resolver': {
      alias: {
        map: [
          ['src', './src'],
        ],
        extensions: ['.js', '.jsx', '.json'],
      },
    },
  },
};
