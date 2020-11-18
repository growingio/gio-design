import React, { useState } from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import Select from './index';
import { SelectProps } from './interface';
import './style';

export default {
  title: 'Components/Functional/Select',
  component: Select,
} as Meta;

const labels = ['全部', '已上线', '待上线', '已下线', '草稿'];
const values = ['all', 'online', 'pending', 'off', 'draft'];
const optionsWithoutGroup = values.map((value, index) => ({
  value,
  label: labels[index],
}));

export const Default: Story<SelectProps> = (args) => <Select {...args} />;

Default.args = {
  size: 'small',
  style: { width: 140 },
  placeholder: '请选择',
  options: optionsWithoutGroup,
};
