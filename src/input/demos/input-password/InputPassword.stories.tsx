import { Meta, Story } from '@storybook/react/types-6-0';
import React from 'react';
import Input, { PasswordProps } from '../..';
import InputPasswordPage from './InputPasswordPage';

export default {
  title: 'Upgraded/Input/Input.Password',
  component: Input.Password,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/kP3A6S2fLUGVVMBgDuUx0f/GIO-Design?node-id=4066%3A42547',
      allowFullscreen: true,
    },
    docs: {
      page: InputPasswordPage,
    },
  },
} as Meta<PasswordProps>;

export const Default: Story<PasswordProps> = (args) => <Input.Password {...args} />;
Default.args = {
  placeholder: 'Enter your password',
  size: 'normal',
};
