import React from 'react';
import { TimeOutlined } from '@gio-design/icons';
import { useControlledState, usePrefixCls } from '@gio-design/utils';
import { format } from 'date-fns';
import Button from '../components/button';
import Selector from '../selector';
import TimePicker from '../time-picker/TimePicker';
import { TimeSelectorProps } from './interfaces';
import { TIME_FORMAT, TIME_WITH_SECOND_FORMAT } from './constant';

function TimeSelector({
  defaultValue,
  onSelect,
  placeholder,
  showSecond = false,
  value,
  ...restProps
}: TimeSelectorProps) {
  const [visible, setVisible] = React.useState<boolean>();
  const [controlledValue, setControlledValue] = useControlledState(value, defaultValue);
  const [time, setTime] = React.useState<Date | undefined>(controlledValue);
  const prefixCls = usePrefixCls('date-selector');

  const formatTime = (date: Date) => format(date, showSecond ? TIME_WITH_SECOND_FORMAT : TIME_FORMAT);
  const handleOnPickerSelect = (currentValue: Date) => {
    setTime(currentValue);
  };
  const handleOnOk = () => {
    setControlledValue(time);
    setVisible(false);
    onSelect?.(time as Date, formatTime(time as Date));
  };
  const handleOnClear = () => {
    setTime(undefined);
    setControlledValue(undefined);
  };
  const handleOnNow = () => {
    setTime(new Date());
  };
  const overlay = (
    <TimePicker
      onSelect={handleOnPickerSelect}
      renderFooter={() => (
        <>
          <Button type="text" size="small" onClick={handleOnNow}>
            此刻
          </Button>
          <Button disabled={!time} type="primary" size="small" onClick={handleOnOk}>
            确定
          </Button>
        </>
      )}
      showSecond={showSecond}
      value={time}
    />
  );

  return (
    <Selector
      {...restProps}
      actived={visible}
      visible={visible}
      onVisibleChange={setVisible}
      overlayClassName={prefixCls}
      overlay={overlay}
      onClear={handleOnClear}
      placeholder={placeholder ?? '选择时间'}
      itemRender={() => (controlledValue ? formatTime(controlledValue) : undefined)}
      suffix={<TimeOutlined />}
    />
  );
}

export default TimeSelector;
