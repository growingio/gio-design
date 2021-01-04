import React from 'react';
import { Select } from '@gio-design/components';
import '@gio-design/components/es/components/select/style/index.css';
import options from './options';

const Basics = (): React.ReactNode => {
  return <Select options={options} searchable style={{ width: 140 }} placeholder="请选择" />;
};

export default Basics;
