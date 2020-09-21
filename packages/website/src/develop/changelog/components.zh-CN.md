---
title: '@gio-design/components'
group:
  title: 更新日志
nav:
  order: 1
  title: 开发
---

# @gio-design/components 更新日志

- 💄 从整体设计 z-index 层级。[#205](https://github.com/growingio/gio-design/pull/205)
- Modal
  - 🐛 修复 Modal footer 设置无效问题；修复 StepModal steps 变更 stepStack 未重置问题[#207](https://github.com/growingio/gio-design/pull/207)
  - 🐛 修复分步骤弹窗组件 footer 显示逻辑。修复 steps props 变更造成崩溃的问题。修复 steps 路径不能满足某些情况的问题。[#226](https://github.com/growingio/gio-design/pull/226)
- Avatar
  - 🐛 修复 avatar 组件不能触发 Dropdown 的 bug。[#208](https://github.com/growingio/gio-design/pull/208)
- Dropdown
  - 📖 添加 Dropdown demo.[#209](https://github.com/growingio/gio-design/pull/209)
- List
  - 🐛 修复点击 checkbox 触发两次问题。[#219](https://github.com/growingio/gio-design/pull/219)
  - 🆕 新增 onSelect 和 onDeselect props。[#223](https://github.com/growingio/gio-design/pull/223)
- Select
  - 🆕 新增 Select 组件。[#221](https://github.com/growingio/gio-design/pull/221)
- Tooltip
  - 🐛 修复 tooltip 子组件 style 参数被覆盖问题.[#224](https://github.com/growingio/gio-design/pull/224)
- Checkbox
  - 💄 提升 .gio-checkbox-icon-indeterminate 样式优先级。[#228](https://github.com/growingio/gio-design/pull/227)
- Input
  - 🆕 组件 value 和 onChange 参数改为可选。[#228](https://github.com/growingio/gio-design/pull/228)
- Table
  - 🆕 更新组件 props。[#203](https://github.com/growingio/gio-design/pull/203)
- TreeSelect
  - 🆕 新增 TreeSelect 组件。[#202](https://github.com/growingio/gio-design/pull/202)
- DatePicker
  - 🆕 新增 DatePicker 组件。[#199](https://github.com/growingio/gio-design/pull/199)

## 20.9.1

- 🆕 新增 `SearchBar` 组件。[#153](https://github.com/growingio/gio-design/pull/153)
- 🆕 新增 `List` 组件。[#178](https://github.com/growingio/gio-design/pull/178)
- 🆕 `StepModal` 组件支持分支路径。[#192](https://github.com/growingio/gio-design/pull/192)
- 🐛 当 `title` 参数不应该被显示时，隐藏 `Tooltip`。[#193](https://github.com/growingio/gio-design/pull/193)
- 🐛 添加 `alert` 中 `icon` 的颜色。[#193](https://github.com/growingio/gio-design/pull/193)
- 🆕 新增 `下拉菜单` 组件。[#196](https://github.com/growingio/gio-design/pull/196)
- 🐛 为输入框新增 `forwardRef`。 [#197](https://github.com/growingio/gio-design/pull/197)
- 🐛 修正 `CheckBox` 被用于 `Table` 时”对号“不居中。 [#200](https://github.com/growingio/gio-design/pull/200)

## 20.9.0

- 🐛 更新`Table`组件，修复了一些问题。[#180](https://github.com/growingio/gio-design/pull/180)
- 🐛 `CheckBox`组件更新`props`和`text margin`。[#181](https://github.com/growingio/gio-design/pull/181)
- 🐛 更新`Modal`组件，处理`StepModal`相关问题，设置`footer`属性以及修复了一些其他问题。[#176](https://github.com/growingio/gio-design/pull/176)
- 🐛 修复了`Button`组件的一些问题。[#174](https://github.com/growingio/gio-design/pull/174)

## 20.8.6

- 🆕 新增[Banner 横幅](/components/functional/banner)组件。 [#136](https://github.com/growingio/gio-design/pull/136)
- 🆕 `加载中` 组件新增 `蒙层颜色` 参数。 [#143](https://github.com/growingio/gio-design/pull/143)
- 🐛 修复 `开关` 组件的边框半径。 [#145](https://github.com/growingio/gio-design/pull/145)

## 20.8.5

- 🆕 新增[Modal Dialog 弹窗](/components/functional/modal)组件。 [#137](https://github.com/growingio/gio-design/pull/137)
- 🆕 新增[Table 列表](/components/functional/modal)组件。 [#99](https://github.com/growingio/gio-design/pull/99)
- 🆕 新增[Upload 上传](/components/functional/modal)组件。 [#106](https://github.com/growingio/gio-design/pull/106)
- 🆕 `TabNav 标签导航`组件添加`activeKey defaultActiveKey` 参数 [#133](https://github.com/growingio/gio-design/pull/133)
- 🆕 `Tabs 标签页`组件添加`activeKey defaultActiveKey` 参数 [#134](https://github.com/growingio/gio-design/pull/134)
- 🆕 `Pagination 分页`组件添加`hideOnSinglePage` 参数 [#129](https://github.com/growingio/gio-design/pull/129)
- 🆕 `Breadcrumb 面包屑`组件重构 [#132](https://github.com/growingio/gio-design/pull/132)

## 20.8.4

- 🆕 新增[TabNav 标签导航](/components/basic/tabnav)组件。 [#105](https://github.com/growingio/gio-design/pull/105)

## 20.8.3

- 🆕 新增[Pagination 分页](/components/functional/pagination)组件。 [#57](https://github.com/growingio/gio-design/pull/57)
- 🆕 新增[Menu 菜单](/components/basic/menu)组件。 [#60](https://github.com/growingio/gio-design/pull/60)
- 🆕 新增[Progress 进度条](/components/basic/progress)组件。 [#62](https://github.com/growingio/gio-design/pull/62)
- 🆕 新增[Drawer 抽屉](/components/basic/drawer)组件。 [#64](https://github.com/growingio/gio-design/pull/64)
- 🆕 按钮组件新增图标按钮类型。 [#92](https://github.com/growingio/gio-design/pull/92)
- 🐛 修正输入框组件的 tokens。 [#98](https://github.com/growingio/gio-design/pull/98)

## 20.8.2

- 🆕 新增[Alert 警告提示](/components/basic/alert)组件。 [#52](https://github.com/growingio/gio-design/pull/52)
- 🆕 新增[Input 输入框](/components/basic/input)组件。 [#55](https://github.com/growingio/gio-design/pull/55)

## 20.8.1

- 🆕 新增[Toggles 开关](/components/basic/toggles)组件。 [#52](https://github.com/growingio/gio-design/pull/52)
- 🆕 新增[Loading 加载中](/components/basic/loading)组件。 [#39](https://github.com/growingio/gio-design/pull/39)
- 🆕 新增[Skeleton 骨架图](/components/basic/skeleton)组件。 [#46](https://github.com/growingio/gio-design/pull/46)
- 🆕 新增[Popconfirm 气泡确认框](/components/functional/popconfirm)组件。 [#49](https://github.com/growingio/gio-design/pull/49)
- 🆕 新增[Tree 树形组件](/components/functional/tree)组件。 [#51](https://github.com/growingio/gio-design/pull/51)
- 🆕 新增[Sign 标记](/components/basic/sign)组件。 [#52](https://github.com/growingio/gio-design/pull/52)
- 🆕 新增[Tag 标签](/components/basic/tag)组件。 [#54](https://github.com/growingio/gio-design/pull/54)
- 🐛 头像组最后一项文本使用 “+n” 格式。 [#58](https://github.com/growingio/gio-design/pull/58)

## 20.8.0

- 🆗 新增[Button 按钮](/components/basic/button)组件。 [#43](https://github.com/growingio/gio-design/pull/43)
- 👤 `Avatar 头像` 组件增加 `displayTooltip` 参数。 [#36](https://github.com/growingio/gio-design/pull/36)

## 20.7.0

- 👤 新增[Avatar 头像](/components/functional/avatar)组件。 [#26](https://github.com/growingio/gio-design/pull/26)
- 📑 新增[Tabs 标签页](/components/basic/tabs)组件。 [#29](https://github.com/growingio/gio-design/pull/29)
- 🛠 新增[Tooltip 文字提示](/components/basic/tooltip)组件。 [#31](https://github.com/growingio/gio-design/pull/31)
- 🛠 新增[Popover 气泡卡片](/components/functional/popover)组件。 [#33](https://github.com/growingio/gio-design/pull/33)

## 20.6.2

- 🔗 新增[Link 链接](/components/basic/link)组件。 [#19](https://github.com/growingio/gio-design/pull/19)
- ✅ 更新[Checkbox 复选框](/components/basic/checkbox)组件样式。 [#13](https://github.com/growingio/gio-design/pull/13)

## 20.6.1

- 🔘 新增[Radio 单选框](/components/basic/radio)组件。 [#5](https://github.com/growingio/gio-design/pull/5)
- ✅ 新增[Checkbox 复选框](/components/basic/checkbox)组件。 [#3](https://github.com/growingio/gio-design/pull/3)
- 🥖 新增[Breadcrumb 面包屑](/components/basic/breadcrumb)组件。 [#8](https://github.com/growingio/gio-design/pull/8)
