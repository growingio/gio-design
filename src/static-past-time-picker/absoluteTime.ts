import { isValid } from 'date-fns';
import { parseTimeZone } from '../utils/timeHelper';
import { parseStartAndEndDate } from './utils';

const TIME_PATTERN = /^([01]\d|2[0-3]):[0-5]\d:[0-5]\d$/;
export const DEFAULT_START_TIME = '00:00:00';
export const DEFAULT_END_TIME = '23:59:59';

export const isValidTimeText = (text: string) => text === '' || TIME_PATTERN.test(text);

export const getAbsoluteTimeTexts = (timeRange?: string): [string, string] => {
  const [start, end] = parseStartAndEndDate(timeRange);
  return [
    timeRange?.startsWith('abs:') && isValid(start) ? parseTimeZone(start).format('HH:mm:ss') : DEFAULT_START_TIME,
    timeRange?.startsWith('abs:') && isValid(end) ? parseTimeZone(end).format('HH:mm:ss') : DEFAULT_END_TIME,
  ];
};

export const getCalendarDate = (date?: Date): Date | undefined =>
  isValid(date) ? parseTimeZone(date).startOf('day').toDate() : undefined;

export const getAbsoluteDateTime = (date: Date | undefined, text: string, isEnd: boolean): Date | undefined => {
  if (!isValid(date) || !isValidTimeText(text)) return undefined;
  const time = text || (isEnd ? DEFAULT_END_TIME : DEFAULT_START_TIME);
  const current = parseTimeZone(date);
  // Keep the selected instant when a repeated daylight-saving hour is unchanged.
  if (current.format('HH:mm:ss') === time) return current.millisecond(isEnd ? 999 : 0).toDate();
  const [hour, minute, second] = time.split(':').map(Number);
  const result = parseTimeZone(date)
    .startOf('day')
    .set({ hour, minute, second, millisecond: isEnd ? 999 : 0 });
  // Reject times skipped by a daylight-saving transition instead of silently moving the input.
  return result.isValid() && result.format('HH:mm:ss') === time ? result.toDate() : undefined;
};
