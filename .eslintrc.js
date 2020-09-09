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
    'no-use-before-define': 0,
    'react/jsx-filename-extension': [2, { extensions: ['.js', '.jsx', '.ts', '.tsx'] }],
    'import/no-unresolved': 0,
    'import/extensions': [0, 'never'],
  },
};
