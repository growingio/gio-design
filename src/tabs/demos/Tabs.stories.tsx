/* eslint-disable react/no-array-index-key */
import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import {
  EventAnalysisOutlined,
  FunnelAnalysisOutlined,
  DistributionAnalysisOutlined,
  EventflowOutlined,
  FlowOutlined,
  NumberChartOutlined,
} from '@gio-design/icons';
import { action } from '@storybook/addon-actions';
import Docs from './TabsPage';
import Tabs, { TabPanel, TabProps } from '../index';
import '../style';

export default {
  title: 'Upgraded/Tabs',
  component: Tabs,
  subcomponents: { TabPanel },
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
const templateIconArr = [
  <EventAnalysisOutlined />,
  <NumberChartOutlined />,
  <FunnelAnalysisOutlined />,
  <DistributionAnalysisOutlined />,
  <EventflowOutlined />,
  <FlowOutlined />,
];
const renderItems = () =>
  templateIconArr.map((item, index) => <TabPanel tab={`Option${index}`} key={index} prefix={item} />);
const noTabItem = () => templateIconArr.map((item, index) => <TabPanel key={index} prefix={item} />);
const noPrefixItems = () => templateIconArr.map((item, index) => <TabPanel tab={`Option${index}`} key={index} />);
const haveChildrenItems = () =>
  templateIconArr.map((item, index) => (
    <TabPanel tab={`Option${index}`} key={index}>
      <div
        style={{
          backgroundColor: '#f7f8fc',
          textAlign: 'center',
          height: 150,
          fontSize: 100,
        }}
      >
        {`Option${index}`}
      </div>
    </TabPanel>
  ));
const Template: Story<TabProps> = (args) => (
  <div>
    <Tabs {...args}>{renderItems()}</Tabs>
  </div>
);
const noTabTemplate: Story<TabProps> = (args) => (
  <div>
    <Tabs {...args}>{noTabItem()}</Tabs>
  </div>
);
const noPrefixTemplate: Story<TabProps> = (args) => (
  <div>
    <Tabs {...args}>{noPrefixItems()}</Tabs>
  </div>
);
const childrenTemplate: Story<TabProps> = (args) => (
  <div>
    <Tabs {...args}>{haveChildrenItems()}</Tabs>
  </div>
);
const DemoTemplate: Story<TabProps> = (args) => (
  <>
    <table
      style={{
        marginBottom: 5,
      }}
    >
      <tr>
        <th>Tabs control</th>
        <th>描述</th>
        <th>Example</th>
      </tr>
      <tr>
        <td>size</td>
        <td>组件高度,normal,small</td>
        <td>
          <Tabs style={{ marginBottom: 10 }} {...args}>
            {templateIconArr.map((item, index) => (
              <TabPanel tab={`Option${index}`} key={index} />
            ))}
          </Tabs>
          <Tabs size="small" {...args}>
            {templateIconArr.map((item, index) => (
              <TabPanel tab={`Option${index}`} key={index} />
            ))}
          </Tabs>
        </td>
      </tr>
      <tr>
        <td>外层小于内容宽度时</td>
        <td>横向滚动不换行</td>
        <td style={{ width: 500 }}>
          <Tabs {...args}>
            {[...Array(10)].map((item, index) => (
              <TabPanel tab={`Option${index}`} key={index} />
            ))}
          </Tabs>
        </td>
      </tr>
    </table>
    <table>
      <tr>
        <th>Tabpanel control</th>
        <th>描述</th>
        <th>Example</th>
      </tr>
      <tr>
        <td>prefix</td>
        <td>文案前是否有prefix</td>
        <td>
          <Tabs {...args}>
            {templateIconArr.map((item, index) => (
              <TabPanel tab={`Option${index}`} key={index} prefix={item} />
            ))}
          </Tabs>
        </td>
      </tr>
      <tr>
        <td>prefix</td>
        <td>仅有icon</td>
        <td>
          <Tabs {...args}>
            {templateIconArr.map((item, index) => (
              <TabPanel key={index} prefix={item} />
            ))}
          </Tabs>
        </td>
      </tr>
      <tr>
        <td>tab</td>
        <td>标签名称</td>
        <td>
          <Tabs {...args}>
            {templateIconArr.map((item, index) => (
              <TabPanel tab={`Option${index}`} key={index} />
            ))}
          </Tabs>
        </td>
      </tr>
      <tr>
        <td>children</td>
        <td>有内容联动</td>
        <td>
          <Tabs {...args}>
            {templateIconArr.map((item, index) => (
              <TabPanel tab={`Option${index}`} key={index}>
                <div
                  style={{
                    backgroundColor: '#f7f8fc',
                    textAlign: 'center',
                    height: 150,
                    fontSize: 100,
                  }}
                >
                  {`Option${index}`}
                </div>
              </TabPanel>
            ))}
          </Tabs>
        </td>
      </tr>
    </table>
  </>
);
// Demo
export const Demo = DemoTemplate.bind({});
Demo.args = {
  defaultActiveKey: '0',
  onChange: action('onchange'),
};
// default
export const Default = Template.bind({});
Default.args = {
  className: 'cc',
  defaultActiveKey: '1',
  onChange: action('onchange'),
};
// notab
export const noTab = noTabTemplate.bind({});
noTab.args = {
  className: 'cc',
  defaultActiveKey: '1',
  onChange: action('onchange'),
};
// noprefix
export const noPrefix = noPrefixTemplate.bind({});
noPrefix.args = {
  className: 'cc',
  defaultActiveKey: '1',
  onChange: action('onchange'),
};
// have children
export const haveChildren = childrenTemplate.bind({});
haveChildren.args = {
  className: 'cc',
  defaultActiveKey: '1',
  onChange: action('onchange'),
};
