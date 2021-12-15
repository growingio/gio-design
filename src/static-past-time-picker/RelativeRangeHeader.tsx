import React from 'react';
import { usePrefixCls, useLocale } from '@gio-design/utils';
import { PlusOutlined } from '@gio-design/icons';
import { differenceInDays, startOfDay, startOfToday, subDays } from 'date-fns';
import Button from '../button';
import Input from '../input';
import { RelativeRangeHeaderProps } from './interfaces';
import defaultLocale from './locales/zh-CN';

const convertDateToDays = (date: Date | undefined, defaultValue: number) =>
  date ? differenceInDays(startOfToday(), startOfDay(date)) : defaultValue;

function RelativeRangeHeader({ dateRange, onRangeChange, onModeChange }: RelativeRangeHeaderProps) {
  const [startDays, setStartDays] = React.useState<number>(convertDateToDays(dateRange[0], 2));
  const [endDays, setEndDays] = React.useState<number>(convertDateToDays(dateRange[1], 1));
  const [endDaysHidden, setEndDaysHidden] = React.useState(endDays === 1);

  const locale = useLocale('StaticPastTimePicker');

  const { lastText, dayText, endDayText, ToText } = {
    ...defaultLocale,
    ...locale,
  };

  const basePrefixCls = usePrefixCls('range-panel__header');
  const setRange = (start: number, end: number) => {
    const startDate = subDays(startOfToday(), start);
    const endDate = subDays(startOfToday(), end);
    onRangeChange([startDate, endDate]);
  };

  const renderDuration = () => {
    const duration = endDays === 1 ? startDays : startDays - endDays;
    return (
      <>
        <span className={`${basePrefixCls}__text`}>{lastText}</span>
        <span className={`${basePrefixCls}__input-number`} data-testid="duration">
          <Input.InputNumber
            min={1}
            max={9999}
            value={duration}
            onChange={(e) => {
              const value = parseInt(e.target.value, 10);
              if (value && value >= 1 && value <= 9999) {
                setRange(value + (endDays as number), endDays as number);
              }
            }}
            size="small"
          />
        </span>
        <span className={`${basePrefixCls}__text`}>{dayText}</span>
        <Button
          className={`${basePrefixCls}__button`}
          type="secondary"
          prefix={<PlusOutlined />}
          onClick={() => {
            setEndDaysHidden(false);
            onModeChange(false);
          }}
          size="small"
        >
          {endDayText}
        </Button>
      </>
    );
  };
  const renderRange = () => (
    <>
      <span className={`${basePrefixCls}__text`}>{lastText}</span>
      <span className={`${basePrefixCls}__input-number`} data-testid="end-days">
        <Input.InputNumber
          min={0}
          max={startDays - 1}
          value={endDays}
          onChange={(e) => {
            const value = parseInt(e.target.value, 10);
            if (value && value < startDays) {
              setRange(startDays as number, value as number);
            }
          }}
          size="small"
        />
      </span>
      <span className={`${basePrefixCls}__text`}>{ToText}</span>
      <span className={`${basePrefixCls}__input-number`} data-testid="start-days">
        <Input.InputNumber
          min={endDays + 1}
          max={10000}
          value={startDays + 1}
          onChange={(e) => {
            const value = parseInt(e.target.value, 10);
            if (value && value > endDays) {
              setRange(value as number, endDays as number);
            }
          }}
          size="small"
        />
      </span>
      <span className={`${basePrefixCls}__text`}>{dayText}</span>
    </>
  );

  React.useEffect(() => {
    const currentEndDays = convertDateToDays(dateRange[1], 1);
    setStartDays(convertDateToDays(dateRange[0], 2));
    setEndDays(currentEndDays);
  }, [dateRange]);

  return endDaysHidden ? renderDuration() : renderRange();
}

export default RelativeRangeHeader;
