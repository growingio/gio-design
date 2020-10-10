---
title: Select 选择器
nav:
  order: 2
  title: 组件
group:
  title: 功能组件
---

# 选择器 Select

## 定义

---

下拉选择器，让用户做出选择。Select 与 Dropdown 的区别是 Select 承载的是选项，Dropdown 的承载的是操作

## 单选

<code src='./demos/single.tsx' title='单选' desc='单选' >
<code src='./demos/multiple.tsx' title='多选' desc='多选' >
<code src='./demos/search.tsx' title='可搜索' desc='可搜索' >

## 多选

## 参数说明

| 参数          | 说明                                                | 类型                                                                      | 默认值                |
| ------------- | --------------------------------------------------- | ------------------------------------------------------------------------- | --------------------- |
| size          | select 的大小                                       | `small` , `medium` , `large`                                              | `medium`              |
| options       | 同 list Options                                     | `Options[]`                                                               | -                     |
| multiple      | 多选                                                | `boolean`                                                                 | `false`               |
| searchable    | 是否可搜索                                          | `boolean`                                                                 | `false`               |
| onChange      | 选择的回调                                          | `(options: Option[] or Option) => void`                                   |                       |
| width         | select 的宽度                                       | `number`                                                                  | -                     |
| labelRenderer | list Item 的自定义渲染方法， 传入会取消搜索高亮功能 | `(input:string) => (option: Option, isGroup: boolean) => React.ReactNode` | -                     |
| listHeight    | list 高度, 传入会取消 list 动态高度功能             | `number`                                                                  | -                     |
| listRowHeight | list item 的高度                                    | `number`                                                                  | 44                    |
| getContainer  | 浮层渲染父节点，默认渲染到 body 上                  | function(triggerNode)                                                     | `() => document.body` |
