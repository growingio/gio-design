---
title: Breadcrumb 面包屑
nav:
  order: 2
  title: 组件
group:
  title: 基础组件
  order: 1
---

# Breadcrumb 面包屑

<code src='./demo/basic.tsx' title='配置 routes' />

## 参数说明

### Breadcrumb

| 参数       | 说明                                     | 类型                                        | 默认值 |
| ---------- | ---------------------------------------- | ------------------------------------------- | ------ |
| routes     | router 的路由栈信息                      | routes[]                                    | -      |
| params     | 路由的参数                               | object                                      | -      |
| separator  | 分隔符自定义                             | string                                      | '/'    |
| itemRender | 自定义链接函数，和 react-router 配置使用 | (route, params, routes, paths) => ReactNode | -      |

### Breadcrumb.Item

| 参数       | 说明                | 类型                 | 默认值 |
| ---------- | ------------------- | -------------------- | ------ |
| separator  | 分隔符自定义        | string               | '/'    |
| onClick    | 单击事件            | (e:MouseEvent)=>void | -      |
| href       | 链接的目的地        | string               | -      |
| isLastItem | 是否为最后一个 item | boolean              | false  |

##### Option

```typescript
interface Route {
  path: string;
  breadcrumbName: string;
}
```
