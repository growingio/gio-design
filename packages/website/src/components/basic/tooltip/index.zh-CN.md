---
title: Tooltip 文字提示
nav:
  order: 2
  title: 组件
group:
  title: 基础组件
  order: 1
---

# Tooltip 文字提示

## 何时可用

文本或普通操作的解释说明。

## 代码演示

<code src='./demo/base.tsx' title='位置' desc='位置有12个方向' >
<code src='./demo/maxLength.tsx' title='多行' desc='最大宽度为500px，超出换行。'  >
<code src='./demo/link.tsx' title='链接' desc='支持设置提示尾部链接，其中name字段可缺省。缺省name字段将直接显示链接，缺省link链接不显示。'  >

## 参数说明

| 参数            | 说明                         | 类型                                   | 默认值 |
| --------------- | ---------------------------- | -------------------------------------- | ------ |
| **title**       | 提示文字                     | string \| ReactNode \| () => ReactNode |        |
| **tooltipLink** | 设置头像的链接以及链接的文字 | { name?: string, link: string }        |

以下 API 为 Tooltip、Popconfirm、Popover、Dropdown（无 arrowPointAtCenter 参数） 共享的 API。

| 参数                     | 说明                                                                                                                                           | 类型                              | 默认值                |
| ------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------- | --------------------- |
| **getTooltipContainer**  | 浮层渲染父节点，默认渲染到 body 上                                                                                                             | function(triggerNode)             | `() => document.body` |
| **overlayClassName**     | 添加 className                                                                                                                                 | string                            | `''`                  |
| **placement**            | 气泡框位置, 可选 `top` `left` `right` `bottom` `topLeft` `topRight` `bottomLeft` `bottomRight` `leftTop` `leftBottom` `rightTop` `rightBottom` | string                            | `'top'`               |
| **trigger**              | 触发行为，可选 hover,focus,click,contextMenu                                                                                                   | string\|string[]                  | `hover`               |
| **visible**              | 用于手动控制浮层显隐                                                                                                                           | boolean                           | `false`               |
| **disabled**             | 当 disabled 为 true 时，触发行为不会显示气泡框                                                                                                 | boolean                           | `false`               |
| **onVisibleChange**      | 显示隐藏的回调                                                                                                                                 | (visible) => void                 |                       |
| **destroyTooltipOnHide** | 关闭后是否销毁 Tooltip，当 keepParent 为 false 时销毁父容器                                                                                    | boolean\|{ keepParent?: boolean } | `false`               |
| **arrowPointAtCenter**   | 箭头是否指向目标元素中心                                                                                                                       | boolean                           | `false`               |

更多参数请参考 [rc-tooltip](https://github.com/react-component/tooltip)
