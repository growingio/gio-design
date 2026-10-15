import React from 'react';
import { getTime, isValid } from 'date-fns';
import { usePrefixCls, useLocale } from '@gio-design/utils';
import RangeContext from 'rc-picker/lib/RangeContext';
import DatePicker from '../static-date-picker';
import InnerRangePanel from './InnerRangePanel';
import { RangePickerProps } from './interfaces';
import { parseFnsTimeZone, exportDateToZonedDate, exportZonedDateToDate } from '../utils/timeHelper';
import { DATE_FORMAT } from './constant';
import {
  parseStartAndEndDate,
  isWholeWeek,
  getWeekRangeInTimezone,
  startOfThisWeekInTimezone,
  getDefaultWeekRange,
} from './utils';
import defaultLocale from './locales/zh-CN';

const parseWeekDates = (timeRange?: string): [Date, Date] => {
  const parsed = parseStartAndEndDate(timeRange);
  if (parsed[0] && parsed[1] && isWholeWeek(getTime(parsed[0]), getTime(parsed[1]))) {
    return [parsed[0], parsed[1]];
  }
  return getDefaultWeekRange();
};

function WeekRangePicker({ disabledDate, timeRange, onSelect, onCancel }: RangePickerProps) {
  const [weekDates, setWeekDates] = React.useState<[Date, Date]>(parseWeekDates(timeRange));
  const [viewDate, setViewDate] = React.useState<Date>(exportZonedDateToDate(weekDates[0]));
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
    const weekStart = getWeekRangeInTimezone(exportDateToZonedDate(current, 'yyyy-MM-DD'))[0];
    return weekStart.getTime() >= startOfThisWeekInTimezone().getTime();
  };

  const handleOnSelect = (date: Date) => {
    setWeekDates(getWeekRangeInTimezone(date));
  };

  const handleOnOK = () => {
    onSelect(`abs:${getTime(weekDates[0])},${getTime(weekDates[1])}`);
  };

  const renderHeader = () => (
    <span className={`${prefixCls}__text`}>
      {`${FromText} ${parseFnsTimeZone(weekDates[0], DATE_FORMAT)} ${ToText} ${parseFnsTimeZone(
        weekDates[1],
        DATE_FORMAT
      )}`}
    </span>
  );

  return (
    <InnerRangePanel
      data-testid="week-range-picker"
      disableOK={!isValid(weekDates[0]) || !isValid(weekDates[1])}
      header={renderHeader()}
      body={
        <RangeContext.Provider
          value={{
            inRange: false,
            rangedValue: [exportZonedDateToDate(weekDates[0]), exportZonedDateToDate(weekDates[1])],
            hoverRangedValue: undefined,
          }}
        >
          <DatePicker
            disabledDate={handleDisabledDate}
            viewDate={viewDate}
            onPanelChange={(value) => {
              setViewDate(value);
            }}
            onSelect={handleOnSelect}
          />
        </RangeContext.Provider>
      }
      onCancel={onCancel}
      onOK={handleOnOK}
    />
  );
}

export default WeekRangePicker;
