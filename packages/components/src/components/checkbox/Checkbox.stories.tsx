import React from 'react'
import { Story, Meta } from '@storybook/react/types-6-0'

import Checkbox from './index'
import CheckboxGroup from './group'
import { CheckboxProps, CheckboxGroupProps, CheckboxValueType } from './interface'
import './style'

export default {
    title: 'Components/Basic/Checkbox',
    component: Checkbox,
    subcomponents: {CheckboxGroup}
} as Meta;

const Checked = (args : CheckboxProps) => {
    const [checked, update] = React.useState(false);
    const handleChange = (e: any) => {
      update(e.target.checked);
    };
    return (
      <Checkbox 
        {...args}
        checked={args.checked ? args.checked :checked} 
        onChange={args.onChange ? args.onChange : handleChange}
      >
        Normal
      </Checkbox>
    );
  };

const Template : Story<CheckboxProps> = (args) => <>{Checked(args)}</>

export const Default = Template.bind({});
Default.args = {
    autoFocus: false,
}

const TemplateGroup : Story<CheckboxGroupProps<CheckboxValueType>> = (args) => <CheckboxGroup {...args} />

export const Group = TemplateGroup.bind({});
Group.args = {
    options: [
        { label: '1', value: 1 },
        { label: '2', value: 2 },
        { label: '3', value: 3 },
    ],
}