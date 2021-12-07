import React from 'react';
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
  ...rest
}: StaticPastTimePickerProps) {
  const parseMode = (currentRange: string | undefined) => parseTimeMode(currentRange);
  const originMode = parseMode(timeRange) ?? 'quick';
  const [mode, setMode] = React.useState<string | undefined>(originMode);
  const [currentRange, setCurrentRange] = React.useState(timeRange);
  const prefixCls = usePrefixCls('static-past-time-picker');

  const locale = useLocale('StaticPastTimePicker');

  const {
    quickPickerText,
    sinceRangePickerText,
    relativeRangePickerText,
    absoluteRangePickerText,
    todayText,
    yesterdayText,
    thisWeekText,
    lastWeekText,
    thisMonthText,
    lastMonthText,
    thisQuarterText,
    lastQuarterText,
    thisYearText,
    lastYearText,
    last7DaysText,
    last14DaysText,
    last30daysText,
    last90daysText,
    last180DaysText,
    last365DaysText,
  } = {
    ...defaultLocale,
    ...locale,
  };

  const PICKER_OPTIONS: { label: string; value: TimeMode | 'quick' }[] = [
    { value: 'quick', label: quickPickerText },
    { value: TimeMode.Since, label: sinceRangePickerText },
    { value: TimeMode.Relative, label: relativeRangePickerText },
    { value: TimeMode.Absolute, label: absoluteRangePickerText },
  ];

  const quickOptions = [
    [
      { value: 'day:1,0', label: todayText },
      { value: 'week:1,0', label: thisWeekText },
      { value: 'month:1,0', label: thisMonthText },
      { value: 'quarter:1,0', label: thisQuarterText },
      { value: 'year:1,0', label: thisYearText },
      { value: 'day:8,1', label: last7DaysText },
      { value: 'day:31,1', label: last30daysText },
      { value: 'day:181,1', label: last180DaysText },
    ],
    [
      { value: 'day:2,1', label: yesterdayText },
      { value: 'week:2,1', label: lastWeekText },
      { value: 'month:2,1', label: lastMonthText },
      { value: 'quarter:2,1', label: lastQuarterText },
      { value: 'year:2,1', label: lastYearText },
      { value: 'day:15,1', label: last14DaysText },
      { value: 'day:91,1', label: last90daysText },
      { value: 'day:366,1', label: last365DaysText },
    ],
  ];

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
    };
    switch (currentMode) {
      case 'quick':
        return <QuickPicker {...valueProps} options={quickOptions} optionsFilter={quickOptionsFilter} />;
      case TimeMode.Since:
        return <SinceRangePicker {...valueProps} />;
      case TimeMode.Relative:
        return <RelativeRangePicker {...valueProps} />;
      case TimeMode.Absolute:
      default:
        return <AbsoluteRangePicker {...valueProps} />;
    }
  };

  React.useEffect(() => {
    setMode(parseMode(timeRange) ?? 'quick');
  }, [timeRange]);

  return (
    <div data-testid="static-past-time-picker" className={prefixCls} {...rest}>
      <div className={`${prefixCls}__time-mode`}>
        <SelectList
          options={filter(PICKER_OPTIONS, (o) => o.value === 'quick' || modes.includes(o.value))}
          value={mode}
          onChange={(value) => {
            setMode(value as string);
          }}
        />
      </div>
      <div className={`${prefixCls}__panel`}>{renderPicker(mode)}</div>
    </div>
  );
}

export default StaticPastTimePicker;
