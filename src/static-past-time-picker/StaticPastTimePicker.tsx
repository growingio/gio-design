import React, { useCallback, useMemo } from 'react';
import { usePrefixCls, useLocale } from '@gio-design/utils';
import { filter } from 'lodash';
import SelectList from '../list';
import QuickPicker from './QuickPicker';
import { StaticPastTimePickerProps, TimeMode } from './interfaces';
import { parseTimeMode } from './utils';
import AbsoluteRangePicker from './AbsoluteRangePicker';
import SinceRangePicker from './SinceRangePicker';
import RelativeRangePicker from './RelativeRangePicker';
import defaultLocale from './locales/zh-CN';

function StaticPastTimePicker({
  disabledDate,
  modes = [TimeMode.Since, TimeMode.Relative, TimeMode.Absolute],
  timeRange,
  onSelect,
  onCancel,
  experimental = false,
  quickOptionsFilter,
  onRangeSelect,
  NotAvailableToday,
  allowReset,
  defaultTimeRange,
  earliestApprove,
  quickOptions,
  ...rest
}: StaticPastTimePickerProps) {
  const [currentRange, setCurrentRange] = React.useState(timeRange);
  const prefixCls = usePrefixCls('static-past-time-picker');

  const locale = useLocale('StaticPastTimePicker');

  const localLocale = useMemo(
    () => ({
      ...defaultLocale,
      ...locale,
    }),
    [locale]
  );

  const PICKER_OPTIONS: { label: string; value: TimeMode }[] = [
    { value: TimeMode.Quick, label: localLocale.quickPickerText },
    { value: TimeMode.Since, label: localLocale.sinceRangePickerText },
    { value: TimeMode.Relative, label: localLocale.relativeRangePickerText },
    { value: TimeMode.Absolute, label: localLocale.absoluteRangePickerText },
  ];

  const localQuickOptions = useMemo(
    () => [
      { value: 'day:1,0', label: localLocale.todayText },
      { value: 'day:2,1', label: localLocale.yesterdayText },
      { value: experimental ? 'week-lt-today:1,0' : 'week:1,0', label: localLocale.thisWeekText },
      { value: 'week:2,1', label: localLocale.lastWeekText },
      { value: experimental ? 'month-lt-today:1,0' : 'month:1,0', label: localLocale.thisMonthText },
      { value: 'month:2,1', label: localLocale.lastMonthText },
      { value: experimental ? 'quarter-lt-today:1,0' : 'quarter:1,0', label: localLocale.thisQuarterText },
      { value: 'quarter:2,1', label: localLocale.lastQuarterText },
      { value: experimental ? 'year-lt-today:1,0' : 'year:1,0', label: localLocale.thisYearText },
      { value: 'year:2,1', label: localLocale.lastYearText },
      { value: 'day:8,1', label: localLocale.last7DaysText },
      { value: 'day:15,1', label: localLocale.last14DaysText },
      { value: 'day:31,1', label: localLocale.last30daysText },
      { value: 'day:91,1', label: localLocale.last90daysText },
      { value: 'day:181,1', label: localLocale.last180DaysText },
      { value: 'day:366,1', label: localLocale.last365DaysText },
    ],
    [experimental, localLocale]
  );
  const options = useMemo(
    () => [
      ...(quickOptions || localQuickOptions),
      ...(earliestApprove ? [{ value: 'earliest', label: localLocale.earliestInHistory }] : []),
    ],
    [quickOptions, localQuickOptions, earliestApprove, localLocale]
  );

  const parseMode = useCallback((current: string | undefined) => parseTimeMode(current, options), [options]);
  const originMode = (parseMode(timeRange) ?? TimeMode.Quick) as TimeMode;
  const [mode, setMode] = React.useState<TimeMode>(modes?.includes(originMode) ? originMode : TimeMode.Quick);

  const handleOnSelect = (value: string) => {
    setCurrentRange(value);
    onSelect?.(value);
  };
  const renderPicker = (currentMode: string | undefined) => {
    const valueProps = {
      disabledDate,
      experimental,
      timeRange: currentMode === originMode ? currentRange : undefined,
      onSelect: handleOnSelect,
      onCancel,
      allowReset,
      defaultTimeRange,
    };

    switch (currentMode) {
      case TimeMode.Quick:
        return (
          <QuickPicker
            {...valueProps}
            options={options}
            optionsFilter={quickOptionsFilter}
            NotAvailableToday={NotAvailableToday}
          />
        );
      case TimeMode.Since:
        return <SinceRangePicker {...valueProps} NotAvailableToday={NotAvailableToday} />;
      case TimeMode.Relative:
        return <RelativeRangePicker {...valueProps} />;
      case TimeMode.Absolute:
      default:
        return <AbsoluteRangePicker {...valueProps} onRangeSelect={onRangeSelect} />;
    }
  };

  React.useEffect(() => {
    setMode(parseMode(timeRange) ?? TimeMode.Quick);
  }, [timeRange, parseMode]);

  return (
    <div data-testid="static-past-time-picker" className={prefixCls} {...rest}>
      <div className={`${prefixCls}__time-mode`}>
        <SelectList
          options={filter(PICKER_OPTIONS, (o) => o.value === 'quick' || modes.includes(o.value))}
          value={mode}
          onChange={(value) => {
            setMode(value as TimeMode);
          }}
        />
      </div>
      <div className={`${prefixCls}__panel`}>{renderPicker(mode)}</div>
    </div>
  );
}

export default StaticPastTimePicker;
