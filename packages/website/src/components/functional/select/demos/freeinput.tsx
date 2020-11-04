import React from 'react';
import { Select } from '@gio-design/components';
import '@gio-design/components/es/components/select/style/index.css';

import options from './options';

const Basics = (): React.ReactNode => (
  <Select options={options} style={{ width: 140 }} searchable multiple allowCustomOption />
);

export default Basics;
