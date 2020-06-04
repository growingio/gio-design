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
    // 不强制要求使用模板字面量而非字符串连接
    'prefer-template': OFF,
    'comma-dangle': OFF,
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
    // 强制函数定义中最多允许的参数数量
    'max-params': OFF,

    /**
     * react 相关
     */
    // 允许一个文件中定义多个component
    'react/no-multi-comp': OFF,
    'react/sort-comp': OFF,
    'react/prefer-es6-class': OFF,
    'react/prop-types': OFF,
    /**
     * 暂时关闭 unsafe 的即将废弃方法的警告
     * TODO: 讨论是否将 UNSAFE_ 标记方法替换
     */
    'react/no-unsafe': OFF,

    /**
     * 值得商榷的暂时关闭的检测属性
     */
    // 关闭 禁止 this 关键字在类或类对象之外出现
    '@typescript-eslint/no-invalid-this': OFF,
    // 关闭 禁止在 return 语句中使用赋值语句
    'no-return-assign': OFF,
    // 关闭 禁用 void 操作符
    'no-void': OFF,
    // 关闭 不允许在泛型或返回类型之外使用void类型
    '@typescript-eslint/no-invalid-void-type': OFF,
    // 关闭 不允许对 function 的参数进行重新赋值
    'no-param-reassign': OFF,
    'react/static-property-placement': OFF,

    // JS/TS 混用代码情况下在所有文件规则中禁用部分 TS 规则
    '@typescript-eslint/explicit-member-accessibility': OFF,
  },
  overrides: [
    {
      // enable the rule specifically for TypeScript files
      files: ['*.ts', '*.tsx'],
      rules: {
        '@typescript-eslint/explicit-member-accessibility': ERROR,
      },
    },
  ],
};
