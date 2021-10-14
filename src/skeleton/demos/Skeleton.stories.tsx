import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import Skeleton, { SkeletonProps, SkeletonImageProps } from '../index';
import Docs from './SkeletonPage';
import SkeletonImage from '../Image';
import '../style';

export default {
  title: 'Feedback/Skeleton',
  component: Skeleton,
  subcomponents: { SkeletonImage },
  parameters: {
    docs: {
      page: Docs,
    },
  },
} as unknown as Meta;

const Template: Story<SkeletonProps> = (args) => (
  <Skeleton {...args}>
    <p>子组件</p>
  </Skeleton>
);
export const Default = Template.bind({});

Default.args = {
  loading: true,
  delay: 1000,
  avatar: true,
  active: true,
};

const TemplateImage: Story<SkeletonImageProps> = (args) => (
  <SkeletonImage {...args}>
    <p>子组件</p>
  </SkeletonImage>
);

export const Image = TemplateImage.bind({});
Image.args = {
  loading: true,
  delay: 1000,
};
