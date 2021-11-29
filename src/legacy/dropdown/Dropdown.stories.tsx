import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { MoreOutlined } from '@gio-design/icons';
import Docs from './Dropdown.mdx';
import Dropdown, { DropdownProps } from './index';
import './style';
import { Button, IconButton } from '../..';
import ListPro from '../../legacy/list-pro';

export default {
  title: 'legacy/Dropdown',
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
      <IconButton type="text" style={{ margin: '50px' }}>
        <MoreOutlined />
      </IconButton>
    </Dropdown>
    <Dropdown {...args} placement="bottom">
      <IconButton type="text" style={{ margin: '50px' }}>
        <MoreOutlined />
      </IconButton>
    </Dropdown>
    <Dropdown {...args} placement="bottomRight">
      <IconButton type="text" style={{ margin: '50px' }}>
        <MoreOutlined />
      </IconButton>
    </Dropdown>
  </div>
);
export const Placement = PlacementTemplate.bind({});

Placement.args = {
  overlay: <ListPro dataSource={options} width={144} height={88} />,
};
