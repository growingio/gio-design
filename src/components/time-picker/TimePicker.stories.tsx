import React from 'react';
import { withDesign } from 'storybook-addon-designs';
import { Story, Meta } from '@storybook/react/types-6-0';
import TimePicker from './index';
import { TimePickerProps } from './interface';
import Docs from './TimePicker.mdx';
import './style/index.less';

export default {
  title: 'Functional Components/TimePicker',
  component: TimePicker,
  decorators: [withDesign],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/kP3A6S2fLUGVVMBgDuUx0f/GrowingIO-Design-Components?node-id=523%3A4272',
      allowFullscreen: true,
    },
    docs: {
      page: Docs,
    },
  },
} as Meta;

const Template: Story<TimePickerProps> = (args) => {
  return <TimePicker {...args} />
};

export const Default = Template.bind({});
Default.args = {
  format: 'HH:mm',
  placeholder: '请选择时间',
  showSecond: false,
};

export const Seconds = Template.bind({});
Seconds.args = {
  format: 'HH:mm:ss',
  placeholder: '请选择时间',
  showSecond: true,
};
