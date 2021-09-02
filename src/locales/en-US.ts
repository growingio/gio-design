import type { Locale } from '@gio-design/utils';
import datePickerLocale from '../date-picker/locales/en-US';
import dateRangePickerLocale from '../date-range-picker/locales/en-US';
import dateRangeSelectorLocale from '../date-range-selector/locales/en-US';
import dateSelectorLocale from '../date-selector/locales/en-US';
import timePickerLocale from '../time-picker/locales/en-US';
import timeSelectorLocale from '../time-selector/locales/en-US';

export const locale: Locale = {
  code: 'en-US',
  DatePicker: {
    ...datePickerLocale,
  },
  DateRangePicker: {
    ...dateRangePickerLocale,
  },
  DateRangeSelector: {
    ...dateRangeSelectorLocale,
  },
  DateSelector: {
    ...dateSelectorLocale,
  },
  TimePicker: {
    ...timePickerLocale,
  },
  TimeSelector: {
    ...timeSelectorLocale,
  },
};

export default locale;
