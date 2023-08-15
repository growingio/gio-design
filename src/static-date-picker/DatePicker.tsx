import React, { useEffect, useRef, useState, useMemo } from 'react';
import { useControlledState, useLocale, usePrefixCls } from '@gio-design/utils';
import { LeftDoubleOutlined, LeftOutlined, RightOutlined, RightDoubleOutlined } from '@gio-design/icons';
import PickerPanel from 'rc-picker/lib/PickerPanel';
import generateDateFns from 'rc-picker/lib/generate/dateFns';
import { Locale, PickerMode } from 'rc-picker/lib/interface';
import defaultLocale from './locales/zh-CN';
import { StaticDatePickerProps } from './interfaces';
import { exportDateToZonedDate, exportZonedDateToDate } from '../utils/timeHelper';

const Cell: React.FC<{ visible: boolean; prefixCls: string; currentDate: Date }> = ({
  visible,
  prefixCls,
  currentDate,
}) => {
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const parent = divRef.current?.parentElement;

    if (parent && !visible) {
      const attributes = ['title', 'class'];
      // 移除已经初始化的 `title` 和 `class` 属性
      attributes.forEach((attribute) => parent.hasAttribute(attribute) && parent.removeAttribute(attribute));
    }
  });

  if (!visible) {
    return null;
  }
  return (
    <div ref={divRef} className={`${prefixCls}-cell-inner`}>
      {currentDate.getDate()}
    </div>
  );
};

const DatePicker: React.FC<StaticDatePickerProps> = ({
  viewDate: viewDateProp,
  disabledDate: disabledDateProp,
  value,
  defaultValue,
  onPanelChange,
  onSelect,
  ...restProps
}) => {
  const locale = useLocale<Locale>('DatePicker') || defaultLocale;
  const convertedValue = useMemo(() => exportZonedDateToDate(value), [value]);
  const covertedDefaultValue = useMemo(() => exportZonedDateToDate(defaultValue), [defaultValue]);

  const [viewDate, setViewDate] = useControlledState(viewDateProp, convertedValue ?? covertedDefaultValue ?? new Date());
  const [innerValue] = useControlledState(convertedValue, covertedDefaultValue);
  const [mode] = useState<PickerMode>('date');
  const currentPickerMode = useRef(mode);

  const prefixCls = usePrefixCls('picker');

  const isSameYearMonth = (one: Date, two: Date) => one.getFullYear() === two.getFullYear() && one.getMonth() === two.getMonth()
  const isOmittedDate = (currentDate: Date, currentMode: PickerMode) => currentMode === 'date' && !isSameYearMonth(currentDate, viewDate)
  const dateRender = (currentDate: Date) => {
    const visible = !isOmittedDate(currentDate, 'date');
    // 移除非当前月份的日期
    return <Cell currentDate={currentDate} prefixCls={prefixCls} visible={visible} />;
  };
  const disabledDate = (currentDate: Date) => {
    // rc-picker/panel 日期点击事件是绑定在外层元素上，设置不展示的日期为disabled，来禁止点击事件
    if (isOmittedDate(currentDate, currentPickerMode.current)) {
      return true;
    }
    if (typeof disabledDateProp === 'function') {
      return disabledDateProp(currentDate);
    }
    return false;
  };

  return (
    <PickerPanel<Date>
      data-testid="static-date-picker"
      dateRender={dateRender}
      disabledDate={disabledDate}
      value={innerValue}
      defaultValue={defaultValue}
      {...restProps}
      pickerValue={viewDate}
      onSelect={(date) => { onSelect?.(exportDateToZonedDate(date, 'yyyy-MM-DD')); }}
      onChange={(date) => { setViewDate(date, true) }}
      locale={locale}
      prefixCls={prefixCls}
      onPanelChange={(changedValue, changedMode: PickerMode) => {
        currentPickerMode.current = changedMode;
        setViewDate(changedValue, true);
        onPanelChange?.(changedValue, changedMode);
      }}
      picker={mode}
      generateConfig={generateDateFns}
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      superPrevIcon={<LeftDoubleOutlined />}
      prevIcon={<LeftOutlined />}
      nextIcon={<RightOutlined />}
      superNextIcon={<RightDoubleOutlined />}
    />
  );
};

DatePicker.displayName = 'DatePicker';

export default DatePicker;
