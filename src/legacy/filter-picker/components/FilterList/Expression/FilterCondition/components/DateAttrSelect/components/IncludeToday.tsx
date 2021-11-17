import React from 'react';
import { Moment } from 'moment';
import DatePicker from '../../../../../../../../../date-picker'; // new

interface IncludeTodayProps {
  time: Moment;
  onChange: (v: Date) => void;
  attrSelect: string;
}
function IncludeToday(props: IncludeTodayProps) {
  const { time, onChange } = props;

  const changeDate = (value: Date) => {
    onChange?.(value);
  };
  return (
    <>
      <DatePicker value={time.toDate()} onSelect={changeDate} format="YYYY/MM/DD" />
    </>
  );
}

export default IncludeToday;
