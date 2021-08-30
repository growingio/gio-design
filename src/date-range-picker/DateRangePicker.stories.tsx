import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import { action } from '@storybook/addon-actions';
import { isBefore, startOfToday, subMonths } from 'date-fns';
import Docs from './DateRangePicker.mdx';
import { DateRangePicker, DateRangePickerProps } from './index';

import './style';

export default {
  component: DateRangePicker,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/kP3A6S2fLUGVVMBgDuUx0f/GIO-Components?node-id=2672%3A30128',
      allowFullscreen: true,
    },
    docs: {
      page: Docs,
    },
  },
  title: 'Pickers/DateRangePicker',
} as Meta;

const Template: Story<DateRangePickerProps> = (args) => <DateRangePicker onSelect={action('selected:')} {...args} />;

export const Basic = Template.bind({});
Basic.args = {};

export const DisabledDate = Template.bind({});
DisabledDate.args = {
  disabledDate: (date: Date) => isBefore(date, startOfToday()),
};

export const DefaultViewDates = Template.bind({});
DefaultViewDates.args = {
  defaultViewDates: [subMonths(startOfToday(), 1), startOfToday()],
};
