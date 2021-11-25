import React, { useRef } from 'react';
import RcCalendar from 'rc-calendar';
import zhCN from 'rc-calendar/lib/locale/zh_CN';
import RcDatePicker from 'rc-calendar/lib/Picker';
import classNames from 'classnames';
import moment, { Moment } from 'moment';
import Input from '../../legacy/input';
import Button from '../../legacy/button';
import usePrefixCls from '../../utils/hooks/use-prefix-cls';
import useDatePicker from './hook/useDatePicker';
import { DatePickerProps } from './interface';

moment.locale('zh-cn', {
  months: '1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月'.split('_'),
  monthsShort: '1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月'.split('_'),
  weekdaysMin: '日_一_二_三_四_五_六'.split('_'),
});

export const DatePicker: React.FC<DatePickerProps> = (props: DatePickerProps) => {
  const {
    prefixCls: customizePrefixCls,
    format = 'YYYY/MM/DD',
    defaultValue,
    showFooter,
    disabledDate,
    disabled,
  } = props;
  const prefixCls = usePrefixCls('date-picker-legacy', customizePrefixCls);

  const calendarContainerRef = useRef(null);
  const inputRef = useRef(null);

  const { footerFiled, inputField, panelField } = useDatePicker(props);

  const CalendarCls = classNames(classNames, {
    [`${prefixCls}-no-footer`]: !showFooter,
  });

  const renderFooter = () => (
    <>
      <Button type="secondary" size="middle" onClick={footerFiled.onCancel} style={{ margin: ' 0 10px 0 0 ' }}>
        取消
      </Button>
      <Button size="middle" onClick={footerFiled.onConfirm}>
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
      value={panelField.localValue}
      onChange={panelField.onChange}
      onSelect={panelField.onSelect}
      showDateInput={false}
      showToday={false}
      prefixCls={prefixCls}
      className={CalendarCls}
      showOk={false}
      disabledDate={disabledDate}
      renderFooter={renderFooter}
      onBlur={panelField.onblur}
    />
  );

  return (
    <div className={classNames(`${prefixCls}-wrap`)}>
      <RcDatePicker
        calendar={calendar}
        value={panelField.localValue}
        getCalendarContainer={() => calendarContainerRef.current}
        open={panelField.open}
      >
        {({ value: _value }: { value: Moment }) => (
          <>
            <Input
              placeholder="请输入…"
              value={inputField.inputTime || _value.format(format)}
              onChange={inputField.handleInputChange}
              onClick={inputField.handleInputClick}
              ref={inputRef}
              disabled={disabled ?? false}
            />
            <div ref={calendarContainerRef} className={classNames(`${prefixCls}-wrapper`)} />
          </>
        )}
      </RcDatePicker>
    </div>
  );
};

export default DatePicker;
