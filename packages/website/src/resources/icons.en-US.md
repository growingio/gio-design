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

or using with `yarn`:

```bash
yarn add @gio-design/icons
```

## List of icons

<code src="./iconDemos/index.tsx" inline />

## Examples

<code src="./iconDemos/basic.tsx" title="Basic Usage" desc="Import some icon from `@gio-design/icons`. Set icon's color with `color`, rotate icon with `rotating`." />

<code src="./iconDemos/size.tsx" title="Size of Icon" desc="Set icon's size with `size`." />

## Parameters

| Property  | Description                             | Type               | Default | Version |
| --------- | --------------------------------------- | ------------------ | ------- | ------- |
| className | The className of Icon                   | string             | -       |         |
| style     | The style properties of Icon            | CSSProperties      | -       |         |
| rotating  | Rotate icon with animation              | boolean            | false   |         |
| color     | The color of Icon                       | string (hex color) | -       |         |
| size      | The size of Icon                        | string (with unit) | `1rem`  |         |
| onClick   | Set the handler to handle `click` event | `(event) => void`  | -       |         |
