import type { Locale } from '@gio-design/utils';
import datePickerLocale from '../static-date-picker/locales/zh-CN';
import dateRangePickerLocale from '../static-date-range-picker/locales/zh-CN';
import listPickerLocale from '../list-picker/locales/zh-CN';
import modalLocale from '../modal/locales/zh-CN';
import pageLocale from '../page/locales/zh-CN';
import timePickerLocale from '../time-picker/locales/zh-CN';
import searchBarLocale from '../search-bar/locales/zh-CN';
import cascaderLocale from '../cascader/locales/zh-CN';
import paginationLocale from '../pagination/locales/zh-CN';
import tableLocale from '../table/locales/zh-CN';
import uploadLocale from '../upload/locales/zh-CN';
import staticPastTimePickerLocale from '../static-past-time-picker/locales/zh-CN';
import filterPickerLocale from '../legacy/filter-picker/locales/zh-CN';
import formLocale from '../form/locales/zh-CN';
import listLocale from '../list/locales/zh-CN';
import panelLocale from '../panel/locales/zh-CN';
import basePicker from '../legacy/base-picker/locales/zh-CN';
import propertyPickerLocale from '../legacy/property-selector/locales/zh-CN';

export const locale: Locale = {
  code: 'zh-CN',
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
    ...basePicker,
  },
  PropertyPicker: {
    ...propertyPickerLocale,
  },
};

export default locale;
