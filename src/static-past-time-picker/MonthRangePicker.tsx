import React from 'react';
import { getTime, isValid } from 'date-fns';
import { usePrefixCls, useLocale } from '@gio-design/utils';
import DatePicker from '../static-date-picker';
import InnerRangePanel from './InnerRangePanel';
import { RangePickerProps } from './interfaces';
import { parseFnsTimeZone, exportDateToZonedDate } from '../utils/timeHelper';
import { DATE_FORMAT } from './constant';
import {
  parseStartAndEndDate,
  isWholeMonth,
  getMonthRangeInTimezone,
  startOfThisMonthInTimezone,
  getDefaultMonthRange,
} from './utils';
import defaultLocale from './locales/zh-CN';

const parseMonthDates = (timeRange?: string): [Date, Date] => {
  const parsed = parseStartAndEndDate(timeRange);
  if (parsed[0] && parsed[1] && isWholeMonth(getTime(parsed[0]), getTime(parsed[1]))) {
    return [parsed[0], parsed[1]];
  }
  return getDefaultMonthRange();
};

function MonthRangePicker({ disabledDate, timeRange, onSelect, onCancel }: RangePickerProps) {
  const [monthDates, setMonthDates] = React.useState<[Date, Date]>(parseMonthDates(timeRange));
  const prefixCls = usePrefixCls('range-panel__header');

  const locale = useLocale('StaticPastTimePicker');

  const { FromText, ToText } = {
    ...defaultLocale,
    ...locale,
  };

  const handleDisabledDate = (current: Date) => {
    if (disabledDate?.(current)) {
      return true;
    }
    const monthStart = getMonthRangeInTimezone(exportDateToZonedDate(current, 'yyyy-MM-DD'))[0];
    return monthStart.getTime() >= startOfThisMonthInTimezone().getTime();
  };

  const handleOnSelect = (date: Date) => {
    setMonthDates(getMonthRangeInTimezone(date));
  };

  const handleOnOK = () => {
    onSelect(`abs:${getTime(monthDates[0])},${getTime(monthDates[1])}`);
  };

  const renderHeader = () => (
    <span className={`${prefixCls}__text`}>
      {`${FromText} ${parseFnsTimeZone(monthDates[0], DATE_FORMAT)} ${ToText} ${parseFnsTimeZone(
        monthDates[1],
        DATE_FORMAT
      )}`}
    </span>
  );

  return (
    <InnerRangePanel
      data-testid="month-range-picker"
      disableOK={!isValid(monthDates[0]) || !isValid(monthDates[1])}
      header={renderHeader()}
      body={
        <DatePicker
          picker="month"
          value={monthDates[0]}
          disabledDate={handleDisabledDate}
          onSelect={handleOnSelect}
        />
      }
      onCancel={onCancel}
      onOK={handleOnOK}
    />
  );
}

export default MonthRangePicker;
