import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import { withDesign } from 'storybook-addon-designs';
import { addMonths, isBefore, startOfToday } from 'date-fns';
import { action } from '@storybook/addon-actions';
import Docs from './DatePickerPage';
import Button from '../../button';
import Toast from '../../toast';
import DatePicker, { DatePickerProps } from '../index';

import '../style';
import '../../static-date-picker/style';

export default {
  title: 'Upgraded/DatePicker',
  component: DatePicker,
  subcomponents: { DatePickerStatic: DatePicker.Static },
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

export const Default = Template.bind({});
Default.args = {
  defaultValue: new Date(),
  placeholder: '选择具体某一天',
  onClear: () => {
    Toast.info('Clear data!');
  },
};


export const Disabled = Template.bind({});
Disabled.args = {
  disabled:true,
  disabledDate: (current: Date) => current.getTime() > new Date().getTime(),
  placeholder: '选择器Disabled',
  onClear: () => {
    Toast.info('Clear data!');
  },
};

const CustomizeTriggerTemplate: Story<DatePickerProps> = (args) => {

  const onSelect = () => {
    action('onChange:')
  };

  return (
    <DatePicker
      trigger={
        <Button type="primary">
          自定义触发器
        </Button>
      }
      onSelect={onSelect}
      {...args}
    />
  );
};

export const CustomTrigger = CustomizeTriggerTemplate.bind({});
CustomTrigger.args = {};

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
