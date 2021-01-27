import React, { useRef } from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import Select, { OptionProps, SelectProps } from './index';
import './style';

export default {
  title: 'Components/Functional/Select',
  component: Select,
  subcomponents: {
    Group: Select.Group,
    Option: Select.Option,
  },
} as Meta;

const labels = ['全部', '已上线', '待上线', '已下线', '草稿'];
const values = ['all', 'online', 'pending', 'off', 'draft'];
const optionsWithoutGroup = values.map((value, index) => ({
  value,
  label: labels[index],
}));

const Template: Story<SelectProps> = (args) => {
  const ref = useRef(null);
  return <Select {...args} ref={ref} />;
};

export const Default = Template.bind({});
Default.args = {
  placeholder: '请选择',
  searchable: true,
  disabled: false,
  multiple: false,
  bordered: true,
  allowClear: true,
  className: 'gio-demo',
  allowCustomOption: true,
  size: 'small',
  options: optionsWithoutGroup,
  style: { width: 160 },
  onChange: (value: string | number, option: OptionProps) => {
    console.log('onchange', value, option);
  },
  onSearch: (input: string) => {
    console.log('input', input);
  },
  onSelect: (value: string | number, option: OptionProps) => {
    console.log('onselect', value, option);
  },
  allowDeselect: false,
  onDeSelect: (value: string | number, option: OptionProps) => {
    console.log('ondeselect', value, option);
  },
  onClear: () => {
    console.log('clear');
  },
};
