import { FunnelOutlined, UserOutlined } from '@gio-design/icons';
import { action } from '@storybook/addon-actions';
import { Meta, Story } from '@storybook/react/types-6-0';
import React from 'react';
import Input, { InputButtonProps } from '../..';
import InputButtonPage from './InputButtonPage';

export default {
  title: 'Upgraded/Input/Input.Button',
  component: Input.Button,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/kP3A6S2fLUGVVMBgDuUx0f/GIO-Design?node-id=6773%3A66205',
      allowFullscreen: true,
    },
    docs: {
      page: InputButtonPage,
    },
  },
} as Meta<InputButtonProps>;

export const Default: Story<InputButtonProps> = (args) => <Input.Button {...args} />;
Default.args = {
  placeholder: 'Click me',
  onClick: action('onClick'),
  size: 'normal',
};

export const Disabled = () => <Input.Button placeholder="Disabled" disabled />;

export const Clearable = () => (
  <Input.Button
    allowClear
    defaultValue="defaultValue"
    onClear={action('onClear')}
    style={{ width: '250px' }}
    placeholder=""
  />
);

export const Icons = () => (
  <Input.Button placeholder="Click me" prefix={<UserOutlined />} suffix={<FunnelOutlined />} />
);

export const Size = () => (
  <>
    <Input.Button placeholder="Normal" size="normal" style={{ marginRight: 8 }} />
    <Input.Button placeholder="Small" size="small" />
  </>
);

export const Active = () => <Input.Button placeholder="Active" active />;

export const Loading = () => <Input.Button placeholder="Loading" loading />;
