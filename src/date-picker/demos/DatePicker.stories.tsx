import React, { useState } from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import { withDesign } from 'storybook-addon-designs';
import { DownFilled } from '@gio-design/icons';
import { addMonths, isBefore, startOfToday } from 'date-fns';
import { format } from 'date-fns/fp';
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
export const ControlledStatic: Story = () => {
  const [value, setValue] = useState(new Date(2022, 4, 0));
  const [pickerMode, setMode] = useState('date');
  return (<div>
    <h3>pickerMode:{pickerMode},current value: {format('yyyy/MM/dd HH:MM:SS', value)}</h3>
    <DatePicker.Static value={value} onSelect={v => setValue(v)} viewDate={value} onPanelChange={(val, mode) => {
      setMode(mode);
      // setValue(val);
    }} /></div>)
};