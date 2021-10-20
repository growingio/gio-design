import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { MoreOutlined } from '@gio-design/icons';
import Docs from './DropdownPage';
import Dropdown, { DropdownProps } from '../index';
import '../style';
import { IconButton, Button, List } from '../../index';
import ListPro from '../../components/list-pro';
import { properties } from '../../components/list/__tests__/data';

export default {
  title: 'Components/Dropdown',
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

const IconTemplate: Story<DropdownProps> = (args) => (
  <Dropdown {...args} placement="bottomLeft">
    <IconButton type="text" style={{ margin: '50px' }}>
      <MoreOutlined />
    </IconButton>
  </Dropdown>
);
export const IconTrigger = IconTemplate.bind({});

IconTrigger.args = {
  overlay: <ListPro dataSource={options} />,
};
