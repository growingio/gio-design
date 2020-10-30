import React, { useState } from 'react';
import { Select } from '@gio-design/components';
import '@gio-design/components/es/components/select/style/index.css';
import '@gio-design/components/es/components/radio/style/css.js';

import options from './options';

const Basics = (): React.ReactNode => {
  const [value, setValue] = useState(options[0].value);
  const [value1, setValue1] = useState(options[1].value);
  return (
    <>
      <Select options={options} value={value} onChange={setValue} style={{ marginRight: 16 }} />
      <Select options={options} value={value1} onChange={setValue1} bordered={false} />
    </>
  );
};

export default Basics;
