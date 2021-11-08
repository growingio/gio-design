import React from 'react';
import { differenceInDays, startOfToday, startOfDay, isValid, isYesterday, startOfYesterday, isAfter } from 'date-fns';
import RelativeRangeBody from './RelativeRangeBody';
import RelativeRangeHeader from './RelativeRangeHeader';
import InnerRangePanel from './InnerRangePanel';
import { RangePickerProps } from './interfaces';
import { parseStartAndEndDate } from './utils';

function RelativeRangePciker({ disabledDate, timeRange, onSelect, onCancel }: RangePickerProps) {
  const defaultDates = parseStartAndEndDate(timeRange ?? 'day:2,1');
  const [dates, setDates] = React.useState<[Date, Date]>(defaultDates as [Date, Date]);
  const [endDateHidden, setEndDateHidden] = React.useState<boolean>(isYesterday(dates[1]));

  const handleDisabledDate = (current: Date) =>
    disabledDate?.(current) || isAfter(startOfDay(current), endDateHidden ? startOfYesterday() : startOfToday());
  const handleOnOK = () => {
    onSelect(`day:${differenceInDays(startOfToday(), dates[0])},${differenceInDays(startOfToday(), dates[1])}`);
  };
  return (
    <InnerRangePanel
      disableOK={!isValid(dates[0]) || !isValid(dates[1])}
      header={<RelativeRangeHeader dateRange={dates} onRangeChange={setDates} onModeChange={setEndDateHidden} />}
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
    />
  );
}

export default RelativeRangePciker;
