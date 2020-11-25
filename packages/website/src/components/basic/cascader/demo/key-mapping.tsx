import React from 'react';
import { Cascader } from '@gio-design/components';

import '@gio-design/components/es/components/cascader/style/index.css';
import '@gio-design/components/es/components/input/style/index.css';

const dataSource = [
  { name: 'option A', id: 'a' },
  { name: 'option B', id: 'b', children: [{ name: 'B-1', id: 'b-1' }] },
];

const Basic = (): JSX.Element => {
  return <Cascader dataSource={dataSource} keyMapping={{ value: 'id', label: 'name' }} />;
};

export default Basic;
