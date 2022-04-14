/* eslint-disable react/no-array-index-key */
import React, { useState } from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import {
  EventAnalysisOutlined,
  FunnelAnalysisOutlined,
  DistributionAnalysisOutlined,
  EventflowOutlined,
  NumberChartOutlined,
} from '@gio-design/icons';
import { action } from '@storybook/addon-actions';
import Docs from './TabsPage';
import Tabs, { TabsProps } from '../index';
import '../style';
import { Card } from '../..';
import Divider from '../../divider';

export default {
  title: 'Upgraded/Tabs',
  component: Tabs,
  subcomponents: { 'Tabs.Tab': Tabs.Tab },
  parameters: {
    docs: {
      page: Docs,
    },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/lLYusioN7e9ifkQnIXeT4G/GIO-Design-(Running-File)?node-id=4092%3A41170',
      allowFullscreen: true,
    },
  },
} as Meta;
const Template: Story<TabsProps> = (args) => (
  <div>
    <Tabs {...args}>
      <Tabs.Tab label="选项1" value="1" key="1">
        <div style={{ backgroundColor: '#f7f8fc', fontSize: '20px', margin: '0 auto', padding: '20px' }}>选项1</div>
      </Tabs.Tab>
      <Tabs.Tab label="选项2" value="2" key="2">
        <div style={{ backgroundColor: '#f7f8fc', fontSize: '20px', margin: '0 auto', padding: '20px' }}>选项2</div>
      </Tabs.Tab>
      <Tabs.Tab label="选项3" value="3" key="3">
        <div style={{ backgroundColor: '#f7f8fc', fontSize: '20px', margin: '0 auto', padding: '20px' }}>选项3</div>
      </Tabs.Tab>
      <Tabs.Tab label="选项4" value="4" key="4">
        <div style={{ backgroundColor: '#f7f8fc', fontSize: '20px', margin: '0 auto', padding: '20px' }}>选项4</div>
      </Tabs.Tab>
      <Tabs.Tab label="选项5" value="5" key="5" disabled />
    </Tabs>
  </div>
);
// default
export const Default = Template.bind({});
Default.args = {
  className: 'cc',
  defaultValue: '1',
  onChange: action('onchange'),
};

export const WithIcon = () => (
  <div>
    <Tabs defaultValue="1">
      <Tabs.Tab label="选项1" prefix={<EventAnalysisOutlined />} value="1" key="1" />
      <Tabs.Tab label="选项2" prefix={<NumberChartOutlined />} value="2" key="2" />
      <Tabs.Tab label="选项3" prefix={<FunnelAnalysisOutlined />} value="3" key="3" />
      <Tabs.Tab label="选项4" prefix={<DistributionAnalysisOutlined />} value="4" key="4" />
      <Tabs.Tab label="选项5" prefix={<EventflowOutlined />} value="5" key="5" disabled />
    </Tabs>
  </div>
);

