import React from 'react';
import classnames from 'classnames';
import PickerPanel from 'rc-picker/lib/PickerPanel';
import generateDateFns from 'rc-picker/lib/generate/dateFns';
import { useLocale, usePrefixCls } from '@gio-design/utils';
import { Locale } from 'rc-picker/lib/interface';
import defaultLocale from './locales/zh-CN';
import { StaticTimePickerProps } from './interfaces';

export function StaticTimePicker({ className, showSecond = false, renderFooter, ...restProps }: StaticTimePickerProps) {
  const prefixCls = usePrefixCls('time-picker');
  const locale = useLocale<Locale>('StaticTimePicker') || defaultLocale;

  return (
    <PickerPanel<Date>
      data-testid="static-time-picker"
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
