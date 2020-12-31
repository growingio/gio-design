import '@gio-design/components/es/components/cascader/style/index.css';
import '@gio-design/components/es/components/input/style/index.css';

import { Cascader } from '@gio-design/components';
import React, { useState } from 'react';

const dataSource = [
  { label: 'option A', value: 'a' },
  { label: 'option B', value: 'b', children: [{ label: 'B-1', value: 'b-1' }] },
  {
    label: 'option C',
    value: 'c',
    children: [
      { label: 'Option C-1', value: 'c-1' },
      {
        label: 'Option C-2',
        value: 'c-2',
        children: [
          { label: 'Option C-2-1', value: 'c-2-1' },
          { label: 'Option C-2-2', value: 'c-2-2', children: [{ label: 'Option C-2-2-1', value: 'c-2-2-1' }] },
        ],
      },
    ],
  },
];

const Basic = (): JSX.Element => {
  const [keyword, setKeyword] = useState('');
  const nextData = dataSource.filter((d) => d.label.startsWith(keyword));

  return (
    <Cascader
      keyword={keyword}
      dataSource={nextData}
      header={<input type="search" onChange={(e) => setKeyword(e.target.value)} />}
    />
  );
};

export default Basic;
