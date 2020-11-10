---
title: Input 输入框
nav:
  order: 2
  title: 组件
group:
  title: 基础组件
  order: 1
---

# Input 输入框

## 何时使用

需要用户输入表单域内容时

## 代码演示

<code src='./demo/Input.tsx' title='基础用法' />

<code src='./demo/Password.tsx' title='密码输入框' />

<code src='./demo/InputNumber.tsx' title='数字输入框' />

<code src='./demo/TextArea.tsx' title='多行文本输入框' />

## API

### Input

| 参数         | 说明                             | 类型                       | 默认值   |
| ------------ | -------------------------------- | -------------------------- | -------- |
| value        | 值                               | string                     | 必填     |
| onPressEnter | 按下回车时的回调                 | Function(e: React.KeyboardEvent)   | -        |
| type         | 同原生 input 的 type             | string                     | 'text'   |
| size         | input 大小                       | 'large'、'middle'、'small' | 'middle' |
| disabled     | 是否禁用                         | boolean                    | false    |
| maxLength    | 输入文字的最大长度               | number                     | -        |
| placeholder  | 默认显示文本                     | string                     | -        |
| style        | input 组件外层容器的 style (若存在，忽略 wrapStyle 和 inputStyle)       | React.CSSProperties        | -        |
| inputStyle   | input 的 style (兼容老版本，后续会去掉)   | React.CSSProperties        | -        |
| wrapStyle    | input 组件外层容器的 style (兼容老版本，后续会去掉)  | React.CSSProperties        | -        |
| prefix       | input 的前缀图标(在input左边)     | React.ReactNode            | -        |
| prefixWidth  | input 的左内边距(防止prefix遮挡)  | number            | -        |
| suffix       | input 的后缀图标(在input右边)     | React.ReactNode            | -        |
| suffixWidth  | input 的右内边距(防止suffix遮挡)  | number            | -        |
| ...          | 支持其他 React 自带的 input 属性 | any                        | -        |

### Input.Password

| 参数         | 说明                             | 类型                       | 默认值   |
| ------------ | -------------------------------- | -------------------------- | -------- |
| value        | 值                               | string                     | 必填     |
| size         | input 大小                       | 'large'、'middle'、'small' | 'middle' |
| onPressEnter | 按下回车时的回调                 | Function(e: React.KeyboardEvent)   | -        |
| disabled     | 是否禁用                         | boolean                    | false    |
| maxLength    | 输入文字的最大长度               | number                     | -        |
| placeholder  | 默认显示文本                     | string                     | -        |
| style        | input 组件外层容器的 style (若存在，忽略 wrapStyle 和 inputStyle)       | React.CSSProperties        | -        |
| inputStyle   | input 的 style  (兼容老版本，后续会去掉)   | React.CSSProperties        | -        |
| wrapStyle    | input 组件外层容器的 style   (兼容老版本，后续会去掉)  | React.CSSProperties        | -        |
| ...          | 支持其他 React 自带的 input 属性 | any                        | -        |

### Input.InputNumber

| 参数         | 说明                             | 类型                       | 默认值                     |
| ------------ | -------------------------------- | -------------------------- | -------------------------- |
| value        | 值                               | string                     | 必填                       |
| onChange     | 修改值时触发的回调函数           | Function(value: string)    | 必填                       |
| size         | input 大小                       | 'large'、'middle'、'small' | 'middle'                   |
| onPressEnter | 按下回车时的回调                 | Function(e)                | -                          |
| disabled     | 是否禁用                         | boolean                    | false                      |
| placeholder  | 默认显示文本                     | string                     | -                          |
| style        | input 组件外层容器的 style (若存在，忽略 wrapStyle 和 inputStyle)       | React.CSSProperties        | -        |
| inputStyle   | input 的 style  (兼容老版本，后续会去掉)   | React.CSSProperties        | -                          |
| wrapStyle    | input 组件外层容器的 style  (兼容老版本，后续会去掉)  | React.CSSProperties        | -                          |
| max          | 最大值                           | number                     | `Number.MAX_SAFE_INTEGER`  |
| min          | 最小值                           | number                     | `-Number.MAX_SAFE_INTEGER` |
| ...          | 支持其他 React 自带的 input 属性 | any                        | -                          |

### Input.TextArea

| 参数        | 说明                                | 类型                    | 默认值 |
| ----------- | ----------------------------------- | ----------------------- | ------ |
| value       | 值                                  | string                  | 必填   |
| disabled    | 是否禁用                            | boolean                 | false  |
| resize      | 是否可拖动大小                      | boolean                 | false  |
| maxLength   | 输入文字的最大长度                  | number                  | -      |
| placeholder | 默认显示文本                        | string                  | -      |
| style        | textarea 组件外层容器的 style (若存在，忽略 wrapStyle 和 inputStyle)       | React.CSSProperties        | -        |
| inputStyle  | textarea 的 style  (兼容老版本，后续会去掉)  | React.CSSProperties     | -      |
| wrapStyle   | textarea 组件外层容器的 style  (兼容老版本，后续会去掉)  | React.CSSProperties     | -      |
| ...         | 支持其他 React 自带的 textarea 属性 | any                     | -      |
