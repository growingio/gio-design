import React from 'react';
import { Grid } from '@gio-design/components';

import '@gio-design/components/es/components/grid/style/index.css';
import './style.less';

const Base = (): JSX.Element => {
  return (
    <Grid className="box">
      <Grid className="box" span={12}>
        span=12
      </Grid>
      <Grid className="box" span={3}>
        span=3
      </Grid>
      <Grid className="box" span={3}>
        span=3
      </Grid>
      <Grid className="box" span={3}>
        span=3
      </Grid>
      <Grid className="box" span={3}>
        span=3
      </Grid>
    </Grid>
  );
};

export default Base;
