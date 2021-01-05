import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import Radio, { RadioGroup } from './index'
import { IRadioProps, IRadioGroupProps,  } from './interface'

import './style'

export default {
    title: 'Components/Basic/Radio',
    component: Radio,
    subcomponents: { RadioGroup },
} as Meta;

const Template : Story<IRadioProps> = (args) => <Radio {...args}>Nomal</Radio>;
export const Default = Template.bind({});
Default.args = {
    checked: true,
}

const options = [
    {
      label: 'inOptionA',
      value: 'inOptionA',
    },
    {
      label: 'inOptionDisabled',
      value: 'inOptionDisabled',
      disabled: true,
    },
]
const TemplateGroup : Story<IRadioGroupProps> = (args) => (
  <>
    <RadioGroup {...args} />
    <br />
    <RadioGroup {...args}>
      <Radio value="childA">ChildA</Radio>
      <Radio value="childDisabled">
        ChildDisabled
      </Radio>
    </RadioGroup>
  </>
)
export const Group = TemplateGroup.bind({});
Group.args = {
    options,
}