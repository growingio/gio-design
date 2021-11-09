/* eslint-disable @typescript-eslint/ban-ts-comment */
import React from 'react';
import { useLocale, usePrefixCls } from '@gio-design/utils';
import { LeftDoubleOutlined, LeftOutlined, RightOutlined, RightDoubleOutlined } from '@gio-design/icons';
import PickerPanel from 'rc-picker/lib/PickerPanel';
import generateDateFns from 'rc-picker/lib/generate/dateFns';
import { Locale } from 'rc-picker/lib/interface';
import { StaticDatePickerProps } from './interfaces';

function DatePicker({ viewDate, ...restProps }: StaticDatePickerProps) {
  const locale = useLocale<Locale>('DatePicker');
  return (
    <PickerPanel<Date>
      {...restProps}
      pickerValue={viewDate}
      locale={locale}
      prefixCls={usePrefixCls('picker')}
      picker="date"
      generateConfig={generateDateFns}
      // @ts-ignore
      superPrevIcon={<LeftDoubleOutlined />}
      prevIcon={<LeftOutlined />}
      nextIcon={<RightOutlined />}
      superNextIcon={<RightDoubleOutlined />}
    />
  );
}

export default DatePicker;
