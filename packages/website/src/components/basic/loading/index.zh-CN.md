---
title: Loading 加载中
nav:
  order: 2
  title: 组件
group:
  title: 基础组件
  order: 1
---

# Loading 加载中

用于页面和区块的加载中状态。

1. 如果 Loading 是由按钮触发的，请将 Loading 放置在按钮中，然后在 Loading 可见时禁用该按钮。
2. 如果页面的仅一部分显示新内容或正在更新，则将 Loading 放置在页面的该部分中。
3. 仅在预期等待的时间超过 1S 时显示 Loading 。

## 代码演示

<code src='./demos/base.tsx' title='基础' desc='可以设置文字显示的位置，也可以不显示文字' />
<code src='./demos/size.tsx' title='尺寸' desc='可以设置可以设置三种尺寸' />
<code src='./demos/wrapper.tsx' title='赋予内容加载状态' desc='可以直接把内容嵌入到Loading中，将现有容器变为加载状态。' />
<code src='./demos/debounce.tsx' title='延时' desc='延迟显示 loading 效果。当 spinning 状态在 delay 时间内结束，则不显示 loading 状态。' />
<code src='./demos/blurColor.tsx' title='设置模糊蒙层颜色' desc='支持两种蒙层颜色' />
<code src='./demos/indicator.tsx' title='自定义符号' desc='替换默认的加载图形，可以是任意的元素' />

## 参数说明

| 参数          | 说明                               | 类型                           | 默认值      |
| ------------- | ---------------------------------- | ------------------------------ | ----------- |
| loading       | 是否为加载中状态                   | boolean                        | true        |
| title         | 自定义描述文案                     | string                         | '加载中...' |
| titlePosition | 描述文案相对于指示符号的位置       | 'right' \| 'bottom'            | 'right'     |
| delay         | 延迟显示加载效果的时间（防止闪烁） | number(ms)                     | 0           |
| children      | 设置被包裹的元素                   | React.ReactDOM                 |             |
| prefixCls     | 替换类前缀                         | string                         |             |
| size          | 设置默认指示符号大小               | 'small' \| 'middle' \| 'large' | 'large'     |
| indicator     | 自定义指示符号                     | React.Element                  |             |
| blurColor     | 设置模糊蒙层颜色                   | 'white' \| 'block'             | 'white'     |
