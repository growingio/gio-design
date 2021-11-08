import React from 'react';
import {
  format,
  getTime,
  startOfToday,
  startOfYesterday,
  differenceInDays,
  startOfDay,
  isValid,
  isAfter,
} from 'date-fns';
import { usePrefixCls } from '@gio-design/utils';
import TabNav from '../tab-nav';
import DatePicker from '../static-date-picker';
import InnerRangePanel from './InnerRangePanel';
import { RangePickerProps } from './interfaces';
import { DATE_FORMAT, END_DATE_MAPPING } from './constant';
import { parseStartAndEndDate } from './utils';

function SinceRangePicker({ disabledDate, timeRange, onSelect, onCancel, experimental }: RangePickerProps) {
  const endDateKeys = ['today', experimental ? 'yesterday' : undefined];
  const dates = parseStartAndEndDate(timeRange);
  const prefixCls = usePrefixCls('range-panel__header');
  const [startDate, setStartDate] = React.useState<Date | undefined>(dates[0]);
  const [endKey, setEndKey] = React.useState(endDateKeys[dates[1] ? differenceInDays(startOfToday(), dates[1]) : 0]);

  const renderHeader = () => {
    const startDateString = startDate ? format(startDate, DATE_FORMAT) : '开始日期';
    return (
      <>
        <span className={`${prefixCls}__text`}>{`从 ${startDateString}`}</span>
        <span className={`${prefixCls}__options`}>
          <TabNav
            size="small"
            defaultActiveKey={endKey}
            onChange={(key) => {
              setEndKey(key);
            }}
          >
            {endDateKeys.map((o: string) => o && <TabNav.Item key={o}>{END_DATE_MAPPING[o]}</TabNav.Item>)}
          </TabNav>
        </span>
      </>
    );
  };
  const handleDisabledDate = (current: Date) =>
    disabledDate?.(current) || isAfter(current, endKey === 'yesterday' ? startOfYesterday() : startOfToday());

  const handleOnOK = () => {
    onSelect(`since:${getTime(startOfDay(startDate as Date))}${endKey === 'yesterday' ? ',1' : ''}`);
  };
  return (
    <InnerRangePanel
      disableOK={!isValid(startDate)}
      header={renderHeader()}
      body={<DatePicker disabledDate={handleDisabledDate} value={startDate} onSelect={setStartDate} />}
      onCancel={onCancel}
      onOK={handleOnOK}
    />
  );
}

export default SinceRangePicker;
