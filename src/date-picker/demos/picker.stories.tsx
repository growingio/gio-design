import React, { useState } from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import { withDesign } from 'storybook-addon-designs';
import { DownFilled } from '@gio-design/icons';

import Button from '../../button';
import Toast from '../../toast';
import DatePicker, { DatePickerProps } from '../index';

import '../style';

export default {
  title: 'Upgraded/DatePicker',
  component: DatePicker,

  decorators: [withDesign],
  parameters: {
    design: {
      type: 'figma',
      allowFullscreen: true,
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
