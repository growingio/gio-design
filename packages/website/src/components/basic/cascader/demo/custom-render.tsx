import React from 'react';
import { Grid, Cascader } from '@gio-design/components';

import '@gio-design/components/es/components/cascader/style/index.css';
import '@gio-design/components/es/components/input/style/index.css';
import '@gio-design/components/es/components/grid/style/index.css';

const dataSource = [
  { label: 'option A', value: 'a' },
  { label: 'option B', value: 'b', children: [{ label: 'B-1', value: 'b-1' }] },
  {
    label: 'option C',
    value: 'c',
    children: [
      { label: 'option C-1', value: 'c-1' },
      {
        label: 'option C-2',
        value: 'c-2',
      },
    ],
  },
];

const Basic = (): JSX.Element => {
  return (
    <Cascader
      dataSource={dataSource}
      onRender={(e) => (
        <Grid justify="space-between">
          <div>
            <span role="img" aria-label="cool" style={{ marginRight: 6 }}>
              😎
            </span>
            <span>{e.label}</span>
          </div>
          {Array.isArray(e.children) && e.children.length > 0 && <span>→</span>}
        </Grid>
      )}
    />
  );
};

export default Basic;
