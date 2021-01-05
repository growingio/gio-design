import React from 'react';
import { Grid } from '@gio-design/components';

import '@gio-design/components/es/components/grid/style/index.css';
import './style.less';

const Base = (): JSX.Element => {
  return (
    <Grid collapse container gap={1} className="demo">
      <Grid span={12}>span=12</Grid>
      <Grid span={3} gap={1} collapse container>
        <Grid span={12}>span=12</Grid>
        <Grid span={6}>span=6</Grid>
        <Grid span={6}>span=6</Grid>
      </Grid>
      <Grid span={3}>span=3</Grid>
      <Grid span={3}>span=3</Grid>
      <Grid span={3}>span=3</Grid>
    </Grid>
  );
};

export default Base;
