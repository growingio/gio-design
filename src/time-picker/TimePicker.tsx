import React from 'react';
import classnames from 'classnames';
import PickerPanel from 'rc-picker/lib/PickerPanel';
import generateDateFns from 'rc-picker/lib/generate/dateFns';
import { useLocale, usePrefixCls } from '@gio-design/utils';
import defaultLocale from './locales/zh-CN';
import { TimePickerProps } from './interfaces';

function TimePicker({ className, showSecond = false, renderFooter, ...restProps }: TimePickerProps) {
  const prefixCls = usePrefixCls('new-time-picker');
  const locale = useLocale('TimePicker') || defaultLocale;

  return (
    <PickerPanel<Date>
      {...restProps}
      className={classnames({ [`${prefixCls}--three-columns`]: showSecond }, className)}
      hideHeader
      locale={locale}
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
