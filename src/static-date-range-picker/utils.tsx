import { RangeValue } from 'rc-picker/lib/interface';
import generateDateFns from 'rc-picker/lib/generate/dateFns';
import { getClosingViewDate } from 'rc-picker/lib/utils/dateUtil';
import { add, startOfDay } from 'date-fns';

export const getDefaultViewDates = (defaultDate: Date) =>
  [startOfDay(defaultDate), add(startOfDay(defaultDate), { months: 1 })] as [Date, Date];

// eslint-disable
export const calcClosingViewDate = (currentDate: Date, offset?: number) =>
  getClosingViewDate(currentDate, 'date', generateDateFns, offset);

export const mergeDates = (dates: RangeValue<Date>, currentDate: Date | undefined, index: number) => {
  if (index && dates) {
    return [dates[0], currentDate] as RangeValue<Date>;
  }
  return [currentDate, null] as RangeValue<Date>;
};

export default {
  calcClosingViewDate,
  mergeDates,
};
