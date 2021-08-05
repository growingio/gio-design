import { TimePickerProps } from '../time-picker/interfaces';
import { SelectorProps } from '../selector';

export interface TimeSelectorProps
  extends Pick<TimePickerProps, 'showSecond'>,
    Pick<SelectorProps, 'borderless' | 'disabled' | 'fitContent' | 'placeholder' | 'size'> {
  /**
   * 默认时间
   */
  defaultValue?: Date;
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
}
