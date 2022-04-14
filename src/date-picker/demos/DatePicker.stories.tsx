import React, { useState } from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import { withDesign } from 'storybook-addon-designs';
import { addMonths, isBefore, startOfToday } from 'date-fns';
import { action } from '@storybook/addon-actions';
import { FoldOutlined,DownOutlined } from '@gio-design/icons';
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

export const Default = Template.bind({});
Default.args = {
  defaultValue: new Date(),
  placeholder: '选择具体某一天',
  onChange: () => {
    action('onChange')
  },
};

export const Format: Story<DatePickerProps>  = (args)=>{
  const [value,setValue]= useState(new Date());

  return <DatePicker
    value={value}
    onSelect={setValue}
    {...args}
  />
}
Format.args={
  format:'yyyy/dd-mm'
}

export const PrefixAndSuffix = Template.bind({});
PrefixAndSuffix.args = {
  defaultValue: new Date(),
  prefix: <FoldOutlined />,
  suffix: <DownOutlined />
};

export const AllowClear =Template;
AllowClear.args = {
  allowClear:true,
};

export const Size = Template.bind({});
Size.args = {
  defaultValue: new Date(),
  size:'small'
};

export const Disabled = Template.bind({});
Disabled.args = {
  disabled:true,
  disabledDate: (current: Date) => current.getTime() > new Date().getTime(),
  placeholder: '选择器Disabled',
  onClear: () => {
    Toast.info('Clear date!');
  },
};

export const OnSelectAndOnClose = Template.bind({});
OnSelectAndOnClose.args = {
  allowClear:'true',
  onSelect:action('onSelect'),
  onChange:action('onChange'),
  onClear: action('onClear'),
  onPanelChange: action('onPanelChange'),
};

const CustomizeTriggerTemplate: Story<DatePickerProps> = (args) => {
  const [value,setValue]= useState(new Date().toString());
  const onSelect = (e:any) => {
    setValue(e.toString())
    action('onSelect:')
  };
  const onChange = (e:any) => {
    action(e)
  };
  return (
    <DatePicker
      trigger={
        <Button type="secondary">您的所选时间为
          {value}
        </Button>
      }
      onSelect={onSelect}
      InputButtonProps={
        {onChange,}
      }
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
