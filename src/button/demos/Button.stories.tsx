import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { PlusCircleFilled, FilterOutlined, DeleteOutlined } from '@gio-design/icons';
import Button from '../index';
import IconButton from '../IconButton';
import { ButtonProps, IconButtonProps } from '../interface';
import '../style';

export default {
  title: 'Upgraded/Button',
  component: Button,
} as Meta;

const Template: Story<ButtonProps> = (args) => (
  <Button {...args} suffix={<FilterOutlined />} prefix={<PlusCircleFilled />} />
);

export const Default = Template.bind({});
Default.args = {
  children: 'Button',
};

const IconButtonTemplate: Story<IconButtonProps> = (args) => (
  <IconButton {...args}>
    <DeleteOutlined />
  </IconButton>
);

export const IconButtonDemo = IconButtonTemplate.bind({});
IconButtonDemo.args = {};
