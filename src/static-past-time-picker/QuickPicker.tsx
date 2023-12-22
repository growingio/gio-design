import React, { useEffect, useState } from 'react';
import { usePrefixCls, useLocale } from '@gio-design/utils';
import Checkbox from '../checkbox/Checkbox';
import Button from '../button/Button';
import SelectList, { OptionProps as Option } from '../list';
import { QuickPickerProps } from './interfaces';
import { experimentalQuickOptions } from './constant';
import defaultLocaleText from './locales/zh-CN';

function QuickPicker({
  options: optionsParams,
  optionsFilter,
  onSelect,
  onCancel,
  timeRange,
  experimental,
  NotAvailableToday,
  ...rest
}: QuickPickerProps) {
  const [currentValue, setCurrentValue] = useState(timeRange);
  const [toToday, setToToday] = useState(false);
  const prefixCls = usePrefixCls('quick-picker');
  const localeText: typeof defaultLocaleText = useLocale('StaticPastTimePicker') || defaultLocaleText;

  const locale = useLocale('StaticPastTimePicker');

  const { okText, closeText, includeToday } = {
    ...localeText,
    ...locale,
  };
  const filter = (currentOptions: Option[]) => {
    if (optionsFilter) {
      // # Option  !== OptionProps#
      return currentOptions.filter((o: any) => optionsFilter(o));
    }
    return currentOptions;
  };

  const options = experimental ? [...optionsParams, ...experimentalQuickOptions(localeText)] : optionsParams;
  const handleOnSelect = (selectedValue: string) => {
    setCurrentValue(selectedValue);
  };

  const handleOnTodayCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    setToToday(e.target.checked);
  };

  const handleOk = () => {
    onSelect(toToday ? (currentValue?.replace(/-lt-today/, '') as string) : (currentValue as string));
  };

  const handleCancel = () => {
    // onSelect(timeRange as string);
    onCancel?.();
  };

  useEffect(() => {
    if (experimental && ['year:1,0', 'quarter:1,0', 'month:1,0', 'week:1,0'].includes(currentValue as string)) {
      setCurrentValue(`${currentValue && currentValue.split(':')[0]}-lt-today:1,0` as string);
      setToToday(true);
    }
  }, [currentValue, experimental, toToday]);

  return (
    <div data-testid="quick-picker" className={prefixCls} {...rest}>
      <div className={`${prefixCls}__list`}>
        <SelectList
          value={currentValue}
          options={filter(options as any)}
          onChange={handleOnSelect}
          collapse={Infinity}
        />
      </div>
      <div className={`${prefixCls}__bottom`}>
        {experimental &&
          [
            'year-lt-today:1,0',
            'quarter-lt-today:1,0',
            'month-lt-today:1,0',
            'week-lt-today:1,0',
            'year:1,0',
            'quarter:1,0',
            'month:1,0',
            'week:1,0',
          ].includes(currentValue as string) && (
            <Checkbox checked={toToday} onChange={handleOnTodayCheck} disabled={NotAvailableToday}>
              {includeToday}
            </Checkbox>
          )}
        <div className={`${prefixCls}__bottom__button-group`}>
          <Button type="secondary" size="small" onClick={handleCancel}>
            {closeText}
          </Button>
          <Button type="primary" size="small" onClick={handleOk} disabled={!currentValue}>
            {okText}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default QuickPicker;
