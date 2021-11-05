import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import StaticTimePicker from '../StaticTimePicker';
import { StaticTimePickerProps } from '../interfaces';
import Docs from './StaticTimePicker.mdx';

import '../style';

export default {
  title: 'Upgraded/StaticTimePicker',
  component: StaticTimePicker,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/kP3A6S2fLUGVVMBgDuUx0f/GIO-Components?node-id=4078%3A49236',
      allowFullscreen: true,
    },
    docs: {
      page: Docs,
    },
  },
} as Meta;

const Template: Story<StaticTimePickerProps> = (args) => <StaticTimePicker {...args} />;

export const Basic = Template.bind({});
Basic.args = {};

export const ShowSecond = Template.bind({});
ShowSecond.args = {
  showSecond: true,
};
