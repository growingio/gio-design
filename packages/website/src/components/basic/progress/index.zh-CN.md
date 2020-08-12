---
title: Progress 进度条
nav:
  order: 2
  title: 组件
group:
  title: 基础组件
---

# Progress 进度条

## 定义

展示操作的当前进度。

## 样式

<code src='./demos/index.tsx' title='基本用法'>

## 参数说明

### Progress

| 参数               | 说明                                  | 类型     | 默认值                                   |
| ------------------ | ------------------------------------- | -------- | ---------------------------------------- |
| percent            | 百分比                                | `number` |                                          |
| status             | 可选 `active`, `success`, `expection` | `string` |                                          |
| format             | 内容模版函数                          |          | `(percent?: number) => React.ReactNode;` |
| customizePrefixCls |                                       |          |                                          |
