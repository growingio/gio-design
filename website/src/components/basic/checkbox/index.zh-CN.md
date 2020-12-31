---
title: Checkbox 多选框
nav:
  order: 2
  title: 组件
group:
  title: 基础组件
  order: 1
---

# Checkbox 多选框

<code src='./demo/basic.tsx' title='基础用法' />

<code src='./demo/hoz-group.tsx' title='纵向排列' />

<code src='./demo/vertical-group.tsx' title='横向排列' />

<code src='./demo/partial.tsx' title='部分选中' />

<code src='./demo/group.tsx' title='CheckboxGroup' desc="整体禁止，内部自维护数据，外部传入"/>

<code src='./demo/number-item-group.tsx' title='数字类型的值' />

## 参数说明

### Checkbox

| 参数           | 说明                                    | 类型              | 默认值 |
| -------------- | --------------------------------------- | ----------------- | ------ |
| autoFocus      | 自动获取焦点                            | boolean           | false  |
| checked        | 指定当前是否选中                        | boolean           | false  |
| defaultChecked | 初始是否选中                            | boolean           | false  |
| disabled       | 失效状态                                | boolean           | false  |
| indeterminate  | 设置 indeterminate 状态，只负责样式控制 | boolean           | false  |
| onChange       | 变化时回调函数                          | Function(e:Event) | -      |
| className      | 自定义 className                        | string            | -      |  |
| id             | input[type="checkbox"] 的 name 属性     | string            | -      |  |
| name           | input[type="checkbox"] 的 name 属性     | string            | -      |  |

### Checkbox Group

| 参数         | 说明                                                         | 类型                               | 默认值     |
| ------------ | ------------------------------------------------------------ | ---------------------------------- | ---------- |
| defaultValue | 默认选中的选项                                               | string\[]                          | \[]        |
| disabled     | 整组失效                                                     | boolean                            | false      |  |
| name         | CheckboxGroup 下所有 `input[type="checkbox"]` 的 `name` 属性 | string                             | -          |
| options      | 指定可选项                                                   | string\[] \| CheckboxOptionType\[] | \[]        |
| value        | 指定选中的选项                                               | string\[]                          | \[]        |
| onChange     | 变化时回调函数                                               | Function(checkedValue)             | -          |
| direction    | 排列的方向                                                   | vertical \| horizontal             | horizontal |

##### Option

```typescript
interface CheckboxOptionType {
  label: string;
  value: string;
  disabled?: boolean;
}
```
