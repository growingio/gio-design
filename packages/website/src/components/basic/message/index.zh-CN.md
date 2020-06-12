---
title: Toast
nav:
  order: 1
  title: 组件
group:
  title: 基础组件
---

# 何时使用
- 可提供成功、警告和错误等反馈信息。
- 顶部居中显示并自动消失，是一种不打断用户操作的轻量级提示方式。


# 代码演示

<code src='./demo/index.tsx' title='基础用法' />


# API
组件提供了一些静态方法，使用方法和参数如下：
- Toast.success(content, [duration], onClose)
- Toast.error(content, [duration], onClose)
- Toast.warning(content, [duration], onClose)

## 参数说明

| 参数            | 说明                                    | 类型              | 默认值 |
| -------------- | --------------------------------------- | ----------------- | ------ |
| content        | 提示内容                                     | string|ReactNode|config   | - |
| duration        | 多少秒后关闭，设为0时不自动关闭                           | number           |  2  |
| onClose | 关闭时触发的回调函数                      | Function           | - |


组件同时提供 promise 接口。
- Toast[level](content, [duration]).then(afterClose)
- Toast[level](content, [duration], onClose).then(afterClose)

其中 `Toast[level]` 是组件已经提供的静态方法。`then` 接口返回值是 Promise。

也可以对象的形式传递参数：
- Toast.open(config)
- Toast.success(config)
- Toast.error(config)
- Toast.warning(config)

`config` 对象属性如下：

| 参数            | 说明                                    | 类型              | 默认值 |
| -------------- | --------------------------------------- | ----------------- | ------ |
| content        | 提示内容                                     | string|ReactNode|config   | - |
| duration        | 多少秒后关闭，设为0时不自动关闭                           | number           |  2  |
| onClose | 关闭时触发的回调函数                      | Function           | - |
| icon | 自定义图标                      | ReactNode           | - |
| key | 当前提示的唯一标志                      | string|number           | - |
| className | 自定义 CSS class                      | string           | - |
| style | 自定义内联样式                      | React.CSSProperties           | - |


## 全局方法
还提供了全局配置和全局销毁方法：
- Toast.config(options)
- Toast.destroy()

| 参数            | 说明                                    | 类型              | 默认值 |
| -------------- | --------------------------------------- | ----------------- | ------ |
| duration        | 多少秒后关闭，设为0时不自动关闭                           | number           |  2  |
| getContainer | 配置渲染节点的输出位置                     | () => HEMLElement           | () => document.body |
| maxCount | 最大显示数, 超过限制时，最早的消息会被自动关闭               | number           | - |
| top | 消息距离顶部的位置                      | number           | 24 |
| rtl | 是否开启 RTL 模式                      | boolean           | false |
