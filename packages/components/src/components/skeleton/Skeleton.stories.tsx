import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0'
import Button from '../button'
import Skeleton, { SkeletonProps, SkeletonImageProps } from './index'
import SkeletonImage from './Image'
import './style'

export default {
    title: 'Components/Basic/Skeleton',
    component: Skeleton,
    subcomponents: {SkeletonImage},
} as unknown as Meta;

const Template : Story<SkeletonProps> = (args) => (
  <>
    <Skeleton {...args}>
      <p>子组件</p>
    </Skeleton>
    <Button>
      click
    </Button>
  </>
)
export const Default = Template.bind({});
Default.args = {
  loading: true,
  delay: 1000,
}

const TemplateImage : Story<SkeletonImageProps> = (args) => (
  <>
    <SkeletonImage {...args}>
      <Skeleton avatar />
    </SkeletonImage>
    <Button>
      click
    </Button>
  </>
)
export const Image = TemplateImage.bind({});
Image.args = {
  loading: true,
  delay: 1000,
}