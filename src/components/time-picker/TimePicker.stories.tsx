import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import TimePicker from './index';
import { TimePickerProps } from './interface';
import './style/index.less';

export default {
  title: 'Components/Functional/TimePicker',
  component: TimePicker,
} as Meta;

export const Default1: Story<TimePickerProps> = (args) => {
  return (
    <div>
      <TimePicker {...args} />
    </div>
   )
}
export const Default2: Story<TimePickerProps> = (args) => {
  return (
    <div>
      <TimePicker {...args} />
    </div>
    )
}
    

Default1.args = {
  format: 'HH:mm',
  placeholder: '请选择时间',
  showSecond: false,
  onChange: console.log,
};
Default2.args = {
    format: 'HH:mm:ss',
    placeholder: '请选择时间',
    showSecond: true,
    onChange: console.log,
  };
