import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import { action } from '@storybook/addon-actions';
import Docs from './PagePage';
import Page, { PageProps } from '../index';

import '../style';

export default {
  title: 'Functional Components/Page',
  component: Page,
  parameters: {
    docs: {
      page: Docs,
    },
  },
} as Meta;

const defaultCTA = {
  text: '返回首页',
  onClick: action('Call to Action'),
};

const Template: Story<PageProps> = (args) => <Page {...args} />;

export const Forbidden = Template.bind({});
Forbidden.args = {
  statusCode: 403,
  description: '无访问权限，请联系管理员',
  cta: defaultCTA,
};

export const NotFound = Template.bind({});
NotFound.args = {
  statusCode: 404,
  description: '抱歉，出现了一个错误，页面不见了',
  cta: defaultCTA,
};

export const InternalServerError = Template.bind({});
InternalServerError.args = {
  statusCode: 500,
  description: '抱歉，服务器出现了错误',
  cta: defaultCTA,
};
