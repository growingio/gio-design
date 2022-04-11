import React, { useState } from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import { action } from '@storybook/addon-actions';
import { isBefore, startOfToday, subMonths } from 'date-fns';
import Docs from './DateRangePickerPage';
import DateRangePicker, { DateRangePickerProps, StaticDateRangePickerProps } from '../index';
import '../style';
import '../../static-date-range-picker/style';
import Button from '../../button';

export default {
  title: 'Upgraded/DateRangePicker',
  component: DateRangePicker,
  subcomponents: { StaticDateRangePicker: DateRangePicker.Static },
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/kP3A6S2fLUGVVMBgDuUx0f/GIO-Design?node-id=6979%3A96991',
      allowFullscreen: true,
    },
    docs: {
      page: Docs,
    },
  },
} as Meta;

const Template: Story<DateRangePickerProps> = (args) => (
    <DateRangePicker {...args} />
);

const ControlledTemplate: Story<DateRangePickerProps> = (args) => {
  const [TimeRange, setTimeRange] = useState([new Date(), new Date()] as [Date, Date]);
  const onSelect = (timeRange: [Date, Date]) => {
    setTimeRange(timeRange);
  };
  return (
    <div style={{ width: 280 }}>
      <DateRangePicker  value={TimeRange} onSelect={onSelect} trigger={
        <Button>
          自定义触发器
        </Button>

      }
      {...args}
      />
    </div>
  );
};

export const CustomTrigger = ControlledTemplate.bind({});

export const Default = ControlledTemplate.bind({});
Default.args = {
    placeholder:'选择日期范围',
    onChange: action('onChange:'),
    trigger:null,
    format:"yyyy/MM/dd",
    disabled:false,
    size:'normal',
};

export const Disabled = Template.bind({});
Disabled.args = {
  placeholder:'选择器Disabled',
  onSelect: action('selected:'),
  disabled:true,
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

export const StaticViewDates = StaticTemplate.bind({});
StaticViewDates.args = {
  defaultViewDates: [subMonths(startOfToday(), 1), startOfToday()],
};
