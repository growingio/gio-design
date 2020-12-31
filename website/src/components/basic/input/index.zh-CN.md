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

<code src='./demo/InputNumber.tsx' title='数字输入框' />

<code src='./demo/TextArea.tsx' title='多行文本输入框' />

<code src='./demo/FormatInputNumber.tsx' title='数字输入框格式化展示' />

## API

### Input

| 参数              | 说明                                                 | 类型                                | 默认值   | 必填 |
| ----------------- | ---------------------------------------------------- | ----------------------------------- | -------- | ---- |
| value             | 值                                                   | string                              | ''       | 是   |
| onPressEnter      | 按下回车时的回调                                     | Function(e: React.KeyboardEvent)    | -        | 否   |
| type              | 同原生 input 的 type                                 | string                              | 'text'   | 否   |
| size              | input 大小                                           | 'large'、'middle'、'small'          | 'middle' | 否   |
| disabled          | 是否禁用                                             | boolean                             | false    | 否   |
| maxLength         | 输入文字的最大长度                                   | number                              | -        | 否   |
| placeholder       | 默认显示文本                                         | string                              | -        | 否   |
| style             | input 组件外层容器的 style                           | React.CSSProperties                 | -        | 否   |
| prefix            | input 的前缀图标                                     | React.ReactNode                     | -        | 否   |
| prefixWidth       | input 的左内边距                                     | number                              | -        | 否   |
| suffix            | input 的后缀图标                                     | React.ReactNode                     | -        | 否   |
| suffixWidth       | input 的右内边距                                     | number                              | -        | 否   |
| compositionstart  | 用户使用拼音输入法开始输入汉字时，这个事件就会被触发 | Function(e: React.CompositionEvent) | -        | 否   |
| compositionupdate | 事件触发于字符被输入到一段文字的时候                 | Function(e: React.CompositionEvent) | -        | 否   |
| compositionstart  | 用户使用拼音输入法开始输入汉字时，这个事件就会被触发 | Function(e: React.CompositionEvent) | -        | 否   |
| ...               | 支持其他 React 自带的 input 属性                     | any                                 | -        | -    |

### Input.Password

| 参数         | 说明                             | 类型                             | 默认值   | 必填 |
| ------------ | -------------------------------- | -------------------------------- | -------- | ---- |
| value        | 值                               | string                           | ''       | 是   |
| size         | input 大小                       | 'large'、'middle'、'small'       | 'middle' | 否   |
| onPressEnter | 按下回车时的回调                 | Function(e: React.KeyboardEvent) | -        | 否   |
| disabled     | 是否禁用                         | boolean                          | false    | 否   |
| maxLength    | 输入文字的最大长度               | number                           | -        | 否   |
| placeholder  | 默认显示文本                     | string                           | -        | 否   |
| style        | input 组件外层容器的 style       | React.CSSProperties              | -        | 否   |
| ...          | 支持其他 React 自带的 input 属性 | any                              | -        | -    |

### Input.InputNumber

| 参数             | 说明                             | 类型                                       | 默认值                     | 必填 |
| ---------------- | -------------------------------- | ------------------------------------------ | -------------------------- | ---- |
| value            | 值                               | number                                     | ''                         | 是   |
| onChange         | 修改值时触发的回调函数           | Function(value: number\|string\|undefined) | 必填                       | 是   |
| size             | input 大小                       | 'large'、'middle'、'small'                 | 'middle'                   | 否   |
| onPressEnter     | 按下回车时的回调                 | Function(e)                                | -                          | 否   |
| disabled         | 是否禁用                         | boolean                                    | false                      | 否   |
| placeholder      | 默认显示文本                     | string                                     | -                          | 否   |
| style            | input 组件外层容器的 style       | React.CSSProperties                        | -                          | 否   |
| max              | 最大值                           | number                                     | `Number.MAX_SAFE_INTEGER`  | 否   |
| min              | 最小值                           | number                                     | `-Number.MAX_SAFE_INTEGER` | 否   |
| min              | 最小值                           | number                                     | `-Number.MAX_SAFE_INTEGER` | 否   |
| decimalSeparator | 小数分隔符                       | string                                     | `.`                        | 否   |
| customDisplay    | 自定义 InputNumber 中的显示格式  | [ICustomDisplay](#icustomdisplay)          | `.`                        | 否   |
| ...              | 支持其他 React 自带的 input 属性 | any                                        | -                          | -    |

#### ICustomDisplay

| 参数      | 说明                                                           | 类型                                             | 默认值                                    | 必填 |
| --------- | -------------------------------------------------------------- | ------------------------------------------------ | ----------------------------------------- | ---- |
| formatter | 指定输入框展示值的格式                                         | (value: number \| string \| undefined) => string | noop                                      | 是   |
| parser    | 指定从 `formatter` 里转换回数字的方式，和 `formatter` 搭配使用 | (value: string \| undefined) => number \| string | (value) => value.replace(/[^\w.-]+/g, '') | 是   |

### Input.TextArea

| 参数        | 说明                                | 类型                | 默认值 | 必填 |
| ----------- | ----------------------------------- | ------------------- | ------ | ---- |
| value       | 值                                  | string              | ''     | 是   |
| disabled    | 是否禁用                            | boolean             | false  | 否   |
| resize      | 是否可拖动大小                      | boolean             | false  | 否   |
| autosize    | 是否根据内容自动调整高度            | boolean             | false  | 否   |
| maxLength   | 输入文字的最大长度                  | number              | -      | 否   |
| showCount   | 是否显示最大长度的计数              | boolean             | false  | 否   |
| placeholder | 默认显示文本                        | string              | -      | 否   |
| style       | textarea 组件外层容器的 style       | React.CSSProperties | -      | 否   |
| ...         | 支持其他 React 自带的 textarea 属性 | any                 | -      | -    |
