import React, { useState } from 'react';
import { usePrefixCls, useLocale } from '@gio-design/utils';
import Checkbox from '../checkbox/Checkbox';
import Button from '../button/Button';
import SelectList, { OptionProps as Option } from '../list';
import { QuickPickerProps } from './interfaces';
import { experimentalQuickOptions } from './constant';
import defaultLocaleText from './locales/zh-CN';

function QuickPicker({ options, optionsFilter, onSelect, timeRange, experimental, ...rest }: QuickPickerProps) {
  const [currentValue, setCurrentValue] = useState(timeRange);
  const [toToday, setToToday] = useState(false);
  const prefixCls = usePrefixCls('quick-picker');
  const localeText: typeof defaultLocaleText = useLocale('StaticPastTimePicker') || defaultLocaleText;

  const filter = (currentOptions: Option[]) => {
    if (optionsFilter) {
      // # Option  !== OptionProps#
      return currentOptions.filter((o: any) => optionsFilter(o));
    }
    return currentOptions;
  };

  let [left, right] = options;
  if (experimental) {
    left = [...left, ...experimentalQuickOptions(localeText)[0]];
    right = [...right, ...experimentalQuickOptions(localeText)[1]];
  }

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
    onSelect(timeRange as string);
  };

  return (
    <div data-testid="quick-picker" className={prefixCls} {...rest}>
      <div className={`${prefixCls}__list`}>
        <SelectList value={currentValue} options={filter(left as any)} onChange={handleOnSelect} />
        <SelectList value={currentValue} options={filter(right as any)} onChange={handleOnSelect} />
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
            <Checkbox checked={toToday} onChange={handleOnTodayCheck}>
              至今日
            </Checkbox>
          )}
        <div className={`${prefixCls}__bottom__button-group`}>
          <Button type="secondary" size="small" onClick={handleCancel}>
            取消
          </Button>
          <Button type="primary" size="small" onClick={handleOk}>
            确定
          </Button>
        </div>
      </div>
    </div>
  );
}

export default QuickPicker;
