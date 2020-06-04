---
title: Icon 图标
nav:
  order: 3
  title: 资源
---

# Icon 图标
语义化的矢量图形。使用图标组件，你需要安装 `@gio-design/icon` 图标组件包：
```bash
npm install --save @gio-design/icon
```

## 图表列表
<code src="./iconDemos/list.tsx" inline />

## 代码演示
<code src="./iconDemos/basic.tsx" title="基本用法" desc="使用 `Icon` 标签声明组件，指定图标对应的 `type` 属性。" />
<code src="./iconDemos/color.tsx" title="多色图标" desc="可以通过 `color` 属性来设置图标颜色。" />
<code src="./iconDemos/size.tsx" title="图标大小" desc="可以通过 `size` 属性来设置图标大小。" />

## 参数说明
| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| type | 图标类型。遵循图标的命名规范 | string | - | - |
| color | 设置图标的颜色 | string | - | - |
| size | 设置图标的大小 | number \| `small` \| `normal` \| `middle` \| `large` \| `huge` \| `mediumLarge` | `normal` | - |
