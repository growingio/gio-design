import format from 'date-fns/format';
import { DATE_FORMAT } from '../date-selector/constant';
import { NullableDate, NullableString } from './interfaces';

/**
 * 根据传入的格式，来格式化日期数组，如果不传入格式，使用 `yyyy/MM/dd`。
 *
 * @param dates - 需要格式化的日期数组，数组只能有两个元素 `[Date, Date]`
 * @param formatString - 日期的格式 `string`
 * @returns 格式化后的字符串数组 `[string, string]`
 */
export const formatDates = (
  dates: [NullableDate, NullableDate],
  formatString?: string
): [NullableString, NullableString] => {
  const strongFormat = (date: NullableDate) => (date ? format(date, formatString ?? DATE_FORMAT) : undefined);
  return [strongFormat(dates[0]), strongFormat(dates[1])] as [string, string];
};

export default {
  formatDates,
};
