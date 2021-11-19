import React from 'react';
import classnames from 'classnames';
import { StopWatchOutlined } from '@gio-design/icons';
import { useLocale, useControlledState, usePrefixCls } from '@gio-design/utils';
import { format } from 'date-fns';
import { Locale } from 'rc-picker/lib/interface';
import Button from '../button';
import Popover from '../popover';
import { InputButton } from '../input';
import StaticTimePicker from '../static-time-picker/StaticTimePicker';
import { TimePickerProps } from './interfaces';
import { TIME_FORMAT, TIME_WITH_SECOND_FORMAT } from './constant';
import defaultLocale from './locales/zh-CN';

export const TimePicker: React.FC<TimePickerProps> = (props: TimePickerProps) => {
  const {
    defaultValue,
    onSelect,
    visible: popoverVisible,
    placeholder,
    showSecond = false,
    value,
    trigger,
    disabled,
    allowClear,
    overlayClassName,
    size,
    prefix,
    suffix,
    locale: customizeLocale,
    onVisibleChange,
    className,
    style,
    ...restProps
  } = props;
  const [visible, setVisible] = useControlledState(popoverVisible, false);
  const [controlledValue, setControlledValue] = useControlledState(value, defaultValue);
  const [time, setTime] = React.useState<Date | undefined>(controlledValue);
  const prefixCls = usePrefixCls('time-picker-new');
  const locale = useLocale<Locale>('TimePicker');
  const coalescedLocale = customizeLocale ?? locale ?? defaultLocale;
  const { now, ok, timeSelect } = coalescedLocale;
  const overlayCls = classnames(`${prefixCls}-overlay`, overlayClassName);

  const formatTime = (date: Date) => format(date, showSecond ? TIME_WITH_SECOND_FORMAT : TIME_FORMAT);

  const handleOnPickerSelect = (currentValue: Date) => {
    setTime(currentValue);
  };

  const handleOnOk = () => {
    setControlledValue(time);
    setVisible(false);
    onSelect?.(time as Date, formatTime(time as Date));
  };

  const handleVisibleChange = (current: boolean) => {
    setVisible(current);
    onVisibleChange?.(current);
  };

  const handleOnNow = () => {
    setTime(new Date());
  };

  const overlay = (
    <StaticTimePicker
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

  function renderTrigger() {
    if (trigger) {
      return <div>{trigger}</div>;
    }
    return (
      <InputButton
        prefix={prefix || <StopWatchOutlined />}
        disabled={disabled}
        allowClear={allowClear}
        value={time && formatTime(time)}
        placeholder={placeholder ?? timeSelect}
        size={size}
        suffix={suffix}
        className={className}
        style={style}
      />
    );
  }

  return (
    <Popover
      content={overlay}
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

export default TimePicker;
