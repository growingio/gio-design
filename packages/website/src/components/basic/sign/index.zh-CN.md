---
title: Sign 标记
nav:
  order: 2
  title: 组件
group:
  title: 基础组件
---

# Sign 标记

组件右上角的徽标。

## 代码演示

<code src='./demos/sign.tsx' title='基本' desc='最基本常用的 Sign 组件，当 `count` 为 0 时默认不显示 Sign，可用 `showZero` 进行开关。' />

<code src='./demos/showZero.tsx' title='count 为 0' desc='通过 `showZero` prop 控制 `count` 为 0 时是否显示 Sign 标记。' />

<code src='./demos/dot.tsx' title='圆点' desc='不使用数字，可选用不同的颜色标记状态，绿色表示正常、黄色表示警告、红色表示错误、灰色表示不可用。' />

<code src='./demos/dotSize.tsx' title='不同尺寸的红点' desc='红点分为默认的 `middle` 尺寸和 `small` 尺寸。`small` 尺寸用于更新提示。' />

## API

### 通用 Props

| 参数      | 说明                                  | 类型                                                                                               | 默认值     |
| --------- | ------------------------------------- | -------------------------------------------------------------------------------------------------- | ---------- |
| variant   | Sign 的类型                           | `dot` \| `number`                                                                                  | `number`   |
| className | 自定义 className                      | string                                                                                             | -          |
| prefixCls | 替代 Sign 组件 class 的 gio-sign 前缀 | string                                                                                             | -          |
| style     | 自定义内联样式                        | CSSProperties                                                                                      | -          |
| visible   | 是否保持可见                          | boolean                                                                                            | true       |
| placement | Sign 出现的位置                       | `top` \| `right` \| `bottom` \| `left` \| `rightTop` \| `rightBottom` \| `leftTop` \| `leftBottom` | `rightTop` |

### variant='number'时生效的 Props

| 参数      | 说明                                   | 类型             | 默认值 |
| --------- | -------------------------------------- | ---------------- | ------ |
| count     | Sign 中显示的数字                      | number           | 0      |
| showZero  | 当 count 为 0 时是否显示 Sign          | boolean          | false  |
| magnitude | Sign 中数字最大数量级                  | 10 \| 100        | 100    |
| offset    | 设置状态点的位置偏移,格式为[left, top] | [number, number] | [0, 0] |

### variant='dot'时生效的 Props

| 参数   | 说明     | 类型                                                        | 默认值    |
| ------ | -------- | ----------------------------------------------------------- | --------- |
| status | 圆点状态 | `default` \| `normal` \| `warning` \| `error` \| `disabled` | `default` |
| size   | 圆点大小 | `middle` \| `small`                                         | `middle`  |
