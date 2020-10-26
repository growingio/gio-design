---
title: Grid 栅格
nav:
  order: 2
  title: 组件
group:
  title: 基础组件
  order: 1
---

# Grid 栅格

## 何时使用

需要用户输入表单域内容时

## 代码演示

### 基础用法

`Grid` 采用 `flexbox` 进行布局，一共分成 12 个栅格

<code src='./demo/base.tsx' title='基础用法' />

`Grid` 可以多层嵌套使用

<code src='./demo/nested.tsx' title='嵌套使用' />

### 间距

`Grid` 可以设置子元素的间距，1 个单位 = `8px`。默认情况下子元素与容器存在间距。

<code src='./demo/gap.tsx' title='间距' />

间距合并后，子元素与容器元素的间距消失<sup>[1](#注意：)</sup>。

<code src='./demo/collapse.tsx' title='间距合并' />

### flex 属性

`Grid` 提供了大部分 `flex` 属性映射的配置项

<code src='./demo/flex.tsx' title='flex 属性' />

## API

### Grid 

| 参数                            | 说明                                       | 类型                                                                                          | 默认值       |
| ------------------------------- | ------------------------------------------ | --------------------------------------------------------------------------------------------- | ------------ |
| prefixCls                       | className 前缀                             | `string`                                                                                      | -            |
| component                       | 根元素的组件                               | `ReactType`                                                                                   | 'div'        |
| direction                       | flex-direction 映射                        | 'row' \| 'row-reverse' \| 'column' \| 'column-reverse'                                        | 'row'        |
| justify                         | justify-content 映射                       | 'flex-start' \| 'center' \| 'flex-end' \| 'space-between' \| 'space-around' \| 'space-evenly' | -            |
| alignItems                      | align-items 映射                           | 'flex-start' \| 'center' \| 'flex-end' \| 'stretch' \| 'baseline'                             | 'flex-start' |
| alignContent                    | align-conent 映射                          | 'stretch' \| 'center' \| 'flex-start' \| 'flex-end' \| 'space-between' \| 'space-around';     | -            |
| wrap                            | flex-wrap 映射                             | 'nowrap' \| 'wrap' \| 'wrap-reverse'                                                          | 'wrap'       |
| span                            | 宽度，1 个单位=`8px`                       | `number`                                                                                      | -            |
| gap                             | 子元素的间距，可能为 css-grid `gap` 的映射 | `number` \| `string`                                                                          | -            |
| container                       | 是否设置为容器元素，宽度为 100%            | `boolean`                                                                                     | `false`      |
| collapse<sup>[1](#注意：)</sup> | 合并 gap                                   | `boolean`                                                                                     | `false`      |

## 注意：

[1]collapse：此功能仅在设置了 `container` 且浏览器支持 [`gap`](https://caniuse.com/?search=gap) 属性的情况下生效。嵌套使用不会继承。
