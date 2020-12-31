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

<code src='./demos/single.tsx' title='单选' desc='大小，无边框' >
<code src='./demos/auto.tsx' title='单选' desc='紧凑型，自动宽度' >
<code src='./demos/highlight.tsx' title='单选' desc='不可选项， 搜索高亮' >
<code src='./demos/multiple.tsx' title='多选' desc='无group' >
<code src='./demos/freeinput.tsx' title='多选' desc='搜索 自由输入' >
<code src='./demos/customizeoptions.tsx' title='单选' desc='自定义 options render'>
## 多选

## 参数说明

### Select

| 参数                    | 说明                                          | 类型                                                                                                                               | 默认值                                                            |
| ----------------------- | --------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------- |
| size                    | select 的大小                                 | small , middle , large                                                                                                       | middle                                                          |
| options                 | 同 Select.Option                              | OptionProps[]                                                                                                                    | -                                                                 |
| multiple                | 多选                                          | boolean                                                                                                                          | false                                                           |
| placeholder             | 搜索模式下 占位符                             | string                                                                                                                           | -                                                                 |
| allowDeselect | 默认情况下不开启返选(`multiple`下该参数无效，开启后不执行 `onDeselect`) | boolean |false |
| allowClear              | 清除                                          | boolean | false |
| searchable              | 是否可搜索                                    | boolean| false |
| disabled                | 禁用                                          | boolean| `false |
| allowCustomOption       | 多选模式下 是否允许通过搜索自定义插入 option  | boolean| false  |
| notFoundContent         | 无搜索结果占位                           | React.ReactElement | - |
| className               | className                             | string | -  |
| style                   | React.CSSProperties                 | string | -  |
| customizePrefixCls      | classname 前缀                                | string                                                                                                                           | -                                                                 |
| dropDownClassName       | dropdown overlay className                    | string                                                                                                                           | -                                                                 |
| dropDownStyle           | dropwdown overlay style                       | CSSProperties                                                                                                                    | -                                                                 |
| bordered                | 是否有边框                                    | boolean                                                                                                                          | true                                                            |
| arrowComponent          | 箭头的组件                                    | React.ReactElement                                                                                                               | `<DownOutlined>`                                                  |
| autoWidth               | 下拉框是否与选择框宽度一致                    | boolean                                                                                                                          | true                                                              |
| listHeight              | list 高度, 传入会取消 list 动态高度功能       | number                                                                                                                           | -                                                                 |
| listRowHeight           | list item 的高度                              | number                                                                                                                           | 44                                                                |
| labelRenderer           | list Item 的自定义渲染方法， 默认实现搜索高亮 | (input:string) => (option: OptionProps, isGroup: boolean) => React.ReactNode                                                     | -                                                                 |
| searchPredicate         | 搜索过滤的方法                                | (input: string) => _.ListIterateeCustom<OptionProps, boolean>; 详见[lodash#filter](https://lodash.com/docs/4.17.15#filter)       | (input: string) => (o: OptionProps) => o.label.includes(input); |
| matchPredicate          | 决定是否为完全匹配的方法                      | (input: string) => _.ListIterateeCustom<OptionProps, boolean>; 详见[lodash#findIndex](https://lodash.com/docs/4.17.15#findIndex) | (input: string) => (o: OptionProps) => o.label === input        |
| optionLabelRenderer     | 自定义 option label 的方法                    | (value: string \| number, option?: OptionProps) => React.ReactNode;                                                              | (value: string, option?: OptionProps) => option?.label \| value |
| defaultValue            | 默认值                                        | string \| string[]                                                                                                                 | -                                                                 |
| value                   | 选中值                                        | string \|string[]                                                                                                                  | -                                                                 |
| onChange                | 选中值改变时的回调                            | (value: string \| number \| string[] \| number[], options?: OptionProps \| OptionProps[])) => void                                 |
| onSearch                | 搜索输入改变时的回调                          | (input: string) => void                                                                                                         |
| onSelect                | 选中时的回调                                  | (value: string \| number, option:Option) => void                                                                                   |
| onDeselect              | 选择的回调                                    | (vallue: string \| number, option:Option) => void                                                                                  |
| dropDownVisible         | 是否显示 dropdown                             | boolean                                                                                                                          |                                                                   |  |
| onDropDownVisibleChange | dropdown visible 值改变时的回调               | (visible: boolean)=>void                                                                                                         |                                                                   |
| onClear | 清除的回调 | ()=>void | -|
| getContainer            | 浮层渲染父节点，默认渲染到 body 上            | function(triggerNode)                                                                                                              | () => document.body                                             |


### Select.Option

注意： 当自定义 option render 时，高度默认使用了 40px ,如需自定义可自行设置

| 参数     | 说明                  | 类型             | 默认值 |
| -------- | --------------------- | ---------------- | ------ |
| label    | 展示文字              | string           | -      |
| value    | 作为列表的 key 来使用 | string \| number | -      |
| disabled | 是否禁用              | boolean          | false  |
| height   | 自定义高度            | number           | -      |

### Select.Group

| 参数  | 说明                | 类型   | 默认值 |
| ----- | ------------------- | ------ | ------ |
| label | 组名                | string | -      |
| value | 作为组的 key 来使用 | string | -      |
