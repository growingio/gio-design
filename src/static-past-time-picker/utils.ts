import has from 'lodash/has';
import { startOfToday, sub, startOfYesterday } from 'date-fns';
import { TimeMode } from './interfaces';
import { QUICK_MAPPING } from './constant';

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
    case 'since-lt-today':
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
  const yesterday = startOfYesterday();
  if (items[0] === 'since') {
    if (times.length === 1) {
      return [new Date(times[0]), today];
    }
    return [new Date(times[0]), sub(today, { days: times[1] })];
  }
  if (items[0] === 'since-lt-today') {
    if (times.length === 1) {
      return [new Date(times[0]), yesterday];
    }
    return [new Date(times[0]), sub(yesterday, { days: times[1] })];
  }
  if (items[0] === 'abs') {
    return [new Date(times[0]), new Date(times[1])];
  }
  if (items[0] === 'day') {
    return [sub(today, { days: times[0] - 1 }), sub(today, { days: times[1] })];
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

export default {
  parseTimeMode,
  parseStartAndEndDate,
};
