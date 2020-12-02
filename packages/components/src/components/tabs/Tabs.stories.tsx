import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import {
  BarChartHorizontalOutlined,
  BarChartOutlined,
  DotChartOutlined,
  LineChartOutlined,
  NumberChartOutlined,
  TableChartOutlined,
} from '@gio-design/icons';
import Tabs, { TabPane, TabProps } from './index'
import './style'

export default {
    title: 'Components/Basic/Tabs',
    component: Tabs,
    subcomponents: { TabPane },
} as Meta;

const Template : Story<TabProps> = (args) => (
  <>
    <Tabs {...args}>
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
    <br />
    <Tabs {...args}>
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
    </Tabs>
  </>
)
export const Default = Template.bind({});
Default.args = {
    size: 'large',
}
