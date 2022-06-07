import { Locale } from 'rc-picker/lib/interface';
import { StaticTimePickerProps } from '../static-time-picker/interfaces';
import { PopoverProps } from '../popover';
import { InputButtonProps } from '../input';

export type TimePickerLocale = Omit<Locale, 'locale'>;
export interface TimePickerProps
  extends Pick<StaticTimePickerProps, 'showSecond'>,
    Omit<InputButtonProps, 'value' | 'onSelect' | 'defaultValue'>,
    Omit<PopoverProps, 'placement' | 'prefixCls' | 'children' | 'content' | 'trigger'> {
  /**
   * 默认时间
   */
  defaultValue?: Date;
  /**
   * 国际化配置
   */
  locale?: TimePickerLocale;
  /**
   * 时间
   */
  value?: Date;
  /**
   * 日期发生变化的回调
   *
   * @param time - `Date` 类型的时间
   * @param timeString - `string` 类型的时间
   */
  onSelect?: (time: Date, timeString: string) => void;
  /**
   * 自定义触发器
   */
  trigger?: React.ReactElement;
  ['data-testid']?: string;
}
