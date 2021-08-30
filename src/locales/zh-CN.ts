import type { Locale } from '@gio-design/utils';
import datePickerLocale from '../date-picker/locales/zh-CN';
import dateRangePickerLocale from '../date-range-picker/locales/zh-CN';

export const locale: Locale = {
  code: 'zh-CN',
  DatePicker: {
    ...datePickerLocale,
  },
  DateRangePicker: {
    ...dateRangePickerLocale,
  },
};

export default locale;
