import type { Locale } from '@gio-design/utils';
import datePickerLocale from '../date-picker/locales/zh-CN';
import dateRangePickerLocale from '../date-range-picker/locales/zh-CN';
import dateRangeSelectorLocale from '../date-range-selector/locales/zh-CN';
import dateSelectorLocale from '../date-selector/locales/zh-CN';
import emptyLocale from '../empty/locales/zh-CN';
import listPickerLocale from '../list-picker/locales/zh-CN';
import modalLocale from '../modal/locales/zh-CN';
import timePickerLocale from '../time-picker/locales/zh-CN';
import timeSelectorLocale from '../time-selector/locales/zh-CN';
import searchBarLocale from '../search-bar/locales/zh-CN';
import cascaderLocale from '../cascader/locales/zh-CN';

export const locale: Locale = {
  code: 'zh-CN',
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
  Empty: {
    ...emptyLocale,
  },
  ListPicker: {
    ...listPickerLocale,
  },
  Modal: {
    ...modalLocale,
  },
  TimePicker: {
    ...timePickerLocale,
  },
  TimeSelector: {
    ...timeSelectorLocale,
  },
  SearchBar: {
    ...searchBarLocale,
  },
  Cascader: {
    ...cascaderLocale,
  },
};

export default locale;
