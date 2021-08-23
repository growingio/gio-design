import type { Locale } from '@gio-design/utils';
import datePickerLocale from '../date-picker/locales/zh-CN';

export const locale: Locale = {
  code: 'zh-CN',
  DatePicker: {
    ...datePickerLocale,
  },
};

export default locale;
