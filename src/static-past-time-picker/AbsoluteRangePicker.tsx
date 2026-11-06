import React from 'react';
import uniqueId from 'lodash/uniqueId';
import { getTime, isValid, isAfter, startOfToday, subMonths, startOfDay } from 'date-fns';
import { usePrefixCls, useLocale } from '@gio-design/utils';
import { formatDates } from '../date-range-picker/index';
import StaticDateRangePicker from '../static-date-range-picker/index';
import AbsoluteTimePicker from './AbsoluteTimePicker';
import { exportZonedDateToDate, parseFnsTimeZone } from '../utils/timeHelper';
import InnerRangePanel from './InnerRangePanel';
import { getAbsoluteDateTime, getAbsoluteTimeTexts, getCalendarDate, isValidTimeText } from './absoluteTime';
import { RangePickerProps } from './interfaces';
import { parseStartAndEndDate } from './utils';
import defaultLocale from './locales/zh-CN';

function AbsoluteRangePicker({
  disabledDate,
  timeRange,
  onSelect,
  onRangeSelect,
  onCancel,
  defaultTimeRange,
  allowReset,
  showTime = false,
}: RangePickerProps) {
  const [dates, setDates] = React.useState<[Date | undefined, Date | undefined]>(parseStartAndEndDate(timeRange));
  const [timeTexts, setTimeTexts] = React.useState<[string, string]>(() => getAbsoluteTimeTexts(timeRange));
  const [inputId] = React.useState(() => uniqueId('absolute-time-'));
  const prefixCls = usePrefixCls('range-panel__header');
  const panelCls = usePrefixCls('range-panel');

  React.useEffect(() => {
    if (showTime) {
      setDates(parseStartAndEndDate(timeRange));
      setTimeTexts(getAbsoluteTimeTexts(timeRange));
    }
  }, [timeRange, showTime]);

  const locale = useLocale('StaticPastTimePicker');

  const {
    startDayText,
    endDayText,
    FromText,
    ToText,
    startTimeText,
    timePanelText,
    clearTimeText,
    endTimeText,
    invalidTimeText,
    invalidTimeRangeText,
  } = {
    ...defaultLocale,
    ...locale,
  };

  const start = getAbsoluteDateTime(dates[0], timeTexts[0], false);
  const end = getAbsoluteDateTime(dates[1], timeTexts[1], true);
  const invalidTimes = timeTexts.map(
    (text, index) => !isValidTimeText(text) || (isValid(dates[index]) && !(index ? end : start))
  );
  const reversed = !!start && !!end && isAfter(start, end);
  let timeError = '';
  if (invalidTimes.some(Boolean)) timeError = invalidTimeText;
  else if (reversed) timeError = invalidTimeRangeText;
  const calendarDates: [Date | undefined, Date | undefined] = showTime
    ? [getCalendarDate(dates[0]), getCalendarDate(dates[1])]
    : dates;

  const getClearTimeLabel = (label: string) => {
    if (typeof clearTimeText === 'function') return clearTimeText(label);
    if (typeof clearTimeText === 'string') return clearTimeText;
    return defaultLocale.clearTimeText(label);
  };

  const renderHeader = () => {
    if (showTime) {
      return (
        <span className={`${prefixCls}__text`}>
          {`${FromText} ${start ? parseFnsTimeZone(start, 'yyyy/MM/dd HH:mm:ss') : startDayText} ${ToText} ${
            end ? parseFnsTimeZone(end, 'yyyy/MM/dd HH:mm:ss') : endDayText
          }`}
        </span>
      );
    }
    const placeholder = [startDayText, endDayText];
    const dateString = formatDates(dates);
    const dateTexts = dateString?.split('-')?.map((d) => (d === ' ' ? undefined : d)) || [];
    const text = [dateTexts[0] ?? placeholder[0], dateTexts[1] ?? placeholder[1]];
    return <span className={`${prefixCls}__text`}>{`${FromText} ${text[0]} ${ToText} ${text[1]}`}</span>;
  };
  const handleDisabledDate = (current: Date) => disabledDate?.(current) || isAfter(current, startOfToday());
  const handleOnOK = () => {
    if (showTime) {
      if (start && end && !timeError) onSelect(`abs:${getTime(start)},${getTime(end)}`);
      return;
    }
    onSelect(`abs:${getTime(dates[0] as Date)},${getTime(dates[1] as Date) + 86399999}`);
  };
  const onReset = () => {
    onSelect(defaultTimeRange || '');
  };
  const handleOnSelect = (date: [Date, Date], index: number) => {
    // The calendar converts both values on its second selection; keep the already-zoned start.
    const selectedDates: [Date, Date] = showTime && index === 1 && dates[0] ? [dates[0], date[1]] : date;
    setDates(selectedDates);
    onRangeSelect?.(selectedDates, index);
  };
  const handleOnCancel = () => {
    if (showTime) {
      setDates(parseStartAndEndDate(timeRange));
      setTimeTexts(getAbsoluteTimeTexts(timeRange));
    }
    onCancel?.();
  };
  const calendarEndDay: Date | undefined = showTime ? exportZonedDateToDate(calendarDates[1]) : dates[1];
  const endDay = calendarEndDay !== undefined && isValid(calendarEndDay) ? calendarEndDay : new Date();
  return (
    <InnerRangePanel
      disableOK={showTime ? !start || !end || !!timeError : !isValid(dates[0]) || !isValid(dates[1])}
      header={renderHeader()}
      body={
        <>
          <StaticDateRangePicker
            defaultViewDates={[subMonths(startOfDay(endDay), 1), startOfDay(endDay)]}
            disabledDate={handleDisabledDate}
            onSelect={handleOnSelect}
            value={calendarDates as [Date, Date]}
          />
          {showTime && (
            <div className={`${panelCls}__time-section`}>
              <div className={`${panelCls}__time-row`}>
                {[startTimeText, endTimeText].map((label, index) => (
                  <div className={`${panelCls}__time-field`} key={index === 0 ? 'start' : 'end'}>
                    <label htmlFor={`${inputId}-${index}`}>{label}</label>
                    <AbsoluteTimePicker
                      id={`${inputId}-${index}`}
                      label={label}
                      panelLabel={timePanelText}
                      clearLabel={getClearTimeLabel(label)}
                      invalid={invalidTimes[index] || reversed}
                      describedBy={timeError ? `${inputId}-error` : undefined}
                      placeholder={index === 0 ? '00:00:00' : '23:59:59'}
                      value={timeTexts[index]}
                      onChange={(text) => {
                        setTimeTexts((previous) => (index === 0 ? [text, previous[1]] : [previous[0], text]));
                      }}
                    />
                  </div>
                ))}
              </div>
              {timeError && (
                <div id={`${inputId}-error`} role="alert" className={`${panelCls}__time-error`}>
                  {timeError}
                </div>
              )}
            </div>
          )}
        </>
      }
      onCancel={handleOnCancel}
      onOK={handleOnOK}
      onReset={onReset}
      allowReset={allowReset}
    />
  );
}

export default AbsoluteRangePicker;
