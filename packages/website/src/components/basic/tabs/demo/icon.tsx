import React from 'react';
import { Tabs, TabPane } from '@gio-design/components';
import '@gio-design/components/es/components/tabs/style/index.css';

export default () => {
  const renderPane = () => (
    <>
      <TabPane type="icon" key="1">
        1111
      </TabPane>
      <TabPane type="bar-chart" key="2">
        2222
      </TabPane>
      <TabPane type="table-chart" key="3">
        3333
      </TabPane>
      <TabPane disabled type="copy" key="4">
        4444
      </TabPane>
    </>
  );
  return (
    <>
      <Tabs size="small">{renderPane()}</Tabs>
      <hr />
      <Tabs size="middle">{renderPane()}</Tabs>
      <hr />
      <Tabs size="large">{renderPane()}</Tabs>
    </>
  );
};
