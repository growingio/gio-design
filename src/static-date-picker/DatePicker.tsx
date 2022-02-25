import React, { useLayoutEffect, useRef } from 'react';
import { useControlledState, useLocale, usePrefixCls } from '@gio-design/utils';
import { LeftDoubleOutlined, LeftOutlined, RightOutlined, RightDoubleOutlined } from '@gio-design/icons';
import PickerPanel from 'rc-picker/lib/PickerPanel';
import generateDateFns from 'rc-picker/lib/generate/dateFns';
import { Locale } from 'rc-picker/lib/interface';
import { isEqual } from 'date-fns';
import defaultLocale from './locales/zh-CN';
import { StaticDatePickerProps } from './interfaces';

const OmittedCell: React.FC = () => {
  const spanRef = useRef<HTMLSpanElement>(null);
  useLayoutEffect(() => {
    // Remove title prop
    if (spanRef.current) {
      const parent = spanRef.current.parentElement;
      if (parent?.hasAttribute('title')) {
        parent.removeAttribute('title');
      }
    }
  }, []);
  return <span ref={spanRef} />;
};

const DatePicker: React.FC<StaticDatePickerProps> = ({
  viewDate: viewDateProp,
  disabledDate: disabledDateProp,
  ...restProps
}) => {
  const locale = useLocale<Locale>('DatePicker') || defaultLocale;
  const [viewDate, setViewDate] = useControlledState(viewDateProp, new Date());

  const prefixCls = usePrefixCls('picker');

  const isSameYearAndDay = (currentDate: Date) =>
    isEqual(
      new Date(currentDate.getFullYear(), currentDate.getMonth()),
      new Date(viewDate.getFullYear(), viewDate.getMonth())
    );

  const omitOtherDate = (currentDate: Date) => {
    if (isSameYearAndDay(currentDate)) {
      return <div className={`${prefixCls}-cell-inner`}>{currentDate.getDate()}</div>;
    }
    return <OmittedCell />;
  };

  const disabledDate = (currentDate: Date) => {
    if (!isSameYearAndDay(currentDate)) {
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
      dateRender={omitOtherDate}
      disabledDate={disabledDate}
      {...restProps}
      pickerValue={viewDate}
      onPickerValueChange={(date) => setViewDate(date)}
      locale={locale}
      prefixCls={prefixCls}
      picker="date"
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
