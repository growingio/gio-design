import React from 'react';
import { getTime, isValid, isAfter, startOfToday, subMonths, startOfDay } from 'date-fns';
import { usePrefixCls, useLocale } from '@gio-design/utils';
import { formatDates } from '../date-range-picker/index';
import StaticDateRangePicker from '../static-date-range-picker/index';
import InnerRangePanel from './InnerRangePanel';
import { RangePickerProps } from './interfaces';
import { parseStartAndEndDate } from './utils';
import defaultLocale from './locales/zh-CN';
import { exportDateToZonedDate } from '../utils/timeHelper';

function AbsoluteRangePicker({ disabledDate, timeRange, onSelect, onRangeSelect, onCancel }: RangePickerProps) {
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
    onSelect(
      `abs:${getTime(exportDateToZonedDate(dates[0] as Date))},${
        getTime(exportDateToZonedDate(dates[1] as Date)) + 86399999
      }`
    );
  };
  const handleOnSelect = (date: [Date, Date], index: number) => {
    setDates(date);
    onRangeSelect?.(date, index);
  }
  const endDay = dates[1] !== undefined && isValid(dates[1]) ? dates[1] : new Date();
  return (
    <InnerRangePanel
      disableOK={!isValid(dates[0]) || !isValid(dates[1])}
      header={renderHeader()}
      body={
        <StaticDateRangePicker
          defaultViewDates={[subMonths(startOfDay(endDay), 1), startOfDay(endDay)]}
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
