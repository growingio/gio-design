import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { withDesign } from 'storybook-addon-designs';
import Docs from './CheckboxPage';
import Checkbox from '../Checkbox';
import CheckboxGroup from '../group';
import { CheckboxProps, CheckboxGroupProps, CheckboxValueType } from '../interface';
import '../style';

export default {
  title: 'legacy/Checkbox',
  component: Checkbox,
  subcomponents: { CheckboxGroup },
  decorators: [withDesign],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/kP3A6S2fLUGVVMBgDuUx0f/GrowingIO-Design-Components?node-id=889%3A1248',
      allowFullscreen: true,
    },
    docs: {
      page: Docs,
    },
  },
} as Meta;

const Template: Story<CheckboxProps> = (args) => {
  const [checked, setChecked] = React.useState(false);
  const handleChange = (e: any) => {
    setChecked(e.target.checked);
  };
  return (
    <Checkbox {...args} checked={checked} onChange={handleChange}>
      Normal
    </Checkbox>
  );
};
const TemplateGroup: Story<CheckboxGroupProps<CheckboxValueType>> = (args) => <CheckboxGroup {...args} />;

export const Default = Template.bind({});
export const Group = TemplateGroup.bind({});

Default.args = {};
Group.args = {
  options: [
    { label: '1', value: 1 },
    { label: '2', value: 2 },
    { label: '3', value: 3 },
    { label: '4', value: 4, disabled: true },
  ],
};
