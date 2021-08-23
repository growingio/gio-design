import type { Locale } from '@gio-design/utils';
import datePickerLocale from '../date-picker/locales/en-US';

export const locale: Locale = {
  code: 'en-US',
  DatePicker: {
    ...datePickerLocale,
  },
};

export default locale;
