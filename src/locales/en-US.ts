import type { Locale } from '@gio-design/utils';
import datePickerLocale from '../static-date-picker/locales/en-US';
import dateRangePickerLocale from '../static-date-range-picker/locales/en-US';
import listPickerLocale from '../list-picker/locales/en-US';
import modalLocale from '../modal/locales/en-US';
import PageLocale from '../page/locales/en-US';
import timePickerLocale from '../static-time-picker/locales/en-US';
import searchBarLocale from '../search-bar/locales/en-US';
import cascaderLocale from '../cascader/locales/en-US';
import paginationLocale from '../pagination/locales/en-US';
import tableLocale from '../table/locales/en-US';
import uploadLocale from '../upload/locales/en-US';
import staticPastTimePickerLocale from '../static-past-time-picker/locales/en-US';

export const locale: Locale = {
  code: 'en-US',
  DatePicker: {
    ...datePickerLocale,
  },
  DateRangePicker: {
    ...dateRangePickerLocale,
  },
  Page: {
    ...PageLocale,
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
  StaticPastTimePicker: {
    ...staticPastTimePickerLocale,
  },
};

export default locale;
