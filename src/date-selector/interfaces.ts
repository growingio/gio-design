import { DatePickerProps } from '../date-picker';
import { SelectorProps } from '../selector';

export interface DateSelectorProps
  extends Pick<DatePickerProps, 'disabledDate'>,
    Pick<SelectorProps, 'borderless' | 'disabled' | 'fitContent' | 'placeholder' | 'size'> {
  /**
   * 日期格式，参考 [Unicode Technical Standard #35](https://www.unicode.org/reports/tr35/tr35-dates.html#Date_Field_Symbol_Table)
   */
  format?: string;
  /**
   * 默认日期
   */
  defaultValue?: Date;
  /**
   * 日期
   */
  value?: Date;
  /**
   * 日期发生变化的回调
   *
   * @param date - `Date` 类型的日期
   * @param dateString - `string` 类型的日期
   */
  onSelect?: (date: Date, dateString: string) => void;
}
