---
title: Space 间距
nav:
  order: 2
  title: 组件
group:
  title: 基础组件
  order: 1
---

# Space 间距

## 定义

设置组件之间的间距。

## 代码演示

<code src='./demos/base.tsx' title='间距' desc='基础用法' />
<code src='./demos/vertical.tsx' title='间距' desc='水平方向' />
<code src='./demos/size.tsx' title='间距' desc='设置尺寸' />
<code src='./demos/custom-size.tsx' title='间距' desc='自定义尺寸' />
<code src='./demos/align.tsx' title='间距' desc='对齐方式' />

## 参数说明

### Space

| 参数      | 说明               | 类型                                       | 默认值       |
| --------- | ------------------ | ------------------------------------------ | ------------ |
| className | 自定义 className   | string                                     | -            |
| size      | 间距尺寸           | `large` \| `middle` \| `small` \| number   | `small`      |
| direction | 间距方向           | `horizontal` \| `vertical`                 | `horizontal` |
| align     | 对齐方式           | `start` \| `center` \| `end` \| `baseline` | -            |
| style     | 外层元素的样式对象 | `React.CSSProperties`                      | -            |
