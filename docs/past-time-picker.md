# PastTimePicker 日期时间选择

PastTimePicker 和 PastTimePicker.Static 支持通过 `showTime` 在固定日期范围中选择时、分、秒。默认关闭，其他时间模式沿用原有行为。

## 使用

```tsx
const [range, setRange] = React.useState('day:8,1');

<PastTimePicker showTime value={range} onSelect={setRange} />;
```

选择“过去固定时段”后，双月日历下方显示开始、结束时间。点击时间框或时钟可打开时/分/秒面板，也可直接输入或点击右侧删除图标清空。

## API

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| showTime | boolean | false | 仅为“过去固定时段”启用秒级时间；支持带触发器及静态面板 |

`value`、`onSelect`、`onRangeSelect`、`onCancel`、`disabledDate`、`disabled`、`allowReset` 和模式配置沿用原有 API。`onRangeSelect` 仍只表示日历选日，时间编辑不会触发它。

## 值与边界

- 固定范围继续返回 `abs:<开始毫秒>,<结束毫秒>`，表示连续区间。
- 开始时间规范到该秒的 `.000`，结束时间规范到该秒的 `.999`，包含整个结束秒。消费方不要再额外添加一天。
- 时间采用 24 小时制 `HH:mm:ss`，不提供毫秒输入。
- 首次选择固定日期且尚未设置时间时，默认 `00:00:00` 至 `23:59:59`。重选日期会保留当前草稿的时分秒。
- 单端清空时，开始端按所选开始日 `00:00:00.000`，结束端按所选结束日 `23:59:59.999`。两端清空表示所选日期范围的全天。
- 时区沿用组件库配置：读取 `localStorage.timezone`，未配置时使用浏览器时区。
- 夏令时缺失的时间会被判为无效；重复小时中未修改的原绝对时间点会被保留。

## 校验与确认

- 非空输入须严格符合 `HH:mm:ss`，不自动裁剪首尾空白；不完整或超限输入会提示错误并禁用“确定”。
- 按完整日期时间比较起止顺序；同日开始晚于结束不能确认，跨日晚间至次日早晨可以确认。
- 选日、选时间和清空只修改草稿，主面板“确定”一次提交整个范围。
- 取消或关闭后重开恢复已确认值，包括 `destroyOnHide=false`。
- 受控值更新同步当前显示。开启 showTime 时，重开恢复已确认范围对应的模式。

## 国际化

新增时间标签、错误提示和面板名称随组件库语言包切换。`StaticPastTimePicker.clearTimeText` 可为 `(label: string) => string` 或字符串；函数接收开始/结束标签，字符串原样用于清空提示。未提供时使用默认文案。

## 示例与回归

- [With Time 示例](../src/past-time-picker/demos/PastTimePicker.stories.tsx)
- [时间边界、时区与夏令时测试](../src/static-past-time-picker/__tests__/absoluteTime.test.ts)
- [选择、校验、取消及旧模式兼容测试](../src/static-past-time-picker/__tests__/showTime.test.tsx)
