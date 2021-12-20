import React from 'react';
import { useControlledState, usePrefixCls, useLocale } from '@gio-design/utils';
import { CalendarOutlined } from '@gio-design/icons';
import classnames from 'classnames';
import has from 'lodash/has';
import get from 'lodash/get';
import omit from 'lodash/omit';
import { format } from 'date-fns';
import Popover from '../popover';
import { InputButton } from '../input';
import { PastTimePickerProps } from './interfaces';
import StaticPastTimePicker from '../static-past-time-picker';
import defaultLocale from '../static-past-time-picker/locales/zh-CN';

const PastTimePicker = (props: PastTimePickerProps) => {
  const {
    onVisibleChange: onPopoverVisibleChange,
    visible: popoverVisible,
    disabledDate,
    experimental,
    modes,
    value,
    onSelect,
    onCancel,
    quickOptionsFilter,
    placeholder,
    disabled,
    allowClear = false,
    prefix,
    suffix,
    size,
    className,
    style,
    ...restProps
  } = props;

  const prefixCls = usePrefixCls('past-time-picker');

  const locale = useLocale('StaticPastTimePicker');

  const {
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
    toTodayText,
    toYesterdayText,
    FromText,
    ToText,
    lastText,
    dayText,
    timeRangeText,
  } = {
    ...defaultLocale,
    ...locale,
  };

  const overlayCls = classnames(`${prefixCls}-overlay`);

  const [controlledVisible, setControlledVisible] = useControlledState(popoverVisible, false);

  const [timeRange, setTimeRange] = useControlledState<string | undefined>(value, undefined);

  const QUICK_MAPPING = {
    'day:1,0': todayText,
    'week:1,0': thisWeekText,
    'month:1,0': thisMonthText,
    'quarter:1,0': thisQuarterText,
    'year:1,0': thisYearText,
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
  };

  const humanizeTimeRange = (time: string, defaultString = timeRangeText) => {
    if (!time || time.split(':').length !== 2) {
      return defaultString;
    }
    if (has(QUICK_MAPPING, time)) {
      return get(QUICK_MAPPING, time);
    }
    const items = time.split(':');
    const times = items[1].split(',').map((str) => parseInt(str, 10));
    if (items[0] === 'since') {
      const start = format(times[0], 'yyyy/MM/dd');
      if (times.length === 1) {
        return `${FromText} ${start} ${toTodayText}`;
      }
      return `${FromText} ${start} ${toYesterdayText}`;
    }
    if (items[0] === 'abs') {
      const start = format(times[0], 'yyyy/MM/dd');
      const end = format(times[1], 'yyyy/MM/dd');
      return `${FromText} ${start} ${ToText} ${end}`;
    }
    if (items[0] === 'day') {
      if (times[1] === 1) {
        return `${lastText} ${times[0] - times[1]} ${dayText}`;
      }
      return `${lastText} ${times[1]}-${times[0]} ${dayText}`;
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
      disabledDate={disabledDate}
      modes={modes}
      experimental={experimental}
      timeRange={timeRange}
      onSelect={handleOnSelect}
      onCancel={handleOnCancel}
      quickOptionsFilter={quickOptionsFilter}
    />
  );

  function renderTrigger() {
    return (
      <InputButton
        prefix={prefix || <CalendarOutlined />}
        data-testid={restProps?.['data-testid'] ? restProps?.['data-testid'] : 'past-time-picker'}
        placeholder={placeholder}
        disabled={disabled}
        allowClear={allowClear}
        value={timeRange && humanizeTimeRange(timeRange)}
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
