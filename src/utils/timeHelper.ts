import { isNumber } from 'lodash';
import momentTZ from 'moment-timezone';
import moment from 'moment';
import { format as dateFnsFormat } from 'date-fns-tz';

// 时间日期转换时区 moment
export const parseTimeZone = (data?: any, format?: string) =>
  momentTZ(data as string, format).tz(localStorage.getItem('timezone') || 'UTC');

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

// 选择器时间按时区转化
// 例: date: Fri Oct 21 2022 09:00:00 GMT+0800 (中国标准时间) format: 'yyyy-MM-DD';
// return
export const exportDateToZonedDate = (date: any, format?: string) => {
  if (!date) return date;
  return new Date(
    momentTZ.tz(moment(date).format(format || 'yyyy-MM-DD'), localStorage.getItem('timezone') || 'UTC').format()
  );
};
