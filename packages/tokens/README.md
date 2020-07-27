# GrowingIO Design System Tokens

Design tokens are the visual design atoms of the design system — specifically, they are named entities that store visual design attributes. We use them in place of hard-coded values (such as hex values for color or pixel values for spacing) in order to maintain a scalable and consistent visual system for UI development.

## How it works

All of the style properties and assets are in this package. Make any changes to suit your needs.

To build package, run

```
$ cd gio-design
$ yarn workspace @gio-design/tokens build
```

The npm build task is what performs the style dictionary build steps to generate the files for each platform. Every time you change something in the style dictionary, like changing colors or adding properties, you will have to run this command again to generate the files.
