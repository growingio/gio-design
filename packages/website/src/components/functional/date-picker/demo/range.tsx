import React, { useState } from 'react';
import moment, { Moment } from 'moment';

import { DateRangePicker } from '@gio-design/components/es/components/datePicker';
import '@gio-design/components/es/components/datePicker/style/index.css';

const Demo = () => {
  const [time, setTime] = useState([moment(new Date()), moment(new Date())]);
  const format = 'YYYY/MM/DD';
  const onChange = (value: Array<Moment> | null) => {
    value && setTime(value);
  };
  const onSelect = (value: Array<Moment>) => {
    setTime(value);
    console.log('outer', value[0].format(format), value[1].format(format));
  };

  return (
    <div style={{ boxSizing: 'border-box', position: 'relative', display: 'block', lineHeight: 1.5, marginBottom: 22 }}>
      <DateRangePicker value={time} onChange={onChange} onSelect={onSelect} format={format} showFooter={true} />
    </div>
  );
};

export default () => <Demo />;
