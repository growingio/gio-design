---
title: Modal Dialog 弹窗
nav:
  order: 2
  title: 组件
group:
  title: 功能组件
  order: 2
---

# 弹窗 - Modal Dialog

需要用户处理事务，又不希望跳转页面以致打断工作流程时，可以使用 Modal Dialog 在当前页面正中打开一个浮层，承载相应的操作。

## 代码演示

### Modal

<code src='./demo/modal.tsx' title='默认 Modal ' desc='Modal 的默认形式。'/>

<code src='./demo/additionalFooter.tsx' title='额外 Footer' desc='有额外自定义 Footer 的 Modal。'/>

<code src='./demo/maskClose.tsx'/>

<code src='./demo/size.tsx' />

<code src='./demo/asyncConfirm.tsx'/>

### StepModal

<code src='./demo/stepModal.tsx' title='StepModal ' desc='内部可以进行分步骤进行的 Modal。'/>

<code src='./demo/branchStepModal.tsx' />

<code src='./demo/asyncStepModal.tsx' />

### 函数式调用

<code src='./demo/calllout.tsx' title='函数式调用确认 Modal' desc='使用 `Modal.confirm()` 可以快捷地弹出确认框。`onClose`/`onOk` 返回一个 `Promise` 可以延迟关闭。'/>

<code src='./demo/functionCallModal.tsx' title='信息提示' desc='各种类型的信息提示，默认只提供一个按钮用于关闭。'/>

<code src='./demo/reference.tsx' title='返回引用' />

## 参数说明

### Modal

| 参数             | 说明                                              | 类型                                                                                                  | 默认值  |
| ---------------- | ------------------------------------------------- | ----------------------------------------------------------------------------------------------------- | ------- |
| size             | Modal 的尺寸大小                                  | `small` \| `middle` \| `full`                                                                         | `small` |
| visible          | Modal 的可视状态                                  | boolean                                                                                               | false   |
| dropCloseButton  | 是否不使用 Footer 中的关闭按钮                    | boolean                                                                                               | -       |
| pending          | 组件 pending 状态                                 | boolean                                                                                               | -       |
| closeAfterOk     | Modal `onOk` 执行后是否执行 `onClose`             | boolean                                                                                               | false   |
| additionalFooter | 除了 `OkButton` 及 `CloseButton`外的自定义 Footer | React.ReactNode                                                                                       | -       |
| footer           | 完全自定义的 Footer                               | React.ReactNode                                                                                       | -       |
| okButtonProps    | 传递给`OkButton`的 props                          | ButtonProps                                                                                           | -       |
| closeButtonProps | 传递给`CloseButton`的 props                       | ButtonProps                                                                                           | -       |
| okText           | 传递给`OkButton`的显示文案                        | text                                                                                                  | -       |
| closeText        | 传递给`CloseButton`的显示文案                     | text                                                                                                  | -       |
| onOk             | `OkButton`的点击调用函数                          | `(e: React.MouseEvent<HTMLElement>) => void)` \| `(e: React.MouseEvent<HTMLElement>) => Promise<any>` | -       |
| onClose          | `CloseButton`的调用函数                           | `(e: React.MouseEvent<HTMLElement>) => void)` \| `(e: React.MouseEvent<HTMLElement>) => Promise<any>` | -       |
| afterClose       | Modal `onClose` 执行后执行的函数                  | `() => any`                                                                                           | -       |
| title            | 自定义的 Modal Title                              | React.ReactNode                                                                                       | -       |
| useBack          | 是否显示 Title 中的后退按钮                       | boolean                                                                                               | false   |
| onBack           | 点击后退按钮执行的函数                            | `() => void`                                                                                          | -       |
| prefixCls        | 替代 Modal 组件 class 的 gio-modal 前缀           | string                                                                                                | -       |
| className        | Modal 根节点 className                            | string                                                                                                | -       |
| wrapClassName    | Modal wrap 的 className                           | string                                                                                                | -       |
| style            | Modal 根节点的样式                                | React.CSSProperties                                                                                   | -       |
| wrapStyle        | Modal wrap 内联样式                               | React.CSSProperties                                                                                   | -       |
| bodyStyle        | Modal body 内联样式                               | React.CSSProperties                                                                                   | -       |
| maskStyle        | Modal mask 内联样式                               | React.CSSProperties                                                                                   | -       |
| wrapProps        | Modal wrap props                                  | object                                                                                                | -       |
| bodyProps        | Modal body 内联样式                               | object                                                                                                | -       |
| maskProps        | Modal mask 内联样式                               | object                                                                                                | -       |
| zIndex           | Modal 层级                                        | number                                                                                                | -       |
| closeIcon        | Modal 右上角关闭 Icon                             | React.ReactNode                                                                                       | -       |
| keyboard         | 是否支持按 ESC 关闭 Modal                         | boolean                                                                                               | true    |
| destroyOnClose   | Modal `onClose` 执行后是否卸载 Modal 组件         | boolean                                                                                               | false   |

### StepModal

`StepModal` 在 `Modal` 基础上增加了 `steps` prop, 去掉了 `pending` prop

| 参数  | 说明     | 类型              | 默认值 |
| ----- | -------- | ----------------- | ------ |
| steps | 步骤数组 | [IStep](#istep)[] | -      |

#### IStep

| 参数             | 说明                                              | 类型            | 默认值 | 必填 |
| ---------------- | ------------------------------------------------- | --------------- | ------ | ---- |
| key              | 当前 Step 的唯一标识                              | string          | -      | 是   |
| return           | 当前 Step 的上一步                                | string          | -      | 是   |
| firstNextInTier  | 多分支路径下，当前步骤是否是默认的下一步          | boolean         | -      | 否   |
| title            | 当前步骤 Modal 的 Title                           | React.ReactNode | -      | 否   |
| content          | 当前步骤 Modal 的 Body                            | React.ReactNode | -      | 否   |
| footer           | 当前步骤 Modal 的 Footer                          | React.ReactNode | -      | 否   |
| onNext           | 下一步                                            | `() => void`    | -      | 否   |
| onBack           | 上一步                                            | `() => void`    | -      | 否   |
| additionalFooter | 除了 `OkButton` 及 `CloseButton`外的自定义 Footer | React.ReactNode | -      | 否   |
| nextButtonProps  | 传递给下一步按钮的 props                          | ButtonProps     | -      | 否   |
| backButtonProps  | 传递给上一步的 props                              | ButtonProps     | -      | 否   |
| nextText         | 传递给下一步按钮的显示文案                        | string          | -      | 否   |
| backText         | 传递给上一步按钮的显示文案                        | string          | -      | 否   |

#### Modal.staticMethod()

挂载在 Modal 下的静态方法包括：

- `Modal.confirm`
- `Modal.info`
- `Modal.success`
- `Modal.warn`
- `Modal.error`

函数参数 `IModalStaticFuncConfig` 继承自 `Modal Props` ， 除去 `visible`, `pending` 不可用，新增配置项如下：

| 参数      | 说明                  | 类型            | 默认值 | 必填 |
| --------- | --------------------- | --------------- | ------ | ---- |
| content   | Modal 内容            | React.ReactNode | -      | 否   |
| icon      | Modal Title 中的 Icon | React.ReactNode | -      | 否   |
| showClose | 是否显示关闭按钮      | React.ReactNode | -      | 否   |
