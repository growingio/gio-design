import { CommonProps } from '@gio-design/utils/es/interfaces';
import { DatePickerProps } from '../date-picker';

export interface DateRangePickerProps extends CommonProps, Pick<DatePickerProps, 'disabledDate'> {
  onDateMouseEnter?: (date: Date, index: number) => void;
  onDateMouseLeave?: (index: number) => void;
  onSelect?: (dates: [Date, Date]) => void;
}