export const IconOnly = () => (
  <div>
    <Tabs defaultValue="1">
      <Tabs.Tab prefix={<EventAnalysisOutlined />} value="1" key="1" />
      <Tabs.Tab prefix={<NumberChartOutlined />} value="2" key="2" />
      <Tabs.Tab prefix={<FunnelAnalysisOutlined />} value="3" key="3" />
      <Tabs.Tab prefix={<DistributionAnalysisOutlined />} value="4" key="4" />
      <Tabs.Tab prefix={<EventflowOutlined />} value="5" key="5" disabled />
    </Tabs>
  </div>
);
export const ScrollOverflow = () => {
  const [index, setIndex] = useState('1');
  const handleChange = (k: React.Key) => {
    setIndex(k as string);
  };
  return (
    <Card style={{ width: '320px' }}>
      <Tabs defaultValue="1" size="small" onChange={handleChange} tabListStyle={{ borderBottom: '1px solid #adb2c2' }}>
        <Tabs.Tab label="选项1" prefix={<EventAnalysisOutlined />} value="1" key="1">
          <div style={{ fontSize: '20px', margin: '0 auto', padding: '50px 20px' }}>选项{index}</div>
        </Tabs.Tab>
        <Tabs.Tab label="选项2" prefix={<NumberChartOutlined />} value="2" key="2">
          <div style={{ fontSize: '20px', margin: '0 auto', padding: '50px 20px' }}>选项{index}</div>
        </Tabs.Tab>
        <Tabs.Tab label="选项3" prefix={<FunnelAnalysisOutlined />} value="3" key="3">
          <div style={{ fontSize: '20px', margin: '0 auto', padding: '50px 20px' }}>选项{index}</div>
        </Tabs.Tab>
        <Tabs.Tab label="选项4" prefix={<DistributionAnalysisOutlined />} value="4" key="4">
          <div style={{ fontSize: '20px', margin: '0 auto', padding: '50px 20px' }}>选项{index}</div>
        </Tabs.Tab>
        <Tabs.Tab label="选项5" prefix={<EventflowOutlined />} value="5" key="5" disabled>
          <div style={{ fontSize: '20px', margin: '0 auto', padding: '50px 20px' }}>选项{index}</div>
        </Tabs.Tab>
      </Tabs>
    </Card>
  );
};
export const ControlledValue = () => {
  const [tabValue, setTabValue] = useState<React.Key>('3');
  return (
    <div>
      <Tabs value={tabValue} onChange={setTabValue}>
        <Tabs.Tab label="选项1" prefix={<EventAnalysisOutlined />} value="1" key="1">
          <div style={{ backgroundColor: '#f7f8fc', fontSize: '20px', margin: '0 auto', padding: '20px' }}>选项1</div>
        </Tabs.Tab>
        <Tabs.Tab label="选项2" prefix={<NumberChartOutlined />} value="2" key="2">
          <div style={{ backgroundColor: '#f7f8fc', fontSize: '20px', margin: '0 auto', padding: '20px' }}>选项2</div>
        </Tabs.Tab>
        <Tabs.Tab label="选项3" prefix={<FunnelAnalysisOutlined />} value="3" key="3">
          <div style={{ backgroundColor: '#f7f8fc', fontSize: '20px', margin: '0 auto', padding: '20px' }}>选项3</div>
        </Tabs.Tab>
        <Tabs.Tab label="选项4" prefix={<DistributionAnalysisOutlined />} value="4" key="4">
          <div style={{ backgroundColor: '#f7f8fc', fontSize: '20px', margin: '0 auto', padding: '20px' }}>选项4</div>
        </Tabs.Tab>
        <Tabs.Tab label="选项5" prefix={<EventflowOutlined />} value="5" key="5" disabled>
          选项5
        </Tabs.Tab>
      </Tabs>
    </div>
  );
};

export const Size = () => (
  <div>
    <Tabs size="small" defaultValue="1" style={{ backgroundColor: '#f7f8fc' }} tabListStyle={{ color: '#f7f8fc' }}>
      <Tabs.Tab label="选项1" prefix={<EventAnalysisOutlined />} value="1" key="1" />
      <Tabs.Tab label="选项2" prefix={<NumberChartOutlined />} value="2" key="2" />
      <Tabs.Tab label="选项3" prefix={<FunnelAnalysisOutlined />} value="3" key="3" />
      <Tabs.Tab label="选项4" prefix={<DistributionAnalysisOutlined />} value="4" key="4" />
      <Tabs.Tab label="选项5" prefix={<EventflowOutlined />} value="5" key="5" disabled />
    </Tabs>
    <Divider />
    <Tabs size="normal" defaultValue="1" style={{ backgroundColor: '#f7f8fc' }}>
      <Tabs.Tab label="选项1" prefix={<EventAnalysisOutlined />} value="1" key="1" />
      <Tabs.Tab label="选项2" prefix={<NumberChartOutlined />} value="2" key="2" />
      <Tabs.Tab label="选项3" prefix={<FunnelAnalysisOutlined />} value="3" key="3" />
      <Tabs.Tab label="选项4" prefix={<DistributionAnalysisOutlined />} value="4" key="4" />
      <Tabs.Tab label="选项5" prefix={<EventflowOutlined />} value="5" key="5" disabled />
    </Tabs>
  </div>
);
