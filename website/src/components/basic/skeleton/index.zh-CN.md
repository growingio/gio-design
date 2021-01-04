---
title: Skeleton 骨架图
nav:
  order: 2
  title: 组件
group:
  title: 基础组件
  order: 1
---

# Skeleton 骨架图

在需要等待加载内容的位置提供一个占位图形组合。

1. 网络较慢，需要长时间等待加载处理的情况下。
2. 图文信息内容较多的列表/卡片中。
3. 只在第一次加载数据的时候使用。
4. 可以被 loading 完全代替，但是在可用的场景下可以比 loading 提供更好的视觉效果和用户体验。

## 代码演示

<code src='./demos/base.tsx' title='基础' desc='最简单的占位效果。' />
<code src='./demos/contain.tsx' title='包含子组件' desc='加载占位图包含子组件。' />
<code src='./demos/image.tsx' title='图片' desc='图片占位。' />

## 参数说明

### Skeleton

| 参数      | 说明                               | 类型                       | 默认值 |
| --------- | ---------------------------------- | -------------------------- | ------ |
| prefixCls | 替代组件的类前缀                   | string                     | -      |
| delay     | 延迟显示加载效果的时间（防止闪烁） | number(ms)                 | 0      |
| loading   | 是否为加载中状态                   | boolean                    | true   |
| children  | 设置被包裹的元素                   | ReactNode                  | -      |
| active    | 是否展示动画效果                   | boolean                    | true   |
| avatar    | 是否显示头像占位图                 | boolean \| { size: string} | false  |
| paragraph | 是否显示段落占位图                 | boolean \| { row: number}  | true   |
| title     | 是否显示标题占位图                 | boolean                    | ture   |

### Skeleton.Image

| 参数      | 说明                                   | 类型       | 默认值  |
| --------- | -------------------------------------- | ---------- | ------- |
| prefixCls | 替代组件的类前缀                       | string     | -       |
| delay     | 延迟显示加载效果的时间（防止闪烁）     | number(ms) | 0       |
| loading   | 是否为加载中状态                       | boolean    | true    |
| children  | 设置被包裹的元素                       | ReactNode  | -       |
| width     | 设置骨架图片的宽度（高度会等比例变化） | number     | 200     |
| color     | 设置占位图的颜色                       | string     | #DBDEE8 |
