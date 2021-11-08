import { TimeMode } from './interfaces';

export const DATE_FORMAT = 'yyyy/MM/dd';

export const PICKER_OPTIONS: { label: string; value: TimeMode | 'quick' }[] = [
  { value: 'quick', label: '常用时间' },
  { value: TimeMode.Since, label: '自某天以后' },
  { value: TimeMode.Relative, label: '过去动态时段' },
  { value: TimeMode.Absolute, label: '过去固定时段' },
];

export const quickOptions = [
  [
    { value: 'day:1,0', label: '今日' },
    { value: 'week:1,0', label: '本周' },
    { value: 'month:1,0', label: '本月' },
    { value: 'quarter:1,0', label: '本季度' },
    { value: 'year:1,0', label: '今年' },
    { value: 'day:8,1', label: '过去 7 天' },
    { value: 'day:31,1', label: '过去 30 天' },
    { value: 'day:181,1', label: '过去 180 天' },
  ],
  [
    { value: 'day:2,1', label: '昨日' },
    { value: 'week:2,1', label: '上周' },
    { value: 'month:2,1', label: '上月' },
    { value: 'quarter:2,1', label: '上季度' },
    { value: 'year:2,1', label: '去年' },
    { value: 'day:15,1', label: '过去 14 天' },
    { value: 'day:91,1', label: '过去 90 天' },
    { value: 'day:366,1', label: '过去 365 天' },
  ],
];

export const experimentalQuickOptions = [
  [
    { value: 'hour:25,1', label: '过去 24 小时' },
    { value: 'hour:73,1', label: '过去 72 小时' },
  ],
  [{ value: 'hour:49,1', label: '过去 48 小时' }],
];

export const QUICK_MAPPING = {
  'day:1,0': '今日',
  'week:1,0': '本周',
  'month:1,0': '本月',
  'quarter:1,0': '本季度',
  'year:1,0': '今年',
  'day:8,1': '过去 7 天',
  'day:31,1': '过去 30 天',
  'day:181,1': '过去 180 天',
  'day:2,1': '昨日',
  'week:2,1': '上周',
  'month:2,1': '上月',
  'quarter:2,1': '上季度',
  'year:2,1': '去年',
  'day:15,1': '过去 14 天',
  'day:91,1': '过去 90 天',
  'day:366,1': '过去 365 天',
};

export const END_DATE_MAPPING: { [key: string]: string } = {
  today: '至今日',
  yesterday: '至昨日',
};

export default {
  DATE_FORMAT,
  experimentalQuickOptions,
  quickOptions,
  QUICK_MAPPING,
  END_DATE_MAPPING,
};
