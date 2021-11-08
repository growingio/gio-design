import React from 'react';
import { usePrefixCls } from '@gio-design/utils';
import { filter } from 'lodash';
import SelectList from '../list';
import QuickPicker from './QuickPicker';
import { StaticPastTimePickerProps, TimeMode } from './interfaces';
import { quickOptions, PICKER_OPTIONS } from './constant';
import { parseTimeMode } from './utils';
import AbsoluteRangePicker from './AbsoluteRangePicker';
import SinceRangePicker from './SinceRangePicker';
import RelativeRangePicker from './RelativeRangePicker';

function StaticPastTimePicker({
  disabledDate,
  modes = [TimeMode.Since, TimeMode.Relative, TimeMode.Absolute],
  timeRange,
  onSelect,
  onCancel,
  experimental = false,
  quickOptionsFilter,
}: StaticPastTimePickerProps) {
  const parseMode = (currentRange: string | undefined) => parseTimeMode(currentRange);
  const originMode = parseMode(timeRange) ?? 'quick';
  const [mode, setMode] = React.useState<string | undefined>(originMode);
  const [currentRange, setCurrentRange] = React.useState(timeRange);
  const prefixCls = usePrefixCls('static-past-time-picker');

  const handleOnSelect = (value: string) => {
    setCurrentRange(value);
    onSelect?.(value);
  };
  const renderPicker = (currentMode: string | undefined) => {
    const valueProps = {
      disabledDate,
      experimental,
      timeRange: currentMode === originMode ? currentRange : undefined,
      onSelect: handleOnSelect,
      onCancel,
    };
    switch (currentMode) {
      case 'quick':
        return <QuickPicker {...valueProps} options={quickOptions} optionsFilter={quickOptionsFilter} />;
      case TimeMode.Since:
        return <SinceRangePicker {...valueProps} />;
      case TimeMode.Relative:
        return <RelativeRangePicker {...valueProps} />;
      case TimeMode.Absolute:
      default:
        return <AbsoluteRangePicker {...valueProps} />;
    }
  };

  React.useEffect(() => {
    setMode(parseMode(timeRange) ?? 'quick');
  }, [timeRange]);

  return (
    <div className={prefixCls}>
      <div className={`${prefixCls}__time-mode`}>
        <SelectList
          options={filter(PICKER_OPTIONS, (o) => o.value === 'quick' || modes.includes(o.value))}
          value={mode}
          onChange={(value) => {
            setMode(value as string);
          }}
        />
      </div>
      <div className={`${prefixCls}__panel`}>{renderPicker(mode)}</div>
    </div>
  );
}

export default StaticPastTimePicker;
