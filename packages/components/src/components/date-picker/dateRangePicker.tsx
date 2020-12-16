import React, { useRef, useState, useEffect } from 'react';
import zhCN from 'rc-calendar/lib/locale/zh_CN';
import RcDatePicker from 'rc-calendar/lib/Picker';
import RcRangeCalendar from 'rc-calendar/lib/RangeCalendar';
import classNames from 'classnames';
import moment, { Moment } from 'moment';
import { debounce } from 'lodash';
import usePrefixCls from '../../utils/hooks/use-prefix-cls';
import Button from '../button';
import Input from '../input';
import { DateRangePickerProps } from './interface';

const DateRangePicker: React.FC<DateRangePickerProps> = (props: DateRangePickerProps) => {
  const { prefixCls: customizePrefixCls, format = 'YYYY/MM/DD', value, defaultValue, showFooter, disabledDate } = props;
  const prefixCls = usePrefixCls('date-picker', customizePrefixCls);

  const calendarContainerRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [timeRange, setTimeRange] = useState(value);
  const [leftInputTimeRange, setLeftInputTimeRange] = useState('');
  const [rightInputTimeRange, setRightInputTimeRange] = useState('');

  useEffect(() => {
    setTimeRange(value);
  }, [value]);

  const onSelect = (values: Array<Moment>): void => {
    setTimeRange(values);
    props.onSelect?.(values);
    !showFooter && setOpen(false);
  };

  const onChange = (values: Array<Moment>): void => {
    setTimeRange(values);
  };

  const onPanelChange = (values: Array<Moment>): void => {
    setTimeRange(values);
  };

  const debounceLeftChange = debounce((e: string): void => {
    const values = moment(e, props.format);
    if (values.isValid() && values.isBefore(timeRange[1])) {
      setTimeRange([values, timeRange[1]]);
    } else {
      setTimeRange(timeRange);
    }
  }, 1000);

  const debounceRightChange = debounce((e: string): void => {
    const values = moment(e, props.format);
    if (values.isValid() && values.isAfter(timeRange[0])) {
      setTimeRange([timeRange[0], values]);
    } else {
      setTimeRange(timeRange);
    }
  }, 1000);

  const handleLeftInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    // e.persist();
    setLeftInputTimeRange(e.target.value);
    debounceLeftChange(e.target.value);
  };

  const handleRightInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    // e.persist();
    setRightInputTimeRange(e.target.value);
    debounceRightChange(e.target.value);
  };

  const CalendarCls = classNames(classNames, {
    [`${prefixCls}-no-footer`]: !showFooter,
  });

  const onConfirm = () => {
    setOpen(false);
    setTimeRange(timeRange);
    setLeftInputTimeRange('');
    setRightInputTimeRange('');
    props.onChange?.(timeRange);
  };

  const onCancel = () => {
    setOpen(false);
    setTimeRange(value);
    setLeftInputTimeRange('');
    setRightInputTimeRange('');
    props.onChange?.(value);
  };

  const renderFooter = () => (
    <>
      {props.renderExtraFooter && (
        <div className={classNames(`${prefixCls}-extra-footer`)}>{props.renderExtraFooter()}</div>
      )}
      <Button onClick={onCancel} type="secondary" size="middle" style={{ margin: ' 0 12px 0 0 ' }}>
        取消
      </Button>
      <Button onClick={onConfirm} size="middle">
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
      disabledDate={disabledDate}
      // value={timeRange}
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
    <div className={classNames(`${prefixCls}-wrap-range`)}>
      <RcDatePicker
        animation="slide-up"
        calendar={calendar}
        value={timeRange}
        onChange={onChange}
        prefixCls={`${prefixCls}-dropdown`}
        getCalendarContainer={() => calendarContainerRef.current}
        open={open}
      >
        {({ value: _value }: { value: Array<Moment> }) => (
          <div className={classNames(`${prefixCls}-range-input`)}>
            <Input
              placeholder="please select"
              onChange={handleLeftInputChange}
              value={leftInputTimeRange || `${formatDate(_value[0])}`}
              onClick={() => setOpen(true)}
            />
            <span className={`${prefixCls}-split`}>—</span>
            <Input
              placeholder="please select"
              onChange={handleRightInputChange}
              value={rightInputTimeRange || `${formatDate(_value[1])}`}
              onClick={() => setOpen(true)}
            />
            <div ref={calendarContainerRef} className={classNames(`${prefixCls}-wrapper`)} />
          </div>
        )}
      </RcDatePicker>
    </div>
  );
};

export default DateRangePicker;
