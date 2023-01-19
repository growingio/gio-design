import { isNumber } from 'lodash';
import momentTZ from 'moment-timezone';
import moment from 'moment';
import { format as dateFnsFormat, utcToZonedTime } from 'date-fns-tz';

momentTZ.tz.setDefault(localStorage.getItem('timezone') || Intl.DateTimeFormat().resolvedOptions().timeZone);
// 时间日期转换时区 moment
export const parseTimeZone = (data?: any, format?: string) =>
  momentTZ(data as string, format).tz(
    localStorage.getItem('timezone') || Intl.DateTimeFormat().resolvedOptions().timeZone
  );

// 时间日期转换时区 date-fns
export const parseFnsTimeZone = (date: number | Date | string | undefined, format: string) => {
  if (!date) return date;
  let finalDate = date;
  if (isNumber(date)) {
    finalDate = new Date(date);
  }

  return dateFnsFormat(
    utcToZonedTime(finalDate, localStorage.getItem('timezone') || Intl.DateTimeFormat().resolvedOptions().timeZone),
    format,
    {
      timeZone: localStorage.getItem('timezone') || Intl.DateTimeFormat().resolvedOptions().timeZone,
    }
  );
};

// 选择器时间字符串按时区转化
// 例: date: Fri Oct 21 2022 09:00:00 GMT+0800 (中国标准时间) format: 'yyyy-MM-DD' 浏览器TZ: 北京 localstorage: UTC;
// return Fri Oct 21 2022 17:00:00 GMT+0800 (中国标准时间)
export const exportDateToZonedDate = (date: any, format?: string) => {
  if (!date) return date;
  return new Date(
    momentTZ
      .tz(
        moment(date).format(format || 'yyyy-MM-DD HH:mm:ss'),
        localStorage.getItem('timezone') || Intl.DateTimeFormat().resolvedOptions().timeZone
      )
      .format()
  );
};
// 选择器时间字符串按local时区转化
// 例: date: Fri Oct 21 2022 09:00:00 GMT+0800 (中国标准时间) format: 'yyyy-MM-DD' 浏览器TZ: 北京 localstorage: UTC;
// return Fri Oct 21 2022 01:00:00 GMT+0800 (中国标准时间)
export const exportZonedDateToDate = (date: any, format?: string) => {
  if (!date) return date;
  const arr = momentTZ
    .tz(date, localStorage.getItem('timezone') || Intl.DateTimeFormat().resolvedOptions().timeZone)
    .format()
    .split('T');

  return new Date(moment(`${arr[0]} ${arr[1].substring(0, 8)}`).format(format || 'yyyy-MM-DD HH:mm:ss'));
};
