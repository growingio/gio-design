import { CommonProps } from '@gio-design/utils/es/interfaces';
import { PanelMode } from 'rc-picker/lib/interface';

export interface DatePickerProps extends CommonProps {
  /**
   * 默认选择的日期
   */
  defaultValue?: Date;
  /**
   * 默认可见日历中的日期
   */
  defaultViewDate?: Date;
  /**
   * 不可选择的日期
   *
   * @param date - 当前日期 `Date`
   * @return 当前日期可选择返回 `false`，不可选择返回 `true`
   */
  disabledDate?: (date: Date) => boolean;
  /**
   * 日历面板切换的回调
   *
   * @param value - 当前日期 `Date`
   * @param mode - 当前模式，目前只会是 `date` 模式
   */
  onPanelChange?: (value: Date, mode: PanelMode) => void;
  /**
   * 日期发生变化时的回调
   *
   * @param value - 选择的日期 `Date`
   */
  onSelect?: (value: Date) => void;
  /**
   * 选择的日期
   */
  value?: Date;
  /**
   * 可见日历中的日期
   */
  viewDate?: Date;
}
