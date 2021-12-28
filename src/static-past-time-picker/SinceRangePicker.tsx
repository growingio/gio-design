import React from 'react';
import { format, getTime, startOfToday, startOfYesterday, startOfDay, isValid, isAfter } from 'date-fns';
import { usePrefixCls, useLocale } from '@gio-design/utils';
import SwitchGroup from '../switchGroup';
import DatePicker from '../static-date-picker';
import InnerRangePanel from './InnerRangePanel';
import { RangePickerProps } from './interfaces';
import { DATE_FORMAT } from './constant';
import { parseStartAndEndDate } from './utils';
import defaultLocale from './locales/zh-CN';

function SinceRangePicker({ disabledDate, timeRange, onSelect, onCancel, experimental, ...rest }: RangePickerProps) {
  const endDateKeys = ['today', experimental ? 'yesterday' : undefined];
  const dates = parseStartAndEndDate(timeRange);
  const prefixCls = usePrefixCls('range-panel__header');
  const [startDate, setStartDate] = React.useState<Date | undefined>(dates[0]);
  const [endKey, setEndKey] = React.useState(
    endDateKeys[timeRange && timeRange.split(':')[0] === 'since' ? 0 : 1] || 0
  );
  const locale = useLocale<typeof defaultLocale>('StaticPastTimePicker') || defaultLocale;

  const { startDayText, FromText, toTodayText, toYesterdayText } = {
    ...defaultLocale,
    ...locale,
  };

  const END_DATE_MAPPING: Record<string, string> = {
    today: toTodayText,
    yesterday: toYesterdayText,
  };

  const renderHeader = () => {
    const startDateString = startDate ? format(startDate, DATE_FORMAT) : startDayText;
    return (
      <>
        <span className={`${prefixCls}__text`}>{`${FromText} ${startDateString}`}</span>
        <span className={`${prefixCls}__options`}>
          <SwitchGroup
            size="small"
            defaultValue={endKey}
            onChange={(e) => {
              setEndKey(e.target.value);
            }}
          >
            {endDateKeys.map((o: string) => o && <SwitchGroup.Item value={o}>{END_DATE_MAPPING[o]}</SwitchGroup.Item>)}
          </SwitchGroup>
        </span>
      </>
    );
  };
  const handleDisabledDate = (current: Date) =>
    disabledDate?.(current) || isAfter(current, endKey === 'yesterday' ? startOfYesterday() : startOfToday());

  const handleOnOK = () => {
    onSelect(`${endKey === 'yesterday' ? 'since-lt-today' : 'since'}:${getTime(startOfDay(startDate as Date))}`);
  };
  return (
    <InnerRangePanel
      disableOK={!isValid(startDate)}
      header={renderHeader()}
      body={<DatePicker disabledDate={handleDisabledDate} value={startDate} onSelect={setStartDate} />}
      onCancel={onCancel}
      onOK={handleOnOK}
      {...rest}
    />
  );
}

export default SinceRangePicker;
