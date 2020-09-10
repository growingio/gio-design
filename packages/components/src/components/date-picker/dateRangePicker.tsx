import React, { useContext, useRef, useState } from 'react';
import zhCN from 'rc-calendar/lib/locale/zh_CN';
import RcDatePicker from 'rc-calendar/lib/picker';
import RcRangeCalendar from 'rc-calendar/lib/RangeCalendar';
import classNames from 'classnames';
import moment, { Moment } from 'moment';
import { debounce } from 'lodash';
import { ConfigContext } from '../config-provider';
import Button from '../button';
import Input from '../input';
import { DateRangePickerProps } from './interface';

const DateRangePicker: React.FC<DateRangePickerProps> = (props: DateRangePickerProps) => {
  const { prefixCls: customizePrefixCls, format = 'YYYY/MM/DD', value, defaultValue, showFooter } = props;
  const { getPrefixCls } = useContext(ConfigContext);
  const prefixCls = getPrefixCls('date-picker', customizePrefixCls);

  const calendarContainerRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [timeRange, setTimeRange] = useState(value);
  const [leftInputTimeRange, setLeftInputTimeRange] = useState('');
  const [rightInputTimeRange, setRightInputTimeRange] = useState('');

  const onSelect = (value: Array<Moment>): void => {
    setTimeRange(value);
    // props?.onSelect(value);
    !showFooter && setOpen(false);
  };

  const onChange = (value: Array<Moment>): void => {
    setTimeRange(value);
  };

  const onPanelChange = (value: Array<Moment>): void => {
    setTimeRange(value);
  };

  const debounceLeftChange = debounce((e: string): void => {
    const value = moment(e, props.format);
    if (value.isValid() && value.isBefore(timeRange[1])) {
      setTimeRange([value, timeRange[1]]);
    } else {
      setTimeRange(timeRange);
    }
  }, 1000);

  const debounceRightChange = debounce((e: string): void => {
    const value = moment(e, props.format);
    if (value.isValid() && value.isAfter(timeRange[0])) {
      setTimeRange([timeRange[0], value]);
    } else {
      setTimeRange(timeRange);
    }
  }, 1000);

  const handleLeftInputChange = (e: string): void => {
    // e.persist();
    setLeftInputTimeRange(e);
    debounceLeftChange(e);
  };

  const handleRightInputChange = (e: string): void => {
    // e.persist();
    setRightInputTimeRange(e);
    debounceRightChange(e);
  };

  const CalendarCls = classNames(classNames, {
    [`${prefixCls}-no-footer`]: !showFooter,
  });

  const onConfirm = () => {
    setOpen(false);
    setTimeRange(timeRange);
    setLeftInputTimeRange('');
    setRightInputTimeRange('');
    props.onChange(timeRange);
  };

  const onCancel = () => {
    setOpen(false);
    setTimeRange(value);
    setLeftInputTimeRange('');
    setRightInputTimeRange('');
    props.onChange(value);
  };

  const renderFooter = () => (
    <>
      <Button onClick={onCancel} type="secondary" size="small" style={{ margin: ' 0 10px 0 0 ' }}>
        取消
      </Button>
      <Button onClick={onConfirm} size="small">
        确定
      </Button>
    </>
  );

  const formatDate = (v: Moment) => v.format(format);

  const calendar = (
    <RcRangeCalendar
      locale={zhCN}
      format={format}
      defaultValue={defaultValue}
      value={timeRange}
      onSelect={onSelect}
      onPanelChange={onPanelChange}
      showToday={false}
      showOk={false}
      showDateInput={false}
      prefixCls={prefixCls}
      className={CalendarCls}
      renderFooter={renderFooter}
    />
  );

  return (
    <div className={classNames('')}>
      <RcDatePicker
        style={{ zIndex: 1001 }}
        animation="slide-up"
        calendar={calendar}
        value={timeRange}
        onChange={onChange}
        prefixCls={`${prefixCls}-dropdown`}
        getCalendarContainer={() => calendarContainerRef.current}
        open={open}
      >
        {({ value }: { value: Array<Moment> }) => (
          <div
            className={classNames(`${prefixCls}-range-input`)}
            style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '252px' }}
          >
            <Input
              placeholder="please select"
              onChange={handleLeftInputChange}
              value={leftInputTimeRange || `${formatDate(value[0])}`}
              onClick={() => setOpen(true)}
              inputStyle={{ position: 'relative', zIndex: Number(1002) }}
              wrapStyle={{ width: '120px' }}
            />
            <span className={`${prefixCls}-split`}>—</span>
            <Input
              placeholder="please select"
              onChange={handleRightInputChange}
              value={rightInputTimeRange || `${formatDate(value[1])}`}
              onClick={() => setOpen(true)}
              inputStyle={{ position: 'relative', zIndex: Number(1002) }}
              wrapStyle={{ width: '120px' }}
            />
            <div ref={calendarContainerRef} />
          </div>
        )}
      </RcDatePicker>
    </div>
  );
};

export default DateRangePicker;
