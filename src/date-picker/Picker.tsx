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
    onVisibleChange: onDropdownVisibleChange,
    overlayClassName,
    visible: dropdownVisible,
    trigger,
    disabled,
    value,
    defaultValue,
    onSelect,
    disabledDate,
    placeholder,
    allowClear,
    format: formatString,
    ...restProps
  } = props;

  const prefixCls = usePrefixCls('date-picker-new');
  const overlayCls = classnames(`${prefixCls}-overlay`, overlayClassName);

  const [visible, setVisible] = useControlledState(dropdownVisible, false);

  const [controlledValue, setControlledValue] = useControlledState(value, defaultValue);

  const formatDate = (date: Date) => format(formatString ?? 'yyyy/MM/dd', date);

  const handleVisibleChange = (current: boolean) => {
    setVisible(current);
    onDropdownVisibleChange?.(current);
  };

  const handleOnSelect = (currentValue: Date) => {
    setControlledValue(currentValue);
    setVisible(false);
    onSelect?.(currentValue, formatDate(currentValue));
  };

  const content = <StaticDatePicker onSelect={handleOnSelect} disabledDate={disabledDate} />;

  function renderTrigger() {
    if (trigger) {
      return <div>{trigger}</div>;
    }
    return (
      <InputButton
        prefix={<CalendarOutlined />}
        placeholder={placeholder}
        disabled={disabled}
        allowClear={allowClear}
        value={controlledValue && formatDate(controlledValue)}
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

export default DatePicker;
