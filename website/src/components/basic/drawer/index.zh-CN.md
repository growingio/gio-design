---
title: Drawer 抽屉
nav:
  order: 2
  title: 组件
group:
  title: 基础组件
  order: 1
---

屏幕边缘滑出的浮层面板。

## 何时使用

抽屉从父窗体边缘滑入，覆盖住部分父窗体内容。用户在抽屉内操作时不必离开当前任务，操作完成后，可以平滑地回到到原任务。

- 当需要一个附加的面板来控制父窗体内容，这个面板在需要时呼出。比如，控制界面展示样式，往界面中添加内容。
- 当需要在当前任务流中插入临时任务，创建或预览附加内容。比如展示协议条款，创建子对象。

## 代码演示

<code src='./demo/index.tsx' title='基础用法' />

<code src='./demo/customPosition.tsx' title='自定义位置' />

## API

| 参数               | 说明                                                                             | 类型                                                   | 默认值               |
| ------------------ | -------------------------------------------------------------------------------- | ------------------------------------------------------ | -------------------- |
| closable           | 是否显示右上角的关闭按钮                                                         | boolean                                                | true                 |
| closeIcon          | 自定义关闭图标                                                                   | ReactNode                                              | &lt;CloseOutlined /> |
| destroyOnClose     | 关闭时销毁 Drawer 里的子元素                                                     | boolean                                                | false                |
| forceRender        | 预渲染 Drawer 内元素                                                             | boolean                                                | false                |
| getContainer       | 指定 Drawer 挂载的 HTML 节点, false 为挂载在当前 dom                             | HTMLElement \| () => HTMLElement \| Selectors \| false | body                 |
| maskClosable       | 点击蒙层是否允许关闭                                                             | boolean                                                | true                 |
| mask               | 是否展示遮罩                                                                     | boolean                                                | true                 |
| maskStyle          | 遮罩样式                                                                         | CSSProperties                                          | {}                   |
| style              | 可用于设置 Drawer 最外层容器的样式，和 `drawerStyle` 的区别是作用节点包括 `mask` | CSSProperties                                          | -                    |
| drawerStyle        | 用于设置 Drawer 弹出层的样式                                                     | CSSProperties                                          | -                    |
| headerStyle        | 用于设置 Drawer 头部的样式                                                       | CSSProperties                                          | -                    |
| bodyStyle          | 可用于设置 Drawer 内容部分的样式                                                 | CSSProperties                                          | -                    |
| title              | 标题                                                                             | string \| ReactNode                                    | -                    |
| visible            | Drawer 是否可见                                                                  | boolean                                                | -                    |
| width              | 宽度                                                                             | string \| number                                       | 480                  |
| height             | 高度, 在 `placement` 为 `top` 或 `bottom` 时使用                                 | string \| number                                       | 256                  |
| className          | 对话框外层容器的类名                                                             | string                                                 | -                    |
| zIndex             | 设置 Drawer 的 `z-index`                                                         | number                                                 | 100000               |
| placement          | 抽屉的方向                                                                       | `top` \| `right` \| `bottom` \| `left`                 | `right`              |
| onClose            | 点击遮罩层或右上角叉或取消按钮的回调                                             | function(e)                                            | -                    |
| afterVisibleChange | 切换抽屉时动画结束后的回调                                                       | function(visible)                                      | -                    |
| keyboard           | 是否支持键盘 esc 关闭                                                            | boolean                                                | true                 |
| footer             | 抽屉的页脚                                                                       | ReactNode                                              | -                    |
| footerStyle        | 抽屉页脚部件的样式                                                               | CSSProperties                                          | -                    |
| push               | 用于设置多层 Drawer 的推动行为                                                   | boolean \| { distance: string \| number }              | { distance: 180 }    |
