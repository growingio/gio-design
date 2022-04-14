import React, { useState } from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import { withDesign } from 'storybook-addon-designs';
import { DownFilled } from '@gio-design/icons';
import { addMonths, isBefore, startOfToday } from 'date-fns';
import Docs from './DatePickerPage';
import Button from '../../button';
import Toast from '../../toast';
import DatePicker, { DatePickerProps } from '../index';

import '../style';
import '../../button/style';
import '../../toast/style';

export default {
  title: 'Upgraded/DatePicker',
  component: DatePicker,
  subcomponents: { 'DatePicker.Static': DatePicker.Static },
  decorators: [withDesign],
  parameters: {
    design: {
      type: 'figma',
      allowFullscreen: true,
    },
    docs: {
      page: Docs,
    },
  },
} as Meta;

const Template: Story<DatePickerProps> = (args) => <DatePicker {...args} />;

export const NormalPicker = Template.bind({});
NormalPicker.args = {
  defaultValue: new Date(),
  placeholder: 'please select',
  onClear: () => {
    Toast.info('Clear item!');
  },
};

export const Placeholder = Template.bind({});
Placeholder.args = {
  placeholder: 'please select',
};

const CustomizeTriggerTemplate: Story<DatePickerProps> = (args) => {
  const [value, setValue] = useState('please select');

  const onSelect = (date: Date, dateString: string) => {
    setValue(dateString);
  };

  return (
    <DatePicker
      trigger={
        <Button type="secondary">
          {value} <DownFilled size="14px" />
        </Button>
      }
      onSelect={onSelect}
      {...args}
    />
  );
};

export const CustomizeTrigger = CustomizeTriggerTemplate.bind({});
CustomizeTrigger.args = {};

const StaticTemplate: Story = (args) => <DatePicker.Static {...args} />;

export const StaticBasic = StaticTemplate.bind({});
StaticBasic.args = {};

export const StaticDisabledDate = StaticTemplate.bind({});
StaticDisabledDate.args = {
  disabledDate: (date: Date) => isBefore(startOfToday(), date),
};

export const StaticViewDate = StaticTemplate.bind({});
StaticViewDate.args = {
  viewDate: addMonths(startOfToday(), 1),
};
