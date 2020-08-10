import React from 'react';
import { Tabs, TabPane } from '@gio-design/components';
import '@gio-design/components/es/components/tabs/style/index.css';
import { WarningFilled, App, AppsFilled, Calendar } from '@gio-design/icons';

export default () => {
  const renderPane = () => (
    <>
      <TabPane icon={<WarningFilled />} key="1">
        1111
      </TabPane>
      <TabPane icon={<App />} key="2">
        2222
      </TabPane>
      <TabPane icon={<AppsFilled />} key="3">
        3333
      </TabPane>
      <TabPane disabled icon={<Calendar />} key="4">
        4444
      </TabPane>
    </>
  );
  return (
    <div className="tabs-display">
      <Tabs size="large">{renderPane()}</Tabs>
      <hr />
      <Tabs size="middle">{renderPane()}</Tabs>
      <hr />
      <Tabs size="small">{renderPane()}</Tabs>
    </div>
  );
};
