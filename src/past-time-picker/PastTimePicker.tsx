import React from 'react';
import { useControlledState, usePrefixCls, useLocale } from '@gio-design/utils';
import { CalendarOutlined } from '@gio-design/icons';
import classnames from 'classnames';
import has from 'lodash/has';
import get from 'lodash/get';
import omit from 'lodash/omit';
import { parseFnsTimeZone } from '../utils/timeHelper';
import Popover from '../popover';
import { InputButton } from '../input';
import { PastTimePickerProps } from './interfaces';
import StaticPastTimePicker from '../static-past-time-picker';
import defaultLocale from '../static-past-time-picker/locales/zh-CN';
import { parseStartAndEndDate, parseQuickDate } from '../static-past-time-picker/utils';

const PastTimePicker = (props: PastTimePickerProps) => {
  const {
    onVisibleChange: onPopoverVisibleChange,
    visible: popoverVisible,
    disabledDate,
    experimental,
    modes,
    value,
    onSelect,
    onRangeSelect,
    onCancel,
    quickOptionsFilter,
    quickOptions,
    placeholder,
    disabled,
    allowClear = false,
    prefix,
    suffix,
    size,
    className,
    style,
    showAbsDate = false,
    NotAvailableToday = false,
    earliestApprove = false,
    allowReset = false,
    defaultTimeRange,
    title,
    ...restProps
  } = props;

  const prefixCls = usePrefixCls('past-time-picker');

  const locale = useLocale('StaticPastTimePicker');

  const {
    todayText,
    yesterdayText,
    thisWeekText,
    thisWeekToToday,
    thisWeekToYesterday,
    lastWeekText,
    thisMonthText,
    thisMonthToToday,
    thisMonthToYesterday,
    lastMonthText,
    thisQuarterText,
    thisQuarterTextToToday,
    thisQuarterTextToYesterday,
    lastQuarterText,
    thisYearText,
    thisYearTextToToday,
    thisYearTextToYesterday,
    lastYearText,
    last7DaysText,
    last14DaysText,
    last30daysText,
    last90daysText,
    last180DaysText,
    last365DaysText,
    toTodayText,
    toYesterdayText,
    FromText,
    ToText,
    lastText,
    dayText,
    timeRangeText,
    earliestInHistory,
    earliestInHistoryEcho,
  } = {
    ...defaultLocale,
    ...locale,
  };

  const overlayCls = classnames(`${prefixCls}-overlay`);

  const [controlledVisible, setControlledVisible] = useControlledState(popoverVisible, false);

  const [timeRange, setTimeRange] = useControlledState<string | undefined>(value, undefined);

  const QUICK_MAPPING = {
    'day:1,0': todayText,
    'week:1,0': experimental ? thisWeekToToday : thisWeekText,
    'week-lt-today:1,0': thisWeekToYesterday,
    'month:1,0': experimental ? thisMonthToToday : thisMonthText,
    'month-lt-today:1,0': thisMonthToYesterday,
    'quarter:1,0': experimental ? thisQuarterTextToToday : thisQuarterText,
    'quarter-lt-today:1,0': thisQuarterTextToYesterday,
    'year:1,0': experimental ? thisYearTextToToday : thisYearText,
    'year-lt-today:1,0': thisYearTextToYesterday,
    'day:8,1': last7DaysText,
    'day:31,1': last30daysText,
    'day:181,1': last180DaysText,
    'day:2,1': yesterdayText,
    'week:2,1': lastWeekText,
    'month:2,1': lastMonthText,
    'quarter:2,1': lastQuarterText,
    'year:2,1': lastYearText,
    'day:15,1': last14DaysText,
    'day:91,1': last90daysText,
    'day:366,1': last365DaysText,
    earliest: earliestInHistory,
  };

  const humanizeTimeRange = (
    time: string,
    defaultString = timeRangeText,
    quickOptions: PastTimePickerProps['quickOptions']
  ) => {
    if (!time) {
      return defaultString;
    }

    let op;
    if ((op = quickOptions?.find((option) => option.value === time))) {
      return op.label;
    }

    if (has(QUICK_MAPPING, time)) {
      const [startTime, endTime] = parseQuickDate(time);
      const showSinceZero = time === 'earliest' ? earliestInHistoryEcho : `${get(QUICK_MAPPING, time)}`;
      return showAbsDate
        ? `${get(QUICK_MAPPING, time)} | ${parseFnsTimeZone(startTime, 'yyyy/MM/dd')}-${parseFnsTimeZone(
            endTime,
            'yyyy/MM/dd'
          )}`
        : showSinceZero;
    }
    const items = time?.split(':');
    const times = items[1]?.split(',').map((str) => parseInt(str, 10));
    if (items[0] === 'since') {
      const start = parseFnsTimeZone(times[0], 'yyyy/MM/dd');
      const [startTime, endTime] = parseStartAndEndDate(time);
      return showAbsDate
        ? `${FromText} ${start} ${toTodayText} ｜ ${parseFnsTimeZone(startTime, 'yyyy/MM/dd')}-${parseFnsTimeZone(
            endTime,
            'yyyy/MM/dd'
          )}`
        : `${FromText} ${start} ${toTodayText}`;
    }
    if (items[0] === 'since-lt-today') {
      const start = parseFnsTimeZone(times[0], 'yyyy/MM/dd');
      const [startTime, endTime] = parseStartAndEndDate(time);
      return showAbsDate
        ? `${FromText} ${start} ${toYesterdayText} ｜ ${parseFnsTimeZone(startTime, 'yyyy/MM/dd')}-${parseFnsTimeZone(
            endTime,
            'yyyy/MM/dd'
          )}`
        : `${FromText} ${start} ${toYesterdayText}`;
    }

    if (items[0] === 'abs') {
      const start = parseFnsTimeZone(times[0], 'yyyy/MM/dd');
      const end = parseFnsTimeZone(times[1], 'yyyy/MM/dd');
      return `${FromText} ${start} ${ToText} ${end}`;
    }
    if (items[0] === 'day') {
      const [startTime, endTime] = parseStartAndEndDate(time);

      if (times[1] === 1) {
        return showAbsDate
          ? `${lastText} ${times[0] - times[1]} ${dayText} ｜ ${parseFnsTimeZone(
              startTime,
              'yyyy/MM/dd'
            )}-${parseFnsTimeZone(endTime, 'yyyy/MM/dd')}`
          : `${lastText} ${times[0] - times[1]} ${dayText}`;
      }
      return showAbsDate
        ? `${lastText} ${times[1]}-${times[0]} ${dayText} ｜ ${parseFnsTimeZone(
            startTime,
            'yyyy/MM/dd'
          )}-${parseFnsTimeZone(endTime, 'yyyy/MM/dd')}`
        : `${lastText} ${times[1]}-${times[0]} ${dayText}`;
    }
    return defaultString;
  };

  const handleOnSelect = (currentValue: string) => {
    setTimeRange(currentValue, true);
    setControlledVisible(false);
    onSelect?.(currentValue);
  };
  const handleOnCancel = () => {
    setControlledVisible(false);
    onCancel?.();
  };
  const handleVisibleChange = (current: boolean) => {
    setControlledVisible(current);
    onPopoverVisibleChange?.(current);
  };
  const content = () => (
    <StaticPastTimePicker
      earliestApprove={earliestApprove}
      disabledDate={disabledDate}
      modes={modes}
      experimental={experimental}
      timeRange={timeRange}
      defaultTimeRange={defaultTimeRange}
      onSelect={handleOnSelect}
      onRangeSelect={onRangeSelect}
      onCancel={handleOnCancel}
      quickOptionsFilter={quickOptionsFilter}
      NotAvailableToday={NotAvailableToday}
      allowReset={allowReset}
      quickOptions={quickOptions}
    />
  );

  function renderTrigger() {
    return (
      <InputButton
        prefix={prefix || <CalendarOutlined />}
        data-testid={restProps['data-testid'] ? restProps['data-testid'] : 'past-time-picker'}
        placeholder={placeholder}
        disabled={disabled}
        allowClear={allowClear}
        value={title || (timeRange && humanizeTimeRange(timeRange, undefined, quickOptions))}
        size={size}
        active={controlledVisible}
        suffix={suffix}
        className={className}
        style={style}
        onClick={() => setControlledVisible(!controlledVisible)}
      />
    );
  }

  return (
    <Popover
      content={content()}
      trigger="click"
      visible={controlledVisible}
      placement="bottomLeft"
      overlayClassName={overlayCls}
      onVisibleChange={handleVisibleChange}
      disabled={disabled}
      {...omit(restProps, 'data-testid')}
    >
      {renderTrigger()}
    </Popover>
  );
};

export default PastTimePicker;
