---
title: Search Bar 搜索框
nav:
  order: 2
  title: 组件
group:
  title: 功能组件
  order: 2
---

# Search Bar 搜索框

## 代码演示

<code src='./demo/index.tsx' title='基础' />

## API

| 参数              | 说明                           | 类型                       | 默认值   |
| ----------------- | ------------------------------ | -------------------------- | -------- |
| value             | 值                             | string                     | 必填     |
| onChange          | 修改值时触发的回调函数         | Function(value: string)    | 必填     |
| id                | 存储记录的唯一 id              | string                     | 必填     |
| showStorage       | 是否需要展示搜索记录           | boolean                    | false    |
| storageNum        | 默认显示最近搜索条数           | number                     | 5        |
| disabled          | 是否禁用                       | boolean                    | false    |
| allowClearStorage | 是否显示清除本地存储按钮       | boolean                    | false    |
| showClear         | 是否显示清空内容按钮           | boolean                    | false    |
| size              | input 大小                     | 'large'、'middle'、'small' | 'middle' |
| inputStyle        | input 的 style                 | React.CSSProperties        | -        |
| inputWrapStyle    | input 组件外层容器的 style     | React.CSSProperties        | -        |
| wrapStyle         | searchbar 组件外层容器的 style | React.CSSProperties        | -        |
