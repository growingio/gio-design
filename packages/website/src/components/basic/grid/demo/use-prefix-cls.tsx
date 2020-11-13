import React, { useContext } from 'react';

import { ConfigContext } from '@gio-design/components/es/components/config-provider/context';
import { Grid } from '@gio-design/components';

import './use-prefix.less';

const Base = (): JSX.Element => {
  const rootConfig = useContext(ConfigContext);
  return (
    <ConfigContext.Provider value={{ ...rootConfig, rootPrefixCls: 'cool' }}>
      <Grid className="demo">
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
    </ConfigContext.Provider>
  );
};

export default Base;
