---
title: Tabs 标签页
nav:
  order: 2
  title: 组件
group:
  title: 基础组件
  order: 1
---

# Tabs 标签页

## 定义

提供平级的区域将大块内容进行收纳和展现，保持界面整洁、层级清晰。

## 样式 - 块

<code src='./demo/block.tsx' title='样式 - 块' desc='自适应文字大小'>
<code src='./demo/blockSize.tsx' desc='尺寸分为大（高度40px）、中（高度36px）、小（高度30px）。'>
<code src='./demo/icon.tsx' desc='可以为icon，支持Dropdown（Dropdown组件设计好再添加）'>

## 样式 - 线

<code src='./demo/line.tsx' title='样式 - 线' desc='提供平级的区域将大块内容进行收纳和展现，保持界面整洁、层级清晰。'>
<code src='./demo/lineSize.tsx' desc='尺寸分为大（高度40px）、中（高度36px）、小（高度30px）。'>

## 参数说明

### Tabs

| 参数           | 说明             | 类型                       | 默认值  |
| -------------- | ---------------- | -------------------------- | ------- |
| **type**       | 标签页样式       | 'line'\|'block'            | `block` |
| **size**       | 设置头像的链接   | 'small'\|'middle'\|'large' | `large` |
| **onChange**   | 切换面板的回调   | Function(activeKey) {}     |         |
| **onTabClick** | tab 被点击的回调 | Function                   |         |
| **children**   | 标签面板组件     | TabPane[]                  |         |

### TabPane

| 参数         | 说明             | 类型              | 默认值  |
| ------------ | ---------------- | ----------------- | ------- |
| **tab**      | 选项卡头显示文字 | string\|ReactNode |         |
| **disabled** | 选项卡禁用       | boolean           | `false` |
| **type**     | 用 Icon 显示     | string            |         |
