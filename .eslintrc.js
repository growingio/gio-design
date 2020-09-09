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
    'no-use-before-define': 'off',
    'react/jsx-filename-extension': ['error', { extensions: ['.js', '.jsx', '.ts', '.tsx'] }],
    'react/jsx-props-no-spreading': ['error', { html: 'enforce', custom: 'ignore', explicitSpread: 'ignore' }],
    'import/no-unresolved': 'off',
    'import/extensions': ['off', 'never'],
  },
};
