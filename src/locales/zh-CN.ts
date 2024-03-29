import type { Locale } from '@gio-design/utils';
import datePickerLocale from '../static-date-picker/locales/zh-CN';
import dateRangePickerLocale from '../static-date-range-picker/locales/zh-CN';
import listPickerLocale from '../list-picker/locales/zh-CN';
import modalLocale from '../modal/locales/zh-CN';
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
import basePicker from '../legacy/filter-picker/components/property-selector/components/base-picker/locales/zh-CN';
import propertyPickerLocale from '../legacy/filter-picker/components/property-selector/locales/zh-CN';
import popConfirmLocale from '../pop-confirm/locales/zh-CN';
import resultLocale from '../result/locales/zh-CN';
import treeSelectLocale from '../tree-select/locales/zh-CN';

export const locale: Locale = {
  code: 'zh-CN',
  DatePicker: {
    ...datePickerLocale,
  },
  DateRangePicker: {
    ...dateRangePickerLocale,
  },
  Result: {
    ...resultLocale,
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
  BasePicker: {
    ...basePicker,
  },
  PropertyPicker: {
    ...propertyPickerLocale,
  },
  PopConfirm: {
    ...popConfirmLocale,
  },
  TreeSelect: {
    ...treeSelectLocale,
  },
};

export default locale;
