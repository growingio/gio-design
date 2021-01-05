---
title: ConfigProvider 全局配置
nav:
  order: 2
  title: 组件
group:
  title: 其他
  order: 3
---

# ConfigProvider 全局配置

> 为组件提供统一的全局化配置。

## 使用

ConfigProvider 使用 React 的 context 特性，只需在应用外围包裹一次即可全局生效。

```js
import { ConfigProvider, Button } from '@gio-design/components';

// ...

export default () => (
  <ConfigProvider value={{ rootPrefixCls: 'custom-prefix' }}>
    <div>
      <Button>Use ConfigProvider</Button>
    </div>
  </ConfigProvider>
);
```

## 类名前缀替换

在 ConfigProvider 中使用 rootPrefixCls 进行组件类名前缀替换后，所有原先子组件的 className 中的 `gio-` 前缀将被替换为自定义前缀。

为了保证在替换 `rootPrefixCls` 后原有组件样式不失效，需要在项目中修改 less 变量 `@component-prefix` 为对应前缀。该替换有两种方式：

### 一般方式替换

在项目 root less 文件中进行替换

```less
@component-prefix: 'custom-prefix';
```

### webpack 配置替换

```js
// webpack.config.js
{
  loader: 'less-loader',
  options: {
    lessOptions:{
      javascriptEnabled: true,
        modifyVars: {
          "@component-prefix": "custom-prefix",
        },
    }
  },
}
```

## API

| 参数          | 说明                                                              | 类型   | 默认值 |
| ------------- | ----------------------------------------------------------------- | ------ | ------ |
| rootPrefixCls | 设置统一样式前缀。注意：需要配合 less 变量 @component-prefix 使用 | string | `gio`  |
