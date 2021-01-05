import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import TimePicker from './index';
import { TimePickerProps } from './interface';
import './style/index.less';

export default {
  title: 'Components/Functional/TimePicker',
  component: TimePicker,
} as Meta;

export const Default: Story<TimePickerProps> = (args) => <TimePicker {...args} />;

Default.args = {
  format: 'HH:mm',
  placeholder: '请选择时间',
  showSecond: false,
  onChange: console.log,
};
