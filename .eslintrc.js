module.exports = {
  extends: ["airbnb", "airbnb/hooks", "plugin:@typescript-eslint/recommended", "prettier", "plugin:storybook/recommended"],
  parser: '@typescript-eslint/parser',
  env: {
    browser: true,
    mocha: true,
    jest: true
  },
  // 忽略对全局 variable 的检查
  globals: {
    Promise: true
  },
  settings: {
    react: {
      version: 'detect'
    }
  },
  plugins: ['prettier', '@typescript-eslint'],
  // Rewrite style
  rules: {
    'react/no-unused-prop-types': 'off',
    'react/prop-types': 'off',
    'react/require-default-props': 'off',
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': [1],
    '@typescript-eslint/no-unused-vars': 'error',
    'react/jsx-filename-extension': ['error', {
      extensions: ['.js', '.jsx', '.ts', '.tsx']
    }],
    'react/jsx-props-no-spreading': 'off',
    'import/no-unresolved': 'off',
    'import/no-extraneous-dependencies': ['error', {
      devDependencies: true
    }],
    'import/extensions': ['off', 'never'],
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': ['error'],
    'no-underscore-dangle': 'off',
    'no-unused-expressions': [0],
    'react/static-property-placement': ['error', 'static public field'],
    '@typescript-eslint/no-unused-expressions': ['error', {
      allowShortCircuit: true
    }],
    '@typescript-eslint/explicit-module-boundary-types': ['off'],
    'react/jsx-no-bind': ['off']
  }
};