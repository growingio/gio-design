import React from 'react';
import classnames from 'classnames';
import PickerPanel from 'rc-picker/lib/PickerPanel';
import generateDateFns from 'rc-picker/lib/generate/dateFns';
import zhCN from 'rc-picker/lib/locale/zh_CN';
import { usePrefixCls } from '@gio-design/utils';
import { TimePickerProps } from './interfaces';

function TimePicker({ className, showSecond = false, renderFooter, ...restProps }: TimePickerProps) {
  const prefixCls = usePrefixCls('new-time-picker');
  return (
    <PickerPanel<Date>
      {...restProps}
      className={classnames({ [`${prefixCls}--three-columns`]: showSecond }, className)}
      hideHeader
      locale={zhCN}
      prefixCls={prefixCls}
      picker="time"
      generateConfig={generateDateFns}
      showNow={false}
      showSecond={showSecond}
      renderExtraFooter={renderFooter}
    />
  );
}

export default TimePicker;
