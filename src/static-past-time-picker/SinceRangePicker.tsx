import React from 'react';
import { getTime, startOfToday, startOfYesterday, isValid, isAfter } from 'date-fns';
import { usePrefixCls, useLocale } from '@gio-design/utils';
import { parseFnsTimeZone } from '../utils/timeHelper';
import Switch from '../switch';
import DatePicker from '../static-date-picker';
import InnerRangePanel from './InnerRangePanel';
import { RangePickerProps } from './interfaces';
import { DATE_FORMAT } from './constant';
import { parseStartAndEndDate } from './utils';
import defaultLocale from './locales/zh-CN';

function SinceRangePicker({
  disabledDate,
  timeRange,
  onSelect,
  onCancel,
  experimental,
  NotAvailableToday,
  defaultTimeRange,
  allowReset,
  ...rest
}: RangePickerProps) {
  const endDateKeys = [!NotAvailableToday ? 'today' : undefined, experimental ? 'yesterday' : undefined];
  const dates = parseStartAndEndDate(timeRange);
  const prefixCls = usePrefixCls('range-panel__header');
  const [startDate, setStartDate] = React.useState<Date | undefined>(dates[0]);
  const [endKey, setEndKey] = React.useState(
    endDateKeys[timeRange && timeRange.split(':')[0] === 'since' ? 0 : 1] || 'today'
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
    const startDateString = startDate ? parseFnsTimeZone(startDate, DATE_FORMAT) : startDayText;
    return (
      <>
        <span className={`${prefixCls}__text`}>{`${FromText} ${startDateString}`}</span>
        <span className={`${prefixCls}__options`}>
          <Switch
            size="small"
            defaultValue={endKey}
            onChange={(e) => {
              setEndKey(e.target.value);
            }}
          >
            {endDateKeys.map(
              (o: string) =>
                o && (
                  <Switch.Item key={o} value={o}>
                    {END_DATE_MAPPING[o]}
                  </Switch.Item>
                )
            )}
          </Switch>
        </span>
      </>
    );
  };
  const handleDisabledDate = (current: Date) =>
    disabledDate?.(current) || isAfter(current, endKey === 'yesterday' ? startOfYesterday() : startOfToday());

  const handleOnOK = () => {
    onSelect(`${endKey === 'yesterday' ? 'since-lt-today' : 'since'}:${getTime(startDate as Date)}`);
  };
  const onReset = () => {
    onSelect(defaultTimeRange || '');
  };
  return (
    <InnerRangePanel
      disableOK={!isValid(startDate)}
      header={renderHeader()}
      body={<DatePicker disabledDate={handleDisabledDate} value={startDate} onSelect={setStartDate} />}
      onCancel={onCancel}
      onOK={handleOnOK}
      onReset={onReset}
      allowReset={allowReset}
      {...rest}
    />
  );
}

export default SinceRangePicker;
