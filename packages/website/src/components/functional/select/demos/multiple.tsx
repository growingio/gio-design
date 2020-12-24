import React from 'react';
import { Select } from '@gio-design/components';
import '@gio-design/components/es/components/select/style/index.css';

import { optionsWithoutGroup } from './options';

const Basics = (): React.ReactNode => (
  <Select options={optionsWithoutGroup} allowClear multiple style={{ width: 140 }} placeholder="请选择" />
);

export default Basics;
