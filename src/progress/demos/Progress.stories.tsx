import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { withDesign } from 'storybook-addon-designs';
import Docs from './ProgressPage';
import { ProgressProps } from '../interface';
import Progress from '../index';
import '../style';

export default {
  title: 'Upgraded/Progress',
  component: Progress,
  decorators: [withDesign],
  argTypes: {
    animation: {
      defaultValue: false,
    },
    showInfo: {
      defaultValue: true,
    },
    percent: {
      control: {
        type: 'range',
        min: 0,
        max: 100,
      },
    },
  },
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/lLYusioN7e9ifkQnIXeT4G/GIO-Design-(Running-File)?node-id=4093%3A45838',
      allowFullscreen: true,
    },
    docs: {
      page: Docs,
    },
  },
} as Meta;
const percent: number = Math.floor(Math.random() * 50 + 50);

export const Default: Story<ProgressProps> = (args) => <Progress {...args} percent={percent} />;

export const Animation: Story<ProgressProps> = () => <Progress status="active" percent={percent} animation />;

export const Size: Story<ProgressProps> = () => (
  <>
    <Progress status="active" percent={percent} />
    <Progress status="active" percent={percent} size="small" />
  </>
);

export const ShowInfo: Story<ProgressProps> = () => (
  <>
    <Progress status="active" percent={percent} showInfo={false} />
    <Progress status="active" percent={percent} />
  </>
);

export const Status: Story<ProgressProps> = () => (
  <>
    {['active', 'success', 'exception'].map((item: ProgressProps['status']) => (
      <Progress status={item} percent={percent} />
    ))}
  </>
);

export const Format: Story<ProgressProps> = () => (
  <Progress format={(e: number) => `${e}🌟`} status="active" percent={percent} />
);
