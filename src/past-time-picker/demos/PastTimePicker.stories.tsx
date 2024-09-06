import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import { action } from '@storybook/addon-actions';
import { differenceInDays, getTime, startOfToday, subDays, subMonths } from 'date-fns';
import Docs from './PastTimePickerPage';
import { Option, TimeMode } from '../../static-past-time-picker/interfaces';
import PastTimePicker, { PastTimePickerProps } from '../index';

import '../style';
import '../../static-past-time-picker/style';

export default {
  title: 'Upgraded/PastTimePicker',
  component: PastTimePicker,
  subcomponents: { StaticPastTimePicker: PastTimePicker.Static },
  parameters: {
    docs: {
      page: Docs,
    },
  },
} as Meta;

const Template: Story<PastTimePickerProps> = (args) => (
  <PastTimePicker onSelect={(v) => action('selected value:')(v)} placeholder="时间范围" {...args} />
);

export const Default = Template.bind({});
Default.args = {};
export const Quick = Template.bind({});
Quick.args = {
  value: 'day:8,1',
};
export const QuickOptionsFilter = () => (
  <PastTimePicker
    quickOptionsFilter={(s: { value: string }) =>
      ['day:2,1', 'day:8,1', 'day:15,1', 'day:31,1', 'earliest'].includes(s.value)
    }
    onSelect={(v) => action('selected value:')(v)}
    placeholder="时间范围"
    earliestApprove
  />
);

export const Since = Template.bind({});
Since.args = {
  value: `since:${getTime(subDays(startOfToday(), 7))}`,
};

export const Relative = Template.bind({});
Relative.args = {
  value: 'day:9,1',
};

export const Absolute = Template.bind({});
Absolute.args = {
  value: `abs:${getTime(subMonths(startOfToday(), 1))},${getTime(startOfToday())}`,
  onRangeSelect: (dates: [Date, Date], index: number) => action('onRangeSelect')(dates, index),
};

export const Experiment = Template.bind({});
Experiment.args = {
  value: 'week:1,0',
  experimental: true,
  quickOptionsFilter: (s: Option) =>
    [
      'day:1,0',
      'day:2,1',
      'week-lt-today:1,0',
      'week:2,1',
      'month-lt-today:1,0',
      'month:2,1',
      'quarter-lt-today:1,0',
      'quarter:2,1',
      'year-lt-today:1,0',
      'year:2,1',
      'day:8,1',
      'day:31,1',
      'day:91,1',
      'day:181,1',
      'week:1,0',
    ].includes(s.value),
};

export const Disabled = Template.bind({});
Disabled.args = {
  disabled: true,
  value: 'day:2,1',
};

export const Modes = Template.bind({});
Modes.args = {
  modes: ['since', 'relative'],
};

export const DisabledDate = () => {
  const disabledDate = (current: Date) => {
    return differenceInDays(startOfToday(), current) > 7;
  };

  return (
    <PastTimePicker
      quickOptions={[
        { value: 'day:1,0', label: '今天内' },
        { value: 'day:2,0', label: '1天前至今' },
        { value: 'day:3,0', label: '2天前至今' },
        { value: 'day:4,0', label: '3天前至今' },
        { value: 'day:5,0', label: '4天前至今' },
        { value: 'day:6,0', label: '5天前至今' },
        { value: 'day:7,0', label: '6天前至今' },
        { value: 'day:8,0', label: '7天前至今' },
        { value: 'earliest', label: '历史至今' },
        { value: 'day:2,0', label: '1天前至今' },
        { value: 'day:3,0', label: '2天前至今' },
        { value: 'day:4,0', label: '3天前至今' },
        { value: 'day:5,0', label: '4天前至今' },
        { value: 'day:6,0', label: '5天前至今' },
        { value: 'day:7,0', label: '6天前至今' },
        { value: 'day:8,0', label: '7天前至今' },
        { value: 'earliest', label: '历史至今' },
        { value: 'day:2,0', label: '1天前至今' },
        { value: 'day:3,0', label: '2天前至今' },
        { value: 'day:4,0', label: '3天前至今' },
        { value: 'day:5,0', label: '4天前至今' },
        { value: 'day:6,0', label: '5天前至今' },
        { value: 'day:7,0', label: '6天前至今' },
        { value: 'day:8,0', label: '7天前至今' },
        { value: 'earliest', label: '历史至今' },
      ]}
      onSelect={console.log}
      placeholder="时间范围"
      disabledDate={disabledDate}
      modes={[TimeMode.Since]}
    />
  );
};

export const ShowAbsDate = Template.bind({});
ShowAbsDate.args = {
  showAbsDate: true,
};

const StaticTemplate: Story<PastTimePickerProps> = (args) => (
  <PastTimePicker.Static onSelect={action('selected value:')} placeholder="时间范围" {...args} />
);
export const StaticDefault = StaticTemplate.bind({});
StaticDefault.args = {};
export const StaticExperiment = StaticTemplate.bind({});
StaticExperiment.args = {
  experimental: true,
};
export const StaticModes = StaticTemplate.bind({});
StaticModes.args = {
  modes: ['since', 'relative'],
};

export const StaticDisabledDate = StaticTemplate.bind({});
StaticDisabledDate.args = {
  disabledDate: (current: Date) => differenceInDays(startOfToday(), current) > 31,
};
