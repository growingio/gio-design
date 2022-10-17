import { isNumber } from 'lodash';
import moment from 'moment-timezone';
import { format as dateFnsFormat } from 'date-fns-tz';

// 时间日期转换时区 moment
export const parseTimeZone = (data?: any, format?: string) =>
  moment(data as string, format).tz(localStorage.getItem('timezone') || 'UTC');

// 时间日期转换时区 date-fns
export const parseFnsTimeZone = (date: number | Date | string, format: string) => {
  let finalDate = date;
  if (isNumber(date)) {
    finalDate = new Date(date);
  }
  return dateFnsFormat(finalDate, format, {
    timeZone: localStorage.getItem('timezone') || 'UTC',
  });
};
