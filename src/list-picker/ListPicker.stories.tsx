import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import { action } from '@storybook/addon-actions';
import ListPicker from './index';
import { ListPickerProps } from './interfaces';
import Docs from './ListPicker.mdx';

import './style';

export default {
  title: 'Pickers/ListPicker',
  component: ListPicker,
  parameters: {
    docs: {
      page: Docs,
    },
  },
} as Meta;

const Template: Story<ListPickerProps> = (args) => <ListPicker {...args} />;

export const Basic = Template.bind({});
Basic.args = {
  options: [
    { value: 'option-1', label: 'Option 1' },
    { value: 'option-2', label: 'Option 2' },
    { value: 'option-3', label: 'Option 3' },
    { value: 'option-4', label: 'Option 4' },
  ],
  onSelect: action('selected value:'),
};
