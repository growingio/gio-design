/* eslint-disable @typescript-eslint/ban-ts-comment */
import React from 'react';
import { usePrefixCls } from '@gio-design/utils';
import { LeftDoubleOutlined, LeftOutlined, RightOutlined, RightDoubleOutlined } from '@gio-design/icons';
import PickerPanel from 'rc-picker/lib/PickerPanel';
import generateDateFns from 'rc-picker/lib/generate/dateFns';
import zhCN from 'rc-picker/lib/locale/zh_CN';
import { DatePickerProps } from './interfaces';

function DatePicker(props: DatePickerProps) {
  return (
    <PickerPanel<Date>
      {...props}
      locale={zhCN}
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
