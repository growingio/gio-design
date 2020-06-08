const OFF = 0;
const ERROR = 2;

module.exports = {
  extends: [
    'alloy',
    'alloy/react',
    'alloy/typescript',
    'prettier',
    'prettier/babel',
    'prettier/react',
    'prettier/@typescript-eslint',
  ],
  parserOptions: {
    ecmaVersion: 2020,
    ecmaFeatures: {
      jsx: true,
      experimentalObjectRestSpread: true,
    },
    sourceType: 'module',
  },
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
  plugins: ['prettier'],
  // Rewrite style
  rules: {
    // prettier 错误
    'prettier/prettier': ERROR,
    // 当大括号是可以省略的，强制不使用它们
    'arrow-body-style': [ERROR, 'as-needed'],
    // 要求使用 const 声明那些声明后不再被修改的变量
    'prefer-const': ERROR,
    // 禁止定义前使用
    'no-use-before-define': [
      ERROR,
      {
        functions: false,
        classes: true,
      },
    ],
    // 要求在注释前有空白
    'spaced-comment': [ERROR, 'always'],
    'no-return-assign': OFF,

    /**
     * react 相关
     */
    // 允许一个文件中定义多个component
    'react/no-multi-comp': OFF,
    'react/prefer-es6-class': OFF,
    'react/static-property-placement': OFF,

    // 关闭 禁止 this 关键字在类或类对象之外出现
    '@typescript-eslint/no-invalid-this': OFF,
  },
};
