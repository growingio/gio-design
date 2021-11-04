import { CommonProps } from '@gio-design/utils';
import { Locale } from 'rc-picker/lib/interface';
import { DatePickerProps } from '../date-picker';

export type DateRangePickerLocale = Omit<Locale, 'locale'>;

export interface DateRangePickerProps extends CommonProps, Pick<DatePickerProps, 'disabledDate'> {
  /**
   * 默认选择的日期
   */
  defaultValue?: [Date, Date];
  /**
   * 默认可见日历中的日期
   */
  defaultViewDates?: [Date, Date];
  /**
   * 国际化配置
   */
  locale?: DateRangePickerLocale;
  /**
   * 鼠标进入日期单元格的触发事件的回调
   *
   * @param date - 鼠标进入的单元格中的日期，`Date`
   * @param index - 当前待设置日期的索引，只会有 `0` 和 `1`，`number`
   */
  onDateMouseEnter?: (date: Date, index: number) => void;
  /**
   * 鼠标离开日期单元格的触发事件的回调
   *
   * @param index - 当前待设置日期的索引，只会有 `0` 和 `1`，`number`
   */
  onDateMouseLeave?: (index: number) => void;
  /**
   * 选择日期时的回调，只要选择一个日期就会触发回调
   *
   * @param dates - 选择的日期 `[Date, Date]`
   * @param index - 选择日期的在 `dates` 中的索引，只会有 `0` 和 `1`，`number`
   */
  onSelect?: (dates: [Date, Date], index: number) => void;
  /**
   * 选择的日期
   */
  value?: [Date, Date];
}
