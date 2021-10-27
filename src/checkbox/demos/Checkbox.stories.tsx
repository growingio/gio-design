import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import Checkbox from '../index';
import { CheckboxProps, CheckboxGroupProps, CheckboxValueType } from '../interface';
import '../style';

export default {
  title: 'Upgraded/Checkbox',
  component: Checkbox,
} as Meta;

const Template: Story<CheckboxProps> = (args) => {
  const [checked, setChecked] = React.useState(false);
  const handleChange = (e: any) => {
    setChecked(e.target.checked);
  };
  return (
    <Checkbox {...args} checked={checked} onChange={handleChange}>
      我已阅读以下条款
    </Checkbox>
  );
};

const TemplateGroup: Story<CheckboxGroupProps<CheckboxValueType>> = (args) => <Checkbox.Group {...args} />;

export const Group = TemplateGroup.bind({});

Group.args = {
  options: [
    { label: '我已阅读以下条款一', value: 1 },
    { label: '我已阅读以下条款二', value: 2 },
    { label: '我已阅读以下条款三', value: 3, disabled: true },
  ],
};

export const GroupVertical = TemplateGroup.bind({});

GroupVertical.args = {
  options: [
    { label: '我已阅读以下条款一', value: 1 },
    { label: '我已阅读以下条款二', value: 2 },
    { label: '我已阅读以下条款三', value: 3, disabled: true },
  ],
  layout: 'vertical',
};

export const Default = Template.bind({});

export const Indeterminate = Template.bind({});

Indeterminate.args = {
  indeterminate: true,
};

Default.args = {};
