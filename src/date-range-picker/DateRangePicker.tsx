/* eslint-disable @typescript-eslint/ban-ts-comment */
import React from 'react';
import classnames from 'classnames';
import RangeContext from 'rc-picker/lib/RangeContext';
import { RangeValue } from 'rc-picker/lib/interface';
import { usePrefixCls } from '@gio-design/utils/es/hooks';
import isBefore from 'date-fns/isBefore';
import DatePicker, { DatePickerContext } from '../date-picker';
import { DateRangePickerProps } from './interfaces';
import { getDefaultViewDates, calcClosingViewDate, mergeDates } from './utils';

function DateRangePicker({
  className,
  style,
  disabledDate,
  onSelect,
  onDateMouseEnter,
  onDateMouseLeave,
}: DateRangePickerProps) {
  const [viewDates, setViewDates] = React.useState<[Date, Date]>(getDefaultViewDates());
  const [hoveredDates, setHoveredDates] = React.useState<RangeValue<Date>>();
  const [dateIndex, setDateIndex] = React.useState<number>(0);
  const [selectedValue, setSelectedValue] = React.useState<RangeValue<Date>>([null, null]);
  const preficCls = usePrefixCls('date-range-picker');

  function renderPicker(position: 'left' | 'right') {
    const index = position === 'left' ? 0 : 1;
    return (
      <RangeContext.Provider
        value={{
          inRange: true,
          panelPosition: position,
          rangedValue: selectedValue,
          hoverRangedValue: hoveredDates,
        }}
      >
        <DatePicker
          className={`${preficCls}__${position}`}
          disabledDate={(currentDate) => {
            const isBeforeStartDate =
              selectedValue && selectedValue[0] ? isBefore(currentDate, selectedValue[0]) : false;
            const isDisabledDate = disabledDate ? disabledDate(currentDate) : false;
            return isBeforeStartDate || isDisabledDate;
          }}
          onPanelChange={(value) => {
            if (index) {
              setViewDates([calcClosingViewDate(value, -1), value]);
            } else {
              setViewDates([value, calcClosingViewDate(value)]);
            }
          }}
          onSelect={undefined}
          // @ts-ignore
          value={selectedValue[index] as Date | undefined}
          viewDate={viewDates[index]}
        />
      </RangeContext.Provider>
    );
  }

  const cls = classnames(className, preficCls);
  return (
    <DatePickerContext.Provider
      value={{
        onDateMouseEnter: (date) => {
          if (dateIndex) {
            setHoveredDates(mergeDates(selectedValue, date, dateIndex));
          }
          onDateMouseEnter?.(date, dateIndex);
        },
        onDateMouseLeave: () => {
          setHoveredDates(mergeDates(selectedValue, undefined, dateIndex));
          onDateMouseLeave?.(dateIndex);
        },
        onSelect: (value) => {
          const newValue = mergeDates(selectedValue, value, dateIndex);
          setSelectedValue(newValue);
          setDateIndex(1 - dateIndex);
          if (dateIndex) {
            onSelect?.(newValue as [Date, Date]);
          }
        },
      }}
    >
      <div className={cls} style={style}>
        {renderPicker('left')}
        {renderPicker('right')}
      </div>
    </DatePickerContext.Provider>
  );
}

export default DateRangePicker;
