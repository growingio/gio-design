import React from 'react';
import classnames from 'classnames';
import { usePrefixCls, useControlledState } from '@gio-design/utils';
import { format } from 'date-fns/fp';
import { CalendarOutlined } from '@gio-design/icons';
import Popover from '../popover';
import { InputButton } from '../input';
import StaticDatePicker from '../static-date-picker';
import { DatePickerProps } from './interfaces';

export const DatePicker: React.FC<DatePickerProps> = (props: DatePickerProps) => {
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
    format: formatString = 'yyyy/MM/dd',
    prefix,
    suffix,
    size,
    className,
    style,
    onClear,
    dataTestId = 'dataPicker',
    PopoverProps,
    ...restProps
  } = props;

  const prefixCls = usePrefixCls('date-picker');
  const overlayCls = classnames(`${prefixCls}-overlay`, overlayClassName);

  const [visible, setVisible] = useControlledState(popoverVisible, false);

  const [controlledValue, setControlledValue] = useControlledState(value, defaultValue);

  const formatDate = (date: Date) => format(formatString, date);

  const handleVisibleChange = (current: boolean) => {
    setVisible(current);
    onPopoverVisibleChange?.(current);
  };

  const handleOnSelect = (currentValue: Date) => {
    setControlledValue(currentValue);
    setVisible(false);
    onSelect?.(currentValue, formatDate(currentValue));
  };

  const content = (
    <StaticDatePicker onSelect={handleOnSelect} disabledDate={disabledDate} value={controlledValue} {...restProps} />
  );

  function renderTrigger() {
    if (trigger) {
      return trigger;
    }
    return (
      <InputButton
        prefix={prefix || <CalendarOutlined />}
        placeholder={placeholder}
        disabled={disabled}
        allowClear={allowClear}
        value={controlledValue && formatDate(controlledValue)}
        size={size}
        suffix={suffix}
        className={className}
        style={style}
        active={visible}
        onClick={() => setVisible(!visible)}
        data-testid={dataTestId}
        onClear={onClear}
      />
    );
  }

  return (
    <Popover
      content={content}
      trigger="click"
      visible={visible}
      placement="bottomLeft"
      overlayClassName={overlayCls}
      onVisibleChange={handleVisibleChange}
      disabled={disabled}
      {...PopoverProps}
    >
      {renderTrigger()}
    </Popover>
  );
};
export default DatePicker;
