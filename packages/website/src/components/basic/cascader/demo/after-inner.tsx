import React from 'react';
import { Cascader } from '@gio-design/components';
import isEmpty from 'lodash/isEmpty';

import '@gio-design/components/es/components/cascader/style/index.css';
import '@gio-design/components/es/components/input/style/index.css';

import './style.less';

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
  return (
    <Cascader
      dataSource={dataSource}
      afterInner={(nodeData) => {
        if (isEmpty(nodeData.children)) {
          return <div className="extra-desc">{nodeData.label}</div>;
        }
      }}
    />
  );
};

export default Basic;
