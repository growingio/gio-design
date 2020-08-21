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

<code src='./demo/TextArea.tsx' title='多行文本输入框' />

## API

### Input

| 参数         | 说明                             | 类型                | 默认值 |
| ------------ | -------------------------------- | ------------------- | ------ |
| value        | 值                               | string              | 必填   |
| onChange     | 修改值时触发的回调函数           | Function(e)         | 必填   |
| type         | 同原生 input 的 type             | string              | 'text' |
| onPressEnter | 按下回车时的回调                 | Function(e)         | -      |
| disabled     | 是否禁用                         | boolean             | false  |
| maxLength    | 输入文字的最大长度               | number              | -      |
| placeholder  | 默认显示文本                     | string              | -      |
| inputStyle   | input 的 style                   | React.CSSProperties | -      |
| wrapStyle    | input 组件外层容器的 style       | React.CSSProperties | -      |
| suffix       | input 的后缀图标                 | React.ReactNode     | -      |
| ...          | 支持其他 React 自带的 input 属性 | any                 | -      |

### Input.Password

| 参数         | 说明                             | 类型                | 默认值 |
| ------------ | -------------------------------- | ------------------- | ------ |
| value        | 值                               | string              | 必填   |
| onChange     | 修改值时触发的回调函数           | Function(e)         | 必填   |
| onPressEnter | 按下回车时的回调                 | Function(e)         | -      |
| disabled     | 是否禁用                         | boolean             | false  |
| maxLength    | 输入文字的最大长度               | number              | -      |
| placeholder  | 默认显示文本                     | string              | -      |
| inputStyle   | input 的 style                   | React.CSSProperties | -      |
| wrapStyle    | input 组件外层容器的 style       | React.CSSProperties | -      |
| ...          | 支持其他 React 自带的 input 属性 | any                 | -      |

### Input.InputNumber

| 参数         | 说明                             | 类型                    | 默认值                     |
| ------------ | -------------------------------- | ----------------------- | -------------------------- |
| value        | 值                               | number                  | 必填                       |
| onChange     | 修改值时触发的回调函数           | Function(value: number) | 必填                       |
| onPressEnter | 按下回车时的回调                 | Function(e)             | -                          |
| disabled     | 是否禁用                         | boolean                 | false                      |
| placeholder  | 默认显示文本                     | string                  | -                          |
| inputStyle   | input 的 style                   | React.CSSProperties     | -                          |
| wrapStyle    | input 组件外层容器的 style       | React.CSSProperties     | -                          |
| max          | 最大值                           | number                  | `Number.MAX_SAFE_INTEGER`  |
| min          | 最小值                           | number                  | `-Number.MAX_SAFE_INTEGER` |
| ...          | 支持其他 React 自带的 input 属性 | any                     | -                          |

### Input.TextArea

| 参数        | 说明                                | 类型                | 默认值 |
| ----------- | ----------------------------------- | ------------------- | ------ |
| value       | 值                                  | string              | 必填   |
| onChange    | 修改值时触发的回调函数              | Function(e)         | 必填   |
| disabled    | 是否禁用                            | boolean             | false  |
| resize      | 是否可拖动大小                      | boolean             | false  |
| maxLength   | 输入文字的最大长度                  | number              | -      |
| placeholder | 默认显示文本                        | string              | -      |
| inputStyle  | input 的 style                      | React.CSSProperties | -      |
| wrapStyle   | input 组件外层容器的 style          | React.CSSProperties | -      |
| ...         | 支持其他 React 自带的 textarea 属性 | any                 | -      |
