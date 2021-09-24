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
import Docs from './TabsPage';
import Tabs, { TabPane, TabProps } from '../index';
import '../style';

export default {
  title: 'Data Display/Tabs',
  component: Tabs,
  subcomponents: { TabPane },
  parameters: {
    docs: {
      page: Docs,
    },
  },
} as Meta;

const renderItems = () => (
  <>
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
  </>
);

export const Block: Story<TabProps> = (args) => (
  <div style={{ display: 'flex' }}>
    <Tabs {...args} size="large">
      {renderItems()}
    </Tabs>
    <hr />
    <Tabs {...args} size="middle">
      {renderItems()}
    </Tabs>
    <hr />
    <Tabs {...args} size="small">
      {renderItems()}
    </Tabs>
  </div>
);

Block.args = {
  type: 'block',
};

const renderIconItem = () => (
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
const IconTemplate: Story<TabProps> = (args) => (
  <div style={{ display: 'flex' }}>
    <Tabs {...args} size="large">
      {renderIconItem()}
    </Tabs>
    <hr />
    <Tabs {...args} size="middle">
      {renderIconItem()}
    </Tabs>
    <hr />
    <Tabs {...args} size="small">
      {renderIconItem()}
    </Tabs>
  </div>
);

export const Icon = IconTemplate.bind({});
Icon.args = {
  size: 'large',
  type: 'line',
};
