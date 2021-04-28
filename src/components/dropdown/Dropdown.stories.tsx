import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { MoreOutlined } from '@gio-design/icons';
import Docs from './Dropdown.mdx';
import Dropdown, { DropdownProps } from './index';
import './style';
import { Button, List } from '../..';
import ListPro from '../list-pro';
import { properties } from '../list/__tests__/data';

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
      backgroundColor: '#FFF',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    {/* <SearchBar /> */}
    <List items={properties} />
  </div>
);

const options = [
  { value: 'a', label: '功能名称' },
  { value: 'b', label: '功能名称' },
  { value: 'c', label: '功能名称' },
  { value: 'd', label: '功能名称' },
  { value: 'e', label: '功能名称' },
  { value: 'f', label: '功能名称' },
  { value: 'g', label: '功能名称' },
];

const Template: Story<DropdownProps> = (args) => (
  <Dropdown {...args}>
    <Button>更多功能</Button>
  </Dropdown>
);
export const Default = Template.bind({});
Default.args = {
  overlay,

  placement: 'bottom',
};

const PlacementTemplate: Story<DropdownProps> = (args) => (
  <div style={{ display: 'flex', justifyContent: 'space-around', height: 800, flexWrap: 'wrap' }}>
    <Dropdown {...args} placement="bottomLeft">
      <Button type="text" icon={<MoreOutlined />} style={{ margin: '50px' }} />
    </Dropdown>
    <Dropdown {...args} placement="bottom">
      <Button type="text" icon={<MoreOutlined />} style={{ margin: '50px' }} />
    </Dropdown>
    <Dropdown {...args} placement="bottomRight">
      <Button type="text" icon={<MoreOutlined />} style={{ margin: '50px' }} />
    </Dropdown>
  </div>
);
export const Placement = PlacementTemplate.bind({});

Placement.args = {
  overlay: <ListPro dataSource={options} width={144} height={88} />,
};
