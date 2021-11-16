import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import { action } from '@storybook/addon-actions';
import { withDesign } from 'storybook-addon-designs';
import startOfToday from 'date-fns/startOfToday';
import subMonths from 'date-fns/subMonths';
import subDays from 'date-fns/subDays';
import getTime from 'date-fns/getTime';
import { differenceInDays, startOfYesterday } from 'date-fns';
import Docs from './StaticPastTimePicker.mdx';
import StaticPastTimePicker from '../StaticPastTimePicker';
import { StaticPastTimePickerProps } from '../interfaces';

import '../style';

export default {
  title: 'legacy/StaticPastTimePicker',
  component: StaticPastTimePicker,
  decorators: [withDesign],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/kP3A6S2fLUGVVMBgDuUx0f/GrowingIO-Design-Components?node-id=1097%3A1679',
      allowFullscreen: true,
    },
    docs: {
      page: Docs,
    },
  },
} as Meta;

const Template: Story<StaticPastTimePickerProps> = (args) => (
  <StaticPastTimePicker onSelect={action('selected value:')} {...args} />
);

export const Quick = Template.bind({});
Quick.args = {
  timeRange: 'day:8,1',
};

export const Since = Template.bind({});
Since.args = {
  timeRange: `since:${getTime(subDays(startOfToday(), 7))}`,
};

export const Relative = Template.bind({});
Relative.args = {
  timeRange: 'day:9,1',
};

export const Absolute = Template.bind({});
Absolute.args = {
  timeRange: `abs:${getTime(subMonths(startOfToday(), 1))},${getTime(startOfYesterday())}`,
};

export const Experiment = Template.bind({});
Experiment.args = {
  experimental: true,
};

export const Modes = Template.bind({});
Modes.args = {
  modes: ['since', 'relative'],
};

export const DisabledDate = Template.bind({});
DisabledDate.args = {
  disabledDate: (current: Date) => differenceInDays(startOfToday(), current) > 31,
};
