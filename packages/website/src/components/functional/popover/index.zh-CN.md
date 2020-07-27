---
title: Popover 气泡卡片
nav:
  order: 2
  title: 组件
group:
  title: 功能组件
  order: 2
---

# Popover 气泡卡片

鼠标悬浮或者点击后弹出气泡式的卡片浮层。和 Tooltip 的区别是，用户可以对浮层上的元素进行操作，因此它可以承载更复杂的内容，比如链接或按钮等。

## 代码演示

<code src='./demo/base.tsx' title='基本' desc='最简单的用法，浮层的大小由内容区域决定。' >

<code src='./demo/click.tsx' title='click触发'>

<code src='./demo/arrow.tsx' title='箭头指向' desc='设置了 arrowPointAtCenter 后，箭头将指向目标元素的中心。' >

<code src='./demo/placement.tsx' title='位置' desc='位置有12个方向，通过 placement 进行设置' >

## 参数说明

| 参数            | 说明         | 类型                         | 默认值 |
| --------------- | ------------ | ---------------------------- | ------ |
| **contentArea** | 卡片内容区域 | ReactNode \| () => ReactNode |        |
| **footerArea**  | 卡片按钮区域 | ReactNode \| () => ReactNode |        |

更多参数参考[Tooltip](/components/basic/tooltip)
