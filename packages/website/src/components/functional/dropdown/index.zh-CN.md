---
title: Dropdown 下拉菜单
nav:
  order: 2
  title: 组件
group:
  title: 功能组件
  order: 2
---

# Dropdown 下拉菜单

## 定义

向下弹出的列表。当页面上的操作命令过多时，用此组件可以收纳操作元素。点击或移入触点，会出现一个下拉菜单。可在列表中进行选择，并执行相应的命令。

[1] 用于收罗一组命令操作。

[2] Select 用于选择，而 Dropdown 是命令集合。

## 应用场景

【在控件中使用】

- Table - 「···」、「头像列表 - 看板」、「Tag 列表 - 埋点事件」、「筛选」
- 导航 - 「头像」、「选择项目」
- 搜索框 - 「最近搜索记录」

【在页面中使用】

- Button「···」触发；
- Select 触发。

## 代码演示

[1] 当页面上的操作命令过多时，常使用 Dropdown 收纳操作元素。

[2] 点击触点，出现下拉菜单，在列表中选择相应的命令执行，点击相应命令后自动收起列表，点击区域为整条列表项，点击空白处列表收起。

<code src='./demo/base.tsx' title='自定义内容样式' />
<code src='./demo/content.tsx' title='自定义内容示例' />
<code src='./demo/icons.tsx' title='触发对象为 Icon' />
<code src='./demo/button.tsx' title='触发对象为按钮' />
<code src='./demo/assistList.tsx' title='列表含辅助信息的样式' />
<code src='./demo/filter.tsx' title='常用过滤样式' />
<code src='./demo/function.tsx' title='含新建功能的样式' />
<code src='./demo/placement.tsx' title='下拉菜单出现的位置' desc='一共 12 种位置。位置选择原则：下拉菜单需要显示完整且不错乱。' />

## 参数说明

| 参数          | 说明                                                                                                                                           | 类型                               | 默认值   |
| ------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------- | -------- |
| **placement** | 气泡框位置, 可选 `top` `left` `right` `bottom` `topLeft` `topRight` `bottomLeft` `bottomRight` `leftTop` `leftBottom` `rightTop` `rightBottom` | string                             | `bottom` |
| **trigger**   | 触发行为，可选 hover,focus,click,contextMenu                                                                                                   | string\|string[]                   | `click`  |
| **overlay**   | 下拉区域                                                                                                                                       | ReactElement \| () => ReactElement | -        |

注意，请确保 overlay 的元素能接受 onClick 事件，否则点击下拉区域不会关闭下拉菜单。
更多参数参考[Tooltip](/components/basic/tooltip)
