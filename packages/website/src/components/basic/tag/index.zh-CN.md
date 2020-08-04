---
title: Tag 标签
nav:
  order: 2
  title: 组件
group:
  title: 基础组件
  order: 8
---

# Tag 标签

## 基本用法

<code src='./demos/basic.tsx' title='基础标记' desc='用于常规的标记。' />
<code src='./demos/prorupt.tsx' title='突出标记' desc='当状态信息需要特别显示出来时。' />
<code src='./demos/version.tsx' title='版本信息' />

## 可关闭的标签

<code src='./demos/closable.tsx' title='可关闭的' />
<code src='./demos/hoverClose.tsx' title='hover显示可关闭' />

## 参数说明

### Checkbox

| 参数             | 说明                      | 类型                                                             | 默认值   |
| ---------------- | ------------------------- | ---------------------------------------------------------------- | -------- |
| type             | 类型                      | `TagType` : `normal`, `prorupt`, `large`                         | `normal` |
| status           | 状态                      | `TagStatus` : `success`, `warning`, `error`， `offline`, `draft` | -        |
| color            | 预定义的颜色搭配          | `TagColor` : `beta`, `new`, `grayscale`, `blue`                  | -        |
| disabled         | 失效                      | `boolean`                                                        | false    |
| closable         | 显示可关闭图标            | `boolean`                                                        | false    |
| persistCloseIcon | 关闭图标是否由 hover 触发 | `boolean`                                                        | true     |
| onClose          | 点击关闭图标的回调        | `(event) => void`                                                | -        |
