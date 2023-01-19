import React from 'react';
import classnames from 'classnames';
import { ClockOutlined } from '@gio-design/icons';
import { useLocale, useControlledState, usePrefixCls } from '@gio-design/utils';
import { Locale } from 'rc-picker/lib/interface';
import { isNil } from 'lodash';
import { parseFnsTimeZone } from '../utils/timeHelper';
import Button from '../button';
import Popover from '../popover';
import { InputButton } from '../input';
import StaticTimePicker from '../static-time-picker/StaticTimePicker';
import { TimePickerProps } from './interfaces';
import { TIME_FORMAT, TIME_WITH_SECOND_FORMAT } from './constant';
import defaultLocale from './locales/zh-CN';

const DEFAULT_DATA_TESTID = 'time-picker';

export const TimePicker: React.FC<TimePickerProps> = (props) => {
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
  const prefixCls = usePrefixCls('time-picker');
  const locale = useLocale<Locale>('TimePicker');
  const coalescedLocale = customizeLocale ?? locale ?? defaultLocale;
  const { now, ok, timeSelect } = coalescedLocale;
  const overlayCls = classnames(`${prefixCls}-overlay`, overlayClassName);

  const formatTime = (date: Date) => parseFnsTimeZone(date, showSecond ? TIME_WITH_SECOND_FORMAT : TIME_FORMAT);

  const handleOnPickerSelect = (currentValue: Date) => {
    setTime(currentValue);
  };

  const handleOnOk = () => {
    setControlledValue(time);
    setVisible(false);
    onSelect?.(time as Date, formatTime(time as Date) as string);
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
      data-testid={
        isNil(restProps['data-testid']) ? `${DEFAULT_DATA_TESTID}-overlay` : `${restProps['data-testid']}-overlay`
      }
    />
  );

  function renderTrigger() {
    if (trigger) {
      return <div>{trigger}</div>;
    }
    return (
      <InputButton
        data-testid={
          isNil(restProps['data-testid']) ? `${DEFAULT_DATA_TESTID}-trigger` : `${restProps['data-testid']}-trigger`
        }
        prefix={prefix || <ClockOutlined />}
        disabled={disabled}
        allowClear={allowClear}
        value={time && (formatTime(time) as string)}
        placeholder={placeholder ?? timeSelect}
        size={size}
        suffix={suffix}
        className={className}
        style={style}
        active={visible}
      />
    );
  }

  return (
    <Popover
      data-testid={DEFAULT_DATA_TESTID}
      content={overlay}
      trigger="click"
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
