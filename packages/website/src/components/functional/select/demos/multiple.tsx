import React from 'react';
import { Select } from '@gio-design/components';
import '@gio-design/components/es/components/select/style/index.css';

import options from './options';

const Basics = (): React.ReactNode => (
  <Select options={options} value={[options[1].value, options[2].value]} multiple style={{ width: 140 }} />
);

export default Basics;
