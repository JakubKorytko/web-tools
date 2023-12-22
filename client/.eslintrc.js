module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  parser: '@babel/eslint-parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
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
          pattern: 'src/components/**',
          group: 'internal',
          position: 'after',
        },
        {
          pattern: 'src/routes/**',
          group: 'internal',
          position: 'after',
        },
        {
          pattern: 'src/login/**',
          group: 'internal',
          position: 'after',
        },
        {
          pattern: 'src/gfx/**',
          group: 'internal',
          position: 'after',
        },
        {
          pattern: 'src/**',
          group: 'internal',
          position: 'after',
        },
        {
          pattern: '**/*.css',
          group: 'index',
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
