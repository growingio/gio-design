import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import InnerToggle from '../index';
import { TogglesProps } from '../interface';
import '../style';

export default {
  title: 'Upgraded/Toggle',
  component: InnerToggle,
} as Meta;

const Template: Story<TogglesProps> = (args) => <InnerToggle {...args} />;
export const Default = Template.bind({});
Default.args = {
  className: 'gio-toggles-default',
};

export const Disabled = Template.bind({});
Disabled.args = {
  disabled: true,
};

export const suffixContent = Template.bind({});
suffixContent.args = {
  checkedChildren: <span>开</span>,
  uncheckedChildren: <span>关</span>,
};
