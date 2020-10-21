import React from 'react';
import { Grid } from '@gio-design/components';

import '@gio-design/components/es/components/grid/style/index.css';
import './style.less';

const Base = (): JSX.Element => {
  return (
    <div>
      <Grid container gap={1} className="box">
        <Grid span={12}>span=12</Grid>
        <Grid span={3}>span=3</Grid>
        <Grid span={3}>span=3</Grid>
        <Grid span={3}>span=3</Grid>
        <Grid span={3}>span=3</Grid>
      </Grid>
    </div>
  );
};

export default Base;
