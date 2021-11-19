import React from 'react';
import { Moment } from 'moment';
import DatePicker from '../../../../../../../../../date-picker'; // new

interface IncludeTodayProps {
  time: Moment;
  onChange: (v: Date) => void;
  style?: React.CSSProperties;
}
function IncludeToday(props: IncludeTodayProps) {
  const { time, onChange, style } = props;

  const changeDate = (value: Date) => {
    onChange?.(value);
  };
  return (
    <>
      <DatePicker style={style} value={time.toDate()} onSelect={changeDate} format="yyyy/MM/dd" />
    </>
  );
}

export default IncludeToday;
