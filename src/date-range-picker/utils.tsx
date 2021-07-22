/* eslint-disable @typescript-eslint/ban-ts-comment */
import { RangeValue } from 'rc-picker/lib/interface';
import generateDateFns from 'rc-picker/lib/generate/dateFns';
import { getClosingViewDate } from 'rc-picker/lib/utils/dateUtil';
import { add, startOfToday } from 'date-fns';

export const getDefaultViewDates = () => [startOfToday(), add(startOfToday(), { months: 1 })] as [Date, Date];

export const calcClosingViewDate = (currentDate: Date, offset?: number) =>
  getClosingViewDate(currentDate, 'date', generateDateFns, offset);

export const mergeDates = (dates: RangeValue<Date>, currentDate: Date | undefined, index: number) => {
  if (index) {
    // @ts-ignore
    return [dates[0], currentDate] as RangeValue<Date>;
  }
  return [currentDate, null] as RangeValue<Date>;
};

export default {
  calcClosingViewDate,
  mergeDates,
};
