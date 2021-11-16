import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { action } from '@storybook/addon-actions';
import TimePicker, { StaticTimePickerProps } from '../index';
import Docs from './TimePickerPage';

import '../style';
import '../../static-time-picker/style';

export default {
  title: 'Upgraded/TimePicker',
  component: TimePicker,
  subcomponents: { StaticTimePicker: TimePicker.Static },
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/kP3A6S2fLUGVVMBgDuUx0f/GIO-Components?node-id=4078%3A49236',
      allowFullscreen: true,
    },
    docs: {
      page: Docs,
    },
  },
} as Meta;

const Template: Story = (args) => (
  <div style={{ width: 160 }}>
    <TimePicker onSelect={action('selected time:')} {...args} />
  </div>
);

export const Basic = Template.bind({});
Basic.args = {
  placeholder: '请选择时间',
};

export const ShowSecond = Template.bind({});
ShowSecond.args = {
  showSecond: true,
};

const StaticTemplate: Story<StaticTimePickerProps> = (args) => <TimePicker.Static {...args} />;

export const StaticBasic = StaticTemplate.bind({});
StaticBasic.args = {};

export const StaticShowSecond = StaticTemplate.bind({});
StaticShowSecond.args = {
  showSecond: true,
};
