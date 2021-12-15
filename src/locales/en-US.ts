import type { Locale } from '@gio-design/utils';
import datePickerLocale from '../static-date-picker/locales/en-US';
import dateRangePickerLocale from '../static-date-range-picker/locales/en-US';
import listPickerLocale from '../list-picker/locales/en-US';
import modalLocale from '../modal/locales/en-US';
import pageLocale from '../page/locales/en-US';
import timePickerLocale from '../static-time-picker/locales/en-US';
import searchBarLocale from '../search-bar/locales/en-US';
import cascaderLocale from '../cascader/locales/en-US';
import paginationLocale from '../pagination/locales/en-US';
import tableLocale from '../table/locales/en-US';
import uploadLocale from '../upload/locales/en-US';
import staticPastTimePickerLocale from '../static-past-time-picker/locales/en-US';
import filterPickerLocale from '../legacy/filter-picker/locales/en-US';
import formLocale from '../form/locales/en-US';
import listLocale from '../list/locales/en-US';
import panelLocale from '../panel/locales/en-US';
import basePickerLocale from '../legacy/base-picker/locales/en-US';
import propertyPickerLocale from '../legacy/property-selector/locales/en-US';
import popConfirmLocale from '../popconfirm/locales/en-US';

export const locale: Locale = {
  code: 'en-US',
  DatePicker: {
    ...datePickerLocale,
  },
  DateRangePicker: {
    ...dateRangePickerLocale,
  },
  Page: {
    ...pageLocale,
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
  FilterPicker: {
    ...filterPickerLocale,
  },
  Form: {
    ...formLocale,
  },
  List: {
    ...listLocale,
  },
  Panel: {
    ...panelLocale,
  },
  BasePicker: {
    ...basePickerLocale,
  },
  PropertyPicker: {
    ...propertyPickerLocale,
  },
  PopConfirm: {
    ...popConfirmLocale,
  },
};

export default locale;
