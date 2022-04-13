import { Meta, Story } from '@storybook/react/types-6-0';
import React from 'react';
import Input, { TextAreaProps } from '../..';
import InputTextAreaPage from './InputTextAreaPage';

export default {
  title: 'Upgraded/Input/Input.TextArea',
  component: Input.TextArea,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/kP3A6S2fLUGVVMBgDuUx0f/GIO-Design?node-id=4066%3A42547',
      allowFullscreen: true,
    },
    docs: {
      page: InputTextAreaPage,
    },
  },
} as Meta<TextAreaProps>;

export const Default: Story<TextAreaProps> = (args) => <Input.TextArea {...args} />;
Default.args = {
  placeholder: 'Enter some text',
};
