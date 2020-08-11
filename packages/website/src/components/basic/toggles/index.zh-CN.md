---
title: Toggles 开关
nav:
  order: 3
  title: 组件
group:
  title: 基础组件
---

# Toggles 开关

- 表示两种相互对立的状态间的切换，多用于触发「开/关」。


## 代码演示

### 基础用法

<code src='./demo/toggles.tsx' title='基础用法' desc='最简单的用法' />

<code src='./demo/togglesDisabled.tsx' title='不可用' desc='Toggles失效状态' />

<code src='./demo/togglesSuffix.tsx' title='文字' desc='带有文字' />

<code src='./demo/togglesBackgroundColor.tsx' title='背景色' desc='可以修改背景色' />

<code src='./demo/togglesActiveValue.tsx' title='选中值' desc='可以自定义打开，关闭返回的值' />

## API

### Switch

| 参数           | 说明                  | 类型             | 默认值  |
| -------------- | --------------------- | ---------------- | ------- |
| defaultChecked | 初始是否选中          | boolean          | false   |
| disabled       | 失效状态              | boolean          | false   |
| className      | 自定义 className      | string           | -       |
| activeColor    | switch 打开时的背景色 | string           | #3867f4 |
| inactiveColor  | switch 关闭时的背景色 | string           | #ffffff |
| suffixContent  | switch 的文字描述     | boolean          | false   |
| activeValue    | 选中时的内容          | string \| number | -       |
| inactiveValue  | 未选中时的内容        | string \| number | -       |

### 方法

| 名称     | 描述           |
| -------- | -------------- |
| onChange | 变化时回调函数 |
