import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { MoreOutlined } from '@gio-design/icons';
import Docs from './Dropdown.mdx';
import Dropdown, { DropdownProps } from './index';
import './style';
import { Button, List } from '../..';

export default {
  title: 'Functional Components/Dropdown',
  component: Dropdown,
  parameters: {
    docs: {
      page: Docs,
    },
  },
} as Meta;

const overlay = (
  <div
    style={{
      width: 120,
      height: 120,
      border: '1px dashed #DCDFED',
      borderRadius: '4px',
      backgroundColor: '#FFFFFF',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    内容区域
  </div>
);

const Template: Story<DropdownProps> = (args) => (
  <Dropdown {...args}>
    <Button>点击下拉</Button>
  </Dropdown>
);
export const Default = Template.bind({});
Default.args = {
  overlay,
  placement: 'bottom',
};

const options = [
  { value: 'a', label: '功能名称' },
  { value: 'c', label: '功能名称' },
];
const PlacementTemplate: Story<DropdownProps> = (args) => (
  <div style={{ padding: 300 }}>
    <Dropdown {...args} placement="bottomRight">
      <Button type="text" icon={<MoreOutlined />} style={{ marginLeft: '64px' }} />
    </Dropdown>
    <Dropdown {...args} placement="bottom">
      <Button type="text" icon={<MoreOutlined />} style={{ margin: '0px 128px' }} />
    </Dropdown>
    <Dropdown {...args} placement="bottomLeft">
      <Button type="text" icon={<MoreOutlined />} />
    </Dropdown>
  </div>
);

export const Placement = PlacementTemplate.bind({});

Placement.args = {
  overlay: <List dataSource={options} width={144} height={88} />,
};
