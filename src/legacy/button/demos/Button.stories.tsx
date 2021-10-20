import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { PlusCircleFilled, FilterOutlined } from '@gio-design/icons';
import { withDesign } from 'storybook-addon-designs';
import Docs from './ButtonPage';
import Button from '../index';
import { ButtonProps } from '../interface';
import '../style';

export default {
  title: 'Legacy/Button',
  component: Button,
  decorators: [withDesign],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/kP3A6S2fLUGVVMBgDuUx0f/GrowingIO-Design-Components?node-id=1%3A1097',
      allowFullscreen: true,
    },
    docs: {
      page: Docs,
    },
  },
  args: {
    type: 'primary',
    size: 'middle',
  },
} as Meta;

const Wrapper = (props: { children?: React.ReactNode }) => {
  const { children } = props;
  return <section style={{ backgroundColor: '#F0F8FF', boxSizing: 'border-box', padding: 30 }}>{children}</section>;
};

const Template: Story<ButtonProps> = (args) => (
  <Wrapper>
    <Button {...args} />
    <Button {...args} loading />
    <Button {...args} disabled />
  </Wrapper>
);

export const Default = Template.bind({});
Default.args = {
  children: '默认按钮',
  style: {
    margin: '0 20px 0 0',
  },
};

export const PrimaryButton = Template.bind({});
PrimaryButton.args = {
  type: 'primary',
  children: '主要按钮',
  icon: <PlusCircleFilled />,
  style: {
    margin: '0 20px 0 0',
  },
};

export const SecondaryButton = Template.bind({});
SecondaryButton.args = {
  children: '次要按钮',
  type: 'secondary',
  icon: <PlusCircleFilled />,
  style: {
    margin: '0 20px 0 0',
  },
};

export const TextButton = Template.bind({});
TextButton.args = {
  children: '文字按钮',
  type: 'text',
  icon: <PlusCircleFilled />,
  style: {
    margin: '0 20px 0 0',
  },
};

export const BlockButton = Template.bind({});
BlockButton.args = {
  children: 'Block按钮',
  block: true,
  icon: <PlusCircleFilled />,
  style: {
    margin: '0 0 20px 0',
  },
};

export const IconButton = Template.bind({});
IconButton.args = {
  mini: false,
  icon: <FilterOutlined />,
  style: {
    margin: '0 20px 0 0',
  },
};
