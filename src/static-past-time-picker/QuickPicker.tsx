import React from 'react';
import { usePrefixCls, useControlledState as useState, useLocale } from '@gio-design/utils';
import SelectList, { OptionProps as Option } from '../list';
import { QuickPickerProps } from './interfaces';
import { experimentalQuickOptions } from './constant';
import defaultLocaleText from './locales/zh-CN';

function QuickPicker({ options, optionsFilter, onSelect, timeRange, experimental }: QuickPickerProps) {
  const [currentValue, setCurrentValue] = useState(timeRange, '');
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
    onSelect(selectedValue);
  };

  return (
    <div className={prefixCls}>
      <SelectList value={currentValue} options={filter(left as any)} onChange={handleOnSelect} />
      <SelectList value={currentValue} options={filter(right as any)} onChange={handleOnSelect} />
    </div>
  );
}

export default QuickPicker;
