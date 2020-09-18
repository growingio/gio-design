---
title: Form 表单
nav:
  order: 2
  title: 组件
group:
  title: 功能组件
  order: 2
---

# Form 表单

## 何时使用

表单的核心功能是采集数据信息，是采集、传递、提交数据的中间媒介。其作为获取用户输入的重要交互方式，也承担着将问题和答案进行配对的角色。

## 代码演示

<code src='./demo/base.tsx' title='基础用法' />
<code src='./demo/layout.tsx' title='布局方式' desc="可通过`labelAlign` 来控制 label 的对齐方式" />
<code src='./demo/message.tsx' title='提示信息' />
<code src='./demo/required.tsx' title='可选项' />

## API

### Form

| 参数         | 说明                             | 类型                       | 默认值   |
| ------------ | -------------------------------- | -------------------------- | -------- |
| value        | 值                               | string                     | 必填     |
| onChange     | 修改值时触发的回调函数           | Function(value: string)    | 必填     |
| type         | 同原生 input 的 type             | string                     | 'text'   |
| size         | input 大小                       | 'large'、'medium'、'small' | 'medium' |
| onPressEnter | 按下回车时的回调                 | Function(e)                | -        |
| disabled     | 是否禁用                         | boolean                    | false    |
| maxLength    | 输入文字的最大长度               | number                     | -        |
| placeholder  | 默认显示文本                     | string                     | -        |
| inputStyle   | input 的 style                   | React.CSSProperties        | -        |
| wrapStyle    | input 组件外层容器的 style       | React.CSSProperties        | -        |
| suffix       | input 的后缀图标                 | React.ReactNode            | -        |
| ...          | 支持其他 React 自带的 input 属性 | any                        | -        |
