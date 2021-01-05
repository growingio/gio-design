import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import { ProgressProps } from './interface';
import Progress from './index';
import './style';

export default {
  title: 'Components/Basic/Progress',
  component: Progress,
} as Meta;

const Template: Story<ProgressProps> = (args) => <Progress {...args} />;

export const Default = Template.bind({});
Default.args = {
  percent: 30,
};
