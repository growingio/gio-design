import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { withDesign } from 'storybook-addon-designs';
import Docs from './BreadcrumbPage';
import Breadcrumb from '../index';
import { BreadcrumbProps } from '../interface';
// import '../style';

export default {
  title: 'Legacy/Breadcrumb',
  component: Breadcrumb,
  decorators: [withDesign],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/kP3A6S2fLUGVVMBgDuUx0f/GrowingIO-Design-Components?node-id=1108%3A3874',
      allowFullscreen: true,
    },
    docs: {
      page: Docs,
    },
  },
  argTypes: {
    separator: {
      control: { type: 'text' },
    },
  },
} as Meta;

const Template: Story<BreadcrumbProps> = (args) => <Breadcrumb {...args} />;

export const Default = Template.bind({});
Default.args = {
  routes: [
    {
      path: '?path=/story/basic-components-breadcrumb--default',
      breadcrumbName: '首页',
    },
    {
      path: '#',
      breadcrumbName: '一级面包屑',
    },
    {
      path: '##',
      breadcrumbName: '二级面包屑',
    },
    {
      path: '###',
      breadcrumbName: '三级面包屑',
    },
  ],
};
