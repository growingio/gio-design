import React, { useState } from 'react';
import moment, { Moment } from 'moment';

import DatePicker from '@gio-design/components/es/components/date-picker';
import '@gio-design/components/es/components/date-picker/style/index.css';

const Demo = () => {
  const [time, setTime] = useState(moment(new Date()));
  const onChange = (value: Moment | null) => {
    value && setTime(value);
  };
  const onSelect = (value: Moment) => {
    setTime(value);
  };

  const disabledDate = (value: Moment) => {
    const date = moment(new Date()).add(-1, 'days')
    return value.isBefore(date); // can not select days before today
  };

  const format = 'YYYY/MM/DD';

  return (
    <div style={{ boxSizing: 'border-box', position: 'relative', display: 'block', lineHeight: 1.5, marginBottom: 22 }}>
      <DatePicker
        value={time}
        onChange={onChange}
        onSelect={onSelect}
        format={format}
        showFooter
        disabledDate={disabledDate}
      />
    </div>
  );
};

export default () => <Demo />;
