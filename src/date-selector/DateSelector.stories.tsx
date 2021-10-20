import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { withDesign } from 'storybook-addon-designs';
import { isBefore, startOfToday } from 'date-fns';
import Docs from './DateSelector.mdx';
import DateSelector from './DateSelector';
import { DateSelectorProps } from './interfaces';

import './style';

export default {
  title: 'Components/DateSelector',
  cdecorators: [withDesign],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/kP3A6S2fLUGVVMBgDuUx0f/GIO-Components?node-id=2672%3A30005',
      allowFullscreen: true,
    },
    docs: {
      page: Docs,
    },
  },
  component: DateSelector,
} as Meta;

const Template: Story<DateSelectorProps> = (args) => (
  <div style={{ width: 276 }}>
    <DateSelector placeholder="选择日期" {...args} />
  </div>
);

export const Basic = Template.bind({});
Basic.args = {};

export const DisabledDate = Template.bind({});
DisabledDate.args = {
  disabledDate: (date: Date) => isBefore(date, startOfToday()),
};
