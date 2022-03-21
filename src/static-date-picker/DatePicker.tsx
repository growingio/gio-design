import React, { useEffect, useRef, useState } from 'react';
import { useControlledState, useLocale, usePrefixCls } from '@gio-design/utils';
import { LeftDoubleOutlined, LeftOutlined, RightOutlined, RightDoubleOutlined } from '@gio-design/icons';
import PickerPanel from 'rc-picker/lib/PickerPanel';
import generateDateFns from 'rc-picker/lib/generate/dateFns';
import { Locale, PickerMode } from 'rc-picker/lib/interface';
import { isEqual } from 'date-fns';
import defaultLocale from './locales/zh-CN';
import { StaticDatePickerProps } from './interfaces';

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

  return (
    <div ref={divRef} className={`${prefixCls}-cell-inner`}>
      {visible && currentDate.getDate()}
    </div>
  );
};

const DatePicker: React.FC<StaticDatePickerProps> = ({
  viewDate: viewDateProp,
  disabledDate: disabledDateProp,
  value,
  defaultValue,
  onPanelChange,
  ...restProps
}) => {
  const locale = useLocale<Locale>('DatePicker') || defaultLocale;
  const [viewDate, setViewDate] = useControlledState(viewDateProp, value ?? defaultValue ?? new Date());

  const [mode, setMode] = useState<PickerMode>('date');

  const prefixCls = usePrefixCls('picker');

  const isSameYearAndMonth = (currentDate: Date) =>
    isEqual(
      new Date(currentDate.getFullYear(), currentDate.getMonth()),
      new Date(viewDate.getFullYear(), viewDate.getMonth())
    );

  const omitOtherDate = (currentDate: Date) => {
    if (isSameYearAndMonth(currentDate)) {
      return <Cell currentDate={currentDate} prefixCls={prefixCls} visible />;
    }
    return <Cell currentDate={currentDate} prefixCls={prefixCls} visible={false} />;
  };
  const disabledDate = (currentDate: Date) => {
    if (mode === 'date') {
      if (!isSameYearAndMonth(currentDate)) {
        return true;
      }
    }
    if (typeof disabledDateProp === 'function') {
      return disabledDateProp(currentDate);
    }
    return false;
  };

  return (
    <PickerPanel<Date>
      data-testid="static-date-picker"
      dateRender={omitOtherDate}
      disabledDate={disabledDate}
      value={value}
      defaultValue={defaultValue}
      {...restProps}
      pickerValue={viewDate}
      onPickerValueChange={(date) => setViewDate(date)}
      locale={locale}
      prefixCls={prefixCls}
      onPanelChange={(changedValue, changedMode: PickerMode) => {
        setMode(changedMode);
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
