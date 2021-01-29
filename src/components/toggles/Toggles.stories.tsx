import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import Docs from './Toggles.mdx';
import Toggles from './index';
import { TogglesProps } from './interface';
import './style';

export default {
  title: 'Basic Components/Toggles',
  component: Toggles,
  parameters: {
    docs: {
      page: Docs,
    },
  },
} as Meta;

const Template: Story<TogglesProps> = (args) => <Toggles {...args} />;
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
  suffixContent: true,
};

export const CustomColor = Template.bind({});
CustomColor.args = {
  activeColor: '#000',
  inactiveColor: '#fff',
};
