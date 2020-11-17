---
title: Cascader 级联选择器
nav:
  order: 2
  title: 组件
group:
  title: 基础组件
  order: 1
---

# Cascader 级联选择器

## 基础用法

<code src='./demo/basic.tsx' title='基础用法' />

## 键名映射

<code src='./demo/key-mapping.tsx' title='键名映射' />

## 数据分组

<code src='./demo/group.tsx' title='数据分组' />

## 打开菜单的方式

<code src='./demo/triggers.tsx' title='用 click 来打开菜单' />

## 使用搜索

<code src='./demo/search.tsx' title='使用搜索' />

## 自定义渲染

<code src='./demo/custom-render.tsx' title='自定义渲染' />

可以自定制 menu-item 的渲染方式，满足不同需要

<code src='./demo/custom-input.tsx' title='自定义 input' />

自定义 input 后，title 交由用户自己管理

<code src='./demo/custom-search-bar.tsx' title='自定义 search-bar' />

自定义 search-bar 后，原生的 onSearch 方法将失效，搜索能力完成交给使用者定制

<code src='./demo/menu.tsx' title='单独渲染 menu' />

单独渲染 Menu，可以和其它组件如配合使用

## 异步获取数据

<code src='./demo/async-child-data.tsx' title='异步获取数据' />

## 参数说明

### Cascader

| 参数                 | 说明                                             | 类型                                                                                                  | 默认值  |
| -------------------- | ------------------------------------------------ | ----------------------------------------------------------------------------------------------------- | ------- |
| className            | 自定义 className                                 | string                                                                                                | -       |
| style                | 最外层样式                                       | CSSProperties                                                                                         | -       |
| dataSource           | 数据源                                           | `NodeData` [⤵️](#NodeData)                                                                            | -       |
| value                | 默认选中的菜单                                   | `Value` [⤵️](#Value)                                                                                  | -       |
| keyword              | 搜索框的字段                                     | string                                                                                                | -       |
| ignoreCase           | 忽略大小写                                       | boolean                                                                                               | -       |
| deepSearch           | 深度过滤搜索结果                                 | boolean                                                                                               | -       |
| onClick              | 点击菜单的回调                                   | (event: MouseEvent, nodeData: NodeData) => void                                                       | -       |
| trigger              | 打开菜单的方式                                   | `click` \| `hover`                                                                                    | `hover` |
| selectAny            | 是否可以选择有子节点的节点                       | boolean                                                                                               | -       |
| onTrigger            | 打开菜单的回调                                   | (event: MouseEvent \| KeyboardEvent, nodeData: NodeData) => void                                      | -       |
| beforeSelect         | 选中菜单前的回调，可以在这里动态注册子节点的数据 | (event: MouseEvent \| KeyboardEvent, nodeData: NodeData) => void \| NodeData[] \| Promise<NodeData[]> | -       |
| onSelect             | 选中菜单后的回调                                 | (nodeData: NodeData, parentsData: NodeData[]) => void                                                 | -       |
| onMouseEnter         | 菜单项的事件回调                                 | (event: MouseEvent, nodeData: NodeData) => void                                                       | -       |
| onKeyUp              | 菜单项的事件回调                                 | (event: KeyboardEvent) => void                                                                        | -       |
| onFocus              | 菜单项的事件回调                                 | (event: FocusEvent) => void                                                                           | -       |
| onBlur               | 菜单项的事件回调                                 | (event: FocusEvent) => void                                                                           | -       |
| onMouseLeave         | 菜单项的事件回调                                 | (event: MouseEvent) => void                                                                           | -       |
| onRender             | 自定义渲染菜单项的回调                           | (nodeData: NodeData) => ReactElement                                                                  | -       |
| afterInner           | 菜单项里额外的插入节点                           | ReactElement                                                                                          | -       |
| prefixCls            | className 前缀                                   | string                                                                                                | -       |
| size                 | 控件尺寸                                         | SizeType                                                                                              | -       |
| disabled             | 禁用                                             | boolean                                                                                               | -       |
| title                | 显示的文本                                       | string                                                                                                | -       |
| separator            | 多级文本的连接字符                               | string                                                                                                | `/`     |
| placeholder          | 文本点位符                                       | string                                                                                                | -       |
| input                | 文本控件                                         | ReactElement                                                                                          | -       |
| searchPlaceholder    | 搜索框点位符                                     | string                                                                                                | -       |
| lazySearch           | 懒搜索，回车触发                                 | boolean                                                                                               | -       |
| onSearch             | 搜索事件的回调                                   | (keyword: string) => void                                                                             | -       |
| visible              | 下拉面板显示与否                                 | boolean                                                                                               | -       |
| placement            | 下拉面板显示位置                                 | DropdownProps['placement']                                                                            | -       |
| overlayClassName     | 下拉面板的 className                             | string                                                                                                | -       |
| overlayStyle         | 下拉面板的样式                                   | CSSProperties                                                                                         | -       |
| onVisibleChange      | 下拉面板的显隐回调                               | (visible: boolean) => void                                                                            | -       |
| dropdownTrigger      | 触发下拉面板的方式                               | `click` \| `hover` \| `focus`                                                                         | `click` |
| getDropdownContainer | 获取下拉面板渲染到的 DOM 节点                    | (node: HTMLElement) => HTMLElement                                                                    | -       |
| header               | 菜单的头部-默认为搜索框                          | ReactElement \| false                                                                                 | -       |
| footer               | 菜单的尾部                                       | ReactElement \| false                                                                                 | -       |

### Value

```ts
type Value = string | number;
```

### NodeData

| 参数     | 说明       | 类型                 | 默认值 |
| -------- | ---------- | -------------------- | ------ |
| label    | string     | 菜单项显示的文本     | 必填   |
| value    | Value      | 菜单项的惟一标识字段 | 必填   |
| disabled | boolean    | 禁用菜单项           | -      |
| children | NodeData[] | 子菜单               | -      |
| groupId  | Value      | 分组字段             | -      |
