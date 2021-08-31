/* eslint-disable @typescript-eslint/ban-ts-comment */
import React from 'react';
import { usePrefixCls, useControlledState } from '@gio-design/utils';
import Selector from '../selector';
import DateRangePicker from '../date-range-picker';
import RangeInputTrigger from './RangeInputTrigger';
import { DateRangeSelectorProps, NullableDate, NullableString } from './interfaces';
import { formatDate } from '../date-selector/utils';
import { UNDEFINED_DATES } from './constant';
import { formatDates } from './utils';

function DateRangeSelector({
  borderless,
  defaultValue,
  disabled,
  format: formatString,
  onSelect,
  placeholder,
  size,
  value,
  disabledDate,
  onClear,
  locale,
  ...restProps
}: DateRangeSelectorProps) {
  const [visible, setVisible] = React.useState<boolean>();
  const [hoveredPlaceholder, setHoveredPlaceholder] = React.useState<[NullableString, NullableString]>(
    placeholder ?? [undefined, undefined]
  );
  // @ts-ignore
  const [controlledValue, setControlledValue] = useControlledState<[NullableDate, NullableDate]>(value, defaultValue);
  const prefixCls = usePrefixCls('date-range-selector');

  const handleOnSelect = (currentValue: [Date, Date], index: number) => {
    setControlledValue(currentValue);
    if (index) {
      setVisible(false);
      onSelect?.(currentValue, formatDates(currentValue, formatString));
    }
  };
  const handleOnClear = () => {
    setControlledValue([undefined, undefined]);
    onClear?.();
  };
  const overlay = (
    <DateRangePicker
      onDateMouseEnter={(date: Date, index: number) => {
        if (index) {
          setHoveredPlaceholder([placeholder ? placeholder[0] : undefined, formatDate(date, formatString)]);
        } else {
          setHoveredPlaceholder([formatDate(date, formatString), placeholder ? placeholder[1] : undefined]);
        }
      }}
      onDateMouseLeave={() => {
        setHoveredPlaceholder(placeholder ?? [undefined, undefined]);
      }}
      onSelect={handleOnSelect}
      // @ts-ignore
      value={controlledValue}
      disabledDate={disabledDate}
      locale={locale}
    />
  );
  return (
    <Selector
      {...restProps}
      disabled={disabled}
      visible={visible}
      onVisibleChange={(currentVisible: boolean) => setVisible(currentVisible)}
      overlayClassName={prefixCls}
      overlay={overlay}
      trigger={
        <RangeInputTrigger
          actived={visible}
          borderless={borderless}
          disabled={disabled}
          onClear={handleOnClear}
          placeholder={hoveredPlaceholder}
          size={size}
          value={formatDates(controlledValue ?? UNDEFINED_DATES, formatString)}
        />
      }
    />
  );
}

export default DateRangeSelector;
