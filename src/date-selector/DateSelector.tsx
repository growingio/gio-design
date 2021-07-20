import React from 'react';
import { usePrefixCls, useControlledState } from '@gio-design/utils';
import { CalendarOutlined } from '@gio-design/icons';
import { format } from 'date-fns/fp';
import PanelContext from 'rc-picker/lib/PanelContext';
import Selector from '../selector';
import DatePicker from '../date-picker';
import { DateSelectorProps } from './interfaces';
import { DATE_FORMAT } from './constant';

function DateSelector({
  disabledDate,
  format: formatString,
  placeholder,
  value,
  defaultValue,
  onSelect,
  ...restProps
}: DateSelectorProps) {
  const [visible, setVisible] = React.useState<boolean>();
  const [hoveredDate, setHoveredDate] = React.useState<Date | undefined>();
  const [controlledValue, setControlledValue] = useControlledState(value, defaultValue);
  const prefixCls = usePrefixCls('date-selector');

  const formatDate = (date: Date) => format(formatString ?? DATE_FORMAT, date);
  const handleOnSelect = (currentValue: Date) => {
    setControlledValue(currentValue);
    setVisible(false);
    onSelect?.(currentValue, formatDate(currentValue));
  };
  const handleOnClear = () => {
    setControlledValue(undefined);
  };
  const overlay = (
    <PanelContext.Provider
      value={{
        onDateMouseEnter: (date) => {
          setHoveredDate(date);
        },
        onDateMouseLeave: () => {
          setHoveredDate(undefined);
        },
      }}
    >
      <DatePicker onSelect={handleOnSelect} disabledDate={disabledDate} />
    </PanelContext.Provider>
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
      placeholder={hoveredDate ? formatDate(hoveredDate) : placeholder}
      itemRender={() => (controlledValue ? formatDate(controlledValue) : undefined)}
      suffix={<CalendarOutlined />}
    />
  );
}

export default DateSelector;
