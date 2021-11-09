import React from 'react';
import { TimeOutlined } from '@gio-design/icons';
import { useLocale, useControlledState, usePrefixCls } from '@gio-design/utils';
import { format } from 'date-fns';
import { Locale } from 'rc-picker/lib/interface';
import Button from '../legacy/button';
import Selector from '../selector';
import TimePicker from '../static-time-picker/StaticTimePicker';
import { TimeSelectorProps } from './interfaces';
import { TIME_FORMAT, TIME_WITH_SECOND_FORMAT } from './constant';
import defaultLocale from './locales/zh-CN';

function TimeSelector({
  defaultValue,
  onSelect,
  placeholder,
  showSecond = false,
  value,
  locale: customizeLocale,
  ...restProps
}: TimeSelectorProps) {
  const [visible, setVisible] = React.useState<boolean>();
  const [controlledValue, setControlledValue] = useControlledState(value, defaultValue);
  const [time, setTime] = React.useState<Date | undefined>(controlledValue);
  const prefixCls = usePrefixCls('date-selector');
  const locale = useLocale<Locale>('TimeSelector');
  const coalescedLocale = customizeLocale ?? locale ?? defaultLocale;
  const { now, ok, timeSelect } = coalescedLocale;

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
      locale={coalescedLocale}
      renderFooter={() => (
        <>
          <Button type="text" size="small" onClick={handleOnNow}>
            {now}
          </Button>
          <Button disabled={!time} type="primary" size="small" onClick={handleOnOk}>
            {ok}
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
      placeholder={placeholder ?? timeSelect}
      itemRender={() => (controlledValue ? formatTime(controlledValue) : undefined)}
      suffix={<TimeOutlined />}
    />
  );
}

export default TimeSelector;
