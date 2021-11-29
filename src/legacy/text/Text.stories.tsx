import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import Docs from './Text.mdx';
import Text, { TextProps } from './index';

export default {
  title: 'legacy/Text',
  component: Text,
  parameters: {
    docs: {
      page: Docs,
    },
  },
} as Meta;

const Template: Story<TextProps> = (args) => (
  <div style={{ fontSize: '20px' }}>
    <Text {...args}>
      我是一个栗子<span>我是一个栗子我是一个栗子我是一个栗子</span>我是一个栗子我是一个栗子我是一
      <div>个栗子我是一个栗子我是一个栗子我是一个栗子我</div>是一个栗子我是一个栗子
    </Text>
  </div>
);

export const Default = Template.bind({});
Default.args = {
  lines: 1,
  width: 0,
};
