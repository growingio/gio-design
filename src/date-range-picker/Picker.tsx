import React from 'react';
import classnames from 'classnames';
import { usePrefixCls, useControlledState } from '@gio-design/utils';
import format from 'date-fns/format';
import { CalendarOutlined } from '@gio-design/icons';
import Popover from '../popover';
import { InputButton } from '../input';
import StaticDateRangePicker from '../static-date-range-picker';
import { DateRangePickerProps, NullableDate, NullableString } from './interfaces';

export const formatDates = (dates: [NullableDate, NullableDate], formatString = 'yyyy/MM/dd'): NullableString => {
  const strongFormat = (date: NullableDate) => (date ? format(date, formatString) : undefined);
  return `${strongFormat(dates[0]) || ''} - ${strongFormat(dates[1]) || ''}`;
};

export const DateRangePicker: React.FC<DateRangePickerProps> = (props: DateRangePickerProps) => {
  const {
    onVisibleChange: onPopoverVisibleChange,
    overlayClassName,
    visible: popoverVisible,
    trigger,
    disabled,
    value,
    defaultValue,
    onSelect,
    disabledDate,
    placeholder,
    allowClear,
    format: formatString,
    prefix,
    suffix,
    hidePrefix,
    size,
    ...restProps
  } = props;

  const prefixCls = usePrefixCls('date-range-picker-new');
  const overlayCls = classnames(`${prefixCls}-overlay`, overlayClassName);

  const [visible, setVisible] = useControlledState(popoverVisible, false);

  const [controlledValue, setControlledValue] = useControlledState<[NullableDate, NullableDate] | undefined>(
    value,
    defaultValue
  );

  const handleVisibleChange = (current: boolean) => {
    setVisible(current);
    onPopoverVisibleChange?.(current);
  };

  const handleOnSelect = (currentValue: [Date, Date], index: number) => {
    setControlledValue(currentValue);
    if (index) {
      setVisible(false);
      onSelect?.(currentValue, formatDates(currentValue, formatString));
    }
  };

  const content = (
    <StaticDateRangePicker
      onSelect={handleOnSelect}
      value={controlledValue as [Date, Date]}
      disabledDate={disabledDate}
    />
  );

  function renderTrigger() {
    if (trigger) {
      return <div>{trigger}</div>;
    }
    return (
      <InputButton
        prefix={prefix || <CalendarOutlined />}
        placeholder={placeholder}
        disabled={disabled}
        allowClear={allowClear}
        value={controlledValue && formatDates(controlledValue)}
        size={size}
        suffix={suffix}
        hidePrefix={hidePrefix}
      />
    );
  }

  return (
    <Popover
      content={content}
      trigger={['click', 'focus']}
      visible={visible}
      placement="bottomLeft"
      overlayClassName={overlayCls}
      onVisibleChange={handleVisibleChange}
      {...restProps}
    >
      {renderTrigger()}
    </Popover>
  );
};

export default DateRangePicker;
