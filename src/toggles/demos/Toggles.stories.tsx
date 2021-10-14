import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { withDesign } from 'storybook-addon-designs';
import Docs from './TogglesPage';
import Toggles from '../index';
import { TogglesProps } from '../interface';
import '../style';

export default {
  title: 'Basic Components/Toggles',
  component: Toggles,
  decorators: [withDesign],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/kP3A6S2fLUGVVMBgDuUx0f/GrowingIO-Design-Components?node-id=889%3A1168',
      allowFullscreen: true,
    },
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
