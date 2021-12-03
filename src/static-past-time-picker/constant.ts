import defaultLocaleText from './locales/zh-CN';

export const DATE_FORMAT = 'yyyy/MM/dd';

export const experimentalQuickOptions = (localeText: typeof defaultLocaleText) => [
  [
    { value: 'hour:25,1', label: localeText.lastSomeHours?.(24) },
    { value: 'hour:73,1', label: localeText.lastSomeHours?.(72) },
  ],
  [{ value: 'hour:49,1', label: localeText.lastSomeHours?.(48) }],
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

  END_DATE_MAPPING,
};
