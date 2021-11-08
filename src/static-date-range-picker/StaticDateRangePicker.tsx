/* eslint-disable @typescript-eslint/ban-ts-comment */
import React from 'react';
import classnames from 'classnames';
import RangeContext from 'rc-picker/lib/RangeContext';
import { RangeValue } from 'rc-picker/lib/interface';
import { useControlledState, usePrefixCls } from '@gio-design/utils';
import isBefore from 'date-fns/isBefore';
import StaticDatePicker, { StaticDatePickerContext } from '../static-date-picker';
import { StaticDateRangePickerProps } from './interfaces';
import { getDefaultViewDates, calcClosingViewDate, mergeDates } from './utils';

function StaticDateRangePicker({
  className,
  defaultValue,
  defaultViewDates,
  disabledDate,
  onSelect,
  onDateMouseEnter,
  onDateMouseLeave,
  style,
  value,
  locale,
}: StaticDateRangePickerProps) {
  const [viewDates, setViewDates] = React.useState<[Date, Date]>(defaultViewDates ?? getDefaultViewDates());
  const [hoveredDates, setHoveredDates] = React.useState<RangeValue<Date>>();
  const [dateIndex, setDateIndex] = React.useState<number>(0);
  // @ts-ignore
  const [selectedValue, setSelectedValue] = useControlledState<RangeValue<Date>>(value, defaultValue);
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
        <StaticDatePicker
          className={`${preficCls}__${position}`}
          disabledDate={(currentDate: Date) => {
            const isBeforeStartDate =
              selectedValue && selectedValue[0] && !selectedValue[1] ? isBefore(currentDate, selectedValue[0]) : false;
            const isDisabledDate = disabledDate ? disabledDate(currentDate) : false;
            return isBeforeStartDate || isDisabledDate;
          }}
          onPanelChange={(currentValue: Date) => {
            if (index) {
              setViewDates([calcClosingViewDate(currentValue, -1), currentValue]);
            } else {
              setViewDates([currentValue, calcClosingViewDate(currentValue)]);
            }
          }}
          onSelect={undefined}
          // @ts-ignore
          value={selectedValue ? selectedValue[index] : undefined}
          viewDate={viewDates[index]}
          locale={locale}
        />
      </RangeContext.Provider>
    );
  }

  const cls = classnames(className, preficCls);
  return (
    <StaticDatePickerContext.Provider
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
        onSelect: (currentValue) => {
          const newValue = mergeDates(selectedValue, currentValue, dateIndex);
          onSelect?.(newValue as [Date, Date], dateIndex);
          setSelectedValue(newValue);
          setDateIndex(1 - dateIndex);
        },
      }}
    >
      <div className={cls} style={style}>
        {renderPicker('left')}
        {renderPicker('right')}
      </div>
    </StaticDatePickerContext.Provider>
  );
}

export default StaticDateRangePicker;
