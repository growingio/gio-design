---
title: Time Picker 时分选择器
nav:
  order: 2
  title: 组件
group:
  title: 功能组件
  order: 2
---

# Time Picker 时分选择器

## 定义

当用户需要输入一个时间，可以点击触发选框，弹出时间面板进行选择。

## 代码演示

<code src='./demo/base.tsx' title='演示' />

## 参数说明

### Modal

| 参数             | 说明                                | 类型     | 默认值            |
| ---------------- | ----------------------------------- | -------- | ----------------- |
| prefixCls        | prefixCls of this component         | String   | 'gio-time-picker' |
| disabled         | 是否禁用                            | Boolean  | false             |
| open             | timepicker 的显示或者隐藏           | Boolean  | false             |
| defaultValue     | 初始值                              | moment   | null              |
| defaultOpenValue | 打开时的初始值                      | moment   | moment()          |
| value            | 当前的值                            | moment   | null              |
| placeholder      | time input's placeholder            | String   | ''                |
| className        | time picker className               | String   | ''                |
| inputClassName   | time picker input element className | String   | ''                |
| id               | time picker id                      | String   | ''                |
| popupClassName   | time panel className                | String   | ''                |
| popupStyle       | customize popup style               | object   | {}                |
| showHour         | 是否显示小时                        | Boolean  | true              |  |
| showMinute       | 是否显示分钟                        | Boolean  | true              |
| showSecond       | 是否显示秒                          | Boolean  | true              |
| format           | moment format                       | String   | -                 |
| disabledHours    | disabled hour options               | Function | -                 |
| disabledMinutes  | disabled minute options             | Function | -                 |
| disabledSeconds  | disabled second options             | Function | -                 |
| onChange         | 选中时的回调                        | Function | null              |
