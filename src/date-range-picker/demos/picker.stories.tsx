import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import { action } from '@storybook/addon-actions';

import DateRangePicker from '../index';

import { DateRangePickerProps } from '../interfaces';

import '../style';

export default {
  title: 'Upgraded/DateRangePicker',
  component: DateRangePicker,
  parameters: {
    docs: {},
  },
} as Meta;

const defaultPlaceholder = '选择日期范围';

const Template: Story<DateRangePickerProps> = (args) => (
  <div style={{ width: 280 }}>
    <DateRangePicker {...args} />
  </div>
);

export const Basic = Template.bind({});
Basic.args = {
  placeholder: defaultPlaceholder,
  onSelect: action('selected:'),
  onClear: action('onClear:'),
};

export const DisbaledDate = Template.bind({});
DisbaledDate.args = {
  placeholder: defaultPlaceholder,
  onSelect: action('selected:'),
  disabledDate: (current: Date) => current.getTime() > new Date().getTime(),
};
