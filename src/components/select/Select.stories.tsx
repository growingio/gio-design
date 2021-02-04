import React, { useRef } from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import Select, { OptionProps, SelectProps } from './index';
import './style';
import Tooltip from '../tooltip';

export default {
  title: 'Components/Functional/Select',
  component: Select,
  subcomponents: {
    Group: Select.Group,
    Option: Select.Option,
  },
} as Meta;

const labels = ['a', 'b', 'c', 'd', 'e'];
const options = new Array(50).fill(0).map((value, index) => ({
  value: `${labels[index % 5]}${index}`,
  label: `${labels[index % 5]}${index}`,
}));

const optionsWithoutGroup = new Array(20).fill(0).map((value, index) => ({
  value: `${labels[index % 5]}${index}`,
  label: `${labels[index % 5]}${index}`,
  disabled: index % 5 === 0,
  groupLabel: `${labels[index % 5]}__optionGroup`,
  groupValue: `${labels[index % 5]}__optionGroup`,
}));

const optionsWithCustomLabel = new Array(20).fill(0).map((value, index) => ({
  value: `${labels[index % 5]}${index}`,
  disabled: index % 5 === 0,
  label: (
    <Tooltip title="测试">
      <div style={{ height: 50, width: '100%', background: 'aliceblue' }}>{`${labels[index % 5]}${index}`}</div>
    </Tooltip>
  ),
  groupLabel: (
    <div style={{ height: 88, width: '100%', background: 'antiquewhite' }}>{`${labels[index % 5]}${index}`}</div>
  ),
  groupValue: `${labels[index % 5]}`,
}));
const Template: Story<SelectProps> = (args) => {
  const ref = useRef(null);
  return <Select {...args} ref={ref} />;
};

export const Default = Template.bind({});
export const Group = Template.bind({});
export const customOption = Template.bind({});
Default.args = {
  placeholder: '请选择',
  searchable: true,
  disabled: false,
  bordered: true,
  allowClear: true,
  className: 'gio-demo',
  allowCustomOption: true,
  size: 'small',
  options,
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

Group.args = {
  placeholder: '请选择',
  searchable: true,
  disabled: false,
  multiple: true,
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

customOption.args = {
  placeholder: '请选择',
  searchable: true,
  disabled: false,
  multiple: true,
  bordered: true,
  allowClear: true,
  className: 'gio-demo',
  allowCustomOption: true,
  size: 'small',
  options: optionsWithCustomLabel,
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
