import React from 'react';
import { Cascader } from '@gio-design/components';

import '@gio-design/components/es/components/cascader/style/index.css';
import '@gio-design/components/es/components/input/style/index.css';

const dataSource = [
  { label: 'option A', value: 'a' },
  { label: 'option B', value: 'b', children: [{ label: 'B-1', value: 'b-1' }] },
];

const Basic = (): JSX.Element => {
  return (
    <Cascader
      dataSource={dataSource}
      beforeSelect={(e, data) => {
        if (data.value === 'a') {
          return new Promise((resolve) => {
            setTimeout(() => {
              resolve([
                { label: 'a-1', value: 'a-1' },
                { label: 'a-2', value: 'a-2' },
              ]);
            }, 500);
          });
        }
      }}
    />
  );
};

export default Basic;
