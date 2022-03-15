import React, { useState } from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import { action } from '@storybook/addon-actions';
import { isBefore, startOfToday, subMonths } from 'date-fns';
import Docs from './DateRangePickerPage';
import DateRangePicker, { DateRangePickerProps, StaticDateRangePickerProps } from '../index';

import '../style';

export default {
  title: 'Upgraded/DateRangePicker',
  component: DateRangePicker,
  subcomponents: { 'DateRangePicker.Static': DateRangePicker.Static },

  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/kP3A6S2fLUGVVMBgDuUx0f/GrowingIO-Design-Components?node-id=2672%3A30128',
      allowFullscreen: true,
    },
    docs: {
      page: Docs,
    },
  },
} as Meta;

const defaultPlaceholder = '选择日期范围';

const Template: Story<DateRangePickerProps> = (args) => (
  <div style={{ width: 280 }}>
    <DateRangePicker {...args} />
  </div>
);

const ControlledTemplate: Story<DateRangePickerProps> = (args) => {
  const [TimeRange, setTimeRange] = useState([new Date(), new Date()] as [Date, Date]);
  const onSelect = (timeRange: [Date, Date]) => {
    setTimeRange(timeRange);
  };
  return (
    <div style={{ width: 280 }}>
      <DateRangePicker {...args} value={TimeRange} onSelect={onSelect} />
    </div>
  );
};

export const ControlledBasic = ControlledTemplate.bind({});

export const Basic = Template.bind({});
Basic.args = {
  placeholder: defaultPlaceholder,
  onSelect: action('selected:'),
  onClear: action('onClear:'),
  allowClear: true,
};

export const DisbaledDate = Template.bind({});
DisbaledDate.args = {
  placeholder: defaultPlaceholder,
  onSelect: action('selected:'),
  disabledDate: (current: Date) => current.getTime() > new Date().getTime(),
};

const StaticTemplate: Story<StaticDateRangePickerProps> = (args) => (
  <DateRangePicker.Static onSelect={action('selected:')} {...args} />
);

export const StaticBasic = StaticTemplate.bind({});
StaticBasic.args = {};

export const StaticDisabledDate = StaticTemplate.bind({});
StaticDisabledDate.args = {
  disabledDate: (date: Date) => isBefore(date, startOfToday()),
};

export const StaticDefaultViewDates = StaticTemplate.bind({});
StaticDefaultViewDates.args = {
  defaultViewDates: [subMonths(startOfToday(), 1), startOfToday()],
};
