import has from 'lodash/has';
import get from 'lodash/get';
import { format, startOfToday, sub } from 'date-fns';
import { TimeMode } from './interfaces';
import { DATE_FORMAT, QUICK_MAPPING } from './constant';

export const parseTimeMode = (timeRange: string | undefined) => {
  if (!timeRange) {
    return undefined;
  }
  if (has(QUICK_MAPPING, timeRange)) {
    return 'quick';
  }
  const items = timeRange.split(':');
  switch (items[0]) {
    case 'since':
      return TimeMode.Since;
    case 'abs':
      return TimeMode.Absolute;
    case 'day':
      return TimeMode.Relative;
    default:
      return undefined;
  }
};

export const parseStartAndEndDate = (timeRange: string | undefined): [Date | undefined, Date | undefined] => {
  if (!timeRange || timeRange.split(':').length !== 2) {
    return [undefined, undefined];
  }
  const items = timeRange.split(':');
  const times = items[1].split(',').map((str) => parseInt(str, 10));
  const today = startOfToday();
  if (items[0] === 'since') {
    if (times.length === 1) {
      return [new Date(times[0]), today];
    }
    return [new Date(times[0]), sub(today, { days: times[1] })];
  }
  if (items[0] === 'abs') {
    return [new Date(times[0]), new Date(times[1])];
  }
  if (items[0] === 'day') {
    return [sub(today, { days: times[0] }), sub(today, { days: times[1] })];
  }
  return [undefined, undefined];
};

export const parseFixedMode = (timeRange: string | undefined) => {
  if (!timeRange || timeRange.split(':').length !== 2) {
    return false;
  }
  const items = timeRange.split(':');
  const times = items[1].split(',');
  if (items[0] === 'since') {
    if (times.length === 1 || times[1] === '0') {
      return 'today';
    }
    return 'yesterday';
  }
  if (items[0] === 'day' && times[1] === '1') {
    return 'yesterday';
  }
  return false;
};

export const humanizeTimeRange = (timeRange: string, defaultString = '时间范围') => {
  if (!timeRange || timeRange.split(':').length !== 2) {
    return defaultString;
  }
  if (has(QUICK_MAPPING, timeRange)) {
    return get(QUICK_MAPPING, timeRange);
  }
  const items = timeRange.split(':');
  const times = items[1].split(',').map((str) => parseInt(str, 10));
  if (items[0] === 'since') {
    const start = format(times[0], DATE_FORMAT);
    if (times.length === 1) {
      return `自 ${start} 至今日`;
    }
    return `自 ${start} 至昨日`;
  }
  if (items[0] === 'abs') {
    const start = format(times[0], DATE_FORMAT);
    const end = format(times[1], DATE_FORMAT);
    return `从 ${start} 至 ${end}`;
  }
  if (items[0] === 'day') {
    if (times[1] === 1) {
      return `过去 ${times[0] - times[1]} 天`;
    }
    return `过去 ${times[1]}-${times[0]} 天`;
  }
  return defaultString;
};

export default {
  parseTimeMode,
  parseStartAndEndDate,
  humanizeTimeRange,
};
