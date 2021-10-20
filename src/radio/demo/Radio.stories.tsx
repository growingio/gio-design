import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { withDesign } from 'storybook-addon-designs';
import Radio, { RadioGroup } from '../index';
import { IRadioProps, IRadioGroupProps } from '../interface';
import Docs from './RadioPage';
import '../style';

export default {
  title: 'Upgraded/Radio',
  component: Radio,
  subcomponents: { RadioGroup },
  decorators: [withDesign],
  parameters: {
    docs: {
      page: Docs,
    },
  },
} as Meta;

const radioStyle = {
  //   width: '200px',
};

const Template: Story<IRadioProps> = (args) => (
  <div>
    <Radio style={radioStyle} {...args}>
      Normal
    </Radio>
    <Radio style={radioStyle} {...args} checked>
      Selected
    </Radio>
    <br />
    <br />
    <Radio style={radioStyle} {...args} disabled>
      Disabled-Normal
    </Radio>
    <Radio style={radioStyle} {...args} checked disabled>
      Disabled-Selected
    </Radio>
  </div>
);
export const Default = Template.bind({});
Default.args = {
  disabled: false,
  checked: false,
};

const TemplateGroup: Story<IRadioGroupProps> = (args) => (
  <>
    <Radio.Group {...args} />
  </>
);
export const Group = TemplateGroup.bind({});
Group.args = {
  disabled: false,
  layout: 'horizontal',
  defaultValue: '',
  options: [
    {
      label: 'inOptionA',
      value: 'inOptionA',
    },
    {
      label: 'inOptionB',
      value: 'inOptionB',
    },
    {
      label: 'inOptionDisabled',
      value: 'inOptionDisabled',
      disabled: true,
    },
  ],
};
