---
title: Dropdown 下拉菜单
nav:
  order: 2
  title: 组件
group:
  title: 功能组件
  order: 2
---

# Dropdown 下拉菜单

## 定义

向下弹出的列表。当页面上的操作命令过多时，用此组件可以收纳操作元素。点击或移入触点，会出现一个下拉菜单。可在列表中进行选择，并执行相应的命令。

- 用于收罗一组命令操作。
- Select 用于选择，而 Dropdown 是命令集合。

## 代码演示

<code src='./demo/base.tsx' title='信息通知样式' />
<code src='./demo/other.tsx' title='信息通知样式' />

## 参数说明

| 参数          | 说明                                                                                                                                           | 类型             | 默认值   |
| ------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- | ---------------- | -------- |
| **placement** | 气泡框位置, 可选 `top` `left` `right` `bottom` `topLeft` `topRight` `bottomLeft` `bottomRight` `leftTop` `leftBottom` `rightTop` `rightBottom` | string           | `bottom` |
| **trigger**   | 触发行为，可选 hover,focus,click,contextMenu                                                                                                   | string\|string[] | `click`  |

更多参数参考[Tooltip](/components/basic/tooltip)
