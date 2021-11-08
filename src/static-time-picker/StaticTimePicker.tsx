import React from 'react';
import classnames from 'classnames';
import PickerPanel from 'rc-picker/lib/PickerPanel';
import generateDateFns from 'rc-picker/lib/generate/dateFns';
import { useLocale, usePrefixCls } from '@gio-design/utils';
import defaultLocale from './locales/zh-CN';
import { StaticTimePickerProps } from './interfaces';

function StaticTimePicker({ className, showSecond = false, renderFooter, ...restProps }: StaticTimePickerProps) {
  const prefixCls = usePrefixCls('new-time-picker');
  const locale = useLocale('StaticTimePicker') || defaultLocale;

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

export default StaticTimePicker;
