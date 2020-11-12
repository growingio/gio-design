import React from 'react';
import { Grid } from '@gio-design/components';
import CascaderMenu from '@gio-design/components/es/components/cascader/menu';

import '@gio-design/components/es/components/grid/style/index.css';
import '@gio-design/components/es/components/cascader/style/index.css';
import '@gio-design/components/es/components/input/style/index.css';

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
    <Grid>
      <CascaderMenu
        dataSource={dataSource}
        style={{ display: 'inline-block', position: 'relative', float: 'none', height: 'fit-content' }}
      />
    </Grid>
  );
};

export default Basic;
