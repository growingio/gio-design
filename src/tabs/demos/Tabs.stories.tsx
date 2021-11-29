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
import Tabs, { Tab, TabsProps } from '../index';
import '../style';

export default {
  title: 'Upgraded/Tabs',
  component: Tabs,
  subcomponents: { Tab },
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
  templateIconArr.map((item, index) => <Tab label={`Option${index}`} value={index} prefix={item} />);
const noTabItem = () => templateIconArr.map((item, index) => <Tab value={index} prefix={item} />);
const noPrefixItems = () => templateIconArr.map((item, index) => <Tab label={`Option${index}`} value={index} />);
const disabledItems = () =>
  templateIconArr.map((item, index) => (
    <Tab label={`Option${index}`} value={index} disabled={!Math.round(Math.random())} />
  ));
const haveChildrenItems = () =>
  templateIconArr.map((item, index) => (
    <Tab label={`Option${index}`} value={index}>
      <div
        style={{
          backgroundColor: '#f7f8fc',
          textAlign: 'center',
          height: 150,
          fontSize: 100,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {`Option${index}`}
      </div>
    </Tab>
  ));
const Template: Story<TabsProps> = (args) => (
  <div>
    <Tabs {...args}>{renderItems()}</Tabs>
  </div>
);
const noTabTemplate: Story<TabsProps> = (args) => (
  <div>
    <Tabs {...args}>{noTabItem()}</Tabs>
  </div>
);
const noPrefixTemplate: Story<TabsProps> = (args) => (
  <div>
    <Tabs {...args}>{noPrefixItems()}</Tabs>
  </div>
);
const DisabledTemplate: Story<TabsProps> = (args) => (
  <div>
    <Tabs {...args}>{disabledItems()}</Tabs>
  </div>
);
const childrenTemplate: Story<TabsProps> = (args) => (
  <div>
    <Tabs {...args}>{haveChildrenItems()}</Tabs>
  </div>
);
const DemoTemplate: Story<TabsProps> = (args) => (
  <>
    <table
      style={{
        marginBottom: 5,
      }}
      className="table-demo"
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
              <Tab label={`Option${index}`} value={index} />
            ))}
          </Tabs>
          <Tabs size="small" {...args}>
            {templateIconArr.map((item, index) => (
              <Tab label={`Option${index}`} value={index} />
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
              <Tab label={`Option${index}`} value={index} />
            ))}
          </Tabs>
        </td>
      </tr>
    </table>
    <table className="table-demo">
      <tr>
        <th>Tab control</th>
        <th>描述</th>
        <th>Example</th>
      </tr>
      <tr>
        <td>prefix</td>
        <td>文案前是否有prefix</td>
        <td>
          <Tabs {...args}>
            {templateIconArr.map((item, index) => (
              <Tab label={`Option${index}`} value={index} prefix={item} />
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
              <Tab value={index} prefix={item} />
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
              <Tab label={`Option${index}`} value={index} />
            ))}
          </Tabs>
        </td>
      </tr>
      <tr>
        <td>disabled</td>
        <td>不可选</td>
        <td>
          <Tabs {...args}>
            {templateIconArr.map((item, index) => (
              <Tab label={`Option${index}`} value={index} disabled={!Math.round(Math.random())} />
            ))}
          </Tabs>
        </td>
      </tr>
      <tr>
        <td>children</td>
        <td>有内容联动</td>
        <td>
          <Tabs
            {...args}
            onChange={() => {
              action('onchange');
            }}
          >
            {templateIconArr.map((item, index) => (
              <Tab label={`Option${index}`} value={index}>
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
              </Tab>
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
  defaultValue: 0,
  onChange: action('onchange'),
};
// default
export const Default = Template.bind({});
Default.args = {
  className: 'cc',
  defaultValue: 1,
  onChange: action('onchange'),
};
// notab
export const noTab = noTabTemplate.bind({});
noTab.args = {
  className: 'cc',
  defaultValue: 1,
  onChange: action('onchange'),
};
// noprefix
export const noPrefix = noPrefixTemplate.bind({});
noPrefix.args = {
  className: 'cc',
  defaultValue: 1,
  onChange: action('onchange'),
};
// disable
export const Disabled = DisabledTemplate.bind({});
noPrefix.args = {
  className: 'cc',
  defaultValue: 1,
  onChange: action('onchange'),
};
// have children
export const HaveChildren = childrenTemplate.bind({});
HaveChildren.args = {
  className: 'cc',
  defaultValue: 1,
  onChange: action('onchange'),
};
