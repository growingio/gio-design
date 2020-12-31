---
title: Design Token
nav:
  order: 3
---

# Design Token

Design tokens are the visual design atoms of the design system — specifically, they are named entities that store visual design attributes. We use them in place of hard-coded values (such as hex values for color or pixel values for spacing) in order to maintain a scalable and consistent visual system for UI development.

## Usage

You need to install `@gio-design/tokens` package:

```bash
npm install --save @gio-design/tokens
```

Use in Less:

```less
@import '~@gio-design/tokens/dist/variables.less';

h1 {
  background-color: @palette-blue-7;
}
```

Use in JavaScript:

```javascript
import * as tokens from '@gio-design/tokens';

const color = tokens.PaletteBlue7;
```

## List of Tokens

### Background Color

<code src="./tokenDemos/backgroundTable.tsx" inline />

### Text Color

<code src="./tokenDemos/textColorTable.tsx" inline />

### Border Color

<code src="./tokenDemos/borderColorTable.tsx" inline />

### Border Radius

<code src="./tokenDemos/borderRadiusTable.tsx" inline />

### Shadow

<code src="./tokenDemos/shadowTable.tsx" inline />

### Font Family

<code src="./tokenDemos/fontFamilyTable.tsx" inline />

### Font Size

<code src="./tokenDemos/fontSizeTable.tsx" inline />

### Font Weight

<code src="./tokenDemos/fontWeightTable.tsx" inline />

### Spacing Size

<code src="./tokenDemos/spacingSizeTable.tsx" inline />

### Palette

<code src="./tokenDemos/paletteTable.tsx" inline />
