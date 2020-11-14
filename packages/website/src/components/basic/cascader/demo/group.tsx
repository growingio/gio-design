import React from 'react';
import { Cascader } from '@gio-design/components';

import '@gio-design/components/es/components/cascader/style/index.css';
import '@gio-design/components/es/components/input/style/index.css';

const dataSource = [
  { label: 'option A-1', value: 'a-1', groupId: 'a' },
  { label: 'option A-2', value: 'a-2', groupId: 'a' },
  { label: 'option B-1', value: 'b-1', groupId: 'b' },
  { label: 'option B-2', value: 'b-2', groupId: 'b' },
];

const Basic = (): JSX.Element => {
  return <Cascader dataSource={dataSource} />;
};

export default Basic;
