import { CommonProps } from '@gio-design/utils';
import { DateRangePickerProps } from '../date-range-picker';
import { InputTriggerProps } from '../selector/interfaces';

export type NullableDate = Date | undefined;
export type NullableString = string | undefined;

export interface RangeInputTriggerProps
  extends CommonProps,
  Pick<InputTriggerProps, 'actived' | 'borderless' | 'disabled' | 'size'> {
  /**
   * 清空选择框的回调
   */
  onClear?: () => void;
  /**
   * 选择框提示文字
   */
  placeholder?: [NullableString, NullableString];
  /**
   * 选择框显示的文字
   */
  value?: [NullableString, NullableString];
}

export interface DateRangeSelectorProps
  extends CommonProps,
  Pick<RangeInputTriggerProps, 'borderless' | 'disabled' | 'placeholder' | 'size' | 'onClear'>,
  Pick<DateRangePickerProps, 'disabledDate'> {
  /**
   * 默认选择的日期
   */
  defaultValue?: [NullableDate, NullableDate];
  /**
   * 日期格式，参考 [Unicode Technical Standard #35](https://www.unicode.org/reports/tr35/tr35-dates.html#Date_Field_Symbol_Table)
   */
  format?: string;
  /**
   * 选择日期时的回调
   *
   * @param dates - 选择的日期 `[Date, Date]`
   * @param dateStrings - 格式化后的日期 `[string, string]`
   */
  onSelect?: (dates: [NullableDate, NullableDate], dateStrings: [NullableString, NullableString]) => void;
  /**
   * 选择的日期
   */
  value?: [NullableDate, NullableDate];
}
