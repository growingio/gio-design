---
title: TreeSelect 树形选择器
nav:
  order: 2
  title: 组件
group:
  title: 功能组件
  order: 2
---

# 树形选择器 - TreeSelect

## 何时使用

当选择的内容为树形结构时，选用TreeSelect。

## 代码演示

<code src='./demos/single.tsx' title='单选' desc='最简单的用法。'/>

<code src='./demos/multiple.tsx' title='带Icon的树形控件' desc='多选的树选择，使用勾选框实现多选功能。' />


## 参数说明

### Tree props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| allowClear | 显示清除按钮 | boolean | false |
| autoClearSearchValue | 当多选模式下值被选择，自动清空搜索框 | boolean | true |
| defaultValue | 指定默认选中的条目 | string /| string[] | - |
| disabled | 是否禁用 | boolean | false |
| dropdownClassName | 下拉菜单的 className 属性 | string | - |
| dropdownMatchSelectWidth | 下拉菜单和选择器同宽。默认将设置 min-width，当值小于选择框宽度时会被忽略。false 时会关闭虚拟滚动 | boolean \| number | true |
| dropdownRender | 自定义下拉框内容 | (originNode: ReactNode, props) => ReactNode | - |
| dropdownStyle | 下拉菜单的样式 | object | - |
| filterTreeNode | 是否根据输入项进行筛选，默认用 treeNodeFilterProp 的值作为要筛选的 TreeNode 的属性值 | boolean \| function(inputValue: string, treeNode: TreeNode) (函数需要返回 bool 值) | function |
| getPopupContainer | 菜单渲染父节点。默认渲染到 body 上，如果你遇到菜单滚动定位问题，试试修改为滚动的区域，并相对其定位。 | function(triggerNode) | () => document.body |
| listHeight | 设置弹窗滚动高度 | number | 368 |
| loadData | 异步加载数据 | function(node) | - |
| maxTagCount | 最多显示多少个 tag | number | - |
| multiple | 支持多选（当设置 treeCheckable 时自动变为 true） | boolean | false |
| placeholder | 选择框默认文字 | string | - |
| searchValue | 搜索框的值，可以通过 onSearch 获取用户输入 | string | - |
| showSearch | 是否支持搜索框 | boolean | 单选：false \| 多选：true |
| showCheckedStrategy | 定义选中项回填的方式。TreeSelect.SHOW_ALL: 显示所有选中节点(包括父节点)。TreeSelect.SHOW_PARENT: 只显示父节点(当父节点下所有子节点都选中时)。 默认只显示子节点 | TreeSelect.SHOW_ALL \| TreeSelect.SHOW_PARENT \| TreeSelect.SHOW_CHILD | TreeSelect.SHOW_CHILD |
| showArrow | 是否显示 suffixIcon，单选模式下默认 true | boolean | - |
| suffixIcon | 自定义的选择框后缀图标, 多选模式下必须同时设置 showArrow 为 true | ReactNode | - |
| treeCheckable | 显示 Checkbox | boolean | false |
| treeData | treeNodes 数据，如果设置则不需要手动构造 TreeNode 节点（key 在整个树范围内唯一） | array<{key, title, children, [disabled, selectable]}> | - |
| treeNodeLabelProp | 作为显示的 prop 设置 | string | title |
| value | 指定当前选中的条目 | string \| string[] | - |
| onChange | 选中树节点时调用此函数 | function(value, label, extra) | - |
| onSearch | 文本框值变化时回调 | function(value: string)	 | - |
| onSelect | 被选中时调用 | function(value, node, extra) | - |
| onTreeExpand | 展示节点时调用 | function(expandedKeys) | - |

### Tree 方法

| 名称 | 描述 |
| --- | --- |
| blur() | 移除焦点 |
| focus() | 获取焦点 |

### TreeNode props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| selectable | 是否可选 | boolean | true |
| checkable | 当树为 Checkbox 时，设置独立节点是否展示 Checkbox | boolean | - |
| disableCheckbox | 禁掉 Checkbox | boolean | false |
| disabled | 是否禁用 | boolean | false |
| isLeaf | 是否是叶子节点 | boolean | false |
| key | 设置为叶子节点 | boolean | false |
| title | 树节点显示的内容 | string /| ReactNode | --- |
| value | 默认根据此属性值进行筛选（其值在整个树范围内唯一） | string | - |
