---
title: Icon 图标
nav:
  order: 3
  title: 资源
---

# Icon 图标

语义化的矢量图形。使用图标组件，你需要安装 `@gio-design/icons` 图标组件包：

```bash
npm install --save @gio-design/icons
```

或者使用 `yarn`：

```bash
yarn add @gio-design/icons
```

## 图标列表

<code src="./iconDemos/index.tsx" inline />

## 代码演示

<code src="./iconDemos/basic.tsx" title="基本用法" desc="通过 `@gio-design/icons` 引用图标组件。使用 `color` 来改变颜色，设置 `rotating` 让图标旋转。" />

<code src="./iconDemos/size.tsx" title="改变大小" desc="通过 `size` 来控制图标大小。" />

## 参数说明

| 参数      | 说明                         | 类型                  | 默认值 | 版本 |
| --------- | ---------------------------- | --------------------- | ------ | ---- |
| className | 设置图标的样式名             | string                | -      |      |
| style     | 设置图标的样式               | CSSProperties         | -      |      |
| rotating  | 是否有旋转动画               | boolean               | false  |      |
| color     | 图标颜色（仅适用于填充图标） | string (十六进制颜色) | -      |      |
| size      | 图标大小                     | string (带单位)       | `1rem` |      |
| onClick   | 点击图标时的回调             | `(event) => void`     | -      |      |
