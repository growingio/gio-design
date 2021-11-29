import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { action } from '@storybook/addon-actions';
import Docs from './AlertPage';
import Alert from '../index';
import { AlertProps } from '../interfaces';
import '../style';

export default {
  title: 'Legacy/Alert',
  component: Alert,
  parameters: {
    docs: {
      page: Docs,
    },
  },
} as Meta;

const Template: Story<AlertProps> = (args) => (
  <div style={{ width: 320 }}>
    <Alert {...args} type="info" size="small" />
    <br />
    <Alert {...args} type="warning" size="small" />
    <br />
    <Alert {...args} type="success" size="small" />
    <br />
    <Alert {...args} type="error" size="small" onClose={action('我被关闭了')} />
  </div>
);

export const Default = Template.bind({});
Default.args = {
  showIcon: true,
  closeable: true,
  message: '标题',
  description: '提示正文',
};

export const NoDescription = Template.bind({});
NoDescription.args = {
  showIcon: true,
  closeable: true,
  message: '标题',
};

export const NoTitle = Template.bind({});
NoTitle.args = {
  showIcon: true,
  closeable: true,
  description: '提示正文',
};

export const NoIcon = Template.bind({});
NoIcon.args = {
  closeable: true,
  message: '标题',
  description: '提示正文',
};

export const NoClose = Template.bind({});
NoClose.args = {
  showIcon: true,
  message: '标题',
  description: '提示正文',
};
