import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import { action } from '@storybook/addon-actions';
import { differenceInDays, getTime, startOfToday, subDays, subMonths } from 'date-fns';
import Docs from './PastTimePickerPage';
import { Option } from '../../static-past-time-picker/interfaces';
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

const Template: Story<PastTimePickerProps> = (args) => <PastTimePicker onSelect={action('selected value:')} placeholder="时间范围"  {...args} />

export const Quick = Template.bind({});
Quick.args = {
  value: 'day:8,1',
};
export const FilterData = Template.bind({});
FilterData.args={
  quickOptionsFilter:(s: { value: string; }) =>
    ['day:2,1', 'day:8,1', 'day:15,1', 'day:31,1'].includes(
      s.value,
    )
}

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
  onRangeSelect:(date:any,index:number) => console.log(date,index)
};

export const ToYesterday = Template.bind({});
ToYesterday.args = {
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
    ].includes(s.value),
};

export const Experiment = Template.bind({});
Experiment.args = {
  experimental: true,
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

export const DisabledDate = Template.bind({});
DisabledDate.args = {
  disabledDate: (current: Date) => differenceInDays(startOfToday(), current) > 31,
};

const StaticTemplate: Story<PastTimePickerProps> = (args) => (
  <PastTimePicker.Static onSelect={action('selected value:')} placeholder="时间范围" {...args} />
);

export const StaticQuick = StaticTemplate.bind({});
StaticQuick.args = {
  value: 'day:8,1',
};

export const StaticSince = StaticTemplate.bind({});
StaticSince.args = {
  value: `since:${getTime(subDays(startOfToday(), 7))}`,
};

export const StaticRelative = StaticTemplate.bind({});
StaticRelative.args = {
  value: 'day:9,1',
  onRangeSelect:(date:any,index:number) => console.log(date,index)
};

export const StaticAbsolute = StaticTemplate.bind({});
StaticAbsolute.args = {
  value: `abs:${getTime(subMonths(startOfToday(), 1))},${getTime(startOfToday())}`,
  onRangeSelect:(date:any,index:number) => console.log(date,index)
};

export const StaticExperiment = StaticTemplate.bind({});
StaticExperiment.args = {
  experimental: true,
};

export const StaticDisabled = StaticTemplate.bind({});
StaticDisabled.args = {
  disabled: true,
  value: 'day:2,1',
};

export const StaticModes = StaticTemplate.bind({});
StaticModes.args = {
  modes: ['since', 'relative'],
};

export const StaticDisabledDate = StaticTemplate.bind({});
StaticDisabledDate.args = {
  disabledDate: (current: Date) => differenceInDays(startOfToday(), current) > 31,
};
