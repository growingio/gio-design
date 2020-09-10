import React, { useContext, useRef, useState } from 'react';
import RcCalendar from 'rc-calendar';
import zhCN from 'rc-calendar/lib/locale/zh_CN';
import RcDatePicker from 'rc-calendar/lib/picker';
import { debounce } from 'lodash';
import classNames from 'classnames';
import moment, { Moment } from 'moment';
import Input from '../input';
import Button from '../button';
import { ConfigContext } from '../config-provider';
import { DatePickerProps } from './interface';

moment.locale('zh-cn');

const DatePicker: React.FC<DatePickerProps> = (props: DatePickerProps) => {
  const { prefixCls: customizePrefixCls, format = 'YYYY/MM/DD', value, defaultValue, showFooter, disabledDate } = props;
  const { getPrefixCls } = useContext(ConfigContext);
  const prefixCls = getPrefixCls('date-picker', customizePrefixCls);

  const calendarContainerRef = useRef(null);
  const inputRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [localValue, setLocalValue] = useState(props.value);
  const [inputTime, setInputTime] = useState('');

  const onSelect = (value: Moment): void => {
    if (!props.showFooter) {
      setLocalValue(value);
      props?.onSelect(value);
      setOpen(false);
    }
  };

  const onChange = (value: Moment): void => {
    setLocalValue(value);
  };

  const CalendarCls = classNames(classNames, {
    [`${prefixCls}-no-footer`]: !showFooter,
  });

  const debounceTimeChange = debounce((e: string): void => {
    const value = moment(e, props.format);
    if (value.isValid()) {
      setLocalValue(value);
    } else {
      setLocalValue(localValue);
    }
  }, 1000);

  const handleInputChange = (e: string): void => {
    // e.persist();
    setInputTime(e);
    debounceTimeChange(e);
  };

  const onConfirm = () => {
    setOpen(false);
    setLocalValue(localValue);
    setInputTime('');
    props.onChange(localValue);
  };

  const onCancel = () => {
    setOpen(false);
    setLocalValue(value);
    setInputTime('');
    props.onChange(value);
  };

  const renderFooter = () => (
    <>
      <Button type="secondary" size="small" onClick={onCancel} style={{ margin: ' 0 10px 0 0 ' }}>
        取消
      </Button>
      <Button size="small" onClick={onConfirm}>
        确定
      </Button>
    </>
  );

  const calendar = (
    <RcCalendar
      locale={zhCN}
      style={{ zIndex: 10001 }}
      timePicker={null}
      format={format}
      defaultValue={defaultValue}
      value={localValue}
      onChange={onChange}
      onSelect={onSelect}
      showDateInput={false}
      showToday={false}
      prefixCls={prefixCls}
      className={CalendarCls}
      showOk={false}
      disabledDate={disabledDate}
      renderFooter={renderFooter}
    />
  );

  return (
    <div className={classNames('')}>
      <RcDatePicker
        calendar={calendar}
        value={localValue}
        getCalendarContainer={() => calendarContainerRef.current}
        open={open}
      >
        {({ value }: { value: Moment }) => (
          <>
            <Input
              placeholder="请输入…"
              style={{ height: '48px', width: '253px', zIndex: Number(10002), position: 'relative' }}
              value={inputTime || value.format(format)}
              onChange={handleInputChange}
              onClick={() => setOpen(true)}
              wrapStyle={{ marginBottom: '20px' }}
              ref={inputRef}
            />
            <div ref={calendarContainerRef} />
          </>
        )}
      </RcDatePicker>
    </div>
  );
};

export default DatePicker;
