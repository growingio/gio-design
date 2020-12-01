---
title: Menu 导航菜单
nav:
  order: 2
  title: 组件
group:
  title: 基础组件
  order: 1
---

# Menu 导航菜单

提供平级的区域将大块内容进行收纳和展现，保持界面整洁、层级清晰。

## 代码演示

<code src='./demos/horizontal.tsx' title='水平方向的 Menu（主导航）' desc='对功能级别的模块进行分类和归纳，使用户可以直观找到所需要的功能。' />

<code src='./demos/vertical.tsx' title='垂直方向的 Menu（侧导航）' desc='分为一、二级分类，一级分类用于对功能的分类，不可点击；二级分类为功能的入口，使用户可以直观找到所需要的功能，单击后展开该功能的一级页面。' />

## API

### Menu

| 参数               | 说明                                    | 类型                                         | 默认值       |
| ------------------ | --------------------------------------- | -------------------------------------------- | ------------ |
| mode               | Menu 的方向                             | `vertical` \| `horizontal`                   | `horizontal` |
| selectedKey        | 当前选中的 MenuItem 的 key              | string                                       | -            |
| defaultSelectedKey | 默认选中的 MenuItem                     | string                                       | -            |
| onClick            | 点击 MenuItem 时触发的回调              | `function({ item, key, keyPath, domEvent })` | -            |
| className          | 自定义 className                        | string                                       | -            |
| prefixCls          | 替代 Menu 组件 class 的 gio-menu 前缀   | string                                       | -            |
| verticalIndent     | 垂直模式时 SubMenu 以及 Menu 的缩进距离 | number                                       | 16           |

### MenuItem

| 参数      | 说明                      | 类型                                                     | 默认值 |
| --------- | ------------------------- | -------------------------------------------------------- | ------ |
| key       | MenuItem 的唯一 key       | string                                                   | -      |
| icon      | 放置于 children 前的 icon | `React.ReactNode` \| `((props: any) => React.ReactNode)` | -      |
| disabled  | 是否禁用                  | boolean                                                  | false  |
| className | 自定义 className          | string                                                   | -      |

### SubMenu

| 参数      | 说明                            | 类型                                                     | 默认值 |
| --------- | ------------------------------- | -------------------------------------------------------- | ------ |
| key       | **「必填」**MenuItem 的唯一 key | string                                                   | -      |
| children  | 子 MenuItem                     | `Array<MenuItem>` \| `Array<SubMenu>`                    | -      |
| icon      | 放置于 SubMenu title 前的 icon  | `React.ReactNode` \| `((props: any) => React.ReactNode)` | -      |
| disabled  | 是否禁用                        | boolean                                                  | false  |
| className | 自定义 className                | string                                                   | -      |

更多 props 请参考 [rc-menu](https://github.com/react-component/menu/blob/master/README.md)

注：当前 gio-design Menu 组件并未实现对 rc-menu 所有 props 的支持，且有部分覆写。
