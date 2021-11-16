import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { addMonths, isBefore, startOfToday } from 'date-fns';
import Page from './DatePickerPage';
import DatePicker from '../DatePicker';

import '../style';

export default {
  title: 'legacy/StaticDatePicker',
  component: DatePicker,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/kP3A6S2fLUGVVMBgDuUx0f/GrowingIO-Design-Components?node-id=2672%3A30128',
      allowFullscreen: true,
    },
    docs: {
      page: Page,
    },
  },
} as Meta;

const Template: Story = (args) => <DatePicker {...args} />;

export const Basic = Template.bind({});
Basic.args = {};

export const DisabledDate = Template.bind({});
DisabledDate.args = {
  disabledDate: (date: Date) => isBefore(startOfToday(), date),
};

export const ViewDate = Template.bind({});
ViewDate.args = {
  viewDate: addMonths(startOfToday(), 1),
};
