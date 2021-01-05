---
title: Popconfirm 气泡确认框
nav:
  order: 2
  title: 组件
group:
  title: 功能组件
  order: 2
---

# Popconfirm 气泡确认框

点击元素，弹出气泡式的确认框。目标元素的操作需要用户进一步的确认时，在目标元素附近弹出浮层提示，询问用户。

## 代码演示

<code src='./demo/base.tsx' title='基本' desc='当有描述时，宽度为400px。当无描述时宽度为260px' >
<code src='./demo/placement.tsx' title='基本' desc='位置有十二个方向。如需箭头指向目标元素中心，可以设置 arrowPointAtCenter。' >
<code src='./demo/visible.tsx' title='条件触发' desc='可以控制visible属性达到控制确认框是否显示的目的。' >

## 参数说明

| 参数           | 说明                 | 类型        | 默认值  |
| -------------- | -------------------- | ----------- | ------- |
| **title**      | 确认框的主题         | string      |         |
| **desc**       | 确认框的描述         | string      |         |
| **onCancel**   | 点击取消的回调       | function(e) |         |
| **onConfirm**  | 点击确认的回调       | function(e) |         |
| **okText**     | 确认按钮文字         | string      | '确认'  |
| **cancelText** | 取消按钮文字         | string      | '取消'  |
| **disabled**   | 禁止确认框弹出       | string      | false   |
| **icon**       | 替换 title 前的 icon | ReactNode   | Warning |

更多参数参考[Tooltip](/components/basic/tooltip)
