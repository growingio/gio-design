/* eslint-disable no-console */
import React from 'react';
import { Meta } from '@storybook/react/types-6-0';
import { SuccessOutlined, CheckOutlined } from '@gio-design/icons';
import Docs from './AlertPage';
import Alert from '../index';
import '../style';

export default {
  title: 'Upgraded/Alert',
  component: Alert,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/lLYusioN7e9ifkQnIXeT4G/GIO-Design-(Running-File)?node-id=4093%3A45313',
      allowFullscreen: true,
    },
    docs: {
      page: Docs,
    },
  },

  argTypes: {
    message: {
      type: { name: 'string' },
    },
  },
} as Meta;

export const Default = () => (
  <>
    <Alert message="This is an info alert" type="info" />
    <br />
    <Alert message="This is an error alert" type="error" />
    <br />
    <Alert message="This is a success alert" type="success" />
    <br />
    <Alert message="This is a warning alert" type="warning" />
  </>
);

export const Description = () => (
  <>
    <Alert message="Info" description="This is an info alert" type="info" />
    <br />
    <Alert message="Error" description="This is an error alert" type="error" />
    <br />
    <Alert message="Success" description="This is a success alert" type="success" />
    <br />
    <Alert message="Warning" description="This is a warning alert" type="warning" />
  </>
);

export const Icons = () => (
  <>
    <Alert message="Info" description="This is an info alert" type="info" showIcon />
    <br />
    <Alert message="Error" description="This is an error alert" type="error" showIcon />
    <br />
    <Alert message="Success" description="This is a success alert" type="success" showIcon />
    <br />
    <Alert message="Warning" description="This is a warning alert" type="warning" showIcon />
    <br />
    <br />
    <Alert message="Success" description="This is a success alert" type="success" showIcon icon={<CheckOutlined />} />
    <br />
    <Alert
      message="Success"
      description="This is a success alert"
      type="success"
      showIcon
      icon={<SuccessOutlined />}
    />
  </>
);

export const Closeable = () => (
  <Alert message="Info" description="This is an info alert" type="info" closeable onClose={(e) => console.log(e)} />
);
