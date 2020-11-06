import React from 'react';
import { Cascader } from '@gio-design/components';

import '@gio-design/components/es/components/cascader/style/index.css';
import '@gio-design/components/es/components/grid/style/index.css';

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
          { label: 'Option C-2-2', value: 'c-2-2' },
        ],
      },
    ],
  },
];

const Basic = (): JSX.Element => {
  return (
    <Cascader
      value="c"
      dataSource={dataSource}
      // selectAll
      // beforeSelect={(d) => {
      //   if (d.value === 'a') {
      //     return new Promise((resolve) => {
      //       setTimeout(() => {
      //         resolve({ ...d, label: 'hahah', children: [{ label: 'nb', value: 'nb' }] });
      //       }, 300);
      //     });
      //   }
      // }}
      // onRender={(d) => (
      //   <Grid justify="space-between" style={{ width: 100 }}>
      //     <div>{d.label}</div>
      //     {d.children && d.children.length > 0 && <div>&gt;</div>}
      //   </Grid>
      // )}
    />
  );
};

export default Basic;
