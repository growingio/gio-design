import '@gio-design/components/es/components/cascader/style/index.css';
import '@gio-design/components/es/components/grid/style/index.css';
import '@gio-design/components/es/components/input/style/index.css';
import '@gio-design/components/es/components/radio/style/index.css';

import { Cascader, Checkbox, Grid } from '@gio-design/components';
import React, { useState } from 'react';

const dataSource = [
  { label: 'option A', value: 'a' },
  { label: 'option B', value: 'b', children: [{ label: 'Option C', value: 'c' }] },
];

const Basic = (): JSX.Element => {
  const [deepSearch, setDeepSearch] = useState(false);
  const [ignoreCase, setIgnoreCase] = useState(true);
  return (
    <div>
      <Grid gap={5} collapse>
        <Grid>
          <Checkbox
            checked={deepSearch}
            onChange={(e) => {
              setDeepSearch(e.target.checked);
            }}
          >
            深度搜索
          </Checkbox>
        </Grid>

        <Grid>
          <Checkbox
            checked={ignoreCase}
            onChange={(e) => {
              setIgnoreCase(e.target.checked);
            }}
          >
            忽略大小写
          </Checkbox>
        </Grid>
      </Grid>

      <br />

      <Cascader keyword="a" dataSource={dataSource} deepSearch={deepSearch} ignoreCase={ignoreCase} />
    </div>
  );
};

export default Basic;
