# Icon

## Usage

```
import Icon from '@gio-design/icon';

...
<Icon type='android' />
...
```

## Develop

将 svg 文件保存到 assets 的子目录中，子目录名即分类名，svg 文件名即 Icon 的 type
执行 `yarn build:icon`

`script/gen-list.js` 用于生成 icon 列表在文档中展示