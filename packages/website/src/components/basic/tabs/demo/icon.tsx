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
      <TabPane icon={<LineChartOutlined />} key="1">
        1111
      </TabPane>
      <TabPane icon={<BarChartOutlined />} key="2">
        2222
      </TabPane>
      <TabPane icon={<BarChartHorizontalOutlined />} key="3">
        3333
      </TabPane>
      <TabPane disabled icon={<TableChartOutlined />} key="4">
        4444
      </TabPane>
      <TabPane disabled icon={<NumberChartOutlined />} key="5">
        5555
      </TabPane>
      <TabPane icon={<DotChartOutlined />} key="6">
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
