import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import { action } from '@storybook/addon-actions';
import Docs from './DateRangeSelector.mdx';
import { DateRangeSelector } from './index';
import RIT from './RangeInputTrigger';
import { RangeInputTriggerProps, DateRangeSelectorProps } from './interfaces';

import './style';

export default {
  title: 'Selectors/DateRangeSelector',
  component: DateRangeSelector,
  parameters: {
    docs: {
      page: Docs,
    },
  },
  subcomponents: { RangeInputTrigger: RIT },
} as Meta;

const defaultPlaceholder = ['开始日期', '结束日期'] as [string, string];

const Template: Story<DateRangeSelectorProps> = (args) => (
  <div style={{ width: 280 }}>
    <DateRangeSelector {...args} />
  </div>
);

export const Basic = Template.bind({});
Basic.args = {
  placeholder: defaultPlaceholder,
  onSelect: action('selected:'),
  disabledDate: (current: Date) => current.getTime() > new Date().getTime(),
};

const TriggerTemplate: Story<RangeInputTriggerProps> = (args) => (
  <div style={{ width: 280 }}>
    <RIT {...args} />
  </div>
);

export const RangeInputTrigger = TriggerTemplate.bind({});
RangeInputTrigger.args = {
  placeholder: defaultPlaceholder,
};
