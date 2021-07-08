import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import Docs from './Text.mdx';
import Text, { TextProps } from './index';

export default {
  title: 'Basic Components/Text',
  component: Text,
  parameters: {
    docs: {
      page: Docs,
    },
  },
} as Meta;

const Template: Story<TextProps> = (args) => (
  <div style={{ width: '100px', margin: '0px auto' }}>
    <Text {...args}>我是一个栗子我是一个栗子我是一个栗子我是一个栗子</Text>
  </div>
);

export const Default = Template.bind({});
Default.args = {
  lines: 3,
  width: 0,
};
