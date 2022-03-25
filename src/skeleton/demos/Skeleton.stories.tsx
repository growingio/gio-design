import React, { useState } from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import Skeleton, { SkeletonProps, SkeletonImageProps } from '../index';
import Docs from './SkeletonPage';
import '../style';
import SkeletonImage from '../Image'
import { Toggles } from '../..';

export default {
  title: 'upgraded/Skeleton',
  component: Skeleton,
  subcomponents: { 'Skeleton.Image': Skeleton.Image },
  argTypes: {
    avatar: {
      control: { type: 'boolean' }
    },
  },
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
  active: false,
  paragraph: { row: 5 },
};

export const Active = Template.bind({});

Active.args = {
  loading: true,
  delay: 1000,
  avatar: true,
  active: true,
  paragraph: { row: 3, width: ['100%', 200, '100%'] },
};

const TemplateImage: Story<SkeletonImageProps> = (args) => (
  <Skeleton.Image {...args}>
    <p>子组件</p>
  </Skeleton.Image>
);

export const Image = TemplateImage.bind({});
Image.args = {
  style: { width: '100%' },
  loading: true,
  delay: 1000,
};

export const ImageAndParagraph = () => {
  const [loading, setLoading] = useState(true);

  return (<div>
    <Toggles defaultOn onChange={(e) => {
      setLoading(e.target.checked)
    }} />
    <hr />
    <Skeleton loading={loading} avatar={{ size: 'small' }} active paragraph={{ row: 1 }}>
      <h3>标题</h3>

    </Skeleton>
    <SkeletonImage loading={loading} delay={500} style={{ width: '100%' }}>
      <img alt='展示一张图片' width="100%" src="https://doodleipsum.com/700/hand-drawn?i=1219d2c07de49f9bea220114e49a3c46" />
    </SkeletonImage>
    <Skeleton delay={1000} loading={loading} avatar={false} active paragraph={{ row: 5, width: ['100%', '100%', '100%', 100] }}>
      <p>子组件子组件子组件子组件子组件子组件子组件子组件子组件子组件子组件子组件子组件子组件子组件</p>
      <p>子组件子组件子组件子组件子组件子组件子组件子组件子组件子组件子组件子组件子组件子组件子组件</p>
      <p>子组件子组件子组件子组件子组件子组件子组件子组件子组件子组件子组件子组件子组件子组件子组件</p>
      <p>子组件</p>
      <p>子组件子组件子组件子组件子组件子组件子组件子组件子组件子组件子组件子组件子组件子组件子组件</p>
    </Skeleton>
  </div>
  )
}