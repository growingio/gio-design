import React from 'react';
import { getTime, isValid, isAfter, startOfToday, subMonths, endOfDay, startOfDay } from 'date-fns';
import { usePrefixCls, useLocale } from '@gio-design/utils';
import { formatDates } from '../date-range-picker/index';
import StaticDateRangePicker from '../static-date-range-picker/index';
import InnerRangePanel from './InnerRangePanel';
import { RangePickerProps } from './interfaces';
import { parseStartAndEndDate } from './utils';
import defaultLocale from './locales/zh-CN';

function AbsoluteRangePicker({ disabledDate, timeRange, onSelect,onRangeSelect, onCancel }: RangePickerProps) {
  const [dates, setDates] = React.useState<[Date | undefined, Date | undefined]>(parseStartAndEndDate(timeRange));
  const prefixCls = usePrefixCls('range-panel__header');

  const locale = useLocale('StaticPastTimePicker');

  const { startDayText, endDayText, FromText, ToText } = {
    ...defaultLocale,
    ...locale,
  };

  const renderHeader = () => {
    const placeholder = [startDayText, endDayText];
    const dateString = formatDates(dates);
    const dateTexts = dateString?.split('-')?.map((d) => (d === ' ' ? undefined : d)) || [];
    const text = [dateTexts[0] ?? placeholder[0], dateTexts[1] ?? placeholder[1]];
    return <span className={`${prefixCls}__text`}>{`${FromText} ${text[0]} ${ToText} ${text[1]}`}</span>;
  };
  const handleDisabledDate = (current: Date) => disabledDate?.(current) || isAfter(current, startOfToday());
  const handleOnOK = () => {
    onSelect(`abs:${getTime(startOfDay(dates[0] as Date))},${getTime(endOfDay(dates[1] as Date))}`);
  };
  const handleOnSelect = (date: [Date, Date], index: number) => {
    setDates(date);
    onRangeSelect?.(date,index);
  }
  return (
    <InnerRangePanel
      disableOK={!isValid(dates[0]) || !isValid(dates[1])}
      header={renderHeader()}
      body={
        <StaticDateRangePicker
          defaultViewDates={[subMonths(startOfToday(), 1), startOfToday()]}
          disabledDate={handleDisabledDate}
          onSelect={handleOnSelect}
          value={dates as [Date, Date]}
        />
      }
      onCancel={onCancel}
      onOK={handleOnOK}
    />
  );
}

export default AbsoluteRangePicker;
