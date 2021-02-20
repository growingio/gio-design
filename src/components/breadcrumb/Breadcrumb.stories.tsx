import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import Docs from './Breadcrumb.mdx';
import Breadcrumb from './index';
import { BreadcrumbProps } from './interface';
import './style';

export default {
  title: 'Basic Components/Breadcrumb',
  component: Breadcrumb,
  parameters: {
    docs: {
      page: Docs,
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
