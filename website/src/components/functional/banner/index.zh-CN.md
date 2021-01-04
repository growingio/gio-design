---
title: Banner 横幅
nav:
  order: 2
  title: 组件
group:
  title: 功能组件
  order: 2
---

# Banner 横幅

## 何时使用

将重要的信息通知到用户，例如：线下活动报名，系统维护等通知。

## 代码演示



<code src='./demo/base.tsx' title='信息通知样式' />

<code src='./demo/alert.tsx' title='警示通知样式' />

<code src='./demo/closeable.tsx' title='无法关闭的样式' />

## 参数说明

### Banner

| 参数               | 说明                       | 类型                                  | 默认值     |
| ------------------ | -------------------------- | ------------------------------------- | ---------- |
| **type**           | 横幅的类型         | `'normal', 'alert'` | `normal`  |
| **closeable**      | 是否可以关闭              | `boolean`                              | `true`       |
| **content**        | 横幅内的内容           | `'string', 'ReactNode'`                |     |
| **prefixCls**      | 自定义 css 类前缀          | `string`                              |            |
| **onClose** | 点击关闭横幅的回掉函数      | `() => void`                             |   |
| **className**      | 自定义混入 css 类          | `string`                              |            |
| **button**       | 横幅内自定义button     | `ReactNode`                              |            |


