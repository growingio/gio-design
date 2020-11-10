module.exports = {
  extends: ['airbnb', 'airbnb/hooks', 'plugin:@typescript-eslint/recommended', 'prettier'],
  parser: '@typescript-eslint/parser',
  env: {
    browser: true,
    mocha: true,
    jest: true,
  },
  // 忽略对全局 variable 的检查
  globals: {
    Promise: true,
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  plugins: ['prettier', '@typescript-eslint'],
  // Rewrite style
  rules: {
    'react/no-unused-prop-types': 'off',
    'react/prop-types': 'off',
    'react/require-default-props': 'off',
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': [1],
    'react/jsx-filename-extension': ['error', { extensions: ['.js', '.jsx', '.ts', '.tsx'] }],
    'react/jsx-props-no-spreading': ['error', { html: 'enforce', custom: 'ignore', explicitSpread: 'ignore' }],
    'import/no-unresolved': 'off',
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
    'import/extensions': ['off', 'never'],
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': ['error'],
    'no-param-reassign': ["error", { "props": false }],
  },
};
