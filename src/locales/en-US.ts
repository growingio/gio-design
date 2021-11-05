import type { Locale } from '@gio-design/utils';
import datePickerLocale from '../date-picker/locales/en-US';
import dateRangePickerLocale from '../date-range-picker/locales/en-US';
import dateRangeSelectorLocale from '../date-range-selector/locales/en-US';
import dateSelectorLocale from '../date-selector/locales/en-US';
import emptyLocale from '../empty/locales/en-US';
import listPickerLocale from '../list-picker/locales/en-US';
import modalLocale from '../legacy/modal/locales/en-US';
import timePickerLocale from '../static-time-picker/locales/en-US';
import timeSelectorLocale from '../time-selector/locales/en-US';
import searchBarLocale from '../legacy/search-bar/locales/en-US';
import cascaderLocale from '../legacy/cascader/locales/en-US';
import paginationLocale from '../legacy/pagination/locales/en-US';
import tableLocale from '../legacy/table/locales/en-US';
import uploadLocale from '../upload/locales/en-US';

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
  Pagination: {
    ...paginationLocale,
  },
  Table: {
    ...tableLocale,
  },
  Upload: {
    ...uploadLocale,
  },
};

export default locale;
