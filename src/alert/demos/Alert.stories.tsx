import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { action } from '@storybook/addon-actions';
import Docs from './AlertPage';
import Alert from '../index';
import { AlertProps } from '../interfaces';
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

const DemoTemplate: Story<AlertProps> = (args) => (
  <div>
    <Alert {...args} type="info" style={{ width: '%100' }} onClose={action('close')} />
    <br />
    <Alert {...args} type="warning" style={{ width: 800 }} onClose={action('close')} />
    <br />
    <Alert {...args} type="success" style={{ width: 500 }} onClose={action('close')} />
    <br />
    <Alert {...args} type="error" style={{ width: 300 }} onClose={action('close')} />
  </div>
);
const Template: Story<AlertProps> = (args) => (
  <div>
    <Alert type="info" style={{ width: '%100' }} onClose={action('close')} {...args} />
  </div>
);

export const Demo = DemoTemplate.bind({});
Demo.args = {
  message: 'This is an example of an embedded banner',
  description:
    'Use this if you want to put it inside of another thing like this panel. Heres how you would format it, syntax.',
};
export const Default: Story<AlertProps> = (args) => (
  <div>
    <Alert style={{ width: '%100' }} onClose={action('close')} {...args} />
  </div>
);
Default.args = {
  message: 'This is an example of an embedded banner',
  description:
    'Use this if you want to put it inside of another thing like this panel. Heres how you would format it, syntax.',
};
export const NoDescription = Template.bind({});
NoDescription.args = {
  showIcon: true,
  closeable: true,
  message: 'This is an example of an embedded banner',
};

export const NoTitle = Template.bind({});
NoTitle.args = {
  showIcon: true,
  closeable: true,
  description:
    'Use this if you want to put it inside of another thing like this panel. Heres how you would format it, syntax.',
};

export const NoIcon = Template.bind({});
NoIcon.args = {
  closeable: true,
  message: 'This is an example of an embedded banner',
  description:
    'Use this if you want to put it inside of another thing like this panel. Heres how you would format it, syntax.',
};

export const NoClose = Template.bind({});
NoClose.args = {
  showIcon: true,
  message: 'This is an example of an embedded banner',
  description:
    'Use this if you want to put it inside of another thing like this panel. Heres how you would format it, syntax.',
};
