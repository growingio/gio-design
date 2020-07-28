import React from 'react';
import { Tabs, TabPane } from '@gio-design/components';
import '@gio-design/components/es/components/tabs/style/index.css';
import './index.less';

export default () => (
  <Tabs>
    <TabPane tab="我的" key="1">
      1111
    </TabPane>
    <TabPane tab="全部" key="2">
      2222
    </TabPane>
    <TabPane tab="共享" key="3">
      3333
    </TabPane>
    <TabPane disabled tab="预置" key="4">
      4444
    </TabPane>
  </Tabs>
);
