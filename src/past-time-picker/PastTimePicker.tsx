import React from 'react';
import { useControlledState, usePrefixCls } from '@gio-design/utils';
import { CalendarOutlined } from '@gio-design/icons';
import classnames from 'classnames';
import Popover from '../popover';
import { InputButton } from '../input';
import { PastTimePickerProps } from './interfaces';
import StaticPastTimePicker from '../static-past-time-picker';
import { humanizeTimeRange } from '../static-past-time-picker/utils';

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
    hidePrefix,
    size,
    ...restProps
  } = props;

  const prefixCls = usePrefixCls('past-time-picker-new');

  const overlayCls = classnames(`${prefixCls}-overlay`);

  const [controlledVisible, setControlledVisible] = useControlledState(popoverVisible, false);

  const [timeRange, setTimeRange] = useControlledState<string | undefined>(value, undefined);

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
        placeholder={placeholder}
        disabled={disabled}
        allowClear={allowClear}
        value={timeRange && humanizeTimeRange(timeRange)}
        size={size}
        suffix={suffix}
        hidePrefix={hidePrefix}
      />
    );
  }

  return (
    <Popover
      content={content()}
      trigger={['click', 'focus']}
      visible={controlledVisible}
      placement="bottomLeft"
      overlayClassName={overlayCls}
      onVisibleChange={handleVisibleChange}
      {...restProps}
    >
      {renderTrigger()}
    </Popover>
  );
};

export default PastTimePicker;
