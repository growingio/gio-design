import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import { CalendarOutlined, PlusCircleFilled } from '@gio-design/icons';
import Selector, { SelectorProps } from '.';

import './style';

export default {
  title: 'Selectors/Selector',
  component: Selector,
} as Meta;

const dropdownRender = () => <div style={{ width: 160 }}>custom</div>;
const inputValueRender = () => (
  <span>
    <PlusCircleFilled size="14px" />
    <span style={{ marginLeft: 4 }}>Value</span>
  </span>
);
const Template: Story<SelectorProps> = (args) => <Selector {...args} />;

export const Default = Template.bind({});
Default.args = {
  dropdownRender,
  valueRender: inputValueRender,
};

export const ButtonMode = Template.bind({});
ButtonMode.args = {
  mode: 'button',
  type: 'secondary',
  dropdownRender,
  valueRender: () => <span>Value</span>,
  icon: <CalendarOutlined />,
};
