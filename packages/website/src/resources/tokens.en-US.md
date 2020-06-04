---
title: Design Tokens
nav:
  order: 3
---

# Design Tokens
Design tokens are the visual design atoms of the design system — specifically, they are named entities that store visual design attributes. We use them in place of hard-coded values (such as hex values for color or pixel values for spacing) in order to maintain a scalable and consistent visual system for UI development.

## List of Tokens
<code src="./tokenDemos/tokens.tsx" inline />

## Usage
You need to install `@gio-design/tokens` package:
```bash
npm install --save @gio-design/tokens
```

Use in Less:
```less
@import '~@gio-design/tokens/dist/tokens.less';

h1 {
  background-color: @color-primary;
}
```

Use in JavaScript:
```javascript
import * as tokens from '@gio-design/tokens';

let color = tokens.colorPrimary;
```
