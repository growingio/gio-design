---
title: Tree 树形组件
nav:
  order: 2
  title: 组件
group:
  title: 功能组件
  order: 2
---

# 树形控件 - Tree

## 何时使用

文件夹、组织架构、生物分类、国家地区等等，世间万物的大多数结构都是树形结构。使用 树控件 可以完整展现其中的层级关系，并具有展开收起选择等交互功能。

## 代码演示

<code src='./demos/index.tsx' title='基础' desc='最简单的用法，展示可选中，禁用，默认展开等功能。'/>

<code src='./demos/icon.tsx' title='带Icon的树形控件' desc='可以针对不同的节点定制图标。' />


## 参数说明

### Tree props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| autoExpandParent | 是否自动展开父节点 | boolean | true |
| defaultExpandAll | 默认展开所有树节点 | boolean | false |
| defaultExpandedKeys | 默认展开指定的树节点 | string[] | [] |
| defaultExpandParent | 默认展开父节点 | boolean | true |
| defaultSelectedKeys | 默认选中的树节点 | string[] | [] |
| disabled | 将树禁用 | boolean | false |
| expandedKeys | （受控）展开指定的树节点 | string[] | [] |
| loadData | 异步加载数据 | function(node) | - |
| loadedKeys | （受控）已经加载的节点，需要配合 loadData 使用 | string[] | [] |
| selectable | 是否可选中 | boolean | [] |
| selectedKeys | （受控）已经加载的节点，需要配合 loadData 使用 | string[] | [] |
| showIcon | 是否展示 TreeNode title 前的图标，没有默认样式，如设置为 true，需要自行定义图标相关样式 | boolean | false |
| treeData | treeNodes 数据，如果设置则不需要手动构造 TreeNode 节点（key 在整个树范围内唯一） | array<{key, title, children, [disabled, selectable]}> | - |
| virtual | 设置 false 时关闭虚拟滚动 | boolean | true |
| onExpand | 展开/收起节点时触发 | function(expandedKeys, {expanded: bool, node}) | - |
| onLoad | 节点加载完毕时触发 | function(loadedKeys, {event, node}) | - |
| onRightClick | 响应右键点击 | function({event, node}) | - |
| onSelect | 点击树节点触发 | function(selectedKeys, e:{selected: bool, selectedNodes, node, event}) | - |
| icon | 自定义树节点图标。 | ReactNode | (props) => ReactNode | - |


### TreeNode props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| disabled | 禁掉响应 | boolean | false |
| icon | 自定义图标。可接收组件，props 为当前节点 props | ReactNode | (props) => ReactNode | - |
| isLeaf | 设置为叶子节点(设置了loadData时有效) | boolean | false |
| key | 设置为叶子节点(设置了loadData时有效) | boolean | false |
| selectable | 设置节点是否可被选中 | boolean | true |
| title | 标题 | string /| ReactNode | --- |
