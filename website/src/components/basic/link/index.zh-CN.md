---
title: Link 链接
nav:
  order: 2
  title: 组件
group:
  title: 基础组件
  order: 1
---

# Link 链接

用于表示当前内容可进行页面跳转

## 代码演示

<code src='./demos/link.tsx' title='默认形式' desc='默认使用 a 标签作为组件' />

<code src='./demos/customLink.tsx' title=' 自定义组件' desc=' 可以 `component` props 来自定义组件' />

## API

| 参数      | 说明                                  | 类型                | 默认值 |
| --------- | ------------------------------------- | ------------------- | ------ |
| to        | 跳转目标链接                          | string              | -      |
| component | 自定义 Link 根元素使用的组件          | React.ElementType   | 'a'    |
| disabled  | 失效状态                              | boolean             | false  |
| className | 自定义 className                      | string              | -      |
| prefixCls | 替代 Link 组件 class 的 gio-link 前缀 | string              | -      |
| style     | 自定义组件根元素的样式                | React.CSSProperties | -      |
