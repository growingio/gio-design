---
title: Tree 树
nav:
  order: 2
  title: 组件
group:
  title: 功能组件
---

# Tree 树

## 何时使用

多层次的结构列表。

## 代码演示

<code src='./demos/index.tsx' title='基础' />

## 参数说明
| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| type | 设置按钮类型，可选值为 `primary` `default` `assist` `text` 或者不设 | string | - |
| icon | 设置按钮的图标组件 | ReactNode | - |
| size | 设置按钮大小 | `large` \| `middle` \| `small` | - |
| loading | 设置按钮载入状态 | boolean \| { delay: number } | false |
| ghost | 幽灵属性，使按钮背景透明 | boolean | false |
| block | 将按钮宽度调整为其父宽度的选项 | boolean | false |

## 按钮尺寸

1、大按钮高度为40px，icon大小为16px，常用于页面内。如：页面内的新建。当button内容只有2个字时，文字之间需要加上间隔。

2、中按钮高度为36px，icon大小为14px，常用于容器内。如：弹窗内的button。当button内容只有2个字时，文字之间需要加上间隔。

3、小按钮高度为30px，icon大小为14px，常用于容器内部中的容器里。当button内容只有2个字时，文字之间需要加上间隔。
