export interface DatePickerProps {
  /**
   * 不可选择的日期
   *
   * @param date - 当前日期 `Date`
   * @return 当前日期可选择返回 `false`，不可选择返回 `true`
   */
  disabledDate?: (date: Date) => boolean;
  /**
   * 日期发生变化时的回调
   *
   * @param value - 选择的日期 `Date`
   */
  onSelect?: (value: Date) => void;
}
