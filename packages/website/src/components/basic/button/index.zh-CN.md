---
title: Button 按钮
nav:
  order: 2
  title: 组件
group:
  title: 基础组件
---

# Button 按钮

## 何时使用

点击后即执行相应操作。

## 代码演示

<code src='./demos/primary.tsx' title='主要按钮' desc='突出显示页面上最强烈的动作，应该只在每个屏幕上出现一次(不包括应用程序头或模态对话框)。并不是每个屏幕都需要主按钮。' />

<code src='./demos/secondary.tsx' title='次要按钮' desc='用于与主按钮配对，以明确有两个选项；或者用于多个无主次之分的操作时。' />

<code src='./demos/assist.tsx' title='辅助按钮' desc='当页面有许多高频率使用的操作时，将其用作默认按钮。' />

<code src='./demos/text.tsx' title='文本按钮' desc='适用于列表内添加多个内容时。' />

<code src='./demos/other.tsx' title='扩展按钮' />

## 参数说明
| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| type | 设置按钮类型，可选值为 `primary` `secondary` `assist` `text` 或者不设 | string | - |
| icon | 设置按钮的图标组件 | ReactNode | - |
| size | 设置按钮大小 | `large` \| `middle` \| `small` | - |
| loading | 设置按钮载入状态 | boolean | false |
| ghost | 幽灵属性，使按钮背景透明 | boolean | false |
| block | 将按钮宽度调整为其父宽度的选项 | boolean | false |

## 按钮尺寸

1、大按钮高度为40px，icon大小为16px，常用于页面内。如：页面内的新建。当button内容只有2个字时，文字之间需要加上间隔。

2、中按钮高度为36px，icon大小为14px，常用于容器内。如：弹窗内的button。当button内容只有2个字时，文字之间需要加上间隔。

3、小按钮高度为30px，icon大小为14px，常用于容器内部中的容器里。当button内容只有2个字时，文字之间需要加上间隔。
