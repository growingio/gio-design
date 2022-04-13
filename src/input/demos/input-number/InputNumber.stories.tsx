import { PlusOutlined } from '@gio-design/icons';
import { action } from '@storybook/addon-actions';
import { Meta, Story } from '@storybook/react/types-6-0';
import React from 'react';
import Input, { InputNumberProps } from '../..';
import InputNumberPage from './InputNumberPage';

export default {
  title: 'Upgraded/Input/Input.InputNumber',
  component: Input.InputNumber,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/kP3A6S2fLUGVVMBgDuUx0f/GIO-Design?node-id=4066%3A42547',
      allowFullscreen: true,
    },
    docs: {
      page: InputNumberPage,
    },
  },
} as Meta<InputNumberProps>;

export const Default: Story<InputNumberProps> = (args) => <Input.InputNumber {...args} />;
Default.args = {
  placeholder: 'Input Number',
  size: 'normal',
  defaultValue: 3,
};

export const Icons = () => (
  <Input.InputNumber
    defaultValue="1"
    prefix={<PlusOutlined />}
    suffix="$"
    onChange={(event) => {
      // eslint-disable-next-line no-console
      console.log(event.target.value);
      action('onChange')(event);
    }}
  />
);
