import React, { useState } from 'react';
import { Loading, Button } from '@gio-design/components';
import Tabs from '../../tabs/demo/block.tsx';
import '@gio-design/components/es/components/loading/style/index.css';
import '@gio-design/components/es/components/button/style/index.css';
import './index.less';

export default () => {
  const [loading, setLoading] = useState(true);
  return (
    <>
      <Loading titlePosition="right" loading={loading} delay={1000}>
        <Tabs />
      </Loading>
      <br />
      <Button onClick={() => setLoading(!loading)}>click me</Button>
    </>
  );
};
