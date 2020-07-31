---
title: Design Token 设计变量
nav:
  order: 3
  title: 资源
---

# 设计变量

设计变量是设计系统中的视觉设计原子。它们是一组有着统一命名规则的实体，用于存储视觉设计部分的具体参数，比如 HEX 色值、间距、尺寸的像素等。使用它可以有帮助为 UI 开发工作维护一套具备可扩展性、一致性的视觉体系。

## 变量列表

<code src="./tokenDemos/tokens.tsx" inline />

## 使用方法

你需要安装 `@gio-design/tokens` 组件包：

```bash
npm install --save @gio-design/tokens
```

或者使用 `yarn` ：

```bash
yarn add @gio-design/tokens
```

在 Less 中使用：

```less
@import '~@gio-design/tokens/dist/variables.less';

h1 {
  background-color: @palette-blue-7;
}
```

在 JavaScript 中使用：

```javascript
import * as tokens from '@gio-design/tokens';

let color = tokens.PaletteBlue7;
```
