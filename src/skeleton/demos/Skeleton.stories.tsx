import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import Skeleton, { SkeletonProps, SkeletonImageProps } from '../index';
import Docs from './SkeletonPage';
import SkeletonImage from '../Image';
import '../style';

export default {
  title: 'upgraded/Skeleton',
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
  avatar: false,
  active: true,
  paragraph: { row: 5, width: [100, 200, 300, 400, 500] },
};

const TemplateImage: Story<SkeletonImageProps> = (args) => (
  <SkeletonImage {...args}>
    <p>子组件</p>
  </SkeletonImage>
);

export const Image = TemplateImage.bind({});
Image.args = {
  style: { width: '100%' },
  loading: true,
  delay: 1000,
};
