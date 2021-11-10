import React from 'react';
import { startOfDay, startOfToday, startOfYesterday, subMonths } from 'date-fns';
import DatePicker from '../static-date-picker';
import DateRangePicker from '../static-date-range-picker';
import { RelativeRangeBodyProps } from './interfaces';

function RelativeRangeBody({ dateRange, fixedMode, onRangeChange, disabledDate }: RelativeRangeBodyProps) {
  if (fixedMode) {
    const handleOnSelect = (current: Date) => {
      onRangeChange([startOfDay(current), startOfYesterday()]);
    };
    return <DatePicker disabledDate={disabledDate} value={dateRange[0]} onSelect={handleOnSelect} />;
  }
  return (
    <DateRangePicker
      defaultViewDates={[subMonths(startOfToday(), 1), startOfToday()]}
      disabledDate={disabledDate}
      onSelect={onRangeChange}
      value={dateRange as [Date, Date]}
    />
  );
}

export default RelativeRangeBody;
