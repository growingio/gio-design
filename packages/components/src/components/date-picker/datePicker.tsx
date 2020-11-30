import React, { useRef, useState } from 'react';
import RcCalendar from 'rc-calendar';
import zhCN from 'rc-calendar/lib/locale/zh_CN';
import RcDatePicker from 'rc-calendar/lib/Picker';
import { debounce } from 'lodash';
import classNames from 'classnames';
import moment, { Moment } from 'moment';
import Input from '../input';
import Button from '../button';
import usePrefixCls from '../../utils/hooks/use-prefix-cls';
import { DatePickerProps } from './interface';

moment.locale('zh-cn', {
  months: '1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月'.split('_'),
  monthsShort: '1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月'.split('_'),
  weekdaysMin: '日_一_二_三_四_五_六'.split('_'),
});

const DatePicker: React.FC<DatePickerProps> = (props: DatePickerProps) => {
  const { prefixCls: customizePrefixCls, format = 'YYYY/MM/DD', value, defaultValue, showFooter, disabledDate } = props;
  const prefixCls = usePrefixCls('date-picker', customizePrefixCls);

  const calendarContainerRef = useRef(null);
  const inputRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [localValue, setLocalValue] = useState(value);
  const [inputTime, setInputTime] = useState('');

  const onSelect = (values: Moment): void => {
    if (!props.showFooter) {
      setLocalValue(values);
      props.onSelect?.(values);
      setOpen(false);
    }
  };

  const onChange = (values: Moment): void => {
    setLocalValue(values);
  };

  const CalendarCls = classNames(classNames, {
    [`${prefixCls}-no-footer`]: !showFooter,
  });

  const debounceTimeChange = debounce((e: string): void => {
    const values = moment(e, props.format);
    if (values.isValid()) {
      setLocalValue(values);
    } else {
      setLocalValue(localValue);
    }
  }, 1000);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    // e.persist();
    setInputTime(e.target.value);
    debounceTimeChange(e.target.value);
  };

  const onConfirm = () => {
    setOpen(false);
    setLocalValue(localValue);
    setInputTime('');
    props.onChange?.(localValue);
  };

  const onCancel = () => {
    setOpen(false);
    setLocalValue(value);
    setInputTime('');
    props.onChange?.(value);
  };

  const renderFooter = () => (
    <>
      <Button type="secondary" size="middle" onClick={onCancel} style={{ margin: ' 0 10px 0 0 ' }}>
        取消
      </Button>
      <Button size="middle" onClick={onConfirm}>
        确定
      </Button>
    </>
  );

  const calendar = (
    <RcCalendar
      locale={zhCN}
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
    <div className={classNames(`${prefixCls}-wrap`)}>
      <RcDatePicker
        calendar={calendar}
        value={localValue}
        getCalendarContainer={() => calendarContainerRef.current}
        open={open}
      >
        {({ value: _value }: { value: Moment }) => (
          <>
            <Input
              placeholder="请输入…"
              value={inputTime || _value.format(format)}
              onChange={handleInputChange}
              onClick={() => setOpen(true)}
              ref={inputRef}
            />
            <div ref={calendarContainerRef} className={classNames(`${prefixCls}-wrapper`)} />
          </>
        )}
      </RcDatePicker>
    </div>
  );
};

export default DatePicker;
