import React from 'react';
import { differenceInDays, startOfToday, startOfDay, isValid, isYesterday, startOfYesterday, isAfter } from 'date-fns';
import { isNil } from 'lodash';
import RelativeRangeBody from './RelativeRangeBody';
import RelativeRangeHeader from './RelativeRangeHeader';
import InnerRangePanel from './InnerRangePanel';
import { RangePickerProps } from './interfaces';
import { startOfTodayInTimezone, parseStartAndEndDate } from './utils';

function RelativeRangePicker({ disabledDate, timeRange, onSelect, onCancel, ...rest }: RangePickerProps) {
  const defaultDates = parseStartAndEndDate(timeRange ?? 'day:2,1');
  const [dates, setDates] = React.useState<[Date, Date]>(defaultDates as [Date, Date]);
  const [endDateHidden, setEndDateHidden] = React.useState<boolean>(isYesterday(dates[1]));
  const inputDisabled = !isNil(disabledDate);
  const handleDisabledDate = (current: Date) =>
    disabledDate?.(current) || isAfter(startOfDay(current), endDateHidden ? startOfYesterday() : startOfToday());
  const handleOnOK = () => {
    onSelect(
      `day:${differenceInDays(startOfTodayInTimezone(), dates[0]) + 1},${differenceInDays(
        startOfTodayInTimezone(),
        dates[1]
      )}`
    );
  };
  return (
    <InnerRangePanel
      data-testid="relative-range-picker"
      disableOK={!isValid(dates[0]) || !isValid(dates[1])}
      header={
        <RelativeRangeHeader
          inputDisabled={inputDisabled}
          dateRange={dates}
          onRangeChange={setDates}
          onModeChange={setEndDateHidden}
        />
      }
      body={
        <RelativeRangeBody
          dateRange={dates}
          fixedMode={endDateHidden}
          disabledDate={handleDisabledDate}
          onRangeChange={setDates}
        />
      }
      onCancel={onCancel}
      onOK={handleOnOK}
      {...rest}
    />
  );
}

export default RelativeRangePicker;
