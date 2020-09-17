---
title: DatePicker 日期选择器
nav:
  order: 2
  title: 组件
group:
  title: 功能组件
  order: 2
---

# DatePicker 日期选择器



## 代码演示

<code src='./demo/base.tsx'  title='日期选择器' desc='选择某一天' />

<code src='./demo/range.tsx'  title='日期范围选择器' desc='选择日期范围' />

## 参数说明

| 参数            | 说明         | 类型                         | 默认值 |
| --------------- | ------------ | ---------------------------- | ------ |
| **disabledDate** | 禁止选择的时间 | Moment => boolean |        |
| **showFooter**  | 是否显示footer | boolean |    true    |
| **format**  | 日期显示格式 | string |    'YYYY/MM/DD'    |
| **onChange**  | 面板切换的回调 | () => void |        |
| **onSelect**  | 选择日期的回调 | () => void |        |
| **value**  | 此受控组件绑定的时间 | `Array<Moment> , Moment`  |        |

