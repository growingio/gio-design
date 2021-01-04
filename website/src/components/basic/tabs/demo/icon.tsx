import React from 'react';
import { Tabs, TabPane } from '@gio-design/components';
import '@gio-design/components/es/components/tabs/style/index.css';
import {
  BarChartHorizontalOutlined,
  BarChartOutlined,
  DotChartOutlined,
  LineChartOutlined,
  NumberChartOutlined,
  TableChartOutlined,
} from '@gio-design/icons';

export default () => {
  const renderPane = () => (
    <>
      <TabPane tab={<LineChartOutlined />} key="1">
        1111
      </TabPane>
      <TabPane tab={<BarChartOutlined />} key="2">
        2222
      </TabPane>
      <TabPane tab={<BarChartHorizontalOutlined />} key="3">
        3333
      </TabPane>
      <TabPane disabled tab={<TableChartOutlined />} key="4">
        4444
      </TabPane>
      <TabPane disabled tab={<NumberChartOutlined />} key="5">
        5555
      </TabPane>
      <TabPane tab={<DotChartOutlined />} key="6">
        6666
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
