---
title: List 列表
nav:
  order: 2
  title: 组件
group:
  title: 功能组件
  order: 2
---

# List 列表

## 定义

以列表的形式展示同一类型的内容，可承载文字、头像、多选框、按钮等元素组合

## 应用场景

控件中使用

- 下拉菜单
- 事件选择器
- 维度选择器
- 用户选择器
- 日期选择器
- 维度过滤器

在页面中使用

- 活动日志
- 用户分群 - 用户细查 - 单用户画像页
- 看板 - 侧边栏
- 用户标签 - 侧边栏

## 代码演示

<code src='./demo/base.tsx' title='基础列表' />

<code src='./demo/withIcon.tsx' title='含Icon样式' />

<code src='./demo/group.tsx' title='分组样式' />

<code src='./demo/avatar.tsx' title='分类、标题、头像、辅助文字' />

<code src='./demo/drag.tsx' title='拖拽列表' />

## 参数说明

### Modal

| 参数          | 说明                    | 类型                                          | 默认值   |
| ------------- | ----------------------- | --------------------------------------------- | -------- |
| dataSource    | `list`数据源            | Option[]                                      |
| isMultiple    | 是否多选                | boolean                                       | false    |
| onChange      | 选中触发的回调          | (option: Option) => void                      | noop     |
| width         | 列表宽度                | number                                        | -        |
| height        | 列表高度                | number                                        | 400      |
| wrapStyle     | 包裹样式                | React.CSSProperties                           | -        |
| prefixCls     | 前缀`className`样式类名 | string                                        | gio-list |
| labelRenderer | 渲染列表项              | (option: Option, isGruop: false) => ReactNode | noop     |
| rowHeight     | 自定义行高              | number \| ((option: Option) => number);       | 44       |
| value         | 选中的值                | string \| string[]                            | -        |

### Option

`dataSource`每一项的参数

| 参数        | 说明                                | 类型    | 默认值 |
| ----------- | ----------------------------------- | ------- | ------ |
| label       | 列表单项主要文字                    | string  | -      |
| value       | 作为列表的`key`来使用               | string  | -      |
| description | 列表次要文字                        | string  | -      |
| disabled    | 是否禁用                            | boolean | false  |
| tooltip     | `tooltip`描述                       | string  | -      |
| groupValue  | 分组的`key`，与`groupLabel`一起使用 | string  | -      |
| groupLabel  | 分组的标题                          | string  | -      |
