---
title: Alert 警告提示
nav:
  order: 2
  title: 组件
group:
  title: 基础组件
---

# Alert 警告提示

- 表示两种相互对立的状态间的切换，多用于触发「开/关」。

## 代码演示

### 基础用法

<code src='./demo/alert.tsx' title='基础用法' desc='最简单的用法' />

<code src='./demo/alertStyle.tsx' title='四种样式' desc='共有四种样式 success、info、warning、error' />

<code src='./demo/alertSize.tsx' title='四种样式' desc='共有四种样式 success、info、warning、error' />

<code src='./demo/alertDecription.tsx' title='含有辅助性文字介绍' desc='含有辅助性蚊子介绍的警告提示' />

<code src='./demo/alertOnlyDecription.tsx' title='只有辅助性文字介绍' desc='含有辅助性蚊子介绍的警告提示' />

<code src='./demo/alertClose.tsx' title='可关闭的警告提示' desc='显示关闭按钮，点击可关闭警告提示' />

<code src='./demo/alertIcon.tsx' title='图标' desc='含有图标，让信息类型更加醒目' />

<code src='./demo/alertDefineClose.tsx' title='自定义关闭' desc='可以自定义关闭，自定义的文字会替换原先关闭的Icon' />

## API

### Alert

| 参数        | 说明                                                         | 类型                | 默认值 |
| ----------- | ------------------------------------------------------------ | ------------------- | ------ |
| closeable   | 默认不现实关闭按钮                                           | boolean             | -      |
| closeText   | 自定义关闭按钮                                               | string \| ReactNode | -      |
| description | 警告提示的辅助性文字介绍                                     | string \| ReactNode | -      |
| icon        | 自定义图标，showIcon 为 true 时有效                          | ReacNode            | -      |
| message     | 警告提示内容                                                 | string \| ReactNode | -      |
| showIcon    | 是否显示辅助图标                                             | boolean             | false  |
| type        | 指定警告提示的样式，有四种选择 success、info、warning、error | string              | info   |
| size        | 规定 alert 尺寸，有两种选择 middle、small                    | string              | middle |

### 方法

| 名称    | 描述                 |
| ------- | -------------------- |
| onClose | 关闭时触发的回调函数 |
