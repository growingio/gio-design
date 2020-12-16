---
title: TabNav 标签导航
nav:
  order: 2
  title: 组件
group:
  title: 基础组件
  order: 1
---

# TabNav 标签导航

## 定义

标签导航是两个或更多按钮段的集合。标签导航 TabNav 与 标签页 Tabs 的区别：点击切换标签页时，页面内容随之切换；点击分段控件，切换内容由页面决定。

## 代码演示

<code src='./demos/base.tsx' title='块状' desc='一共四种尺寸：L（40px）、M（36px）、S（30px）、XS（24px）。' />

<code src='./demos/line.tsx' title='线状' desc='一共三种尺寸：L（40px）、M（36px）、S（30px）。' />

## 参数说明

### TabNav

| 参数             | 说明                                  | 类型                                   | 默认值       |
| ---------------- | ------------------------------------- | -------------------------------------- | ------------ |
| prefixCls        | 替代组件的类前缀                      | string                                 | 'gio-tabnav' |
| children         | 子元素                                | TabNav.Item[]                          | -            |
| type             | 标签导航按钮样式                      | 'block' \| 'line'                      | 'block'      |
| size             | 标签导航尺寸                          | 'large' \| 'middle' \| 'small' \| 'xs' | 'large'      |
| onChange         | 标签激活改变时的回调                  | (\_key: string) => void                | -            |
| onTabClick       | 标签被点击时的回调                    | (\_key: string) => void                | -            |
| activeKey        | 开启受控模式，当前激活 tab 面板的 key | string                                 | -            |
| defaultActiveKey | 初始化选中面板的 key                  | string                                 | -            |

### TabNav.Item

| 参数     | 说明                     | 类型            | 默认值  |
| -------- | ------------------------ | --------------- | ------- |
| children | 标签导航按钮中展示的内容 | React.ReactNode | -       |
| disabled | 禁用标签导航按钮         | boolean         | 'false' |
| onClick  | 点击标签按钮的回调       | (e) => void     | -       |
