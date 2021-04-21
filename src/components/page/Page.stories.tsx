import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import { action } from '@storybook/addon-actions';
import Docs from './Page.mdx';
import { Page, PageProps } from './index';

import './style';

export default {
  title: 'Functional Components/Page',
  component: Page,
  parameters: {
    docs: {
      page: Docs,
    },
  },
} as Meta;

const Template: Story<PageProps> = (args) => <Page {...args} />;

export const Forbidden = Template.bind({});
Forbidden.args = {
  statusCode: 403,
  description: '无访问权限，请联系管理员',
  cta: {
    text: '返回首页',
    onClick: action('Call to Action'),
  },
};
