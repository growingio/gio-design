---
title: Radio 单选框
nav:
  order: 2
  title: 组件
group:
  title: 基础组件
---

# Radio 单选框

- 用于在多个备选项中选中单个状态

- Radio 所有选项默认可见，方便用户在比较中选择，因此选项不宜过多。

## 代码演示

### 基础用法

<code src='./demos/radio.tsx' title='基本' desc='基本的Radio' />

<code src='./demos/disabledRadio.tsx' title='禁用状态' desc='禁用状态的Radio' />

### 单选组合

<code src='./demos/radioGroup.tsx' title='单选组合' desc='一组互斥的 Radio 配合使用' />

<code src='./demos/radioGroupVertical.tsx' title='Radio.Group - 垂直状态' desc='垂直的 Radio.Group' />

<code src='./demos/radioGroupMixed.tsx' title='Radio.Group - options 配置与 Radio 混合' desc='同时存在 options 与 Radio 组件混合写入' />

<code src='./demos/radioGroupFilter.tsx' title='Radio.Group - valid' desc='不合法的 options 与 Child 将会被自动剔除' />

## API

### Radio

| 参数           | 说明                                    | 类型                          | 默认值 |
| -------------- | --------------------------------------- | ----------------------------- | ------ |
| autoFocus      | 自动获取焦点                            | boolean                       | false  |
| checked        | 指定当前是否选中                        | boolean                       | false  |
| defaultChecked | 初始是否选中                            | boolean                       | false  |
| disabled       | 失效状态                                | boolean                       | false  |
| onChange       | 变化时回调函数                          | Function(e:IRadioChangeEvent) | -      |
| className      | 自定义 className                        | string                        | -      |
| prefixCls      | 替代 Radio 组件 class 的 gio-radio 前缀 | string                        | -      |
| name           | input[type="radio"] 的 name 属性        | string                        | -      |

### RadioGroup

> 在使用 RadioGroup 时可以混用 options 配置与内嵌 Radio，同时 null, undefined 以及其他类型的 DOM 与组件将被过滤。
>
> 但仍然建议以合规的方式写 options 与内嵌 Radio 组件

| 参数         | 说明                                                   | 类型                              | 默认值     |
| ------------ | ------------------------------------------------------ | --------------------------------- | ---------- |
| className    | 自定义 className                                       | string                            | -          |
| defaultValue | 默认选中的选项                                         | string                            | -          |
| disabled     | 整组失效                                               | boolean                           | false      |  |
| name         | RadioGroup 下所有 `input[type="radio"]` 的 `name` 属性 | string                            | -          |
| options      | 指定可选项                                             | string\[] \| TRadioGroupOption\[] | \[]        |
| value        | 指定选中的选项                                         | string                            | \[]        |
| onChange     | 变化时回调函数                                         | Function(checkedRadio)            | -          |
| direction    | RadioGroup 的排列方向为水平还是垂直                    | 'horizontal'                      | 'vertical' | 'horizontal' |
