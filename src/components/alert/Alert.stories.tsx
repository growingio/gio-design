import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import Docs from './Alert.mdx';
import Alert from './index';
import { AlertProps } from './interfaces';
import './style';
// eslint-disable-next-line import/order
import { action } from '@storybook/addon-actions';

export default {
  title: 'Basic Components/Alert',
  component: Alert,
  parameters: {
    docs: {
      page: Docs,
    },
  },
} as Meta;
// eslint-disable-next-line react/jsx-props-no-spreading
const Template: Story<AlertProps> = (args) => <div {...args} />;

export const Default = Template.bind({});
Default.args = {
  style: { width: 320 },

  children: (
    <div>
      <Alert description="default" />
      <br />
      <Alert type="info" size="middle" description="info" showIcon />
      <br />
      <Alert type="success" size="small" description="success" closeable onClose={action('我被关闭了')} />
      <br />
      <Alert
        type="warning"
        size="middle"
        description="warning"
        closeText="点我关闭"
        closeable
        onClose={action('我被关闭了')}
      />
      <br />
      <Alert type="error" size="small" description="error" message="我是一条message" />
    </div>
  ),
};
const Template2: Story<AlertProps> = (args1) => <Alert {...args1} />;

export const ShowIcon = Template2.bind({});
ShowIcon.args = {
  type: 'info',
  size: 'middle' || 'small',
  showIcon: true,
  description: '我是内容',
};

export const Closeable = Template2.bind({});
Closeable.args = {
  type: 'success',
  size: 'middle' || 'small',
  closeable: true,
  description: '我是内容',
  onClose: action('我被关闭了'),
};
