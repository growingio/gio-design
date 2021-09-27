import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { withDesign } from 'storybook-addon-designs';
import Docs from './ProgressPage';
import { ProgressProps } from '../interface';
import Progress from '../index';
import '../style';

export default {
  title: 'Feedback/Progress',
  component: Progress,
  decorators: [withDesign],
  argTypes: {
    animation: {
      defaultValue: false,
    },
    showInfo: {
      defaultValue: true,
    },
  },
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/kP3A6S2fLUGVVMBgDuUx0f/GrowingIO-Design-Components?node-id=889%3A1311',
      allowFullscreen: true,
    },
    docs: {
      page: Docs,
    },
  },
} as Meta;

const Template: Story<ProgressProps> = (args) => (
  <div>
    <Progress {...args} percent={100} status="success" />
    <Progress {...args} percent={30} status="exception" />
    <Progress {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {
  percent: 60,
  status: 'active',
};
