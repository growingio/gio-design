# StaticPastTimePicker 新增「按周 / 按月选择时段」模式

## Summary

在 `past-time-picker` / `static-past-time-picker` 中新增两种模式：

- **按周选择时段（Week）**：单月日历，点击某天后整周（周一 00:00:00 ~ 周日 23:59:59.999）连带选中并高亮。
- **按月选择时段（Month）**：日历切换到月份模式（rc-picker `picker="month"`），点击选中整个月份。

原「过去固定时段」（Absolute）重命名为「按天选择时段」。三种模式确认后统一输出 `abs:{startMs},{endMs}` 表达式。

回显规则：对 `abs` 表达式判断起止是否为整月 / 整周，按 **按月 > 按周 > 按天** 的优先级选择对应模式回显。

约束：按周 / 按月选择都**不能包含本周 / 本月及以后**的日期（周最大为上周，月最大为上月）。

所有时间计算必须走配置时区（`localStorage.timezone`，缺失时取浏览器时区），与现有 `momentTZ` / `timeHelper` 保持一致。

## Current State Analysis

- 组件目录：`src/static-past-time-picker/`
  - [StaticPastTimePicker.tsx](file:///Users/yh/github/gio-design/src/static-past-time-picker/StaticPastTimePicker.tsx) 用 `SelectList` 渲染左侧模式列表（`PICKER_OPTIONS`），右侧按 `mode` 渲染 `QuickPicker` / `SinceRangePicker` / `RelativeRangePicker` / `AbsoluteRangePicker`。默认 `modes = [Since, Relative, Absolute]`。
  - [interfaces.ts](file:///Users/yh/github/gio-design/src/static-past-time-picker/interfaces.ts) 定义 `enum TimeMode { Absolute='absolute', Since='since', Relative='relative' }`。
  - [utils.ts](file:///Users/yh/github/gio-design/src/static-past-time-picker/utils.ts) 中 `parseTimeMode` 按 `timeRange.split(':')[0]` 判断模式（`abs` → `TimeMode.Absolute`）；`parseStartAndEndDate` 解析 `abs` 为 `[new Date(start), new Date(end)]`；`startOfTodayInTimezone` / `startOfYesterdayInTimezone` 已按配置时区计算。
  - [AbsoluteRangePicker.tsx](file:///Users/yh/github/gio-design/src/static-past-time-picker/AbsoluteRangePicker.tsx) 使用双月 `StaticDateRangePicker` 选起止日期，`onOK` 输出 `abs:${getTime(start)},${getTime(end)+86399999}`；`disabledDate` 限制不能晚于今天（或昨天）。
  - [InnerRangePanel.tsx](file:///Users/yh/github/gio-design/src/static-past-time-picker/InnerRangePanel.tsx) 是 header/body/footer 的通用容器（确定 / 取消）。
  - [locales/zh-CN.ts](file:///Users/yh/github/gio-design/src/static-past-time-picker/locales/zh-CN.ts) 内含 `absoluteRangePickerText: '过去固定时段'`，[locales/en-US.ts](file:///Users/yh/github/gio-design/src/static-past-time-picker/locales/en-US.ts) 对应 `'Past Date Range'`。`src/locales/*` 直接 spread 这两个文件，无需改动。
- 底层日历：`src/static-date-picker/DatePicker.tsx` 封装 rc-picker `PickerPanel`，当前 **硬编码** `picker='date'`（`const [mode] = useState<PickerMode>('date')`），并把非当前月单元格通过 `disabledDate` 屏蔽。通过 `exportDateToZonedDate` / `exportZonedDateToDate` 在「浏览器本地表示」与「配置时区 Date」之间转换。
- rc-picker 版本 `2.6.0`，内置 `MonthPanel`（`picker="month"`，单元格 `isSameMonth` 判定选中）与 `WeekPanel`。`MonthBody`/`DateBody` 读取 `RangeContext.rangedValue` 做区间高亮；区间样式（`-in-range` / `-range-start` / `-range-end`）定义在 [static-date-range-picker/style/index.less](file:///Users/yh/github/gio-design/src/static-date-range-picker/style/index.less#L22-L36)，且 [static-past-time-picker/style/index.ts](file:///Users/yh/github/gio-design/src/static-past-time-picker/style/index.ts) 已 import 该样式，故区间高亮可直接复用。
- 时区工具：[timeHelper.ts](file:///Users/yh/github/gio-design/src/utils/timeHelper.ts) 提供 `parseFnsTimeZone` / `exportDateToZonedDate` / `exportZonedDateToDate`。

## Proposed Changes

### 1. `src/static-past-time-picker/interfaces.ts`
在 `TimeMode` 枚举中新增：
```ts
export enum TimeMode {
  Absolute = 'absolute',
  Week = 'week',
  Month = 'month',
  Since = 'since',
  Relative = 'relative',
}
```
（枚举只增不改，保持既有字符串值不变。）

### 2. 国际化文案
- [locales/zh-CN.ts](file:///Users/yh/github/gio-design/src/static-past-time-picker/locales/zh-CN.ts)
  - `absoluteRangePickerText: '过去固定时段'` → `'按天选择时段'`（键名保持不变，减少改动面）。
  - 新增 `weekRangePickerText: '按周选择时段'`、`monthRangePickerText: '按月选择时段'`。
- [locales/en-US.ts](file:///Users/yh/github/gio-design/src/static-past-time-picker/locales/en-US.ts)
  - `absoluteRangePickerText: 'Past Date Range'` → `'Select by Day'`。
  - 新增 `weekRangePickerText: 'Select by Week'`、`monthRangePickerText: 'Select by Month'`。

### 3. `src/static-past-time-picker/utils.ts`
新增/修改工具函数（全部基于 `localStorage.timezone || Intl.DateTimeFormat().resolvedOptions().timeZone`）：

- 抽出一个内部常量 `TZ`（等价于现有重复表达式），供新函数复用（不改动现有 `startOfTodayInTimezone` 的引用写法）。
- `parseTimeMode`：`abs` 分支改为按优先级判定：
  ```ts
  case 'abs': {
    const [start, end] = timeRange.split(':')[1].split(',').map(Number);
    if (isWholeMonth(start, end)) return TimeMode.Month;
    if (isWholeWeek(start, end)) return TimeMode.Week;
    return TimeMode.Absolute;
  }
  ```
- `isWholeMonth(startMs, endMs)`：`momentTZ.tz(startMs, TZ)` 为该月 `startOf('month')` 且 `momentTZ.tz(endMs, TZ)` 为同一月 `endOf('month')`。
- `isWholeWeek(startMs, endMs)`：起为 `startOf('isoWeek')`（周一 00:00），终为 `endOf('isoWeek')`（周日 23:59:59.999）。
- `getWeekRangeInTimezone(zonedDate): [Date, Date]`：由「配置时区 Date」得到该周 `[周一 00:00, 周日 23:59:59.999]`（`momentTZ.tz(zonedDate, TZ).startOf/endOf('isoWeek')`）。
- `getMonthRangeInTimezone(zonedDate): [Date, Date]`：同上得到 `[1 号 00:00, 月末 23:59:59.999]`。
- `startOfThisWeekInTimezone()` / `startOfThisMonthInTimezone()`：用于 `disabledDate` 的上界（不可含本周 / 本月及以后）。
- `getDefaultWeekRange()`：默认选中「上周」（`startOfThisWeekInTimezone()` 往前 7 天所在周）。
- `getDefaultMonthRange()`：默认选中「上月」。

> 说明：`momentTZ.tz(Date, tz)` 用于「配置时区 Date」（其瞬间即该时区的墙钟时刻）；`momentTZ.tz(number, tz)` 用于 abs 毫秒时间戳。二者语义一致，均能得到正确的墙钟，再 `startOf/endOf` 后 `valueOf()` 即为正确的 UTC 毫秒。

### 4. `src/static-date-picker/DatePicker.tsx` + `interfaces.ts`
- `StaticDatePickerProps` 新增可选 `picker?: PickerMode`（`rc-picker/lib/interface` 类型）。
- `DatePicker` 改动：
  - `const [mode] = useState<PickerMode>('date')` → `const [mode] = useState<PickerMode>(picker ?? 'date')`；
  - `picker={mode}` → `picker={picker ?? 'date'}`（`mode` 仍用于 `currentPickerMode.current` 初值，使 `isOmittedDate` 在 month 模式下始终为 false，避免误禁用非当前月单元格）。
- 其余逻辑（`dateRender`、`exportZonedDateToDate` 等）不动，保持对既有调用方零影响。

### 5. 新增 `src/static-past-time-picker/WeekRangePicker.tsx`
结构复用 `InnerRangePanel`（确定 / 取消），单月 `src/static-date-picker`：

- 状态：`weekDates: [Date, Date]`（配置时区 Date 表示），初值 = `parseStartAndEndDate(timeRange)` 若为整周则用之，否则 `getDefaultWeekRange()`。
- `header`：`从 {parseFnsTimeZone(周一, 'yyyy/MM/dd')} 至 {parseFnsTimeZone(周日, 'yyyy/MM/dd')}`，复用 `range-panel__header__text` 样式与 `FromText/ToText`。
- `disabledDate(current)`：先叠加外部 `disabledDate`；再禁用「所在周起始 >= `startOfThisWeekInTimezone()`」的日期（即本周及以后全部不可选）。用 `getWeekRangeInTimezone(panelDate)[0]` 与本周起点比较。
  - 注意 `disabledDate` 收到的是面板坐标（浏览器本地表示）日期，需先 `exportDateToZonedDate(current, 'yyyy-MM-DD')` 转成配置时区 Date 再计算。
- `body`：
  ```tsx
  <RangeContext.Provider
    value={{ inRange: true, panelPosition: undefined, rangedValue, hoverRangedValue: undefined }}
  >
    <DatePicker
      disabledDate={handleDisabledDate}
      defaultValue={exportZonedDateToDate(weekStart)}   // 仅用于把初始视图定位到该周所在月
      onSelect={handleOnSelect}
    />
  </RangeContext.Provider>
  ```
  - `rangedValue = [exportZonedDateToDate(周一), exportZonedDateToDate(周日)]`（面板坐标），从而整周命中 `-in-range` / `-range-start` / `-range-end` 高亮（复用 range 样式）。
  - `handleOnSelect(zonedDate)`：`setWeekDates(getWeekRangeInTimezone(zonedDate))`。
- `onOK`：`onSelect(\`abs:${getTime(周一)},${getTime(周日)}\`)`，其中周日已含 `23:59:59.999`。`disableOK` 同现有组件按有效性判断。

### 6. 新增 `src/static-past-time-picker/MonthRangePicker.tsx`
- 状态：`monthDates: [Date, Date]`，初值 = `parseStartAndEndDate(timeRange)` 若为整月则用之，否则 `getDefaultMonthRange()`。
- `header`：`从 {1 号} 至 {月末}`。
- `disabledDate`：外部 `disabledDate` + 禁用「`momentTZ.tz(zonedDate, TZ)` 所在月起始 >= `startOfThisMonthInTimezone()`」的日期。rc-picker 对 month 单元格是「整月每一天都 disabled 才禁用」，因此按「月 >= 本月」判定即可整月禁用。
- `body`：
  ```tsx
  <DatePicker
    picker="month"
    value={exportZonedDateToDate(monthStart)}           // 受控，点击后高亮跟随
    disabledDate={handleDisabledDate}
    onSelect={handleOnSelect}
  />
  ```
  - `onSelect(zonedDate)` → `setMonthDates(getMonthRangeInTimezone(zonedDate))`。
  - `value` 用月首日（受控），`isSameMonth` 保证选中月份高亮；`disabledDate` 保证 1 号单元格随 viewDate 变化仍可用。
- `onOK`：`onSelect(\`abs:${getTime(1 号)},${getTime(月末)}\`)`。

### 7. `src/static-past-time-picker/StaticPastTimePicker.tsx`
- 默认 `modes` 增加新模式：`[TimeMode.Since, TimeMode.Relative, TimeMode.Absolute, TimeMode.Week, TimeMode.Month]`。
- `PICKER_OPTIONS` 顺序（按天 → 按周 → 按月）：
  ```tsx
  { value: 'quick', label: quickPickerText },
  { value: TimeMode.Since, label: sinceRangePickerText },
  { value: TimeMode.Relative, label: relativeRangePickerText },
  { value: TimeMode.Absolute, label: absoluteRangePickerText },   // 按天选择时段
  { value: TimeMode.Week, label: weekRangePickerText },           // 按周选择时段
  { value: TimeMode.Month, label: monthRangePickerText },         // 按月选择时段
  ```
- `renderPicker` 新增 `case TimeMode.Week` / `case TimeMode.Month`，分别渲染 `WeekRangePicker` / `MonthRangePicker`，并透传 `disabledDate / experimental / timeRange / onSelect / onCancel / NotAvailableToday`（与既有 case 一致）。

### 8. 无需改动
- [PastTimePicker.tsx](file:///Users/yh/github/gio-design/src/past-time-picker/PastTimePicker.tsx)：`modes` 透传、`humanizeTimeRange` 已对 `abs` 通用输出「从 x 至 y」，新模式天然可用。
- `src/locales/*`：spread 组件 locale，自动生效。

## Assumptions & Decisions

- **周起始固定为周一**，与语言无关（不使用 rc-picker `WeekPanel`，因其周起始随 locale 变化）。周高亮复用 range 区间样式。
- **月模式使用 rc-picker `picker="month"`** 月份面板。
- 新模式 **默认显示**（默认 `modes` 增加 Week / Month）。
- 左侧列表顺序为 **按天 → 按周 → 按月**。
- 三种模式确认后统一输出 `abs:{startMs},{endMs}`；`end` 一律为当天/当周/当月最后一毫秒（`.999`），与现有 day 模式格式一致，保证 `isWholeMonth` / `isWholeWeek` 可稳定识别。
- 回显优先级 **按月 > 按周 > 按天**。
- `NotAvailableToday` 对 week/month 模式无额外影响（本周 / 本月约束已覆盖）。
- 向后兼容：非整月 / 非整周的 `abs` 区间仍回显 `TimeMode.Absolute`（按天），旧数据行为不变。

## Verification

1. 类型 / 编译：`yarn tsc --noEmit`（或 `yarn lint`）确认无类型错误。
2. 单元验证 `utils`：为 `isWholeMonth` / `isWholeWeek` / `getWeekRangeInTimezone` / `getMonthRangeInTimezone` 手写临时校验（例如 2022-09（9/1~9/30）、2022-10-03~10-09 整周），核对 `parseTimeMode` 返回值；验证完删除临时脚本。
3. 组件行为（Storybook 或本地页面）：
   - 模式列表出现「按天选择时段 / 按周选择时段 / 按月选择时段」。
   - 周模式：点击任意可选日期 → 整周高亮；本周及以后日期禁用；确定输出 `abs` 起止为周一 00:00:00 ~ 周日 23:59:59.999。
   - 月模式：日历显示月份网格；本月及以后月份禁用；确定输出该月首末毫秒。
   - 回显：分别传入整月 / 整周 / 普通区间的 `abs` 值，确认依次进入 按月 / 按周 / 按天 模式；传入非整周整月的 `abs` 仍为按天。
   - 时区：切换 `localStorage.timezone`（如 `Asia/Shanghai` 与 `UTC`）后，输出的 `abs` 起止跨时区一致（同一日历日/周/月）。
4. 回归：`AbsoluteRangePicker`（按天）双月区间选择与 `since` / `relative` / `quick` 行为不变。
