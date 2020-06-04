---
title: Icon
nav:
  order: 3
---

# Icon
Semantic vector graphics. Before use icons, you need to install `@gio-design/icons` package:
```bash
npm install --save @gio-design/icons
```

## List of icons
<code src="./iconDemos/list.tsx" inline />

## Examples
<code src="./iconDemos/basic.tsx" title="Basic" desc="Create a React component by using `Icon` tag，and set `type` prop." />
<code src="./iconDemos/color.tsx" title="Colorful icon" desc="Set `color` prop to specific color for icons." />
<code src="./iconDemos/size.tsx" title="Size of icon" desc="Set `size` prop to specific size of icons." />

## Parameters
| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| type | type of icon | string | - | - |
| color | color of icon | string | - | - |
| size | size of icon | number \| `small` \| `normal` \| `middle` \| `large` \| `huge` \| `mediumLarge` | `normal` | - |
