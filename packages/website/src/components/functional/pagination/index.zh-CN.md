---
title: Pagination 分页
nav:
  order: 2
  title: 组件
group:
  title: 功能组件
  order: 2
---

# Pagination 分页

分页组件在一个页面中的作用是在大量的信息中，便于快速浏览，定位到相关信息的页面。跳转到上一个页面或下一个页面。

## 代码演示

<code src='./demo/base.tsx' title='基础' desc='基础分页' >
<code src='./demo/controlled.tsx' title='受控模式' desc='当设置current参数后，只能通过onChange回调改变页码' >
<code src='./demo/quickJumper.tsx' title='快速跳转' desc='设置showQuickJumper为true且 页数大于10时，可以快速跳转' >
<code src='./demo/nine.tsx' title='较少的页数' desc='当页面页数少于10页时，全部展开显示' >
<code src='./demo/disable.tsx' title='禁用' desc='禁用分页' >

## 参数说明

| 参数                 | 说明                                         | 类型                     | 默认值                                                 |
| -------------------- | -------------------------------------------- | ------------------------ | ------------------------------------------------------ |
| **disabled**         | 禁用分页组件                                 | boolean                  | false                                                  |
| **prefixCls**        | 设置组件 CSS 类前缀                          | string                   | gio-pagination                                         |
| **defaultCurrent**   | 设置默认页                                   | number                   | 1                                                      |
| **current**          | 设置当前页                                   | number                   |                                                        |
| **total**            | 数据总数                                     | number                   | 0                                                      |
| **pageSize**         | 每页条数                                     | number                   | 10                                                     |
| **onChange**         | 页码改变的回调，参数是改变后的页码及每页条数 | function(page, pageSize) |                                                        |
| **showTotal**        | 用于显示数据总量和当前数据顺序               | function(total, range)   | (total: number) => `总共 ${total.toLocaleString()} 条` |
| **showQuickJumper**  | 用于快速跳转                                 | boolean                  | false                                                  |
| **hideOnSinglePage** | 只有一页时是否隐藏分页器                     | boolean                  | false                                                  |
